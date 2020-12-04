const Command = require("../../base/Command.js");

class LycosSuggestion extends Command {
	constructor(client) {
		super(client, {
			name: "lycos-suggestion",
			description: (language) => language.get("LYCOSSUGGESTION_DESCRIPTION"),
			usage: (language, prefix) => language.get("LYCOSSUGGESTION_USAGE", prefix),
			examples: (language, prefix) => language.get("LYCOSSUGGESTION_EXAMPLES", prefix),
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			permLevel: "User",
            botPermissions: [],
            aliases: ["lycos-suggestions", "lycos-suggest", "lycos-suggests"],
			nsfw: false,
			adminOnly: false,
			cooldown: 30000,
		});
	}

	async run(message, args) {
		try {
			if (args.join(" ").length < 10 || args.join(" ").length > 1900) {
				message.channel.send(message.language.get("LYCOSSUGGESTION_NO_ARGS"))
			}
			else {
				const suggestion = args.join(" ");
				message.bot.shard.broadcastEval(`
						const Discord = require('discord.js');
						const channel = this.channels.cache.get("627955885582581790");

						const embed = new Discord.MessageEmbed()
							.setTitle("Suggestion")
							.setColor("#36393F")
							.setAuthor(\`${message.author.username} | ${message.author.id}\`, \`${message.author.avatarURL({animated: true})}\`)
							.setDescription(\`${suggestion.replace(/`/g, "\\`")}\`)
							.setFooter("Lycos")
							.setTimestamp();

						if (channel) {
							channel.send(embed).then(async(m) => {
							await m.react(this.emojis.cache.get("631854492173991947"));
							await m.react(this.emojis.cache.get("631854509798326322"));
						});
							true;
						}
						else {
							false;
						}
        			`);
				return message.channel.send(message.language.get("LYCOSSUGGESTION_QUESTION_SEND")).then(() => {
					message.delete();
				});
			}
		}
		catch (error) {
			console.error(error);
			return message.channel.send(message.language.get("ERROR", error));
		}
	}
}

module.exports = LycosSuggestion;