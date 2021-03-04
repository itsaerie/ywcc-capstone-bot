module.exports = {
	name: 'openhouse',
	description: 'Opens house for role',
	execute(message, args) {
		// load json data
        let jsondata = require('../storage/guild_dat.json');
        const guildid = message.guild.id;
        const guildCache = message.guild.channels;
        const roleID = jsondata[guildid]['student']; // Student

        for (channelID of Object.values(jsondata[guildid]['channels'])) {
            channel = guildCache.cache.get(channelID)
            if (channel === undefined) {
                console.log('failed '+channelID)
                continue;
            }
            console.log('succeeded '+channelID)
            channel.updateOverwrite(roleID, {
                VIEW_CHANNEL: true,
                SEND_MESSAGES: true,
            })
        }
        message.channel.send('done');
	},
};