module.exports = {
    name: 'closehouse',
    description: 'Closes house for role',
    execute(message, args) {
		// load json data
        let jsondata = require('./storage/'+message.guild.id+'.json');
        const guildCache = message.guild.channels;
        const roleID = jsondata['student']; // Student
        const pmRoleID = jsondata['project-manager']; // Project Manager role

        for (channelID of Object.values(jsondata['channels'])) {
            channel = guildCache.cache.get(channelID)
            if (channel === undefined) { continue };
            channel.updateOverwrite(roleID, {
                VIEW_CHANNEL: false,
                SEND_MESSAGES: false,
            })
            channel.updateOverwrite(pmRoleID, {
                VIEW_CHANNEL: false,
                SEND_MESSAGES: false,
            })
        }
        message.channel.send('done');
    },
};