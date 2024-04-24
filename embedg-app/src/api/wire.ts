// Code generated by tygo. DO NOT EDIT.
import {APIResponse} from "./base"

//////////
// source: assistant.go

export interface AssistantGenerateMessageRequestWire {
  base_data: null | string;
  prompt: string;
}
export interface AssistantGenerateMessageResponseDataWire {
  data: string;
}
export type AssistantGenerateMessageResponseWire = APIResponse<AssistantGenerateMessageResponseDataWire>;

//////////
// source: auth.go

export interface AuthExchangeRequestWire {
  code: string;
}
export interface AuthExchangeResponseDataWire {
  access_token: string;
  session_token: string;
}
export type AuthExchangeResponseWire = APIResponse<AuthExchangeResponseDataWire>;

//////////
// source: custom_bots.go

export interface CustomBotInfoWire {
  id: string;
  application_id: string;
  user_id: string;
  user_name: string;
  user_discriminator: string;
  user_avatar: null | string;
  token_valid: boolean;
  is_member: boolean;
  has_permissions: boolean;
  handled_first_interaction: boolean;
  invite_url: string;
  interaction_endpoint_url: string;
  gateway_status: string;
  gateway_activity_type: null | number;
  gateway_activity_name: null | string;
  gateway_activity_state: null | string;
  gateway_activity_url: null | string;
}
export interface CustomBotConfigureRequestWire {
  token: string;
}
export type CustomBotConfigureResponseWire = APIResponse<CustomBotInfoWire>;
export interface CustomBotPresenceWire {
  gateway_status: string;
  gateway_activity_type?: number /* int */;
  gateway_activity_name?: string;
  gateway_activity_state?: string;
  gateway_activity_url?: string;
}
export type CustomBotUpdatePresenceRequestWire = CustomBotPresenceWire;
export type CustomBotUpdatePresenceResponseWire = APIResponse<CustomBotPresenceWire>;
export type CustomBotGetResponseWire = APIResponse<CustomBotInfoWire>;
export interface CustomBotDisableResponseDataWire {
}
export type CustomBotDisableResponseWire = APIResponse<CustomBotDisableResponseDataWire>;
export interface CustomCommandWire {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  parameters: CustomCommandParameterWire[];
  actions: Record<string, any> | null;
  created_at: string /* RFC3339 */;
  updated_at: string /* RFC3339 */;
  deployed_at: null | string /* RFC3339 */;
}
export interface CustomCommandParameterWire {
  id: number /* int */;
  name: string;
  description: string;
  type: number /* int */;
}
export type CustomCommandsListResponseWire = APIResponse<CustomCommandWire[]>;
export type CustomCommandGetResponseWire = APIResponse<CustomCommandWire>;
export interface CustomCommandCreateRequestWire {
  name: string;
  description: string;
  parameters: CustomCommandParameterWire[];
  actions: Record<string, any> | null;
}
export type CustomCommandCreateResponseWire = APIResponse<CustomCommandWire>;
export interface CustomCommandUpdateRequestWire {
  name: string;
  description: string;
  enabled: boolean;
  parameters: CustomCommandParameterWire[];
  actions: Record<string, any> | null;
}
export type CustomCommandUpdateResponseWire = APIResponse<CustomCommandWire>;
export type CustomCommandDeleteResponseWire = APIResponse<{
  }>;
export type CustomCommandsDeployResponseWire = APIResponse<{
  }>;

//////////
// source: guild.go

export interface GuildWire {
  id: string;
  name: string;
  icon: null | string;
  has_channel_with_user_access: boolean;
  has_channel_with_bot_access: boolean;
}
export type ListGuildsResponseWire = APIResponse<GuildWire[]>;
export type GetGuildResponseWire = APIResponse<GuildWire>;
export interface GuildChannelWire {
  id: string;
  name: string;
  position: number /* int */;
  parent_id: null | string;
  type: number /* int */;
  user_access: boolean;
  user_permissions: string;
  bot_access: boolean;
  bot_permissions: string;
}
export type ListChannelsResponseWire = APIResponse<GuildChannelWire[]>;
export interface GuildRoleWire {
  id: string;
  name: string;
  managed: boolean;
  color: number /* int */;
  position: number /* int */;
}
export type ListRolesResponseWire = APIResponse<GuildRoleWire[]>;
export interface GuildEmojiWire {
  id: string;
  name: string;
  available: boolean;
  animated: boolean;
  managed: boolean;
}
export type ListEmojisResponseWire = APIResponse<GuildEmojiWire[]>;
export interface GuildStickerWire {
  id: string;
  name: string;
  description: string;
  available: boolean;
  formant_type: number /* int */;
}
export type ListStickersResponseWire = APIResponse<GuildStickerWire[]>;
export interface GuildBrandingWire {
  default_username: null | string;
  default_avatar_url: null | string;
}
export type GetGuildBrandingResponseWire = APIResponse<GuildBrandingWire>;

//////////
// source: images.go

export interface ImageWire {
  id: string;
  user_id: string;
  guild_id: null | string;
  file_name: string;
  file_size: number /* int32 */;
  cdn_url: string;
}
export type UploadImageResponseWire = APIResponse<ImageWire>;
export type GetImageResponseWire = APIResponse<ImageWire>;

//////////
// source: message.go

export interface SavedMessageWire {
  id: string;
  owner_id: string;
  guild_id: null | string;
  updated_at: string /* RFC3339 */;
  name: string;
  description: null | string;
  data: Record<string, any> | null;
}
export type SavedMessageListResponseWire = APIResponse<SavedMessageWire[]>;
export type SavedMessageGetResponseWire = APIResponse<SavedMessageWire>;
export interface SavedMessageCreateRequestWire {
  name: string;
  description: null | string;
  data: Record<string, any> | null;
}
export type SavedMessageCreateResponseWire = APIResponse<SavedMessageWire>;
export interface SavedMessageUpdateRequestWire {
  name: string;
  description: null | string;
  data: Record<string, any> | null;
}
export type SavedMessageUpdateResponseWire = APIResponse<SavedMessageWire>;
export type SavedMessageDeleteResponseWire = APIResponse<{
  }>;
export type SavedMessagesImportResponseWire = APIResponse<SavedMessageWire[]>;
export interface SavedMessagesImportRequestWire {
  messages: SavedMessageImportDataWire[];
}
export interface SavedMessageImportDataWire {
  name: string;
  description: null | string;
  data: Record<string, any> | null;
}
export interface MessageSendToWebhookRequestWire {
  webhook_type: string;
  webhook_id: string;
  webhook_token: string;
  thread_id: null | string;
  message_id: null | string;
  data: Record<string, any> | null;
  attachments: (MessageAttachmentWire | undefined)[];
}
export interface MessageSendToChannelRequestWire {
  guild_id: string;
  channel_id: string;
  thread_name: null | string;
  message_id: null | string;
  data: Record<string, any> | null;
  attachments: (MessageAttachmentWire | undefined)[];
}
export interface MessageAttachmentWire {
  name: string;
  description: null | string;
  data_url: string;
  size: number /* int */;
}
export interface MessageSendResponseDataWire {
  message_id: string;
  channel_id: string;
}
export type MessageSendResponseWire = APIResponse<MessageSendResponseDataWire>;
export interface MessageRestoreFromWebhookRequestWire {
  webhook_id: string;
  webhook_token: string;
  thread_id: null | string;
  message_id: string;
}
export interface MessageRestoreFromChannelRequestWire {
  guild_id: string;
  channel_id: string;
  message_id: string;
}
export interface MessageRestoreResponseDataWire {
  data: Record<string, any> | null;
  attachments: (MessageAttachmentWire | undefined)[];
}
export type MessageRestoreResponseWire = APIResponse<MessageRestoreResponseDataWire>;

//////////
// source: premium.go

export interface GetPremiumPlanFeaturesResponseDataWire {
  max_saved_messages: number /* int */;
  max_actions_per_component: number /* int */;
  advanced_action_types: boolean;
  ai_assistant: boolean;
  custom_bot: boolean;
  max_custom_commands: number /* int */;
  is_premium: boolean;
  max_image_upload_size: number /* int */;
  max_scheduled_messages: number /* int */;
  periodic_scheduled_messages: boolean;
}
export type GetPremiumPlanFeaturesResponseWire = APIResponse<GetPremiumPlanFeaturesResponseDataWire>;
export interface PremiumEntitlementWire {
  id: string;
  sku_id: string;
  user_id: null | string;
  guild_id: null | string;
  updated_at: string /* RFC3339 */;
  deleted: boolean;
  starts_at: null | string /* RFC3339 */;
  ends_at: null | string /* RFC3339 */;
}
export interface ListPremiumEntitlementsResponseDataWire {
  entitlements: PremiumEntitlementWire[];
}
export type ListPremiumEntitlementsResponseWire = APIResponse<ListPremiumEntitlementsResponseDataWire>;

//////////
// source: scheduled_message.go

export interface ScheduledMessageWire {
  id: string;
  creator_id: string;
  guild_id: string;
  channel_id: string;
  message_id: null | string;
  saved_message_id: string;
  name: string;
  description: null | string;
  cron_expression: null | string;
  start_at: string /* RFC3339 */;
  end_at: null | string /* RFC3339 */;
  next_at: string /* RFC3339 */;
  only_once: boolean;
  enabled: boolean;
  created_at: string /* RFC3339 */;
  updated_at: string /* RFC3339 */;
}
export type ScheduledMessageListResponseWire = APIResponse<ScheduledMessageWire[]>;
export type ScheduledMessageGetResponseWire = APIResponse<ScheduledMessageWire>;
export interface ScheduledMessageCreateRequestWire {
  channel_id: string;
  message_id: null | string;
  saved_message_id: string;
  name: string;
  description: null | string;
  cron_expression: null | string;
  start_at: string /* RFC3339 */;
  end_at: null | string /* RFC3339 */;
  only_once: boolean;
  enabled: boolean;
}
export type ScheduledMessageCreateResponseWire = APIResponse<ScheduledMessageWire>;
export interface ScheduledMessageUpdateRequestWire {
  channel_id: string;
  message_id: null | string;
  saved_message_id: string;
  name: string;
  description: null | string;
  cron_expression: null | string;
  start_at: string /* RFC3339 */;
  end_at: null | string /* RFC3339 */;
  only_once: boolean;
  enabled: boolean;
}
export type ScheduledMessageUpdateResponseWire = APIResponse<ScheduledMessageWire>;
export type ScheduledMessageDeleteResponseWire = APIResponse<{
  }>;

//////////
// source: shared_message.go

export interface SharedMessageWire {
  id: string;
  created_at: string /* RFC3339 */;
  expires_at: string /* RFC3339 */;
  data: Record<string, any> | null;
  url: string;
}
export interface SharedMessageCreateRequestWire {
  data: Record<string, any> | null;
}
export type SharedMessageCreateResponseWire = APIResponse<SharedMessageWire>;
export type SharedMessageGetResponseWire = APIResponse<SharedMessageWire>;

//////////
// source: user.go

export interface UserWire {
  id: string;
  name: string;
  discriminator: string;
  avatar: null | string;
  is_tester: boolean;
}
export type UserResponseWire = APIResponse<UserWire>;
