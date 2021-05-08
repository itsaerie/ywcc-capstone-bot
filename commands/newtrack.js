const fs = require('fs');

module.exports = {
    name: 'newtrack',
    description: 'Create new topic, for YWCC RWC server',
    execute(message, args) {
        let filepath = './storage/'+message.guild.id+'.json'
        // load json data
        let jsondata = require('.'+filepath);
        const guildid = message.guild.id;

        let guildchannels = jsondata["channels"]

        var trackName = args[0].toString().trim();

        var server = message.guild;
        var roles = server.roles;
        var channels = server.channels;
        var randomColor = Math.floor(Math.random() * 16777215).toString(16);
        var openHouse = "807820864392265818"

        roles.create({
            data: {
                name: trackName + " Coach",
                mentionable: true,
                color: randomColor
            },
            reason: "auto-creation",
        })
            .then(coachrole => {
                roles.create({
                    data: {
                        name: trackName,
                        mentionable: true,
                        color: randomColor
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
                            }, {
                                id: coachrole.id, // Given role
                                allow: ["SEND_MESSAGES", "VIEW_CHANNEL", "MANAGE_MESSAGES"]
                            }, {
                                id: jsondata["admin"],
                                allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                            }
                        ]

                        channels.create(trackName, {
                            type: "text",
                            reason: "auto-creation",
                            parent: openHouse
                        })
                            .catch(console.error);

                        channels.create(trackName, {
                            type: "category",
                            reason: "auto-creation",
                            permissionOverwrites: perms
                        })
                            .then(category => {
                                // append channel
                                guildchannels.push(category.id)

                                channels.create('announcement', {
                                    type: "text",
                                    reason: "auto-creation",
                                    parent: category.id
                                })
                                    .then(textChannel => {
                                        // append channel
                                        guildchannels.push(textChannel.id)
                                    })
                                    .catch(console.error);

                                channels.create('coaches', {
                                    type: "text",
                                    reason: "auto-creation",
                                    parent: category.id
                                })
                                    .then(textChannel => {
                                        // append channel
                                        guildchannels.push(textChannel.id)
                                    })
                                    .catch(console.error);

                                channels.create(trackName, {
                                    type: "text",
                                    reason: "auto-creation",
                                    parent: category.id
                                })
                                    .then(textChannel => {
                                        // append channel
                                        guildchannels.push(textChannel.id)
                                    })
                                    .catch(console.error);

                                channels.create(trackName, {
                                    type: "voice",
                                    reason: "auto-creation",
                                    parent: category.id
                                })
                                    .then(voiceChannel => {
                                        // append channel
                                        guildchannels.push(voiceChannel.id)
                                        message.reply("All done!")

                                        // this is the last step so we update guild channels here
                                        jsondata = {
                                            ...jsondata,
                                            "channels": guildchannels
                                        }
                                        try {
                                            fs.writeFileSync(filepath, JSON.stringify(jsondata, null, 4), 'utf-8');
                                            console.log('done writing')
                                        } catch (err) {
                                            console.error(err)
                                        }
                                    })
                                    .catch(console.error);
                            })
                            .catch(console.error)
                    })
                    .catch(console.error)
            })
            .catch(console.error)
    },
};