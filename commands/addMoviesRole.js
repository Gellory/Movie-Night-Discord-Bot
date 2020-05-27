module.exports = {
	name: "moviesrole",
	description: "Sets a role that is allowed to add movies to the servers list. Can also clear this role by using moviesrole remove",
	usage: "[@roleName]",
	args: true,
	admin: true,
	async execute(message, args, main) {
		if (args.length > 1) {
			return message.channel.send("Please only specify one mentioned role.");
		} else if (!message.mentions.roles.first() && args[0] != "clear") {
			return message.channel.send("Please mention the role you'd like to set in the format moviesrole [@roleName], or to clear settings use moviesrole clear");
		} else {
			var addMoviesRole = args[0] == "clear" ? null : message.mentions.roles.first().id;

			//Update the settings with the role user provided, or clear it and set to NULL.
			main.setting.updateOne({ guildID: message.guild.id }, { "addMoviesRole": addMoviesRole }, function(err) {
				if (!err) {
					var settings = main.guildSettings.get(message.guild.id);

					settings.addMoviesRole = addMoviesRole;
					main.guildSettings.set(message.guild.id, settings);
					message.channel.send(settings.addMoviesRole ? `Users with administrator or the role ${args[0]} will now be able to add movies.` : "Setting for role allowed to add movies has been cleared. Anyone will be able to add movies now.");
				} else {
					message.channel.send("Couldn't set role for adding permissions, something went wrong");
				}
			});

		}
	}
};