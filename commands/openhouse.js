module.exports = {
	name: 'openhouse',
	description: 'Opens house for role',
	execute(message, args) {
		// load json data
        let jsondata = require('./storage/'+message.guild.id+'.json');
        const guildCache = message.guild.channels;
        const roleID = jsondata['student']; // Student

        for (channelID of Object.values(jsondata['channels'])) {
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