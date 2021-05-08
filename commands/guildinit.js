const fs = require('fs');

module.exports = {
    name: 'guildinit',
    description: 'Initializes guild into storage',
    execute(message, args) {
        const guildid = message.guild.id;

        // make storage directory if nonexistent
        if (!fs.existsSync('./storage')) {
            fs.mkdirSync(dir)
        }
        let filepath = './storage/'+message.guild.id+'.json'

        if (fs.existsSync(filePath)) {
            message.channel.send('Guild already initialized. Skipping.')
        } else {
            // Build the JSON
            bigJSON = {
                "studentRole": "",
                "projectManagerRole": "",
                "admins": [],
                "channels": []
            }

            // try to overwrite
            fs.writeFile(filepath, JSON.stringify(bigJSON), function (err) {
                if (err) throw err;
            })
    
            message.channel.send('Initialized')
        }
    },
};