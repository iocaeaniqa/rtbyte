import { LanguageKeys } from '#lib/i18n/languageKeys';
import { RTByteCommand } from '#lib/structures';
import { ApplyOptions } from '@sapphire/decorators';
import { reply } from '@sapphire/plugin-editable-commands';
import type { Message } from 'discord.js';

@ApplyOptions<RTByteCommand.Options>({
	aliases: ['coin'],
	description: LanguageKeys.Commands.User.CoinflipDescription
})
export class UserCommand extends RTByteCommand {
	public async messageRun(message: Message, args: RTByteCommand.Args) {
		const chance = Math.random() > 0.5;

		return reply(message, chance ? args.t(LanguageKeys.Commands.User.CoinflipHeads) : args.t(LanguageKeys.Commands.User.CoinflipTails))
	}
}
