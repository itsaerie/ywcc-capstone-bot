module.exports = {
    name: 'purgeall',
    description: 'Purge all channels and roles.',
    execute(message, args) {
        var server = message.guild;
        var channels = server.channels;
        var roles = server.roles;

        var parentID = null;
        channels.cache.forEach(category => {
            if(category.type == 'category') {
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
        roles.cache.forEach(role => {
            role.delete()
                .catch(console.error);
        })

        console.log('done')
    },
};