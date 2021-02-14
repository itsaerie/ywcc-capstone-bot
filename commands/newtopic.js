const fs = require('fs');

module.exports = {
    name: 'newtopic',
    description: 'Create new topic. Used for YWCC Industry Server',
    execute(message, args) {
        // load json data
        let jsondata = require('../guild_dat.json');
        const guildid = message.guild.id;

        let guildchannels = jsondata[guildid]["channels"]

        var companyName = args[0].toString().trim();
        var projName = args[1].toString().trim();

        var server = message.guild;
        var roles = server.roles;
        var channels = server.channels;

        roles.create({
            data: {
                name: projName,
                mentionable: true
            },
            reason: "auto-creation",
        })
            .then(role => {
                let perms = [
                    {
                        id: server.id,
                        deny: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                    }, {
                        id: role.id, // Given role
                        allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                    }
                ]
                for (adminrole of jsondata[guildid]["admins"]) {
                    perms.push({
                        id: adminrole,
                        allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                    })
                }
                channels.create(companyName, {
                    type: "category",
                    reason: "auto-creation",
                    permissionOverwrites: perms
                })
                    .then(category => {
                        // append channel
                        guildchannels.push(category.id)

                        channels.create(projName, {
                            type: "text",
                            reason: "auto-creation",
                            parent: category.id
                        })
                            .then(textChannel => {
                                // append channel
                                guildchannels.push(textChannel.id)
                                message.reply("Created text channel called " + projName);
                            })
                            .catch(console.error);

                        channels.create(projName, {
                            type: "voice",
                            reason: "auto-creation",
                            parent: category.id
                        })
                            .then(voiceChannel => {
                                // append channel
                                guildchannels.push(voiceChannel.id)
                                console.log('after voice', guildchannels)
                                message.reply("Created voice channel called " + projName)

                                // this is the last step so we update guild channels here
                                jsondata[guildid] = {
                                    ...jsondata[guildid],
                                    "channels": guildchannels
                                }
                                try {
                                    fs.writeFileSync('./guild_dat.json', JSON.stringify(jsondata, null, 4), 'utf-8');
                                    console.log('done writing')
                                } catch (err) {
                                    console.error(err)
                                }
                            })
                            .catch(console.error);
                    })
                    .catch(console.error)
                    .finally(message.reply("Created category channel called " + companyName))
            })
            .catch(console.error)
            .finally(message.reply("Created role called " + projName));
    },
};