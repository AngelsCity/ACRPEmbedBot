use awc::error::{JsonPayloadError, SendRequestError};
use twilight_http::client::InteractionClient;
use twilight_http::response::DeserializeBodyError;
use twilight_model::application::command::Command;
use twilight_model::application::component::ComponentType;
use twilight_model::application::interaction::{Interaction, MessageComponentInteraction};
use twilight_model::channel::message::MessageFlags;
use twilight_model::http::interaction::{
    InteractionResponse, InteractionResponseData, InteractionResponseType,
};
use twilight_model::id::marker::InteractionMarker;
use twilight_model::id::Id;

use crate::bot::message::{MessageAction, MessagePayload};
use crate::bot::DISCORD_HTTP;
use crate::db::models::ChannelMessageModel;
use crate::CONFIG;

mod embed;
mod format;
mod help;
mod image;
mod invite;
mod message;
mod message_json_direct;
mod message_restore_direct;
mod webhook;
mod website;

pub fn command_definitions() -> Vec<Command> {
    vec![
        format::command_definition(),
        invite::command_definition(),
        help::command_definition(),
        website::command_definition(),
        message::command_definition(),
        webhook::command_definition(),
        message_restore_direct::command_definition(),
        message_json_direct::command_definition(),
        image::command_definition(),
        embed::command_definition(),
    ]
}

pub async fn handle_interaction(interaction: Interaction) -> InteractionResult {
    let http = DISCORD_HTTP.interaction(CONFIG.discord.oauth_client_id);

    match interaction {
        Interaction::ApplicationCommand(cmd) => match cmd.data.name.as_str() {
            "format" => format::handle_command(http, cmd).await?,
            "help" => help::handle_command(http, cmd).await?,
            "invite" => invite::handle_command(http, cmd).await?,
            "website" => website::handle_command(http, cmd).await?,
            "message" => message::handle_command(http, cmd).await?,
            "webhook" => webhook::handle_command(http, cmd).await?,
            "image" => image::handle_command(http, cmd).await?,
            "embed" => embed::handle_command(http, cmd).await?,
            "Restore Message" => message_restore_direct::handle_command(http, cmd).await?,
            "Dump Message" => message_json_direct::handle_command(http, cmd).await?,
            _ => {}
        },
        Interaction::MessageComponent(comp) => match comp.data.custom_id.as_str() {
            _ => handle_unknown_component(http, comp).await?,
        },
        Interaction::ApplicationCommandAutocomplete(cmd) => match cmd.data.name.as_str() {
            "format" => format::handle_autocomplete(http, cmd).await?,
            "image" => image::handle_autocomplete(http, cmd).await?,
            _ => {}
        },
        Interaction::ModalSubmit(modal) => match modal.data.custom_id.as_str() {
            "embed" => embed::handle_modal(http, modal).await?,
            _ => {}
        },
        _ => {}
    }

    Ok(())
}

async fn handle_unknown_component(
    http: InteractionClient<'_>,
    comp: Box<MessageComponentInteraction>,
) -> InteractionResult {
    let message_id = comp.message.id;
    let payload_hash = MessagePayload::from(comp.message).hash();
    // we have to check that the message was created by the bot and not manually by using a webhook
    if !ChannelMessageModel::exists_by_message_id_and_hash(message_id, &payload_hash).await? {
        simple_response(
            &http,
            comp.id,
            &comp.token,
            "Message integrity could not be validated".into(),
        )
        .await?;
        return Ok(());
    }

    let response = match comp.data.component_type {
        ComponentType::Button => comp.data.custom_id.as_str(),
        ComponentType::SelectMenu => match comp.data.values.get(0) {
            Some(v) => v,
            None => return Ok(()),
        },
        _ => return Ok(()),
    };

    let actions = MessageAction::parse(response);
    if actions.is_empty() {
        simple_response(&http, comp.id, &comp.token, response.to_string()).await?;
    } else {
        // TODO: perform the actions
    }

    Ok(())
}

pub async fn simple_response(
    http: &InteractionClient<'_>,
    id: Id<InteractionMarker>,
    token: &str,
    text: String,
) -> InteractionResult {
    http.create_response(
        id,
        token,
        &InteractionResponse {
            kind: InteractionResponseType::ChannelMessageWithSource,
            data: Some(InteractionResponseData {
                content: Some(text),
                flags: Some(MessageFlags::EPHEMERAL),
                ..Default::default()
            }),
        },
    )
    .exec()
    .await?;
    Ok(())
}

#[derive(Debug)]
pub enum InteractionError {
    NoOp,
    DiscordHttp(twilight_http::Error),
    DiscordDeserialize(DeserializeBodyError),
    JsonSerialize(serde_json::error::Error),
    AwcDeserialize(awc::error::JsonPayloadError),
    AwcRequest(SendRequestError),
    Database(mongodb::error::Error),
}

impl From<twilight_http::Error> for InteractionError {
    fn from(e: twilight_http::Error) -> Self {
        Self::DiscordHttp(e)
    }
}

impl From<DeserializeBodyError> for InteractionError {
    fn from(e: DeserializeBodyError) -> Self {
        Self::DiscordDeserialize(e)
    }
}

impl From<serde_json::error::Error> for InteractionError {
    fn from(e: serde_json::Error) -> Self {
        Self::JsonSerialize(e)
    }
}

impl From<awc::error::JsonPayloadError> for InteractionError {
    fn from(e: JsonPayloadError) -> Self {
        Self::AwcDeserialize(e)
    }
}

impl From<SendRequestError> for InteractionError {
    fn from(e: SendRequestError) -> Self {
        Self::AwcRequest(e)
    }
}

impl From<mongodb::error::Error> for InteractionError {
    fn from(e: mongodb::error::Error) -> Self {
        Self::Database(e)
    }
}

pub type InteractionResult = Result<(), InteractionError>;
