const fs = require('fs');
let jsondata = require('../config.json')

module.exports = {
    name: 'new_topic',
    description: 'Create new topic',
    execute(message, args) {
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
                        allow: ["VIEW_CHANNEL"]
                    }
                ]
                for (adminrole of jsondata["admin_roles"]) {
                    perms.push({
                        id: adminrole,
                        allow: ["VIEW_CHANNEL"]
                    })
                }
                channels.create(companyName, {
                    type: "category",
                    reason: "auto-creation",
                    permissionOverwrites: perms
                })
                    .then(category => {
                        jsondata["admin_roles"].push(category.id)
                        channels.create(projName, {
                            type: "text",
                            reason: "auto-creation",
                            parent: category.id
                        })
                            .then(text => {
                                jsondata["admin_roles"].push(text.id)
                                message.reply("Created text channel called " + projName);
                            })
                            .catch(console.error);
                        channels.create(projName, {
                            type: "voice",
                            reason: "auto-creation",
                            parent: category.id
                        })
                            .then(voice => {
                                jsondata["admin_roles"].push(voice.id)
                                message.reply("Created voice channel called " + projName);
                            })
                            .catch(console.error);
                    })
                    .catch(console.error)
                    .finally(message.reply("Created category channel called " + companyName))
            })
            .catch(console.error)
            .finally(message.reply("Created role called " + projName));

        // push update to file
        let data = JSON.stringify(jsondata, null, 4);
        fs.writeFileSync('../config.json', data, (err) => {
            if(err) throw err;
            console.log('data updated')
        })
    },
};