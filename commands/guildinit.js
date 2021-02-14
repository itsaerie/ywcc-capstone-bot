const fs = require('fs');

module.exports = {
    name: 'guildinit',
    description: 'Initializes guild into guild_dat',
    execute(message, args) {
        const guildid = message.guild.id;

        // load json data
        let jsondata = require('../guild_dat.json');
        if (jsondata[guildid] === undefined) {
            jsondata[guildid] = {
                "student": "",
                "projectmanager": "",
                "admins": [],
                "channels": []
            }
        }

        // try to overwrite
        try {
            fs.writeFileSync('./guild_dat.json', JSON.stringify(jsondata, null, 4), 'utf-8');
        } catch (err) {
            console.error('error occurred')
        }

        message.channel.send('Initialized')
    },
};