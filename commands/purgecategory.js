module.exports = {
    name: 'purgecategory',
    description: 'Purge a category and all of its sub-channels',
    execute(message, args) {
        const guildid = message.guild.id;
        var server = message.guild;
        var channels = server.channels;

        var categoryName = args[0];
        var parentID = null;
        channels.cache.forEach(category => {
            if(category.type == 'category' && category.name.toLowerCase() == categoryName.toLowerCase()) {
                parentID = category.id
                channels.cache.forEach(channel => {
                    if(channel.parentID == parentID) {
                        console.log(channel.name);
                        channel.delete()
                            .catch(console.error);
                    }
                })
                category.delete()
                    .catch(console.error);
            }
        })

        message.channel.send('done')
    },
};