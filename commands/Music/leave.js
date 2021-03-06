const Command = require("../../base/Command.js");

class Stop extends Command {
	constructor(client) {
		super(client, {
			name: "stop",
			description: (language) => language.get("LEAVE_DESCRIPTION"),
			usage: (language, prefix) => language.get("LEAVE_USAGE", prefix),
			examples: (language, prefix) => language.get("LEAVE_EXAMPLES", prefix),
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			aliases: ["disconnect"],
			permLevel: "User",
			cooldown: 2000,
		});
	}

	async run(message) {
		try {
			let trackPlaying = message.bot.player.isPlaying(message.guild.id);
			if (!trackPlaying) {
				return message.channel.send(message.language.get('NOT_PLAYING'));
			}
			message.bot.player.clearQueue(message.guild.id);
			message.bot.player.stop(message.guild.id);
			return message.channel.send(message.language.get('STOPPED'));
		}
		catch (error) {
			console.error(error);
			return message.channel.send(message.language.get("ERROR", error));
		}
	}
}

module.exports = Stop;
