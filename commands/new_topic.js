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
                channels.create(companyName, {
                    type: "category",
                    reason: "auto-creation",
                    permissionOverwrites: [
                        {
                            id: server.id,
                            deny: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                        }, {
                            id: role.id, // Given role
                            allow: ["VIEW_CHANNEL"]
                        }, {
                            id: "801473930174660638", // Executives
                            allow: ["VIEW_CHANNEL"]
                        }, {
                            id: "804075448861851648", // Server Admin
                            allow: ["VIEW_CHANNEL"]
                        }, {
                            id: "801473930174660639", // Admin-Support
                            allow: ["VIEW_CHANNEL"]
                        }, {
                            id: "801473930174660640", // Professor, hardcoded
                            allow: ["VIEW_CHANNEL"]
                        }
                    ]
                })
                    .then(category => {
                        channels.create(projName, {
                            type: "text",
                            reason: "auto-creation",
                            parent: category.id
                        })
                            .then(message.reply("Created text channel called " + projName))
                            .catch(console.error);
                        channels.create(projName, {
                            type: "voice",
                            reason: "auto-creation",
                            parent: category.id
                        })
                            .then(message.reply("Created voice channel called " + projName))
                            .catch(console.error);
                    })
                    .catch(console.error)
                    .finally(message.reply("Created category channel called " + companyName))
            })
            .catch(console.error)
            .finally(message.reply("Created role called " + projName));
    },
};