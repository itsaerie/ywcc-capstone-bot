const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();

const { admin_id, prefix, token } = require('./config.json');

// command file imports
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
};

// ready for action
client.once('ready', () => {
    console.log('Ready!');
});

const commitChannel = "801473931030036537"
const execRole = "801473930174660638"
const confirmChannel = "807160844236095498"

// Listen for messages
client.on('message', message => {
    if (Object.values(admin_id).includes(message.author.id)) {
        if (!message.content.startsWith(prefix) || message.author.bot) return;

        let args = message.content.slice(prefix.length).trim().split(' ');
        const command = args.shift().toLowerCase();
        args = args.join(' ').split(',');

        try {
            client.commands.get(command).execute(message, args);
        } catch (error) {
            console.error(error);
            message.reply('there was an error trying to execute that command');
        }
    }
    if (message.channel == commitChannel && message.mentions.roles.find(role => role.id === execRole) != undefined) { // check if channel sent in is team commitments
        roles = message.mentions.roles.filter(role => role.id != execRole);
        // this should be the role which represents the project which a student is interested in.
        let mentionedRole = roles.first()
        // send message
        let replyChannel = message.guild.channels.cache.find(channel => channel.id === confirmChannel)
        replyChannel.send(`${message.author.toString()} is trying to apply for ${mentionedRole}. Hit ✅ to approve, or hit ❌ to deny.`)
            .then(reMessage => {
                const filter = (reaction, user) => {
                    return ['✅', '❌'].includes(reaction.emoji.name) && user.id !== reMessage.author.id;
                }
                reMessage.react('✅')
                    .finally(() => reMessage.react('❌'))
                reMessage.awaitReactions(filter, { max: 1, time: 3600000, errors: ['time'] })
                    .then(collected => {
                        const reaction = collected.first();

                        if (reaction.emoji.name === '✅') {
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
});

client.login(token);