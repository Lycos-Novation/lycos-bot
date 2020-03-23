const Command = require("../../base/Command.js");
class Projet extends Command {
    constructor(client) {
        super(client, {
            name: "projet",
            description: (language) => language.get("PROJET_DESCRIPTION"),
            usage: (language, prefix) => language.get("PROJET_USAGE", prefix),
            examples: (language, prefix) => language.get("PROJET_EXAMPLES", prefix),
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: [],
            permLevel: "Bot Support",
            botPermissions: ["SEND_MESSAGE"],
            cooldown: 1000,
        });
    }

    async run(message, args) {
        try {
            if(!args[0]){
                return message.channel.send({
                   embed: {
                       color: message.config.embed.color,
                       author: {
                           name: "Gestionnaire de projet",
                           icon_url: message.bot.user.displayAvatarURL
                       },
                       footer: {
                           text: message.config.embed.footer
                       },
                       description: `\`\`${message.config.prefix}projet create\`\` : Crée un projet.
                       \`\`${message.config.prefix}projet delete\`\` : Supprime un projet.
                       \`\`${message.config.prefix}projet member\`\` : Permet de gérer les membres d'un projet.
                       \`\`${message.config.prefix}projet task\`\` : Permet de gérer les tâches du projet.
                       \`\`${message.config.prefix}projet [NomDeProjet]\`\` : Affiche un récap du projet.
                       \`\`${message.config.prefix}projet change\`\` : Permet de modifier les éléments du projet.
                       \`\`${message.config.prefix}projet list\`\` : Affiche la liste des projets.`,
                   }
               })
            }
            let projet = await message.bot.functions.getProject(args.slice(0).join(" "));
            if(projet.name === args.slice(0).join(" ")){
                /*return message.channel.send({
                    embed: {
                        color: message.config.embed.color,
                        author: {
                            name: `Fiche du projet ${project.name}`,
                            icon_url: message.bot.user.displayAvatarURL
                        },
                        footer: {
                            text: message.config.embed.footer
                        },
                        description: ``,
                    }
                })*/
                //Faire système de pages avec réactions.
            }
            if(args[0] === 'create'){
                return await create(message);
            }
            if(args[0] === 'delete'){
                return await del(message)
            }
            if(args[0] === 'list'){
                //Faire système de pages avec réactions si trop de projets
            }
            if(args[0] === 'member'){
                return await member(message);
            }
            if(args[0] === 'task'){
                return await task(message);
            }

        } catch(error) {
            console.error(error);
            return message.channel.send(message.language.get("ERROR", error))

        }


        async function create(message) {
            let mID = message.author.id;
            let mess = message;
            await message.channel.send("Répondez avec le nom de votre projet");
            const responseFilter = m => m.author.id === mID;
            const response = await message.channel.awaitMessages(responseFilter, {max: 1})
                .then();
            const name = response.first().content;
            if(name.toLowerCase() === "stop"){
                return message.channel.send("Création de projet annulée.");
            }
            if(name.toLowerCase() === "create" || name.toLowerCase() === "delete" || name.toLowerCase() === "member" || name.toLowerCase() === "task" || name.toLowerCase() === "[nomdeprojet]" || name.toLowerCase() === "change" || name.toLowerCase() === "list"){
                return message.channel.send("Ce nom est réservé pour autre chose. Veuillez en choisir un autre.")
            }
            let projet = await message.bot.functions.getProject(name);
            if(name === projet.name){
                return message.channel.send("Ce nom est dejà utilisé par un autre projet. Veuillez en choisir un autre.");
            }
            message.channel.send(`Vous avez choisi \`\`${name}\`\` comme nom de projet. Validez ce nom avec les réactions ci dessous.`)
                .then(async (msg) => {
                    await msg.react("✅");
                    await msg.react("❌");
                    // On attend que la personne réagisse
                    const filter = (reaction, user) => user.id === mID;
                    const collector = msg.createReactionCollector(filter, {
                        max: 1,
                        maxUsers: 1
                    });
                    collector.on('collect', async(r) => {
                        console.log(r.emoji.name);
                        if (r.emoji.name === "✅"){
                            const newProject = {
                                name: name,
                                lead: mess.author.tag
                            };
                            await message.bot.functions.createProject(newProject);
                            return message.channel.send(`Projet \`\`${name}\`\` créé.`);
                        }
                        if (r.emoji.name === "❌"){
                            await message.channel.send("Annulation...");
                            return create(mess)
                        }
                    });
                });
        }

        async function del(message){
            let mID = message.author.id;
            await message.channel.send("Répondez avec le nom du projet à supprimer");
            const responseFilter = m => m.author.id === mID;
            const response = await message.channel.awaitMessages(responseFilter, {max: 1})
                .then();
            let name = response.first().content;
            if(name === "stop"){
                return message.channel.send("Commande annulée");
            }
            let projet = await message.bot.functions.getProject(name);
            if(name !== projet.name){
                return message.channel.send("Projet introuvable, vérifiez le nom du projet et réessayez");
            }
            if(message.author.tag !== projet.lead){
                return message.channel.send("Vous n'êtes pas le Lead Project de ce projet !");
            }
            message.channel.send(`Vous avez choisi le projet \`\`${name}\`\`. Êtes-vous sûr de vouloir supprimer ce projet ?
⚠️ **__Cette action est définitive et irréversible ! En cliquant sur ✅, vous supprimerez ce projet, il sera impossible de le récupérer.__**
Pour annuler la commande cliquez sur ❌.`)
            .then(async (msg) => {
                await msg.react("✅");
                await msg.react("❌");
                // On attend que la personne réagisse
                const filter = (reaction, user) => user.id === mID;
                const collector = msg.createReactionCollector(filter, {
                    max: 1,
                    maxUsers: 1
                });
                collector.on('collect', async(r) => {
                    console.log(r.emoji.name);
                    if (r.emoji.name === "✅"){
                        message.bot.functions.delProject(name);
                        await message.channel.send(`Projet \`\`${name}\`\` supprimé.`);
                    }
                    if (r.emoji.name === "❌"){
                        return message.channel.send("Commande annulée");
                    }
                });
            });
        }

        async function member(message){
            let mID = message.author.id;
            await message.channel.send("Répondez avec le nom du projet à modifier");
            var responseFilter = m => m.author.id === mID;
            var response = await message.channel.awaitMessages(responseFilter, {max: 1})
                .then();
            let name = response.first().content;
            if(name === "stop"){
                return message.channel.send("Commande annulée");
            }
            let projet = await message.bot.functions.getProject(name);
            if(name !== projet.name){
                return message.channel.send("Projet introuvable, vérifiez le nom du projet et réessayez");
            }
            if(message.author.tag !== projet.lead){
                return message.channel.send("Vous n'êtes pas le Lead Project de ce projet !");
            }
            await message.channel.send("Que voulez vous faire ? Répondez avec \`\`add\`\` ou \`\`remove\`\`");
            var responseFilter = m => m.author.id === mID;
            var response = await message.channel.awaitMessages(responseFilter, {max: 1})
                .then();
            let method = response.first().content;
            if(method === "stop"){
                return message.channel.send("Commande annulée");
            }
            if(method === "add"){
                await message.channel.send("Quel membre voulez-vous ajouter au projet ? Répondez avec son ID.");
                var responseFilter = m => m.author.id === mID;
                var response = await message.channel.awaitMessages(responseFilter, {max: 1})
                    .then();
                let member = message.guild.member(message.guild.members.resolve(response.first().content) || message.guild.members.resolveID(response.first().content));
                message.channel.send(`Êtes-vous sûr de vouloir ajouter ${member} ? Confirmez avec les réactions`)
            .then(async (msg) => {
                await msg.react("✅");
                await msg.react("❌");
                // On attend que la personne réagisse
                var filter = (reaction, user) => user.id === mID;
                var collector = msg.createReactionCollector(filter, {
                    max: 1,
                    maxUsers: 1
                });
                collector.on('collect', async(r) => {
                    console.log(r.emoji.name);
                    if (r.emoji.name === "✅"){
                        await message.bot.functions.updateProject(message, name, { $push: {members: member}});
                        return message.channel.send(`${member} a été ajouté au projet`);
                    }
                    if (r.emoji.name === "❌"){
                        return message.channel.send("Commande annulée");
                    }
                });
            });
            }
            if(method === "remove"){
                await message.channel.send("Quel membre voulez-vous retirer du projet ? Répondez avec son ID.");
                var responseFilter = m => m.author.id === mID;
                var response = await message.channel.awaitMessages(responseFilter, {max: 1})
                    .then();
                    let member = message.guild.member(message.guild.members.resolve(response.first().content) || message.guild.members.resolveID(response.first().content));
                message.channel.send(`Êtes-vous sûr de vouloir enlever ${member} ? Confirmez avec les réactions`)
            .then(async (msg) => {
                await msg.react("✅");
                await msg.react("❌");
                // On attend que la personne réagisse
                var filter = (reaction, user) => user.id === mID;
                var collector = msg.createReactionCollector(filter, {
                    max: 1,
                    maxUsers: 1
                });
                collector.on('collect', async(r) => {
                    console.log(r.emoji.name);
                    if (r.emoji.name === "✅"){
                        await message.bot.functions.updateProject(message, name, { $pull: {members: member}});
                        return message.channel.send(`${member} a été retiré du projet`);
                    }
                    if (r.emoji.name === "❌"){
                        return message.channel.send("Commande annulée");
                    }
                });
            });
            }
        }

        async function task(message){
            let mID = message.author.id;
            await message.channel.send('Répondez avec le nom du projet à modifier');
            var responseFilter = m => m.author.id === mID;
                var response = await message.channel.awaitMessages(responseFilter, {max: 1})
                    .then();
            let name = response.first().content;
            if(name === "stop"){
                return message.channel.send("Commande annulée");
            }
            let projet = await message.bot.functions.getProject(name);
            if(name !== projet.name){
                return message.channel.send("Projet introuvable, vérifiez le nom du projet et réessayez");
            }
            if(message.author.tag !== projet.lead){
                return message.channel.send("Vous n'êtes pas le Lead Project de ce projet !");
            }
            await message.channel.send("Que voulez vous faire ? Répondez avec \`\`add\`\`, \`\`done\`\` ou \`\`remove\`\`");
            var responseFilter = m => m.author.id === mID;
            var response = await message.channel.awaitMessages(responseFilter, {max: 1})
                .then();
            let method = response.first().content;
            if(method === "stop"){
                return message.channel.send("Commande annulée");
            }
            if(method === "add"){
            await message.channel.send("Quel est le nom de la tâche à ajouter ?");
            var responseFilter = m => m.author.id === mID;
            var response = await message.channel.awaitMessages(responseFilter, {max: 1})
                .then();
            let taskName = response.first().content;
            message.channel.send(`Vous avez choisi \`\`${taskName}\`\` comme nom de tâche. Validez-le avec les réactions.`)
            .then(async (msg) => {
                await msg.react("✅");
                await msg.react("❌");
                // On attend que la personne réagisse
                var filter = (reaction, user) => user.id === mID;
                var collector = msg.createReactionCollector(filter, {
                    max: 1,
                    maxUsers: 1
                });
                collector.on('collect', async(r) => {
                    console.log(r.emoji.name);
                    if (r.emoji.name === "✅"){
                        await message.bot.functions.updateProject(message, name, { $push: {tasks: taskName}});
                        return message.channel.send(`La tâche ${taskName} a été ajoutée au projet !`);
                    }
                    if (r.emoji.name === "❌"){
                        await message.channel.send("Annulation...");
                        return task(message);
                    }
                });
            });
            }
            if(method === "done"){
                await message.channel.send("Quel est le nom de la tâche terminée ?");
                var responseFilter = m => m.author.id === mID;
                var response = await message.channel.awaitMessages(responseFilter, {max: 1})
                    .then();
                let taskName = response.first().content;
                message.channel.send(`Vous avez choisi la tâche \`\`${taskName}\`\`. Validez avec les réactions.`)
                .then(async (msg) => {
                    await msg.react("✅");
                    await msg.react("❌");
                    // On attend que la personne réagisse
                    var filter = (reaction, user) => user.id === mID;
                    var collector = msg.createReactionCollector(filter, {
                        max: 1,
                        maxUsers: 1
                    });
                    collector.on('collect', async(r) => {
                        console.log(r.emoji.name);
                        if (r.emoji.name === "✅"){
                            await message.bot.functions.updateProject(message, name, { $pull: {tasks: taskName}});
                            await message.bot.functions.updateProject(message, name, { $push: {done: taskName}});
                            return message.channel.send(`La tâche ${taskName} a été définie comme terminée !`);
                        }
                        if (r.emoji.name === "❌"){
                            await message.channel.send("Annulation...");
                            return task(message);
                        }
                    });
                });
                }
                if(method === "remove"){
                    await message.channel.send("Quel est le nom de la tâche à retirer ?");
                    var responseFilter = m => m.author.id === mID;
                    var response = await message.channel.awaitMessages(responseFilter, {max: 1})
                        .then();
                    let taskName = response.first().content;
                    message.channel.send(`Vous avez choisi de retirer la tâche \`\`${taskName}\`\`. Validez avec les réactions.`)
                    .then(async (msg) => {
                        await msg.react("✅");
                        await msg.react("❌");
                        // On attend que la personne réagisse
                        var filter = (reaction, user) => user.id === mID;
                        var collector = msg.createReactionCollector(filter, {
                            max: 1,
                            maxUsers: 1
                        });
                        collector.on('collect', async(r) => {
                            console.log(r.emoji.name);
                            if (r.emoji.name === "✅"){
                                await message.bot.functions.updateProject(message, name, { $pull: {tasks: taskName}});
                                await message.bot.functions.updateProject(message, name, { $pull: {done: taskName}});
                                return message.channel.send(`La tâche ${taskName} a été retirée du projet !`);
                            }
                            if (r.emoji.name === "❌"){
                                await message.channel.send("Annulation...");
                                return task(message);
                            }
                        });
                    });
                    }
        }
    }
}
module.exports = Projet;