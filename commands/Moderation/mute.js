const Command = require("../../base/Command.js");
const ms = require('ms');

class mute extends Command {
    constructor(client) {
        super(client, {
            name: "mute",
            description: (language) => language.get("MUTE_DESCRIPTION"),
            usage: (language, prefix) => language.get("MUTE_USAGE", prefix),
            examples: (language, prefix) => language.get("MUTE_EXAMPLE", prefix),
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            permLevel: "Server Moderator",
            botPermissions: ["MANAGE_ROLES", "SEND_MESSAGES"],
            nsfw: false,
            adminOnly: false,
            cooldown: 1000,
        });
    }

    async run(message, args) {
        try {
            var muteRole = message.guild.roles.cache.find(m => m.name === 'muted');
            if (!muteRole) {
                await message.guild.roles.create({
                    data: {
                        name: 'muted',
                        color: "BLACK",
                        permissions: 0
                    },
                    reason: "Mute - Auto create role"
                }).catch(message.language.get("ERROR_CREATING_ROLE"));
                muteRole = await message.guild.roles.cache.find(m => m.name === 'muted');

                message.guild.channels.cache.forEach(async (channel, id) => {
                    await channel.createOverwrite(muteRole.id,
                        {
                            SEND_MESSAGES: false,
                            ADD_REACTIONS: false,
                            SEND_TTS_MESSAGES: false,
                            ATTACH_FILES: false,
                            SPEAK: false
                        }, "Mute - Auto setting up mute role")
                });
            }
            const searchArgs = args[0];
            if (!searchArgs) {
                return message.channel.send(`<:lycosX:631854509798326322> ${message.language.get("MUTE_ERRORARGS")}`)
            } else if (searchArgs === "remove") {
                let sa = args[1];
                if (!sa) {
                    return message.channel.send(`<:lycosX:631854509798326322> ${message.language.get("MUTE_ERRORARGS")}`)
                }
                let member;
                if (message.mentions.members.size > 0) {
                    member = message.mentions.members.first();
                } else if (sa) {
                    member = message.bot.functions.fetchMembers(message.guild, sa);
                    if (member.size === 0) return message.channel.send(message.language.get("ERROR_NOUSER_FOUND"));
                    else if (member.size === 1) member = member.first();
                    else return message.channel.send(message.language.get("ERROR_MUCH_USERS_FOUND"));
                }
                if (!member.roles.cache.some(r => r.name === 'muted')) return message.channel.send(message.language.get("UNMUTE_USER_NOT_MUTED"));
                await member.roles.remove(muteRole.id)
                    .then(r => {
                        message.channel.send(message.language.get("UNMUTE_SUCCESS", member));
                        member.send(message.language.get("UNMUTE_USER_SUCCESS", message));
                        var sql = `SELECT prefix, autorole
		FROM Guilds
		WHERE guild_id="${message.guild.id}"`;
                        var g;
                        mysqlcon.query(sql, async function (err, result, fields) {
                            if (err) throw err;
                            g = result[0];
                            if (g.modlogs_channel) {
                                return message.guild.channels.cache.get(g.modlogs_channel).send({
                                    embed: {
                                        title: lang.get(`UNMUTE_EMBED_TITLE`),
                                        description: lang.get('MUTE_REMOVE_EMBED_DESC', member, message),
                                        footer: {
                                            text: config.embed.footer,
                                        },
                                        thumbnail: {
                                            url: member.user.displayAvatarURL({ format: "png", dynamic: true }),
                                        },
                                        color: 0xDB0808,
                                    }
                                })
                            } else {
                                return;
                            }
                        })
                    })
                    .catch((error) => message.channel.send(`<:lycosX:631854509798326322> ${message.author} ${message.language.get("UNMUTE_ERROR")} ${error}`));
                return;
            } else {
                let member;
                if (message.mentions.members.size > 0) {
                    member = message.mentions.members.first();
                } else if (searchArgs) {
                    member = message.bot.functions.fetchMembers(message.guild, searchArgs);
                    if (member.size === 0) return message.channel.send(message.language.get("ERROR_NOUSER_FOUND"));
                    else if (member.size === 1) member = member.first();
                    else return message.channel.send(message.language.get("ERROR_MUCH_USERS_FOUND"));
                }

                let muteTime = args[1];
                if (!muteTime) return await message.channel.send(message.language.get("MUTE_NO_MUTETIME"));

                let reason = args.slice(2).join(" ");
                if (!reason) return message.channel.send(message.language.get("MUTE_NOREASON"));

                if (member.roles.cache.find(r => r.name === 'muted')) return await message.channel.send(message.language.get("MUTE_USER_ALREADY_MUTES"));

                if (!member.bannable) return message.channel.send(message.language.get("MUTE_UNMUTABLE"));

                await member.roles.add(muteRole.id)
                    .catch((error) => message.channel.send(`<:lycosX:631854509798326322> ${message.author} ${message.language.get("MUTE_ERROR")} ${error}`));
                member.send(message.language.get("MUTE_USER_MESSAGE", message, muteTime, reason));
                message.channel.send(message.language.get("MUTE_INFO", member, message));
                var sql = `SELECT prefix, autorole
		FROM Guilds
		WHERE guild_id="${message.guild.id}"`;
                var g;
                mysqlcon.query(sql, async function (err, result, fields) {
                    if (err) throw err;
                    g = result[0];
                    if (g.modlogs_channel) {
                        return message.guild.channels.cache.get(g.modlogs_channel).send({
                            embed: {
                                title: lang.get(`MUTE_EMBED_TITLE`),
                                description: lang.get('MUTE_EMBED_DESC', member, message, muteTime, reason),
                                footer: {
                                    text: config.embed.footer,
                                },
                                thumbnail: {
                                    url: member.user.displayAvatarURL({ format: "png", dynamic: true }),
                                },
                                color: 0x21E61B,
                            }
                        })
                    } else {
                        return;
                    }
                });
                setTimeout(function () {
                    member.roles.remove(muteRole.id)
                }, ms(muteTime));
            }
        }
        catch (error) {
            console.error(error);
            return message.channel.send(message.language.get("ERROR", error));
        }
    }
}

module.exports = mute;