const { Language, util } = require('klasa');
const moment = require('moment');

moment.relativeTimeThreshold('s', 60);
moment.relativeTimeThreshold('ss', 0);
moment.relativeTimeThreshold('m', 60);
moment.relativeTimeThreshold('h', 24);
moment.relativeTimeThreshold('d', 31);
moment.relativeTimeThreshold('M', 12);

module.exports = class extends Language {

	constructor(...args) {
		super(...args);
		this.presenceTypes = {
			PLAYING: 'Playing',
			LISTENING: 'Listening to',
			WATCHING: 'Watching'
		};
		this.defaultMsgNotifs = {
			ALL: 'All messages',
			MENTIONS: 'Only @mentions'
		};
		this.verificationLevels = [
			'None',
			'Low',
			'Medium',
			'(╯°□°）╯︵ ┻━┻',
			'┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'
		];
		this.filterLevels = [
			'Off',
			'On for unroled users',
			'On for everyone'
		];
		this.nitroTierTitles = [
			'No levels achieved yet',
			'Level 1 (2 boosts)',
			'Level 2 (10 boosts)',
			'Level 3 (50 boosts)'
		];
		this.nitroTierDetails = [
			'No levels achieved yet',
			'• +50 server emoji slots (for a total of 100)\n• 128 Kbps audio quality\n• Animated server icon\n• Custom server invite splash background',
			'• +50 server emoji slots (for a total of 150)\n• 256 Kbps audio quality\n• Server banner\n• 50 MB upload limit for all members',
			'• +100 server emoji slots (for a total of 250)\n• 384 Kbps audio quality\n• Vanity URL for the server\n• 100 MB upload limit for all members'
		];

		this.language = {
			// Default langs
			DEFAULT: (key) => `${key} has not been localized for \`en-US\` yet.`,
			DEFAULT_LANGUAGE: 'Default language',
			PREFIX_REMINDER: (prefix = `@${this.client.user.tag}`) => `The prefix${Array.isArray(prefix) ?
				`es for this guild are: ${prefix.map(pre => `\`${pre}\``).join(', ')}` :
				` in this guild is set to: \`${prefix}\``
			}`,


			// General langs
			ID: 'ID',
			NAME: 'Name',
			OWNER: 'Owner',
			MEMBERS: 'Members',
			CHANNELS: 'Channels',
			EMOJIS: 'Emojis',
			ROLES: 'Roles',
			JOIN_POS: 'Join position',
			REGISTERED: 'Registered',
			JOINED: 'Joined',
			REASON: 'Reason',
			PREVNAME: 'Previous name',
			NAME_CHANGED: 'Name changed',
			WARNING_ISSUED: 'Warning issued',
			CLICK_TO_VIEW: 'Click to view',
			OFF: 'Off',
			ONLINE: 'Online',
			IDLE: 'Idle',
			DND: 'Do Not Disturb',
			OFFLINE: 'Offline',
			UNLIMITED: 'Unlimited',
			USERS: 'Users',
			USERS_SMALL: 'users',
			MESSAGE: 'Message',


			// Setting gateway langs
			SETTING_GATEWAY_EXPECTS_GUILD: 'The parameter <Guild> expects either a Guild or a Guild Object.',
			SETTING_GATEWAY_VALUE_FOR_KEY_NOEXT: (data, key) => `The value ${data} for the key ${key} does not exist.`,
			SETTING_GATEWAY_VALUE_FOR_KEY_ALREXT: (data, key) => `The value ${data} for the key ${key} already exists.`,
			SETTING_GATEWAY_SPECIFY_VALUE: 'You must specify the value to add or filter.',
			SETTING_GATEWAY_KEY_NOT_ARRAY: (key) => `The key ${key} is not an array.`,
			SETTING_GATEWAY_KEY_NOEXT: (key) => `The key ${key} does not exist in the current data schema.`,
			SETTING_GATEWAY_INVALID_TYPE: 'The type parameter must be either add or remove.',
			SETTING_GATEWAY_INVALID_FILTERED_VALUE: (piece, value) => `${piece.key} doesn't accept the value: ${value}`,


			// Resolver langs
			RESOLVER_MULTI_TOO_FEW: (name, min = 1) => `Provided too few ${name}s. At least ${min} ${min === 1 ? 'is' : 'are'} required.`,
			RESOLVER_INVALID_BOOL: (name) => `${name} must be true or false.`,
			RESOLVER_INVALID_CHANNEL: (name) => `${name} must be a channel tag or valid channel ID.`,
			RESOLVER_INVALID_CUSTOM: (name, type) => `${name} must be a valid ${type}.`,
			RESOLVER_INVALID_DATE: (name) => `${name} must be a valid date.`,
			RESOLVER_INVALID_DURATION: (name) => `${name} must be a valid duration string.`,
			RESOLVER_INVALID_EMOJI: (name) => `${name} must be a custom emoji tag or valid emoji ID.`,
			RESOLVER_INVALID_FLOAT: (name) => `${name} must be a valid number.`,
			RESOLVER_INVALID_GUILD: (name) => `${name} must be a valid guild ID.`,
			RESOLVER_INVALID_INT: (name) => `${name} must be an integer.`,
			RESOLVER_INVALID_LITERAL: (name) => `Your option did not match the only possibility: ${name}`,
			RESOLVER_INVALID_MEMBER: (name) => `${name} must be a mention or valid user ID.`,
			RESOLVER_INVALID_MESSAGE: (name) => `${name} must be a valid message ID.`,
			RESOLVER_INVALID_PIECE: (name, piece) => `${name} must be a valid ${piece} name.`,
			RESOLVER_INVALID_REGEX_MATCH: (name, pattern) => `${name} must follow this regex pattern \`${pattern}\`.`,
			RESOLVER_INVALID_ROLE: (name) => `${name} must be a role mention or valid role ID.`,
			RESOLVER_INVALID_STRING: (name) => `${name} must be a valid string.`,
			RESOLVER_INVALID_TIME: (name) => `${name} must be a valid duration or date string.`,
			RESOLVER_INVALID_URL: (name) => `${name} must be a valid URL.`,
			RESOLVER_INVALID_USER: (name) => `${name} must be a mention or valid user ID.`,
			RESOLVER_STRING_SUFFIX: ' characters',
			RESOLVER_MINMAX_EXACTLY: (name, min, suffix) => `${name} must be exactly ${min}${suffix}.`,
			RESOLVER_MINMAX_BOTH: (name, min, max, suffix) => `${name} must be between ${min} and ${max}${suffix}.`,
			RESOLVER_MINMAX_MIN: (name, min, suffix) => `${name} must be greater than ${min}${suffix}.`,
			RESOLVER_MINMAX_MAX: (name, max, suffix) => `${name} must be less than ${max}${suffix}.`,


			// Reaction handler langs
			REACTIONHANDLER_PROMPT: 'Which page would you like to jump to?',


			// Command message langs
			COMMANDMESSAGE_MISSING: 'Missing one or more required arguments after end of input.',
			COMMANDMESSAGE_MISSING_REQUIRED: (name) => `${name} is a required argument.`,
			COMMANDMESSAGE_MISSING_OPTIONALS: (possibles) => `Missing a required option: (${possibles}).`,
			COMMANDMESSAGE_NOMATCH: (possibles) => `Your option didn't match any of the possibilities: (${possibles}).`,


			// Monitor langs
			// eslint-disable-next-line max-len
			MONITOR_COMMAND_HANDLER_REPROMPT: (tag, error, time, abortOptions) => `${tag} | **${error}** | You have **${time}** seconds to respond to this prompt with a valid argument. Type **${abortOptions.join('**, **')}** to abort this prompt.`,
			// eslint-disable-next-line max-len
			MONITOR_COMMAND_HANDLER_REPEATING_REPROMPT: (tag, name, time, cancelOptions) => `${tag} | **${name}** is a repeating argument | You have **${time}** seconds to respond to this prompt with additional valid arguments. Type **${cancelOptions.join('**, **')}** to cancel this prompt.`,
			MONITOR_COMMAND_HANDLER_ABORTED: 'Aborted',
			MONITOR_COMMAND_HANDLER_POSSIBILITIES: ['abort', 'stop'],
			MONITOR_COMMAND_HANDLER_REPEATING_POSSIBLITIES: ['cancel'],
			// eslint-disable-next-line max-len
			MONITOR_MENTIONSPAM_APOLOGY: (guild) => `Hi!\n\nSomeone just executed a mention spam selfbot command or manually mentioned too many people in this channel. The user has been banned. The ${guild} mod team apologizes for the inconvenience.`,


			// Inhibitor langs
			INHIBITOR_COOLDOWN: (remaining) => `You have just used this command. You can use this command again in ${remaining} second${remaining === 1 ? '' : 's'}.`,
			INHIBITOR_DISABLED_GUILD: 'This command has been disabled by an administrator in this guild.',
			INHIBITOR_DISABLED_GLOBAL: 'This command has been globally disabled by a bot owner.',
			INHIBITOR_MISSING_BOT_PERMS: (missing) => `Insufficient permissions, missing: **${missing}**`,
			INHIBITOR_NSFW: 'You can only use NSFW commands in NSFW channels.',
			INHIBITOR_PERMISSIONS: 'You do not have permission to use this command.',
			INHIBITOR_REQUIRED_SETTINGS: (settings) => `The guild is missing the **${settings.join(', ')}** guild setting${settings.length !== 1 ? 's' : ''} and thus the command cannot run.`,
			INHIBITOR_RUNIN: (types) => `This command is only available in ${types} channels.`,
			INHIBITOR_RUNIN_NONE: (name) => `The ${name} command is not configured to run in any channel.`,


			// Command langs
			COMMAND_REQUESTED_BY: (msg) => `Requested by ${msg.author.tag}`,
			COMMAND_BLACKLIST_DESCRIPTION: 'Blacklists or un-blacklists users and guilds from the bot.',
			COMMAND_BLACKLIST_SUCCESS: (usersAdded, usersRemoved, guildsAdded, guildsRemoved) => [
				usersAdded.length ? `**Users added**\n${util.codeBlock('', usersAdded.join(', '))}` : '',
				usersRemoved.length ? `**Users removed**\n${util.codeBlock('', usersRemoved.join(', '))}` : '',
				guildsAdded.length ? `**Guilds added**\n${util.codeBlock('', guildsAdded.join(', '))}` : '',
				guildsRemoved.length ? `**Guilds removed**\n${util.codeBlock('', guildsRemoved.join(', '))}` : ''
			].filter(val => val !== '').join('\n'),
			COMMAND_EVAL_DESCRIPTION: 'Evaluates arbitrary JS. Reserved for bot owners.',
			COMMAND_EVAL_EXTENDEDHELP: [
				'The eval command evaluates code as-in, any error thrown from it will be handled.',
				'It also uses the flags feature. Write --silent, --depth=number or --async to customize the output.',
				'The --silent flag will make it output nothing.',
				"The --depth flag accepts a number, for example, --depth=2, to customize util.inspect's depth.",
				'The --async flag will wrap the code into an async function where you can enjoy the use of await, however, if you want to return something, you will need the return keyword.',
				'The --showHidden flag will enable the showHidden option in util.inspect.',
				'If the output is too large, it\'ll send the output as a file, or in the console if the bot does not have the ATTACH_FILES permission.'
			].join('\n'),
			COMMAND_EVAL_ERROR: (time, output, type) => `**Error**:${output}\n**Type**:${type}\n${time}`,
			COMMAND_EVAL_OUTPUT: (time, output, type) => `**Output**:${output}\n**Type**:${type}\n${time}`,
			COMMAND_EVAL_SENDFILE: (time, type) => `Output was too long... sent the result as a file.\n**Type**:${type}\n${time}`,
			COMMAND_EVAL_SENDCONSOLE: (time, type) => `Output was too long... sent the result to console.\n**Type**:${type}\n${time}`,
			COMMAND_UNLOAD: (type, name) => `Unloaded the ${name} ${type}.`,
			COMMAND_UNLOAD_DESCRIPTION: 'Unloads a specified Klasa piece.',
			COMMAND_UNLOAD_WARN: 'You probably don\'t want to unload that, since you wouldn\'t be able to run any command to enable it again.',
			COMMAND_TRANSFER_ERROR: 'That file has been transfered already or never existed.',
			COMMAND_TRANSFER_SUCCESS: (type, name) => `Successfully transferred the ${name} ${type}.`,
			COMMAND_TRANSFER_FAILED: (type, name) => `Transfer of the ${name} ${type} to the client has failed. Please check your console.`,
			COMMAND_TRANSFER_DESCRIPTION: 'Transfers a core piece to its respective folder.',
			COMMAND_RELOAD: (type, name, time) => `Reloaded the ${name} ${type}. \`${time}\``,
			COMMAND_RELOAD_FAILED: (type, name) => `Failed to reload the ${name} ${type}. Please check your console.`,
			COMMAND_RELOAD_ALL: (type, time) => `Reloaded all ${type}. \`${time}\``,
			COMMAND_RELOAD_EVERYTHING: (time) => `Reloaded everything. \`${time}\``,
			COMMAND_RELOAD_DESCRIPTION: 'Reloads a klasa piece, or all pieces of a Klasa store.',
			COMMAND_REBOOT: 'Rebooting...',
			COMMAND_REBOOT_DESCRIPTION: 'Reboots the bot.',
			COMMAND_LOAD: (time, type, name) => `Successfully loaded the ${name} ${type}. \`${time}\``,
			COMMAND_LOAD_FAIL: 'The file does not exist, or an error occurred while loading your file. Please check your console.',
			COMMAND_LOAD_ERROR: (type, name, error) => `Failed to load the ${name} ${type}. Reason:${util.codeBlock('js', error)}`,
			COMMAND_LOAD_DESCRIPTION: 'Load a piece from your bot.',
			COMMAND_PING: 'Ping?',
			COMMAND_PING_DESCRIPTION: 'Runs a connection test to Discord.',
			COMMAND_PINGPONG: (diff, ping) => `Pong! \`${ping}ms\``,
			COMMAND_INVITE: () => [
				`To add ${this.client.user.username} to your Discord guild:`,
				`<${this.client.invite}>`,
				util.codeBlock('', [
					'The above link is generated requesting the minimum permissions required to use every command currently.',
					'We know not all permissions are right for every guild, so don\'t be afraid to uncheck any of the boxes.',
					'If you try to use a command that requires more permissions than the bot is granted, it will let you know.'
				].join(' ')),
				`The ${this.client.user.username} support server can be found using the link below.`,
				'https://discord.gg/eRauWP4/'
			],
			COMMAND_INVITE_DESCRIPTION: () => `Displays the link to invite ${this.client.user.username} to your guild.`,
			COMMAND_INFO_EMBEDTITLE: () => `${this.client.user.username} Information`,
			// eslint-disable-next-line max-len
			COMMAND_INFO_EMBEDDESC: () => `${this.client.user.username} is an open-source modular multipurpose Discord bot built on the incredible [Klasa](https://klasa.js.org/) framework for [discord.js](https://discord.js.org/).\n\nWe aim to provide the most consistent and easy-to-use Discord mod bot solution available, with our key focus areas being modularity, performance, consistency, and choice.`,
			COMMAND_INFO_OURTEAM: 'Our team',
			// eslint-disable-next-line max-len
			COMMAND_INFO_TEAMLIST: '• [Rasmus Gerdin](https://github.com/rasmusgerdin/)\n• [Michael Cumbers](https://github.com/mcumbers/)\n• [Justin Shull](https://github.com/JShull97/)\n• [Killian Higgins](https://github.com/Uzui2012/)',
			COMMAND_INFO_LINKS: 'Links',
			COMMAND_INFO_LINKLIST: '• [GitHub](https://github.com/RTByte/RTByte)\n• [Discord](https://discord.gg/eRauWP4/)\n• [Ko-fi](https://ko-fi.com/rtbyte)',
			COMMAND_INFO_DESCRIPTION: 'Provides some information about this bot.',
			COMMAND_HELP_DESCRIPTION: 'Display help for a command.',
			COMMAND_HELP_EMBEDTITLE: () => `${this.client.user.username} Help`,
			COMMAND_HELP_LOADING: 'Loading commands...',
			COMMAND_HELP_NO_EXTENDED: 'No extended help available.',
			COMMAND_HELP_DM: 'The list of commands you have access to has been sent to your DMs.',
			COMMAND_HELP_NODM: 'You have DMs disabled, I couldn\'t send you the commands in DMs.',
			COMMAND_HELP_USAGE: 'Usage',
			COMMAND_HELP_EXTENDED: 'Extended help',
			COMMAND_ENABLE: (type, name) => `Successfully enabled the ${name} ${type}.`,
			COMMAND_ENABLE_DESCRIPTION: 'Re-enables or temporarily enables a command/inhibitor/monitor/finalizer. Default state restored on reboot.',
			COMMAND_DISABLE: (type, name) => `Successfully disabled the ${name} ${type}.`,
			COMMAND_DISABLE_DESCRIPTION: 'Re-disables or temporarily disables a command/inhibitor/monitor/finalizer/event. Default state restored on reboot.',
			COMMAND_DISABLE_WARN: 'You probably don\'t want to disable that, since you wouldn\'t be able to run any command to enable it again.',
			COMMAND_CONF_NOKEY: 'You must provide a key.',
			COMMAND_CONF_NOVALUE: 'You must provide a value.',
			COMMAND_CONF_GUARDED: (name) => `${util.toTitleCase(name)} may not be disabled.`,
			COMMAND_CONF_UPDATED: (key, response) => `Successfully updated the key **${key}**: \`${response}\``,
			COMMAND_CONF_KEY_NOT_ARRAY: 'This key is not array type. Use the action \'reset\' instead.',
			COMMAND_CONF_GET_NOEXT: (key) => `The key **${key}** does not seem to exist.`,
			COMMAND_CONF_GET: (key, value) => `The value for the key **${key}** is: \`${value}\``,
			COMMAND_CONF_RESET: (key, response) => `The key **${key}** has been reset to: \`${response}\``,
			COMMAND_CONF_NOCHANGE: (key) => `The value for **${key}** was already that value.`,
			COMMAND_CONF_SERVER_DESCRIPTION: 'Define per-guild settings.',
			COMMAND_CONF_SERVER: (key, list) => `**Guild Settings${key}**\n${list}`,
			COMMAND_CONF_USER_DESCRIPTION: 'Define per-user settings.',
			COMMAND_CONF_USER: (key, list) => `**User Settings${key}**\n${list}`,
			COMMAND_STATS_DESCRIPTION: 'Provides bot owners with statistics.',
			COMMAND_STATS_EMBEDTITLE: () => `${this.client.user.username} Stats`,
			COMMAND_STATS_MEMUSAGE: 'Memory usage',
			COMMAND_STATS_UPTIME: 'Uptime',
			COMMAND_STATS_CONNECTIONS: 'Connections',
			// eslint-disable-next-line max-len
			COMMAND_STATS_CONNECTIONINFO: `Operating on **${this.client.guilds.size}** servers,\nWatching **${this.client.channels.size}** channels,\nServing **${this.client.users.size}** users`,
			COMMAND_STATS_LIBRARIES: 'Libraries',
			COMMAND_STATS_HOSTINFO: 'Host information',
			COMMAND_STATS_HOSTUPTIME: 'Host uptime',
			COMMAND_MODERATION_SILENT: 'Silent action',
			COMMAND_MODERATION_NOREASON: 'Please provide a reason.',
			COMMAND_BAN_DESCRIPTION: 'Bans a mentioned user and logs the reason.',
			COMMAND_BAN_NOPARAM_MEMBER: 'Please mention the user you would like to ban.',
			COMMAND_BAN_NO_BAN_SELF: 'You cannot ban yourself.',
			COMMAND_BAN_NO_BAN_CLIENT: 'I cannot ban myself.',
			COMMAND_BAN_NO_PERMS: (user) => `You don't have permission to ban ${user}.`,
			COMMAND_KICK_DESCRIPTION: 'Kicks a mentioned user and logs the reason.',
			COMMAND_KICK_NOPARAM_MEMBER: 'Please mention the user you would like to kick.',
			COMMAND_KICK_NO_KICK_SELF: 'You cannot kick yourself.',
			COMMAND_KICK_NO_KICK_CLIENT: 'I cannot kick myself.',
			COMMAND_KICK_NO_PERMS: (user) => `You don't have permission to kick ${user}.`,
			COMMAND_MODHISTORY_DESCRIPTION: 'Lists moderation actions taken against a user in the past. Refers to a specific case if a case ID is provided.',
			COMMAND_MODHISTORY_INVALID_CASEID: (caseID) => `\`${caseID}\` is not a valid case ID.`,
			COMMAND_MODHISTORY_NOMODHISTORY: (target) => `${target} has no recorded moderation history.`,
			COMMAND_MODHISTORY_LOADING: 'Loading moderation history...',
			COMMAND_MUTE_DESCRIPTION: 'Mutes a mentioned user and logs the reason.',
			COMMAND_MUTE_NOPARAM_MEMBER: 'Please mention the user you would like to mute.',
			COMMAND_MUTE_NO_MUTE_SELF: 'You cannot mute yourself.',
			COMMAND_MUTE_NO_MUTE_CLIENT: 'I cannot mute myself.',
			COMMAND_MUTE_NO_PERMS: (user) => `You don't have permission to mute ${user}.`,
			COMMAND_PURGE_DESCRIPTION: 'Removes X amount of messages, optionally sent by Y user. Append the word \'all\' to ignore the role hierarchy.',
			COMMAND_PURGE_NOPARAM: 'Please provide the amount of messages to delete.',
			COMMAND_PURGE_NO_PERMS: (member) => `You don't have permission to purge messages from ${member}.`,
			COMMAND_SENDMSG_DESCRIPTION: 'Sends a message to the specified channel or user as the bot.',
			COMMAND_SENDMSG_NOPARAM: 'Please provide a message to send to your mentioned channel or user.',
			COMMAND_SERVERINFO_DESCRIPTION: 'Displays server information.',
			COMMAND_SERVERINFO_REGION: 'Region',
			COMMAND_SERVERINFO_MEMBERCOUNT: (guild) => `${guild.memberCount} (${guild.members.filter(member => member.user.bot).size} bots)`,
			COMMAND_SERVERINFO_VLEVEL: 'Verification level',
			COMMAND_SERVERINFO_VLEVEL_LEVELS: (guild) => `${this.verificationLevels[guild.verificationLevel]}`,
			COMMAND_SERVERINFO_ECFILTER: 'Explicit content filter',
			COMMAND_SERVERINFO_ECFILTER_LEVELS: (guild) => `${this.filterLevels[guild.explicitContentFilter]}`,
			COMMAND_SERVERINFO_CREATED: 'Created',
			COMMAND_SERVERINFO_NITROTIER: 'Nitro boost level',
			COMMAND_SERVERINFO_NITROTIER_LEVELS: (guild) => `${this.nitroTierTitles[guild.premiumTier]}`,
			COMMAND_SERVERINFO_NITROAMOUNT: 'Nitro boosters',
			COMMAND_SOFTBAN_DESCRIPTION: 'Softbans a mentioned user and logs the reason.',
			COMMAND_SOFTBAN_NOPARAM_MEMBER: 'Please mention the user you would like to softban.',
			COMMAND_SOFTBAN_NO_SOFTBAN_SELF: 'You cannot softban yourself.',
			COMMAND_SOFTBAN_NO_SOFTBAN_CLIENT: 'I cannot softban myself.',
			COMMAND_SOFTBAN_SOFTBAN_RELEASED: 'Softban released.',
			COMMAND_SOFTBAN_NO_PERMS: (user) => `You don't have permission to softban ${user}.`,
			COMMAND_UNMUTE_DESCRIPTION: 'Unmutes a mentioned user.',
			COMMAND_UNMUTE_NOPARAM: 'Please mention the user you would like to unmute.',
			COMMAND_UNMUTE_NO_UNMUTE_SELF: 'You cannot unmute yourself.',
			COMMAND_UNMUTE_NO_UNMUTE_CLIENT: 'I cannot unmute myself.',
			COMMAND_UNMUTE_NO_PERMS: (user) => `You don't have permission to unmute ${user}.`,
			COMMAND_USERINFO_DESCRIPTION: 'Get information on a mentioned user.',
			COMMAND_USERINFO_STATUS: 'Status',
			COMMAND_USERINFO_ACTIVITY: (user) => `${this.presenceTypes[user.presence.activity.type]}`,
			COMMAND_USERINFO_NITROBOOST: 'Nitro boosting since',
			COMMAND_VCBAN_DESCRIPTION: 'Bans a mentioned user from voice chat and logs the reason.',
			COMMAND_VCBAN_NOPARAM_MEMBER: 'Please mention the user you would like to ban from voice chat.',
			COMMAND_VCBAN_NO_VCBAN_SELF: 'You cannot ban yourself from voice chat.',
			COMMAND_VCBAN_NO_VCBAN_CLIENT: 'I cannot ban myself from voice chat.',
			COMMAND_VCBAN_NO_PERMS: (user) => `You don't have permission to ban ${user} from voice chat.`,
			COMMAND_VCKICK_DESCRIPTION: 'Kicks a mentioned user from voice chat and logs the reason.',
			COMMAND_VCKICK_NOPARAM_MEMBER: 'Please mention the user you would like to kick from voice chat.',
			COMMAND_VCKICK_NO_VCKICK_SELF: 'You cannot kick yourself from voice chat.',
			COMMAND_VCKICK_NO_VCKICK_CLIENT: 'I cannot kick myself from voice chat.',
			COMMAND_VCKICK_NO_PERMS: (user) => `You don't have permission to kick ${user} from voice chat.`,
			COMMAND_VCUNBAN_DESCRIPTION: 'Unbans a mentioned user from voice chat.',
			COMMAND_VCUNBAN_NOPARAM: 'Please mention the user you would like to unban from voice chat.',
			COMMAND_VCUNBAN_NO_VCUNBAN_SELF: 'You cannot unban yourself from voice chat.',
			COMMAND_VCUNBAN_NO_VCUNBAN_CLIENT: 'I cannot unban myself from voice chat.',
			COMMAND_VCUNBAN_NO_PERMS: (user) => `You don't have permission to unban ${user} from voice chat.`,
			COMMAND_WARN_DESCRIPTION: 'Warns a mentioned user and logs the reason.',
			COMMAND_WARN_NOPARAM_MEMBER: 'Please mention the user you would like to warn.',
			COMMAND_WARN_NO_WARN_SELF: 'You cannot warn yourself.',
			COMMAND_WARN_NO_WARN_CLIENT: 'I cannot warn myself.',
			COMMAND_WARN_NO_PERMS: (user) => `You don't have permission to warn ${user}.`,
			COMMAND_8BALL_DESCRIPTION: 'Magic 8-ball, does exactly what the toy does, memes included.',
			COMMAND_8BALL_NOPARAM: '🎱 You didn\'t ask me anything.',
			// eslint-disable-next-line max-len
			COMMAND_8BALL_ANSWERS: ['Maybe.', 'Certainly not.', 'I hope so.', 'Not in your wildest dreams.', 'There is a good chance.', 'Quite likely.', 'I think so.', 'I hope not.', 'I hope so.', 'Never!', 'Ahaha! Really?!?', 'Pfft.', 'Sorry, bucko.', 'Hell, yes.', 'Hell to the no.', 'The future is bleak.', 'The future is uncertain.', 'I would rather not say.', 'Who cares?', 'Possibly.', 'Never, ever, ever.', 'There is a small chance.', 'Yes!', "Doesn't look like anything to me.", "I don't know.", 'Ask someone else.', 'No.', 'Yes.', "I'm being forced to do this, please send help.", 'Your mom told me yes.', "If you're wearing pants, yes.", 'When pigs fly.', 'With whipped cream.', "I'll pretend I never heard that.", "I could tell you but I'd have to permanently ban you.", 'Do you *really* want me to answer that?', 'If it fits.', "That's my fetish!", "I'm sorry, but yes.", "I'm sorry, but no.", 'What?', 'Sorry, what was that?', 'i can be your angle...or yuor devil.', "*dude don't even talk to me rn*", '🙅', '🛑', '🛑 STOP 🛑', '👌', '👍', '👎', '👀', "I wouldn't think so.", 'Awhh naaaah dude', "don't", 'Why would you even think to ask that?', 'What now?', 'What do you mean?', 'Not happening.', 'You betcha.', 'Yes, daddy 😭👋', 'Who are you again?', 'YAAASSSS QUEEEN', 'no u', 'Are you sure you should be asking *me* this?', 'Maybe, if you take me to dinner first.', 'get rekt my duder', "If you tell me I'm pretty, maybe you'll find out ;)", "I'd answer but I'm having a rough day. Nobody asks how I'm doing and its tiresome.", 'Not my job.', 'Nothing really matters, anyone can see.', 'Nothing really matters, to meeeeeeeeee.', 'Yes, no, maybe. I don’t know, can you repeat the question?', 'Does a hat take ten gallons?', "We're all going to hell anyway, so yes.", "We're all going to hell anyway, so no.", "I don't get paid enough for this.", 'Why do you keep asking me?', 'Why would you do that? Stop.', "Address me as master and then I'll answer you.", 'wtf u weirdo', 'wtf, get away from me you freak', 'Ask your parents.', 'ya', "If you promise you'll love me, yes.", "If you promise you'll love me, no.", "As long as you're not a jerk about it.", "Just as long as you're not a dick about it.", 'Whenever, wherever.', 'If you say so.', 'Yes, my dude.', 'No, my dude.', 'Never, ever, ever, ever. Ever.', 'Oh, hold on. I was making brownies.', 'I don\'t give a fuck.', "Fuck you, I don't care."],
			COMMAND_CHOICE_DESCRIPTION: 'Makes a decision based off of the choices given, no matter how many you include.',
			COMMAND_CHOICE_NOPARAM: '🤔 I can\'t choose for you unless you provide me with at least 2 choices.',
			COMMAND_CHOICE_NOTENOUGH: '\n🤔 You only provided me with one choice.',
			COMMAND_COINFLIP_DESCRIPTION: 'Flips a coin. 🙂 for heads, 🙃 for tails.',
			COMMAND_COINFLIP_HEADS: '🙂 heads',
			COMMAND_COINFLIP_TAILS: '🙃 tails',
			COMMAND_JOINDATE_DESCRIPTION: 'Displays your account creation date along with the date you joined the current server you\'re on. Other users can be specified to fetch their account creation and server join dates.', // eslint-disable-line max-len
			COMMAND_QUOTE_DESCRIPTION: 'Quotes a message by ID.',
			// eslint-disable-next-line max-len
			COMMAND_QUOTE_NOPARAM: 'Please specify a message ID for the message you would like to quote.\nMessage IDs can be found by right clicking a message after having turned *Developer Mode* on under **Appearance** in your settings.',
			COMMAND_QUOTE_NO_MESSAGE_FOUND: (messageID, origin) => `Could not find a message with ID of \`${messageID}\` in ${origin}`,
			COMMAND_QUOTE_CHANNEL: (qmsg) => `in #${qmsg.channel.name}`,
			COMMAND_ROLES_DESCRIPTION: 'Series of commands to allow you to join roles by yourself.',
			COMMAND_ROLES_EXTENDED: '**list** - Lists joinable roles and their member counts.\n**add** - Adds a role by its name.\n**remove** - Removes a role by its name.',
			COMMAND_ROLES_NONE_JOINABLE: 'There are no joinable roles on this server.',
			COMMAND_ROLES_NO_ROLE_NAME: 'Please specify a role by its name.',
			COMMAND_ROLES_NO_MODERATE: 'You don\'t have permission to change the roles of other users.',
			COMMAND_ROLES_NO_PERMS: (target) => `You are not allowed to moderate ${target}.`,
			COMMAND_ROLES_DOES_NOT_EXIST: (roleName) => `Sorry, the role \`${roleName}\` does not exist in this server. Please check to make sure you spelled it correctly.`,
			COMMAND_ROLES_NOT_JOINABLE: (roleName) => `The role \`${roleName}\` is not joinable in this server.`,
			COMMAND_ROLES_ALREADY_HAVE: (roleName, target) => `${target} already has the role \`${roleName}\`.`,
			COMMAND_ROLES_NOT_LEAVABLE: (roleName) => `You're not allowed to remove the role \`${roleName}\`.`,
			COMMAND_ROLES_DOES_NOT_HAVE: (roleName, target) => `${target} does not have the role \`${roleName}\`.`,
			COMMAND_SUPPORT_DESCRIPTION: 'Contacts the bot developers in case of an issue with the bot.',
			COMMAND_SUPPORT_REQUESTED: 'Support requested',
			COMMAND_SUPPORT_CONTACTED: 'The bot developers have been notified.',


			// Message prompt langs
			MESSAGE_PROMPT_TIMEOUT: 'The prompt has timed out.',


			// Guild log langs
			GUILD_LOG_BEFORE: 'Before',
			GUILD_LOG_AFTER: 'After',
			GUILD_LOG_EMOJI: 'Emoji',
			GUILD_LOG_MESSAGEDELETE: 'Message deleted',
			GUILD_LOG_MESSAGEUPDATE: 'Message edited',
			GUILD_LOG_ROLECREATE: 'Role created',
			GUILD_LOG_ROLECREATE_V_TAG: 'Tag',
			GUILD_LOG_ROLEDELETE: 'Role deleted',
			GUILD_LOG_ROLEUPDATE: 'Role updated',
			GUILD_LOG_ROLEUPDATE_COLOR: 'Color changed',
			GUILD_LOG_ROLEUPDATE_HOIST: 'Hoist toggled',
			GUILD_LOG_ROLEUPDATE_MENTIONABLE: 'Mentionable toggled',
			GUILD_LOG_ROLEUPDATE_PERMISSIONS: 'Permissions changed',
			GUILD_LOG_CHANNELCREATE: 'Channel created',
			GUILD_LOG_CHANNELCREATE_VOICE: 'Voice channel created',
			GUILD_LOG_CHANNELCREATE_CATEGORY: 'Category created',
			GUILD_LOG_CHANNELCREATE_NEWS: 'News channel created',
			GUILD_LOG_CHANNELCREATE_STORE: 'Store channel created',
			GUILD_LOG_CHANNELCREATE_V_PARENT: 'Category',
			GUILD_LOG_CHANNELDELETE: 'Channel deleted',
			GUILD_LOG_CHANNELDELETE_VOICE: 'Voice channel deleted',
			GUILD_LOG_CHANNELDELETE_CATEGORY: 'Category deleted',
			GUILD_LOG_CHANNELDELETE_NEWS: 'News channel created',
			GUILD_LOG_CHANNELDELETE_STORE: 'Store channel created',
			GUILD_LOG_CHANNELUPDATE: 'Channel updated',
			GUILD_LOG_CHANNELUPDATE_VOICE: 'Voice channel updated',
			GUILD_LOG_CHANNELUPDATE_CATEGORY: 'Category updated',
			GUILD_LOG_CHANNELUPDATE_NEWS: 'News channel updated',
			GUILD_LOG_CHANNELUPDATE_STORE: 'Store channel updated',
			GUILD_LOG_CHANNELUPDATE_NSFW: 'NSFW toggled',
			GUILD_LOG_CHANNELUPDATE_TOPIC: 'Topic changed',
			GUILD_LOG_CHANNELUPDATE_TOPIC_NONE: 'No topic',
			GUILD_LOG_CHANNELUPDATE_PARENT: 'Channel moved to different category',
			GUILD_LOG_CHANNELUPDATE_PARENT_NONE: 'No category',
			GUILD_LOG_CHANNELUPDATE_POSITIION: 'Position changed',
			GUILD_LOG_CHANNELUPDATE_PERMISSIONOVERWRITECREATE: 'Permissions created for',
			GUILD_LOG_CHANNELUPDATE_PERMISSIONOVERWRITEREMOVE: 'Permissions defaulted for',
			GUILD_LOG_CHANNELUPDATE_PERMISSIONOVERWRITEUPDATE: 'Permissions changed for',
			GUILD_LOG_CHANNELUPDATE_SLOWMODE: 'Slowmode interval changed',
			GUILD_LOG_CHANNELUPDATE_BITRATE: 'Bitrate changed',
			GUILD_LOG_CHANNELUPDATE_USERLIMIT: 'User limit changed',
			GUILD_LOG_EMOJICREATE: 'Emoji created',
			GUILD_LOG_EMOJIDELETE: 'Emoji deleted',
			GUILD_LOG_EMOJIUPDATE: 'Emoji updated',
			GUILD_LOG_GUILDUPDATE: 'Server updated',
			GUILD_LOG_GUILDUPDATE_AFKCHANNEL: 'AFK channel changed',
			GUILD_LOG_GUILDUPDATE_AFKCHANNEL_NONE: 'No AFK channel',
			GUILD_LOG_GUILDUPDATE_AFKTIMEOUT: 'AFK timeout changed',
			GUILD_LOG_GUILDUPDATE_DEFAULTMSGNOTIF: 'Default notification settings changed',
			GUILD_LOG_GUILDUPDATE_DEFAULTMSGNOTIF_OLD: (oldGuild) => this.defaultMsgNotifs[oldGuild.defaultMessageNotifications],
			GUILD_LOG_GUILDUPDATE_DEFAULTMSGNOTIF_NEW: (guild) => this.defaultMsgNotifs[guild.defaultMessageNotifications],
			GUILD_LOG_GUILDUPDATE_CONTENTFILTER: 'Explicit content filter level changed',
			GUILD_LOG_GUILDUPDATE_CONTENTFILTER_OLD: (oldGuild) => this.filterLevels[oldGuild.explicitContentFilter],
			GUILD_LOG_GUILDUPDATE_CONTENTFILTER_NEW: (guild) => this.filterLevels[guild.explicitContentFilter],
			GUILD_LOG_GUILDUPDATE_ICON: 'Server icon changed',
			GUILD_LOG_GUILDUPDATE_NAME: 'Server name changed',
			GUILD_LOG_GUILDUPDATE_MFALEVEL: 'Server 2FA requirement toggled',
			GUILD_LOG_GUILDUPDATE_OWNER: 'Ownership transferred',
			GUILD_LOG_GUILDUPDATE_REGION: 'Region changed',
			GUILD_LOG_GUILDUPDATE_SPLASH: 'Server invite background changed',
			GUILD_LOG_GUILDUPDATE_BANNER: 'Server banner changed',
			GUILD_LOG_GUILDUPDATE_VLEVEL: 'Verification level changed',
			GUILD_LOG_GUILDUPDATE_VLEVEL_OLD: (oldGuild) => this.verificationLevels[oldGuild.verificationLevel],
			GUILD_LOG_GUILDUPDATE_VLEVEL_NEW: (guild) => this.verificationLevels[guild.verificationLevel],
			GUILD_LOG_GUILDUPDATE_SYSMSGS: 'System messages channel changed',
			GUILD_LOG_GUILDUPDATE_SYSMSGS_NONE: 'No system messages',
			GUILD_LOG_GUILDUPDATE_VANITYURL: 'Vanity URL changed',
			GUILD_LOG_GUILDUPDATE_VANITYURL_NONE: 'No vanity URL',
			GUILD_LOG_GUILDUPDATE_DESCRIPTION: 'Server description changed',
			GUILD_LOG_GUILDUPDATE_DESCRIPTION_NONE: 'No server description',
			GUILD_LOG_GUILDUPDATE_WIDGET: 'Server widget toggled',
			GUILD_LOG_GUILDUPDATE_WIDGETCHANNEL: 'Server widget invite channel changed',
			GUILD_LOG_GUILDUPDATE_WIDGETCHANNEL_NONE: 'No server widget invite channel',
			GUILD_LOG_GUILDUPDATE_NITROLEVEL: 'Nitro boost level updated',
			GUILD_LOG_GUILDUPDATE_NITROLEVEL_TITLES: (guild) => `${this.nitroTierTitles[guild.premiumTier]}`,
			GUILD_LOG_GUILDUPDATE_NITROLEVEL_DETAILS: (guild) => `${this.nitroTierDetails[guild.premiumTier]}`,
			GUILD_LOG_GUILDBANADD_TIMED: (when) => `User banned for ${moment.duration(moment().diff(when)).humanize()}`,
			GUILD_LOG_GUILDBANREMOVE: 'User unbanned',
			GUILD_LOG_GUILDMEMBERADD: 'User joined',
			GUILD_LOG_GUILDMEMBERREMOVE: 'User left',
			GUILD_LOG_GUILDMEMBERUNMUTE: 'User unmuted',
			GUILD_LOG_MEMBERUPDATE: 'User updated',
			GUILD_LOG_MEMBERUPDATE_DISPLAYNAME: 'Display name changed',
			GUILD_LOG_MEMBERUPDATE_NITROBOOST: 'User boosted server!',
			GUILD_LOG_BLACKLISTEDWORD: (channel) => `Blacklisted word detected in ${channel}.`,
			GUILD_LOG_MENTIONSPAM: 'Mention spam filter triggered',


			// Global log langs
			GLOBAL_LOG_GUILDCREATE: 'Bot added to guild',
			GLOBAL_LOG_GUILDDELETE: 'Bot removed from guild',
			GLOBAL_LOG_GUILDUPDATE_NAME: 'Guild name changed',
			GLOBAL_LOG_GUILDUPDATE_ICON: 'Guild icon changed',
			GLOBAL_LOG_GUILDUNAVAILABLE: 'Guild unavailable, likely due to a server outage',
			GLOBAL_LOG_COMMANDRUN: 'Command ran',
			GLOBAL_LOG_COMMANDRUN_DM: 'Command ran in DM',


			// Moderation action langs
			// eslint-disable-next-line max-len
			MODERATION_LOG_BOILERPLATE: (guild) => `This action was performed by a moderator of the ${guild.name} Discord. If you have any questions about this action, please contact the owner, listed below.\n\n${guild.owner}`,
			MODERATION_LOG_BOILERPLATE_AUTO: (guild) => `This action was automatically performed. If you have any questions regarding this, please contact a moderator of the ${guild.name} Discord.`,
			MODERATION_LOG_BAN: 'User banned',
			MODERATION_LOG_UNBAN: 'User unbanned',
			MODERATION_LOG_KICK: 'User kicked',
			MODERATION_LOG_MUTE: 'User muted',
			MODERATION_LOG_UNMUTE: 'User unmuted',
			MODERATION_LOG_PURGE: 'Messages purged',
			MODERATION_LOG_SOFTBAN: 'User softbanned',
			MODERATION_LOG_VCBAN: 'User banned from voice chat',
			MODERATION_LOG_VCUNBAN: 'User unbanned from voice chat',
			MODERATION_LOG_VCKICK: 'User kicked from voice chat',
			MODERATION_LOG_WARN: 'Warning issued',
			MODERATION_LOG_ANTIINVITE: 'Invite deleted',
			MODERATION_LOG_MENTIONSPAM: 'User banned for mention spam',
			MODERATION_LOG_BLACKLISTEDWORD: 'Blacklisted word detected',
			MODERATION_LOG_BLACKLISTEDNICKNAME: 'Blacklisted nickname detected',
			MODERATION_LOG_CASEID: (caseID) => `**Case ID:** ${caseID}`,
			MODERATION_LOG_EVENTLOGGED: 'Event logged',
			MODERATION_LOG_MODERATOR: 'Moderator',
			MODERATION_LOG_UNSPECIFIED: 'Unspecified',
			MODERATION_LOG_DURATION: 'Duration',
			MODERATION_LOG_DURATIONEND: (end) => `For ${moment.duration(moment().diff(end)).humanize()}`,
			MODERATION_LOG_DELETEDMESSAGECOUNT: 'Messages deleted',
			MODERATION_LOG_DELETEDMESSAGECONTENT: 'Deleted message',
			MODERATION_LOG_BADNICKNAME: 'Blacklisted nickname',
			MODERATION_LOG_LINK: (link) => `[Click here to view](${link})`,
			MODERATION_LOG_SILENT: 'Command executed silently',
			MODERATION_LOG_CHANNEL: 'Channel'
		};
	}

	async init() {
		await super.init();
	}

};
