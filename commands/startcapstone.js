const fs = require('fs');

module.exports = {
    name: 'startcapstone',
    description: 'Initializes guild into guild_dat and formats the server for capstone usage',
    execute(message, args) {
        const guildid = message.guild.id;

        var stdRole, pmRole, execRole;
        var cmtSponsor, cmtStudent;

        var server = message.guild;
        var roles = server.roles;
        var channels = server.channels;

        // Create the all-powerful Server Admin
        roles.create({
            data: {
                name: "Server Admin",
                mentionable: true,
                permissions: 8,
                color: Math.floor(Math.random() * 16777215).toString(16) // random color
            }
        })

        // Create the executives role
        //  this must occur before all other roles as the executives must
        //  gain the overrides to view the following channels afterwards
        roles.create({
            data: {
                name: "Executives",
                mentionable: true,
                permissions: 2146959223,
                color: Math.floor(Math.random() * 16777215).toString(16) // random color
            }
        })
            .then(executiveRole => {
                execRole = executiveRole.id;
                // Create executive role perms
                let execPerms = [
                    {
                        id: server.id,
                        deny: 3072 // send messages and view channel
                    }, {
                        id: executiveRole.id,
                        allow: 3072
                    }
                ]
                // create category for executive team
                channels.create("Executive Team", {
                    type: "category",
                    permissionsOverwrites: execPerms
                })
                    .then(category => {
                        // create following channels
                        channels.create("Exec Board", {
                            type: "text",
                            parent: category.id
                        })
                        channels.create("Exec Board", {
                            type: "voice",
                            parent: category.id
                        })
                    })
                    .catch(console.error)

                // Sponsors role and category
                roles.create({
                    data: {
                        name: "Sponsors",
                        mentionable: true,
                        color: Math.floor(Math.random() * 16777215).toString(16) // random color
                    }
                })
                    .then(sponsorRole => {
                        // Create sponsor role perms
                        let sponsorPerms = [
                            {
                                id: server.id,
                                deny: 3072 // send messages and view channel
                            }, {
                                id: executiveRole.id,
                                allow: 3072
                            }, {
                                id: sponsorRole.id,
                                allow: 3072
                            }
                        ]
                        // Create sponsor category and channels
                        channels.create("Sponsors", {
                            type: "category",
                            permissionOverwrites: sponsorPerms
                        })
                            .then(category => {
                                channels.create("Sponsor-Announcements", {
                                    type: "text",
                                    parent: category.id
                                })
                                channels.create("General Sponsor Chat", {
                                    type: "text",
                                    parent: category.id
                                })
                                channels.create("Sponsor Student Confirmations", {
                                    type: "text",
                                    parent: category.id
                                })
                                    .then(sponsorConfirm => {
                                        cmtSponsor = sponsorConfirm.id
                                    })
                                    .catch(console.error)
                                channels.create("Sponsor Questions", {
                                    type: "text",
                                    parent: category.id
                                })
                                channels.create("Sponsor Voice", {
                                    type: "voice",
                                    parent: category.id
                                })
                            })
                            .catch(console.error)
                    })
                    .catch(console.error)

                // PM role and category
                roles.create({
                    data: {
                        name: "Project Managers",
                        mentionable: true,
                        color: Math.floor(Math.random() * 16777215).toString(16) // random color
                    }
                })
                    .then(projManagerRole => {
                        // keep track of pm role
                        pmRole = projManagerRole.id;
                        // Create pm role perms
                        let pmPerms = [
                            {
                                id: server.id,
                                deny: 3072 // send messages and view channel
                            }, {
                                id: executiveRole.id,
                                allow: 3072
                            }, {
                                id: projManagerRole.id,
                                allow: 3072
                            }
                        ]
                        // Create category and channels
                        channels.create("Project Managers", {
                            type: "category",
                            permissionOverwrites: pmPerms
                        })
                            .then(category => {
                                channels.create("PM Announcements", {
                                    type: "text",
                                    parent: category.id
                                })
                                channels.create("PM Chat", {
                                    type: "text",
                                    parent: category.id
                                })
                                channels.create("PM Voice", {
                                    type: "voice",
                                    parent: category.id
                                })
                            })
                            .catch(console.error)
                    })
                    .catch(console.error)

                // Students role and category
                roles.create({
                    data: {
                        name: "Students",
                        mentionable: true,
                        color: Math.floor(Math.random() * 16777215).toString(16) // random color
                    }
                })
                    .then(studentRole => {
                        // Keep track of student role
                        stdRole = studentRole.id;
                        // Create student role perms
                        let studentPerms = [
                            {
                                id: server.id,
                                deny: 3072 // send messages and view channel
                            }, {
                                id: executiveRole.id,
                                allow: 3072
                            }, {
                                id: studentRole.id,
                                allow: 3072
                            }
                        ]
                        // Create student category and channels
                        channels.create("Students", {
                            type: "category",
                            permissionOverwrites: studentPerms
                        })
                            .then(category => {
                                channels.create("Student-Announcements", {
                                    type: "text",
                                    parent: category.id
                                })
                                channels.create("General Student Chat", {
                                    type: "text",
                                    parent: category.id
                                })
                                channels.create("Student Questions", {
                                    type: "text",
                                    parent: category.id
                                })
                                channels.create("Team Commitment", {
                                    type: "text",
                                    parent: category.id
                                })
                                    .then(studentConfirm => {
                                        cmtStudent = studentConfirm.id
                                    })
                                    .catch(console.error)
                                channels.create("Student Voice", {
                                    type: "voice",
                                    parent: category.id
                                })
                            })
                    })
                    .catch(console.error)

                // RWC role and category
                roles.create({
                    data: {
                        name: "RWC",
                        mentionable: true,
                        color: Math.floor(Math.random() * 16777215).toString(16) // random color
                    }
                })
                    .then(rwcRole => {
                        // Create role perms
                        let rwcPerms = [
                            {
                                id: server.id,
                                deny: 3072 // send messages and view channel
                            }, {
                                id: executiveRole.id,
                                allow: 3072
                            }, {
                                id: rwcRole.id,
                                allow: 3072
                            }
                        ]
                        // Create category and channels
                        channels.create("RWC", {
                            type: "category",
                            permissionOverwrites: rwcPerms
                        })
                            .then(category => {
                                channels.create("RWC", {
                                    type: "text",
                                    parent: category.id
                                })
                            })
                            .catch(console.error)
                    })
                    .catch(console.error)

                // Cisco role and category
                roles.create({
                    data: {
                        name: "Cisco Leaders",
                        mentionable: true,
                        color: Math.floor(Math.random() * 16777215).toString(16) // random color
                    }
                })
                    .then(ciscoLeadRole => {
                        roles.create({
                            data: {
                                name: "Cisco Project Managers",
                                mentionable: true,
                                color: Math.floor(Math.random() * 16777215).toString(16) // random color
                            }
                        })
                            .then(ciscoPMRole => {
                                roles.create({
                                    data: {
                                        name: "Cisco Students",
                                        mentionable: true,
                                        color: Math.floor(Math.random() * 16777215).toString(16) // random color
                                    }
                                })
                                    .then(ciscoStudentRole => {
                                        // perms
                                        let ciscoGenPerms = [
                                            {
                                                id: server.id,
                                                deny: 3072 // send messages and view channel
                                            }, {
                                                id: executiveRole.id,
                                                allow: 3072
                                            }, {
                                                id: ciscoStudentRole.id,
                                                allow: 3072
                                            }, {
                                                id: ciscoPMRole.id,
                                                allow: 3072
                                            }, {
                                                id: ciscoLeadRole.id,
                                                allow: 3072
                                            }
                                        ]
                                        let ciscoPMPerms = [
                                            {
                                                id: server.id,
                                                deny: 3072 // send messages and view channel
                                            }, {
                                                id: executiveRole.id,
                                                allow: 3072
                                            }, {
                                                id: ciscoPMRole.id,
                                                allow: 3072
                                            }, {
                                                id: ciscoLeadRole.id,
                                                allow: 3072
                                            }
                                        ]
                                        let ciscoLeadPerms = [
                                            {
                                                id: server.id,
                                                deny: 3072 // send messages and view channel
                                            }, {
                                                id: executiveRole.id,
                                                allow: 3072
                                            }, {
                                                id: ciscoLeadRole.id,
                                                allow: 3072
                                            }
                                        ]
                                        // Category, then channels
                                        channels.create("Cisco", {
                                            type: "category",
                                            permissionOverwrites: ciscoGenPerms
                                        })
                                            .then(category => {
                                                channels.create("Cisco Announcements", {
                                                    type: "text",
                                                    parent: category.id
                                                })
                                                channels.create("Cisco General", {
                                                    type: "text",
                                                    parent: category.id
                                                })
                                                channels.create("Cisco Project Managers", {
                                                    type: "text",
                                                    parent: category.id,
                                                    permissionOverwrites: ciscoPMPerms
                                                })
                                                channels.create("Cisco Coaching", {
                                                    type: "text",
                                                    parent: category.id,
                                                    permissionOverwrites: ciscoLeadPerms
                                                })
                                                channels.create("Cisco Leaders", {
                                                    type: "voice",
                                                    parent: category.id,
                                                    permissionOverwrites: ciscoLeadPerms
                                                })
                                                channels.create("Cisco Students", {
                                                    type: "voice",
                                                    parent: category.id
                                                })
                                            })
                                            .catch(console.error)
                                    })
                                    .catch(console.error)
                            })
                            .catch(console.error)
                    })
                    .catch(console.error)
            })
            .then(uselessRoleName => {
                // --This assumes that the guild has not been initialized in the dumb database--
                // load json data
                let jsondata = require('../storage/guild_dat.json');
                if (jsondata[guildid] === undefined) {
                    jsondata[guildid] = {
                        "student": stdRole,
                        "projectmanager": pmRole,
                        "admin": execRole,
                        "commit-sponsors": cmtSponsor,
                        "commit-students": cmtStudent,
                        "override": [],
                        "channels": []
                    }
                }

                // try to overwrite
                try {
                    fs.writeFileSync('./storage/guild_dat.json', JSON.stringify(jsondata, null, 4), 'utf-8');
                } catch (err) {
                    console.error('error occurred')
                }
            })
            .catch(console.error)

        message.channel.send('Done!')
    },
};