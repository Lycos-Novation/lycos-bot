const e = require("../config.js").emotes;

module.exports = class {
	constructor(...args) {
		this.language = {
			NO_DESCRIPTION_PROVIDED: "No description defined",
			NO_USAGE_PROVIDED: "No defined use",
			NO_EXAMPLES_PROVIDED: "No example defined",
			ERROR: (error) => `Something went wrong. Please try again.\n\`\`\`\n${error}\`\`\``,
			ERROR_PERMISSIONS_TITLE: `${e.error} Insufficient permissions`,
			ERROR_PERMISSIONS_CONTENT: (lvl, rlvl) => `This command requires the permission level \`${rlvl}\` and you only have the level \`${lvl}\` !`,
			ERROR_COMMAND_GUILDONLY: `${e.error} | This command is unavailable in private messages!`,
			ERROR_NSFW_TITLE: `${e.nsfw} NSFW command`,
			ERROR_NSFW_CONTENT: "This command must be launched in a NSFW channel (+18)",
			ERROR_DISABLED_TITLE: `${e.error} Command disabled`,
			ERROR_DISABLED_CONTENT: "This command is temporarily disabled, only administrators currently have access to it.",
			ERROR_EVERYONE_TITLE: `${e.error} Security`,
			ERROR_EVERYONE_CONTENT: "We have detected an @everyone mention in your message, but you do not have permission to mention @everyone in the commands.",
			ERROR_BOTPERMISSIONS_TITLE: `${e.error} Missing permissions`,
			ERROR_BOTPERMISSIONS_CONTENT: (perm) => `The following permissions are required for this command to work properly: ${perm}`,
			ERROR_SPECIFY_USER: "Please specify an user.",
			ERROR_ROLE_INVALID: "Invalid role.",
			ERROR_NOUSER_FOUND: "No users were found.",
			ERROR_MUCH_USERS_FOUND:"There are so much users found, be more precise.",
			ERROR_NSFW_DEACTIVATED: "This command is unavailable because the ``NSFW`` module isn't enabled on this guild.\nAsk to a server administrator to enable this module.",
			ERROR_FORTNITE_PLATFORM: "Please enter a valid platform (pc, xbox, psn).",
			ERROR_FORTNITE_PLATFORM_USER_NOT_FOUND: "This user was not found on the specified platform.",
			GIVEAWAY_DESCRIPTION: "Manage your giveaways simply!",
			GIVEAWAY_USAGE: (prefix) => `${prefix}giveaway [create/reroll/delete/end] (time) (winners count) (prize)`,
			GIVEAWAY_EXAMPLES: (prefix) => `${prefix}giveaway create 10m 2 5$ PayPal !\n giveaway reroll 597812898022031374`,
			GIVEAWAY_ERR_STATUS: "You must specify `create`, `reroll` ou `delete`!",
			GIVEAWAY_ERR_CREATE: (prefix) => `You must enter the information in this format: \n\n\`${prefix}giveaway create [time] [winners count] [prize]\``,
			GIVEAWAY_ERR_REROLL: "You must enter the ID of the giveaway message a re-rolled!",
			GIVEAWAY_ERR_DELETE: "You must enter the ID of the giveaway message to be deleted!",
			GIVEAWAY_ERR_END: "You must enter the ID of the giveaway message to be ended!",
			GIVEAWAY_ERR_REROLL_MSG_ENDED: (messageID) => `No giveaway **ended** found with message ID \`${messageID}\``,
			GIVEAWAY_ERR_MESSAGE_NOT_FOUND: (messageID) => `No giveaway found with message ID \`${messageID}\``,
			GIVEAWAY_ERR_15_DAYS: "The maximum length of a giveaway is 15 days.",
			GIVEAWAY_ERR_MAX: "A maximum of 4 Giveaways can be launched on the same server.",
			GIVEAWAY_CREATED: "Giveaway launched!",
			GIVEAWAY_REROLLED: "New draw done!",
			GIVEAWAY_DELETED: "Giveaway deleted!",
			GIVEAWAY_ENDED: "Giveaway in stop mode (-15 seconds)!",
			GIVEAWAY_CREATE_MESSAGES: {
				giveaway: "ðŸŽ‰ðŸŽ‰ **GIVEAWAY** ðŸŽ‰ðŸŽ‰",
				giveawayEnded: "ðŸŽ‰ðŸŽ‰ **GIVEAWAY ENDED** ðŸŽ‰ðŸŽ‰",
				timeRemaining: "Time remaining: **{duration}** !",
				inviteToParticipate: "React with ðŸŽ‰ to participate!",
				winMessage: "Congratulations, {winners} ! You won **{prize}** !",
				embedFooter: "Giveaways",
				noWinner: "Giveaway cancelled, no valid participation.",
				winners: "winner(s)",
				endedAt: "End at",
				units: {
					seconds: "seconds",
					minutes: "minutes",
					hours: "hours",
					days: "days",
				},
			},
			GIVEAWAY_REROLL_MESSAGES: {
				congrat: "ðŸŽ‰ New winner(s) : {winners}! Congratulations!",
				error: "No valid entries, no winners can be chosen!",
			},
			LANGUAGE_DESCRIPTION: "Translate Lycos into another language.",
			LANGUAGE_USAGE: ".language <language>",
			LANGUAGE_EXAMPLES: ".language french",
			LANGUAGE_INFO: (language, prefix) => `My language on this guild is \`${language}\` !\n> To change the language do \`${prefix}language set <value>\`\n> To see how many languages I can speak do \`${prefix}language list\``,
			LANGUAGE_LIST: (languages) => `I'm available in \`${languages.join("\`, \`")}\`.`,
			LANGUAGE_NULL: "The new language can't be empty.",
			LANGUAGE_ALREADY_SET: (args) => `I'm already in \`${args[1].toLowerCase()}\`.`,
			LANGUAGE_GUILD_INFO: (args) => `The language on this guild is now \`${args[1].toLowerCase()}\`.`,
			ERROR_LANGUAGE_INCORRECT: "I don't think that I know this language. Can you help me to learn it ?",
			MODULES_DESCRIPTION: "Translate Lycos into another language.",
			MODULES_USAGE: (prefix) => `${prefix}modules set <module> <on/off>`,
			MODULES_EXAMPLES: (prefix) => `${prefix}modules set games on`,
			MODULES_INFO: (prefix) => `Some modules are unavailable by default on Lycos.\n> To activate then do \`${prefix}modules set <module> <on/off>\`\n> To see how many modules I have do \`${prefix}modules list\``,
			MODULES_LIST: (modules) => `Here is the list of available modules:\n> \`${modules.join("\`, \`")}\``,
			MODULES_NULL: "You should indicate the module you want to modify.",
			MODULES_ALREADY_ACTIVATED: "This module is already activated.",
			MODULES_ALREADY_DEACTIVATED: "This module is already deactivated.",
			MODULES_ACTIVATED: (args) => `The module ${args[1]} is now activated on this guild.`,
			MODULES_DEACTIVATED: (args) => `The module ${args[1]} is now deactivated on this guild.`,
			ERROR_MODULES_INCORRECT: (prefix) => `I don't think that I know this module. do \`${prefix}modules list\``,
			POLL_DESCRIPTION: "Make poll for your server members.",
			POLL_USAGE: ".poll <text>",
			POLL_EXAMPLES: ".poll Is Lycos good?",
			POLL_TEXT_NULL: "You must insert a text to do a poll.",
			POLL_REACT: "React with the reactions down below to enter the poll.",
			PREFIX_DESCRIPTION: "Manage the bot prefix on the server.",
			PREFIX_USAGE: ".prefix set <prefix>\n.prefix reset",
			PREFIX_EXAMPLES: ".prefix set d.\n.prefix reset",
			PREFIX_INFO: (prefix) => `My prefix on this guild is \`${prefix}\` ! \n> To change this prefix do \`${prefix}prefix set <value>\`\n> To reset this prefix do \`${prefix}prefix reset\``,
			PREFIX_NULL: "The prefix can't be empty.",
			PREFIX_CHANGE: (args) => `The prefix is now \`${args[1]}\`.`,
			PREFIX_RESET:"The prefix has been reset. It's now `.`",
			ROLE_DESCRIPTION: "Manage roles easily.",
			ROLE_USAGE: ".role <add/remove> <user> <role>",
			ROLE_EXAMPLES: ".role add Lycos Bot",
			ROLE_INFO: (prefix) => `> To add a role to an user do \`${prefix}role add <user> <role>\` \n> To remove a role to an user do \`${prefix}role remove <user> <role>\``,
			ROLE_NOUSER_FOUND: "No users were found.",
			ROLE_GIVE: (member, role) => `${member.user.username} has now the role ${role.name}.`,
			ROLE_REMOVE: (member, role) => `${member.user.username} no longer has the role ${role.name}.`,
			BOT_DESCRIPTION: "View information about Lycos.",
			BOT_USAGE: ".bot",
			BOT_EXAMPLES: ".bot",
			BOT_FIELDS: [
				"General Information",
				"General Statistics",
				"Other Informations",
				"\u200B",
			],
			BOT_FIELDS_CONTENT_GENERALINFO: (message, version) => `**Creator:** \`${message.bot.users.get("169146903462805504").tag}\`\n**Developers:** \`${message.bot.users.get("296693247856607263").tag}\` - \`${message.bot.users.get("291860794163855360").tag}\` - \`${message.bot.users.get("169146903462805504").tag}\`\n**Contributors:** \`${message.bot.users.get("422820341791064085") ? message.bot.users.get("422820341791064085").tag : "Androz"}\`\nCreated on the \`12/12/2017\`, the bot is currently running on version \`${version}\`.`,
			BOT_FIELDS_CONTENT_GENERALSTATS: (guilds, users, channels) => `**Guilds:** serving \`${guilds}\` guilds.\n**Users:** \`${users}\` cached users.\n**Channels:** managing \`${channels}\` channels.`,
			BOT_FIELDS_CONTENT_OTHERINFO: (process, moment, message) => `**Server:** \`${process.platform}\` - \`(${process.arch})\` [[Skoali]](https://skoali.fr/)\n**Heap:** \`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}\`\n**Bot's uptime:** \`${moment.duration(message.bot.uptime).format("M[m] W[w] D[d] H[h] m[m] s[s]")}\``,
			BOT_FIELDS_CONTENT_LINKS: "[Invite](https://discordapp.com/oauth2/authorize?client_id=390231727554953216&scope=bot&permissions=0) - [Server](https://discord.gg/ZvJpUpt) - [Donate](https://paypal.me/denverbot) - [Site](https://denverbot.fr/) - [Vote](https://discordbots.org/bot/390231727554953216) - [Twitter](https://twitter.com/BOT_Denver)",
			HELP_DESCRIPTION: "Displays the list of commands",
			HELP_USAGE: (prefix) => `${prefix}help (command)`,
			HELP_EXAMPLES: (prefix) => `${prefix}help\n${prefix}help ping`,
			HELP_NOT_FOUND: (args) => `${e.error} | The command \`${args}\` doesn't exist!`,
			HELP_TITLE: (command) => `Help : ${command}`,
			HELP_TITLE1: (category) => `Category : ${category}`,
			HELP_EMBED_DESCRIPTION: (message) => `Hey, here is DenverBot's documentation. Some commands are unavailable on the documentation because they need to be enable.\nTo see what you can enable do \`${message.settings.prefix}modules\`.`,
			HELP_FIELDS: [
				"Description",
				"Usage",
				"Examples",
				"Required level",
			],
			HELPGLOBAL_FIELDS: [
				"Administration",
				"Denver",
				"Fun",
				"General",
				"Moderation",
				"Music",
			],
			HELPGLOBAL_TITLE: "Help Menu",
			INVITE_DESCRIPTION: "Gives the invitation to add the bot on a server",
			INVITE_USAGE: (prefix) => `${prefix}invite`,
			INVITE_EXAMPLES: (prefix) => `${prefix}invite`,
			INVITE_TITLE: "Invitation",
			INVITE_FIELD: "[Click here](https://discordapp.com/oauth2/authorize?client_id=390231727554953216&scope=bot&permissions=66321471) to invite the bot to your discord server.",
			PING_DESCRIPTION: "Gives the Discord API latency",
			PING_USAGE: (prefix) => `${prefix}ping`,
			PING_EXAMPLES: (prefix) => `${prefix}ping`,
			PING_PONG: "Pong !",
			PING_APILATENCY: "API latency",
			CAT_DESCRIPTION: "Have fun watching cat pictures.",
			CAT_USAGE: (prefix) => `${prefix}cat`,
			CAT_EXAMPLES: (prefix) => `${prefix}cat`,
			DOG_DESCRIPTION: "Have fun watching dog pictures.",
			DOG_USAGE: (prefix) => `${prefix}dog`,
			DOG_EXAMPLES: (prefix) => `${prefix}dog`,
			AVATAR_DESCRIPTION: "Gives the avatar of the requested user",
			AVATAR_USAGE: (prefix) => `${prefix}avatar (@user)`,
			AVATAR_EXAMPLES: (prefix) => `${prefix}avatar @Denver`,
			AVATAR_TITLE: (member) => `${member.user.username}'s avatar`,
			SERVERINFO_DESCRIPTION: "Displays server information",
			SERVERINFO_USAGE: (prefix) => `${prefix}serverinfo`,
			SERVERINFO_EXAMPLES: (prefix) => `${prefix}serverinfo @Denver`,
			SERVERINFO_REGIONS: [
				":flag_br: Brazil",
				":flag_eu: Central Europe",
				":flag_sg: Singapore",
				":flag_us: U.S. Centre",
				":flag_au: Sydney",
				":flag_us: U.S. East",
				":flag_us: U.S. South",
				":flag_us: U.S. West",
				":flag_eu: Western Europe",
				":flag_us: V.I.P. U.S. East",
				":flag_gb: London",
				":flag_nl: Amsterdam",
				":flag_hk: Hong Kong",
				":flag_ru: Russia",
				":flag_za: South Africa",
			],
			SERVERINFO_TITLES: [
				"Name",
				"Creation",
				"Total | Humans | Bots",
				"Channels",
				"ID",
				"Owner",
				"Region",
				"Verification Level",
			],
			USERINFO_DESCRIPTION: "Displays user information.",
			USERINFO_USAGE: (prefix) => `${prefix}userinfo (@user)`,
			USERINFO_EXAMPLES: (prefix) => `${prefix}userinfo @Denver`,
			USERINFO_TITLES: [
				"Name",
				"Currently playing",
				"ID",
				"Status",
				"Roles",
			],
			USERINFO_STATUS: [
				"Online",
				"Offline",
				"Idle",
				"Do Not Disturb",
			],
			USERINFO_NOPLAY: "No playing",
			USERINFO_PROFIL: "Profil",
			/* LOGS_DESCRIPTION: "writing...",
			LOGS_USAGE: "writing...",
			LOGS_EXAMPLES: "writing...",
			LOGSCMD_DESCRIPTION: "Command to configure the log room",
			LOGSCMD_USAGE: (prefix) => `${prefix}logs`,
			LOGSCMD_EXAMPLES: (prefix) => `${prefix}logs`,
			LOGSCMD_NOCHANNEL: "Please enter a channel",
			LOGSCMD_INVALIDCHANNEL: "This channel does not exist",
			LOGSCMD_CHANNELSUCCES: (channel) => `Your living room logs is distorted ${channel}`,
			LOGSCMD_LOGSOFF: "You have just disabled the logs on your server",*/
			MESSADEDELETE_DESC: "Message delete",
			MESSADEDELETE_FIELD: [
				"Channel",
				"Content",
				"ID",
				"User",
				"Message",
			],
			MESSAGEUPDATE_DESC: "Message updated",
			MESSAGEUPDATE_FIELD: [
				"Channel",
				"Go to message",
				"Now",
				"New",
				"ID",
				"User",
				"Message",
			],
			PARTNERS_DESCRIPTION: "Look at our partners.",
			PARTNERS_USAGE: ".partners",
			PARTNERS_EXAMPLES: ".partners",
			PARTNERS_TITLE: "Lycos's partner",
			ANIME_DESCRIPTION: "Look for the best animes.",
			ANIME_USAGE: ".anime <animeName>",
			ANIME_EXAMPLES: ".anime Dragon Ball",
			ANIME_NOTFOUND: "You must include an anime name.",
			ANIME_TITLES: [
				"English Name",
				"Japanese Name",
				"Type",
				"Episodes",
				"Genre",
				"Popularity",
				"Score",
			],
			FORTNITE_DESCRIPTION: "Look at your Fortnite statistics to be competitive.",
			FORTNITE_USAGE: ".fortnite <platform> <username>",
			FORTNITE_EXAMPLES: ".fortnite pc Ninja",
			FORTNITE_PLATFORM: "Please enter the name of your platform (pc, xbox, psn).",
			FORTNITE_USERNAME_NULL: "Please enter a username.",
			FORTNITE_PLAYER_NOT_FOUND: "Player not found.",
			FORTNITE_PLAYER_STATS: (data) => `Statistics of ${data.username}`,
			FORTNITE_FIELDS: [
				"Kills",
				"Matchs played",
				"Victories",
				"Kills ratio per game",
			],
			FORTNITE_FIELDS_CONTENT_KILL: (data) => `${data.stats.lifetime.kills} (${data.stats.squad["kills"]} in section, ${data.stats.duo["kills"]} in duo, ${data.stats.solo["kills"]} in solo)`,
			FORTNITE_FIELDS_CONTENT_MATCHSPLAYED: (data) => `${data.stats.lifetime.matches} (${data.stats.squad["matches"]} in section, ${data.stats.duo["matches"]} in duo, ${data.stats.solo["matches"]} in solo)`,
			FORTNITE_FIELDS_CONTENT_VICTORIES: (data) => `${data.stats.lifetime.wins} (${data.stats.squad["wins"]} in section, ${data.stats.duo["wins"]} in duo, ${data.stats.solo["wins"]} in solo)`,
			QRCODE_DESCRIPTION: "Make polls on anything.",
			QRCODE_USAGE: ".qrcode <text>",
			QRCODE_EXAMPLES: ".qrcode Secret code",
			QRCODE_MESSAGE: "You must include something to be converted to a QR Code.",
			ROLE_INFO_DESCRIPTION: "Displays role information.",
			ROLE_INFO_USAGE: ".role-info <role>",
			ROLE_INFO_EXAMPLES: ".role-info Members",
			ROLE_INFO_SPECIFY: "Please specify a role.",
			ROLE_INFO_NOT_FOUND: "I can't find this role.",
			ROLE_INFO_FIELDS: [
				"Color",
				"Position",
				"Mentionnable",
				"Creation date",
			],
			ROLE_INFO_ID: (role) => `Role ID: ${role.id}`,
			ROLE_INFO_EMBED_NAME: (role) => `Informations about ${role.name} role`,
			FLIP_DESCRIPTION: "Have fun playing heads or tails.",
			FLIP_USAGE: ".flip",
			FLIP_EXAMPLES: ".flip",
			FLIP_HEADS: ":game_die: | It's **tails**!",
			FLIP_TAILS: ":game_die: | It's **heads**!",
			PERMISSIONS_DESCRIPTION: "Displays the member's permissions in the channel",
			PERMISSIONS_USAGE: (prefix) => `${prefix}permissions (@member)`,
			PERMISSIONS_EXAMPLES: (prefix) => `${prefix}permissions\n${prefix}permissions @user#1234`,
			PERMISSIONS_TITLE: (username, channel) => `Permissions of ${username} in #${channel}`,
			PURGE_DESCRIPTION: "Allows you to delete several messages at once.",
			PURGE_USAGE: (prefix) => `${prefix}purge [messagesNumber]`,
			PURGE_EXAMPLES: (prefix) => `${prefix}purge 28`,
			PURGE_SPECIFY_AMOUNT: "Must specify an amount to delete!",
			PURGE_TOO_MUCH_AMOUNT: "I can't delete more than 100 messages.",
			BAN_DESCRIPTION: "Banishes the mentioned user",
			BAN_USAGE: (prefix) => `${prefix}ban [@user] (reason)`,
			BAN_EXAMPLES: (prefix) => `${prefix}ban @Denver#8124 Spam`,
			BAN_ERRORARGS : "Please insert an user!",
			BAN_ALREADY: "This user is already banned!",
			BAN_BANNABLE: "I cannot ban this user! Do they have a higher role? Do I have ban permissions?",
			BAN_NOREASON: "No reason provided",
			BAN_ERROR: "I couldn't ban this user because: ",
			BAN_INFO: (member, message) => `${member} has been banned by ${message.author}`,
			KICK_DESCRIPTION: "Kicked the mentioned user",
			KICK_USAGE: (prefix) => `${prefix}kick [@user] (reason)`,
			KICK_EXAMPLES: (prefix) => `${prefix}kick @Denver#8124 Spam`,
			KICK_ERRORARGS: "Please insert an user!",
			KICK_BANNABLE: "I cannot kick this user! Do they have a higher role? Do I have kick permissions?",
			KICK_NOREASON: "No reason provided",
			KICK_ERROR: "I couldn't kick this user because: ",
			KICK_INFO: (member, message) => `${member} has been kicked by ${message.author}`,
			FUCKMYLIFE_DESCRIPTION: "Funny stories about everyday life.",
			FUCKMYLIFE_USAGE: (prefix) => `${prefix}fuck-my-life | ${prefix}fml`,
			FUCKMYLIFE_EXAMPLES: (prefix) => `${prefix}fuck-my-life | ${prefix}fml`,
			NSFW_URL: "If the image doesn't display click here.",
			WEATHERINFO_DESCRIPTION: "Affiche la météo de la ville demandée",
			WEATHERINFO_USAGE: (prefix) => `${prefix}weather-info [Name/ZipCode]`,
			WEATHERINFO_EXAMPLES: (prefix) => `${prefix}weather-info Paris`,
			WEATHERINFO_NO_CITY: "Please give a name or Zip Code.",
			WEATHERINFO_NOT_FOUND: "Can't find weather data about this city.",
			WEATHER_LANGUAGE: "en-EN",
			WEATHERINFO_EMBED_TITLE: (result) => `Weather of ${result[0].location.name} on ${result[0].current.day} ${result[0].current.date} at ${result[0].current.observationtime}`,
			WEATHERINFO_EMBED_DESCRIPTION: (result) => `**Coordinates** - __Longitude :__ ${result[0].location.long} - __Latitude :__ ${result[0].location.lat}
**Weather :** ${result[0].current.skytext}
**Temperature :** ${result[0].current.temperature}°C
**Feels like :** ${result[0].current.feelslike}°C
**Humidity :** ${result[0].current.humidity}%
**Wind display :** ${result[0].current.winddisplay}
**Time Zone :** UTC${result[0].location.timezone >= 0 ? `+${result[0].location.timezone}` : `${result[0].location.timezone}`}

**__Forecast for ${result[0].forecast[0].day} ${result[0].forecast[0].date}__**

**Temperature Max/Min** : ${result[0].forecast[0].high}°C/${result[0].forecast[0].low}°C
**Weather :** ${result[0].forecast[0].skytextday}
**Rainfall :** ${result[0].forecast[0].precip !== "" ? `${result[0].forecast[0].precip}` : `0`}%

**__Forecast for ${result[0].forecast[1].day} ${result[0].forecast[1].date}__**

**Temperature Max/Min** : ${result[0].forecast[1].high}°C/${result[0].forecast[1].low}°C
**Weather :** ${result[0].forecast[1].skytextday}
**Rainfall :** ${result[0].forecast[1].precip}%

**__Forecast for ${result[0].forecast[2].day} ${result[0].forecast[2].date}__**

**Temperature Max/Min** : ${result[0].forecast[2].high}°C/${result[0].forecast[2].low}°C
**Weather :** ${result[0].forecast[2].skytextday}
**Rainfall :** ${result[0].forecast[2].precip}%

**__Forecast for ${result[0].forecast[3].day} ${result[0].forecast[3].date}__**

**Temperature Max/Min** : ${result[0].forecast[3].high}°C/${result[0].forecast[3].low}°C
**Weather :** ${result[0].forecast[3].skytextday}
**Rainfall :** ${result[0].forecast[3].precip}%

**__Forecast for ${result[0].forecast[4].day} ${result[0].forecast[0].date}__**

**Temperature Max/Min** : ${result[0].forecast[4].high}°C/${result[0].forecast[4].low}°C
**Weather :** ${result[0].forecast[4].skytextday}
**Rainfall :** ${result[0].forecast[4].precip}%`,
			RPS_LYCOS_CHOICE: (choixO) => `Lycos's choice : ${choixO}`,
			RPS_MATCH_EQUAL: `:flag_white: | Draw !`,
			RPS_PLAYER_WIN: (message) => `:dagger: | Win of ${message.author.username} !`,
			RPS_LYCOS_WIN: `:skull_crossbones: | Win of Lycos !`,
			RPS_CHOICES: "Choose beetween `rock`, `paper` and `scissors`",
			SUPPORT_NO_ARGS: "Please describe your problem with at least 10 caracters to 1900",
			SUPPORT_QUESTION_SEND: "Your question was sent to support. Please wait an answer.",
			PLAY_DESCRIPTION: "Plays music",
			PLAY_USAGE: ".play [Music/Link]",
			PLAY_EXAMPLES: ".play Younger Dreams",
			PLAY_NO_VOICECHANNEL: "You must be in a voice channel to play music",
			PLAY_BOT_CANT_CONNECT: "I can't connect to the channel, please check my permissions !",
			PLAY_BOT_CANT_SPEAK: "I can't speak in the channel, please check my permissions !",
			PLAY_NO_ARGS: "Please give a music to play",
			ANSWER_UNKNOWN_ID: "This support ID isn't known",
			ANSWER_SENT: (support) => `Your answer have been successfully sent.(${support.id} ended)`,
			RELOAD_NO_COMMAND: "You must give a command to reload",
			RELOAD_ERROR_UNLOADING: (response) => `Error unloading : ${response}`,
			RELOAD_ERROR_LOADING: (response) => `Error loading : ${response}`,
			RELOAD_COMMAND_RELOADED: (commandName) => `The command \`${commandName}\` has been reloaded`,
			RELOAD_COMMAND_DOESNT_EXIST: (args) => `The command \`${args[0]}\` doesn't seem to exist. Try again!`,
			ERROR_CREATING_ROLE: "I couldn't create ``muted`` role. Please check my permissions!",
			MUTE_DESCRIPTION: "Mute choosen member",
			MUTE_USAGE: (prefix) => `${prefix}mute [@User or UserID] [Duration] [Reason]`,
			MUTE_EXAMPLE: (prefix) => `${prefix}mute @Lycos 1d Spam emotes`,
			MUTE_ERRORARGS : "Please give a member to mute!",
			MUTE_NO_MUTETIME: "You havn't gave mute duration!",
			MUTE_USER_ALREADY_MUTED: "This user is already muted!",
			MUTE_UNMUTABLE: "This user can't be mute!",
			MUTE_NOREASON: "you don't gave reason for the mute!",
			MUTE_ERROR: "I can't mute because:",
			MUTE_INFO: (member, message) => `${member} has been muted by ${message.author}`,
			MUTE_USER_MESSAGE: (message, muteTime, reason) => `Hey! You are now muted on **${message.guild.name}** for **${reason}** during **${muteTime}**.`
			UNMUTE_USER_NOT_MUTED: "This member isn't muted",
			UNMUTE_SUCCESS: (member) => `${member} has been successfully unmuted!`,
			UNMUTE_USER_SUCCESS: (message) => `You have been unmuted from **${message.guild.name}**!`,
			UNMUTE_ERROR: "I can't unmute because:"
		};
	}
	/**
	 * The method to get language strings
	 * @param {string} term The string or function to look up
	 * @param {...*} args Any arguments to pass to the lookup
	 * @returns {string|Function}
	 */
	get(term, ...args) {
		const value = this.language[term];
		if (typeof value === "function") {
			return value(...args);
		}
		else {
			return value;
		}
	}
};
