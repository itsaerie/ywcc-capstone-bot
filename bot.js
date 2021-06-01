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

    // try to listen
    try {
        client.commands.get('listener').execute(client, message, args);
    } catch (error) { }
});

client.login(token);