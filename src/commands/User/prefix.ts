import { Command, CommandOptions } from '@sapphire/framework';
import { Message } from 'discord.js';
import { ApplyOptions } from '@sapphire/decorators';
import { FirestoreCollections } from '@lib/types/Types';

@ApplyOptions<CommandOptions>({
	description: 'commands/user:prefix.description'
})
export class RTByteCommand extends Command {

	public async run(msg: Message) {
		const prefix = await this.client.firestore.get(FirestoreCollections.Guilds, msg.guild!.id).then(data => data.prefix);

		if (prefix.length > 1) return msg.channel.send(await msg.fetchLanguageKey('commands/user:prefix.responses.multiple', { prefixes: prefix.map((prfx: any) => prfx).join('`, `') }));

		return msg.channel.send(await msg.fetchLanguageKey('commands/user:prefix.responses.one', { prefix }));
	}

}
