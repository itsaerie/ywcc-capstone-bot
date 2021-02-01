const { sponsor_channels } = require('../config.json');

module.exports = {
	name: 'openhouse',
	description: 'Opens house for role',
	execute(message, args) {
        const guildCache = message.guild.channels;
        const roleID = "801473930152902671";

        for(channelID of Object.values(sponsor_channels)) {
            channel = guildCache.cache.get(channelID)
            channel.updateOverwrite(roleID, {
                VIEW_CHANNEL: true,
                SEND_MESSAGES: true,
            })
        }
		message.channel.send('ok');
	},
};