var fs = require('fs');

module.exports = {
    name: 'memberswithrole',
    description: 'Export list of users to a temporary file',
    execute(message, args) {
        console.log('member count', message.guild.memberCount)
        fs.unlink('../stats/rolememberlist.csv', function (err) {
            if (err) throw err;
        })
        message.guild.members.fetch()
            .then(memberList => {
                memberList.forEach(member => {
                    let datString = member.user.username + "," + member.displayName + "," + member.user.id + ",";
                    let roles = member.roles.cache.array();
                    let roleCount = 0;
                    let isStudent = false;
                    let rolenames = []
                    for (role in roles) {
                        if (roles[role].name === "Students" || roles[role].name === "Graduate Students") {
                            isStudent = true;
                            continue;
                        }
                        if (roles[role].name === "@everyone" || roles[role].name === "Project Managers") {
                            continue;
                        }
                        roleCount++;
                        rolenames.push(roles[role].name)
                    }
                    if (!member.user.bot && isStudent) {
                        console.log("--------------------------------------------")
                        rolenames.sort();
                        console.log(rolenames);
                        for (role in rolenames) {
                            datString = datString + roles[role].name + ","
                        }
                        datString = datString + "\n"
                        fs.appendFile('../stats/rolememberlist.csv', datString, function (err) {
                            if (err) throw err;
                        });
                    }
                })
            })
            .catch(console.error)
    },
};