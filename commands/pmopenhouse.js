module.exports = {
    name: 'pmopenhouse',
    description: 'Opens house for PMs. For Industry server use only.',
    execute(message, args) {
        // load json data
        let jsondata = require('../storage/guild_dat.json');
        const guildid = message.guild.id;
        const guildCache = message.guild.channels;
        const roleID = jsondata[guildid]['project-manager']; // Project Manager role

        for (channelID of Object.values(jsondata[guildid]['channels'])) {
            channel = guildCache.cache.get(channelID)
            if (channel === undefined) {
                continue;
            }
            channel.updateOverwrite(roleID, {
                VIEW_CHANNEL: true,
                SEND_MESSAGES: true,
            })
        }
        message.channel.send('done');
    },
};