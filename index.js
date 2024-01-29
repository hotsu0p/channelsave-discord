const fs = require('fs');

function saveChannels(guild, filePath) {
    const savedData = {
        channels: [],
        categories: [],
    };

    guild.channels.cache.forEach(channel => {
        savedData.channels.push({
            id: channel.id,
            name: channel.name,
            position: channel.position,
            type: channel.type,
        });
    });

    guild.channels.cache
        .filter(channel => channel.type === 'GUILD_CATEGORY')
        .forEach(category => {
            savedData.categories.push({
                id: category.id,
                name: category.name,
            });
        });

    fs.writeFileSync(filePath, JSON.stringify(savedData));
    console.log('Channels and categories saved successfully!');
}

function loadChannels(guild, filePath) {
    try {
        const savedData = JSON.parse(fs.readFileSync(filePath));

        savedData.channels.forEach(savedChannel => {
            const existingChannel = guild.channels.cache.find(channel => channel.id === savedChannel.id || channel.name === savedChannel.name);
            if (!existingChannel) {
                guild.channels.create(savedChannel.name, {
                    type: savedChannel.type,
                    position: savedChannel.position,
                });
            }
        });

        savedData.categories.forEach(savedCategory => {
            const existingCategory = guild.channels.cache.find(channel => channel.id === savedCategory.id || channel.name === savedCategory.name);
            if (!existingCategory) {
                guild.channels.create(savedCategory.name, {
                    type: 'GUILD_CATEGORY',
                });
            }
        });

        console.log('Channels and categories loaded successfully!');
    } catch (error) {
        console.error('Error loading channels and categories:', error);
    }
}

module.exports = { saveChannels, loadChannels };