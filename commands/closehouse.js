const { sponsor_channels } = require('../config.json');

module.exports = {
	name: 'closehouse',
	description: 'Closes house for role',
	execute(message, args) {
        const guildCache = message.guild.channels;
        const roleID = "801473930152902671";

        for(channelID of Object.values(sponsor_channels)) {
            channel = guildCache.cache.get(channelID)
            channel.updateOverwrite(roleID, {
                VIEW_CHANNEL: false,
                SEND_MESSAGES: false,
            })
        }
		message.channel.send('ok');
	},
};