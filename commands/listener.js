const fs = require('fs');

module.exports = {
    name: 'listener',
    description: 'Attempts to load listeners located in subfolder',
    execute(client, message, args) {
        // client is passed bc client reasons
        const guildid = message.guild.id;

        // make storage directory if nonexistent
        // - if we don't do this, we run into an error with the next line
        if (!fs.existsSync('./storage')) {
            fs.mkdirSync(dir)
        }
        let filepath = './storage/' + guildid + '.json'

        // if guild exists, load data from file
        if (fs.existsSync(filePath)) {
            let jsondata = require('.' + filepath);

            // attempt some stuff
            if (jsondata['commit-students'] !== null && jsondata['commit-sponsors'] !== null && jsondata['exec-role'] !== null) {
                if (message.channel == jsondata['commit-students'] && message.mentions.roles.find(role => role.id === jsondata['exec-role']) != undefined) { // check if channel sent in is team commitments
                    roles = message.mentions.roles.filter(role => role.id != execRole);
                    // this should be the role which represents the project which a student is interested in.
                    let mentionedRole = roles.first()
                    // send message
                    let replyChannel = message.guild.channels.cache.find(channel => channel.id === jsondata['commit-sponsors'])
                    replyChannel.send(`${message.author.toString()} is trying to apply for ${mentionedRole}. Hit ✅ to approve, or hit ❌ to deny.`)
                        .then(reMessage => {
                            const filter = (reaction, user) => {
                                return ['✅', '❌'].includes(reaction.emoji.name) && user.id !== reMessage.author.id;
                            }
                            reMessage.react('✅')
                                .finally(() => reMessage.react('❌'))
                            reMessage.awaitReactions(filter, { max: 1, time: 3600000000, errors: ['time'] })
                                .then(collected => {
                                    const reaction = collected.first();

                                    if (reaction.emoji.name === '✅') {
                                        // Here is where we could potentially add this person's role if we really wanted
                                        message.reply(`You have been confirmed by ${mentionedRole}!`)
                                    } else {
                                        message.reply(`You have been rejected by ${mentionedRole}.`)
                                    }
                                })
                                .catch(collected => {
                                    console.log(`only ${collected.size} replies`)
                                })
                        })
                        .catch(console.error);
                }
            }
        }
    },
};