const { Client, Intents } = require('discord.js');
const { saveChannels, loadChannels } = require('./index.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});
client.on('messageCreate', async(message) => {
    if (message.content === '!save') {
        saveChannels(message.guild, 'channels.json');
        message.channel.send('Channels and categories saved successfully!');
    } else if (message.content === '!load') {
        loadChannels(message.guild, 'channels.json');
        message.channel.send('Channels and categories loaded successfully!');
    }
});

client.login('MTIwMDkzODgzNDc1NDU1NjAxNg.GHN6ce.SZYMaQEy7zkjj0zk7HWLuY63Yq8avqV9VBg0Xo');