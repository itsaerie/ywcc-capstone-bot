var fs = require('fs');

module.exports = {
    name: 'members',
    description: 'Export list of users to a temporary file',
    execute(message, args) {
        console.log('member count', message.guild.memberCount)
        fs.unlink('../stats/memberlist.csv', function (err) {
            if(err) throw err;
        })
        message.guild.members.fetch()
            .then(memberList => {
                memberList.forEach(member => {
                    if(!member.user.bot) {
                        fs.appendFile('../stats/memberlist.csv', (member.user.username + "," + member.displayName + "," + member.user.id + "\n"), function (err) {
                            if (err) throw err;
                        });
                    }
                })
            })
            .catch(console.error)
    },
};