import { LanguageKeys } from "#lib/i18n/languageKeys";
import { GuildLogEmbed } from "#lib/structures";
import { Events } from "#lib/types/Enums";
import { getAuditLogExecutor } from "#utils/util";
import { ApplyOptions } from "@sapphire/decorators";
import { Listener, ListenerOptions } from "@sapphire/framework";
import { inlineCodeBlock, isNullish } from "@sapphire/utilities";
import { Guild, Sticker, User } from "discord.js";
import { TFunction } from "i18next";

@ApplyOptions<ListenerOptions>({ event: Events.StickerDelete })
export class UserListener extends Listener {
	public async run(sticker: Sticker) {
		if (isNullish(sticker.id)) return;

		const auditLogExecutor = await getAuditLogExecutor('STICKER_DELETE', sticker.guild as Guild);
		const guildSettings = await this.container.client.prisma.guildSettings.findFirst({ where: { guildID: sticker.guild?.id } })
		const T = this.container.i18n.getT(guildSettings?.language as string)

		if (guildSettings?.logChannel && guildSettings.stickerDeleteLog) {
			this.container.client.emit(Events.GuildMessageLog, sticker.guild, guildSettings?.logChannel, Events.StickerDelete, this.serverLog(sticker, auditLogExecutor, T));
		}
	}

	private serverLog(sticker: Sticker, executor: User | null | undefined, t: TFunction) {
		const embed = new GuildLogEmbed()
			.setAuthor(sticker.name, sticker.format === 'APNG' || sticker.format === 'PNG' ? sticker.url : undefined)
			.setDescription(t(LanguageKeys.Miscellaneous.DisplayID, { id: sticker.id }))
			.addField(t(LanguageKeys.Events.Guilds.Logs.RelatedEmoji), sticker.tags?.map(tag => `:${tag}:`).toString() as string)
			.setFooter(t(LanguageKeys.Events.Guilds.Logs.StickerDeleted, { by: executor ? t(LanguageKeys.Miscellaneous.By, { user: executor?.tag }) : undefined }), executor?.displayAvatarURL() ?? undefined)
			.setType(Events.StickerDelete);

		// Set image field to sticker URL if it's an image file
		if (sticker.format === 'APNG' || sticker.format === 'PNG') embed.setImage(sticker.url);

		// Set optional description field
		if (sticker.description) {
			embed.addField(t(LanguageKeys.Miscellaneous.Description), inlineCodeBlock(sticker.description));
		}

		return embed;
	}
}
