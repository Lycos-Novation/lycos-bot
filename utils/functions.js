const {Project, Guild, Support} = require('../models');
const mongoose = require('mongoose');
const config = require('../config');
module.exports = {
	/**
	 * Gets channel settings
	 * @returns The guild data
	 * @param message
	 */
	async getDataGuild(gd) {
		var data = await Guild.findOne({ guildId: gd.id});
		if(data){
			return data;
		} else if (!data){
			const settings = {
				guildId: gd.id,
				guildName: gd.name,
				language: config.defaultLanguage,
				prefix: config.prefix
			};
			let merged = Object.assign({_id: mongoose.Types.ObjectId() }, settings);
			const newGuild = await new Guild(merged);
			await newGuild.save()
				.then(g => {
					console.log(`Nouveau serveur ajouté : ${g.guildName} - ${g.guildId} `)
				});
			var data = await Guild.findOne({ guildId: gd.id});
			return data
		}
	},

	async createSupport(settings) {
		let merged = Object.assign(settings);

		const newSupport = await new Support(merged);
		return newSupport.save()
	},

	async getSupport(support) {
		var data = await Support.findOne({id: support});
		if(!data){
			data = false;
		}
		return data;
	},

	async deleteSupport(support) {
		return Support.deleteOne({id: support})
	},

	getPrefix(message) {
		if(message.channel.type !== "dm") {
			const prefixes = [
				`<@${message.client.user.id}>`,
				"Lycos",
				message.settings.prefix,
			];
			let prefix = null;
			prefixes.forEach((p) => {
				if(message.content.startsWith(p)) {
					prefix = p;
				}
			});
			return prefix;
		}
		else {
			return true;
		}
	},
	
	async updateGuild(g, settings){
		let data = g;

		if (typeof data !== 'object') data = {};
		for (const key in settings) {
			if (settings.hasOwnProperty(key)) {
				if (data[key] !== settings[key]) data[key] = settings[key];
				else return;
			}
		}
		console.log(`Serveur ${data.name} - Modifications : ${Object.keys(settings)}`);
		return await data.updateOne(settings);
	},

	/**
     * Fetch user by their ID or their username
     * @returns A map of users found with search arguments
     * @param {object} guild
     * @param {object} args
     */
	fetchMembers(guild, args) {
		const search = args.toLowerCase();
		return guild.members.cache.filter((member) => member.id === search || member.displayName.toLowerCase().includes(search));
	},

	checkDays(date) {
		const now = new Date();
		const diff = now.getTime() - date.getTime();
		const days = Math.floor(diff / 86400000);
		return days + (days === 1 ? " day" : " days") + " ago)";
	},

	makeid(length) {
		var result           = '';
		var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		var charactersLength = characters.length;
		for ( var i = 0; i < length; i++ ) {
		   result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result;
	 },

	async createProject(settings){
		let merged = Object.assign({_id: mongoose.Types.ObjectId() }, settings);

		const newProject = await new Project(merged);
		return newProject.save()
			.then(p => {
				console.log(`Nouveau projet ${p.name} créé avec succès.`)
			});
	},

	async delProject(project){
		console.log(`Projet ${project} supprimé.`);
		return Project.deleteOne({name : project})
	},

	async getProject(project){
		var data = await Project.findOne({ name: project});
		if(!data){
			data = config.defaultSettingsProject;
		}
		return data;
	},

	async updateProject(message, project, settings){
		let data = await message.bot.functions.getProject(project);

		if (typeof data !== 'object') data = {};
		for (const key in settings) {
			if (settings.hasOwnProperty(key)) {
				if (data[key] !== settings[key]) data[key] = settings[key];
				else return;
			}
		}
		console.log(`Projet ${data.name} - Modifications : ${Object.keys(settings)}`);
		return await data.updateOne(settings);
	},

	
};
