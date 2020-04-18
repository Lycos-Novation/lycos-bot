const Command = require("../../base/Command.js");

class emotes extends Command {
    constructor(client) {
        super(client, {
            name: "emotes",
            description: (language) => language.get("EMOTES_DESCRIPTION"),
            usage: (language, prefix) => language.get("EMOTES_USAGE", prefix),
            examples: (language, prefix) => language.get("EMOTES_EXAMPLES", prefix),
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            permLevel: "User",
            aliases: ["emojis", "emotes-list", "emojis-list"],
            botPermissions: ["MANAGE_ROLES"],
            nsfw: false,
            adminOnly: false,
            cooldown: 1000,
        });
    }

    async run(message, args) {
        try {
            
            if(message.guild.emojis.cache.filter(e => !e.animated).size === 0){
                var value1 = message.language.get("EMOTES_NO_EMOTES");
            } else {
                value1 = message.guild.emojis.cache.filter(e => !e.animated).map(e => `${e}`).join(' ');
            }

            if(message.guild.emojis.cache.filter(e => e.animated).size === 0){
                var value2 = message.language.get("EMOTES_NO_ANIMATED");
            } else {
                value2 = message.guild.emojis.cache.filter(e => e.animated).map(e => `${e}`).join(' ');
            }

            await message.channel.send({
                embed: {
                    color: message.config.embed.color,
                    author: {
                        name: message.language.get("EMOTES_TITLE"),
                        icon_url: message.guild.iconURL,
                    },
                    description: message.language.get("EMOTES_DESC", message),
                    fields: [{
                        name: message.language.get("EMOTES_TITLES")[0] + ` (${message.guild.emojis.cache.filter(e => !e.animated).size})`,
                        value: value1,
                        inline: true,
                    },
                        {
                            name: message.language.get("EMOTES_TITLES")[1]+ ` (${message.guild.emojis.cache.filter(e => e.animated).size})`,
                            value: value2,
                            inline: false,
                        },
                    ],
                    timestamp: new Date(),
                    footer: {
                        text: message.config.embed.footer,
                    },
                },
            })
        }
        catch (error) {
            console.error(error);
            return message.channel.send(message.language.get("ERROR", error));
        }
    }
}

module.exports = emotes;
