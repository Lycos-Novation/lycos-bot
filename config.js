module.exports = {
	token: "TOKEN_HERE",
	defaultLanguage: "english",
	prefix: ".",
	clientModules: {
		music: true,
		dashboard: true,
	},

	permLevels: [
		{
			level: 0,
			name: "User",
			check: () => true,
		},
		{
			level: 1,
			name: "Server Moderator",
			check: (message) => (message.guild ? message.member.hasPermission("KICK_MEMBERS") : false),
		},
		{
			level: 2,
			name: "Server Admin",
			check: (message) => (message.guild ? message.member.hasPermission("ADMINISTRATOR") : false),
		},
		{
			level: 3,
			name: "Server Owner",
			check: (message) => (message.guild ? message.author.id === message.guild.ownerID : false),
		},
		{
			level: 4,
			name: "Bot Support",
			check: (message) => message.config.support.includes(message.author.id),
		},
		{
			level: 5,
			name: "Bot Admin",
			check: (message) => message.config.administrators.includes(message.author.id),
		},
	],
	staff: [],
	support: ["169146903462805504", "474326204808298506", "341660765444505600", "430416407554031616", "153103852621529088", "153163308801720321", "219048193055260673", "405103667528597515", "305791737387810826", "294127767405199360", "382575635014483968", "406071899890647042"],
	administrators: ["169146903462805504", "474326204808298506", "341660765444505600", "153163308801720321"],
	emotes: {
		error: "❌",
		success: "✅",
		info: "📘",
		nsfw: "🔞",
		fun: "",
		music: "",
		lycos: "",
		general: "",
		moderation: "",
		administration: "",
	},
	embed: {
		color: 0x7289DA,
		footer: "Lycos Novation Bot",
	},
	defaultSettingsProject: {
		desc: "Aucune description fournie.",
		members: ["Aucun membre n'a été ajouté au projet."],
		tasks: ["Aucune tâche n'a été ajoutée au projet."],
		done: ["Aucune tâche n'a été terminée."],
	},
	defaultSettingsGuild: {
		channels: {
			welcome: null,
			leave: null,
			logs: null,
			modlogs: null,
			suggestions: null,
			rolereaction: null,
			reports: null,
		},
		modules: {
			welcome: false,
			leave: false,
			games: false,
			nsfw: false,
			nsfwHentai: false,
		},
	}
};
