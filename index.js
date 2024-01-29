const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const token = 'MTIwMDkzODgzNDc1NDU1NjAxNg.G5Voo1.OeahO1uZjA9Lm01fO2ilR5sC62fnFu-NeLxcHU';

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});
const targetWords = [
    '**nuked**',
    '*nuked*',
    '<u> nuked <u>',
    '~~nuked~~',
    'nuked',
    'uᴉʞǝu',
    'Nuked',
    'Ⓝⓤⓚⓔⓓ',
    '𝕟𝕦𝕜𝕖𝕕',
    '𝓷𝓾𝓴𝓮𝓭',
    'ℓųқɛɖ'
];


client.on('message', async(message) => {
    if (message.content === '!cn') {
        const foundChannel = message.guild.channels.cache.find(ch => {
            return targetWords.some(word => ch.name.toLowerCase().includes(word.toLowerCase()));
        });

        if (foundChannel && foundChannel.deletable) {
            await foundChannel.delete();
            message.channel.send('Deleted channel matching your criteria.');
        } else {
            message.channel.send('No channel found matching your criteria.');
        }
    }
});
const fs = require('fs');

client.on('message', async(message) => {
    if (message.content === '!save') {
        try {
            const channels = message.guild.channels.cache.map(channel => ({
                id: channel.id,
                name: channel.name,
                position: channel.position,
                type: channel.type,
                // Add other properties as needed (e.g., topic, permissions, etc.)
            }));

            fs.writeFileSync('channels.json', JSON.stringify(channels));
            message.channel.send('Channels saved successfully!');
        } catch (error) {
            console.error('Error saving channels:', error);
            message.channel.send('An error occurred while saving channels.');
        }
    } else if (message.content === '!load') {
        try {
            const savedChannels = JSON.parse(fs.readFileSync('channels.json'));

            for (const savedChannel of savedChannels) {
                const existingChannel = message.guild.channels.cache.get(savedChannel.id);
                if (!existingChannel) {
                    const newChannel = await message.guild.channels.create(savedChannel.name, {
                        type: savedChannel.type,
                        position: savedChannel.position,
                        // Set other properties based on saved data
                    });
                    console.log(`Created channel: ${newChannel.name}`);
                } else {
                    // Update existing channel properties if needed
                    console.log(`Channel already exists: ${existingChannel.name}`);
                }
            }

            message.channel.send('Channels loaded successfully!');
        } catch (error) {
            console.error('Error loading channels:', error);
            message.channel.send('An error occurred while loading channels.');
        }
    }
});
client.login(token);