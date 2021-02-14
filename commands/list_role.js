// unfinished
module.exports = {
    name: 'list_role',
    description: 'List all roles',
    execute(message, args) {
        const roleList = Project.findAll({ attributes: ['name'] })
        Object.values(roleList).map(role => console.log(role))
        const roleString = Object.values(roleList).map(t => t.name).join(', ') || 'Nothing';
        return message.channel.send(`List is: ${roleString}`);
    },
};