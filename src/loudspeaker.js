// Description
//   Hubot script that posts a message in all channels it is in. Used to get a message to multiple channels.
//
// Configuration:
//   Node 10.6.0+
//
// Commands:
//   hubot Announcement: <query> - Start conversation on announcment for query text
//
// Notes:
//   Works for private and public slack channels.
//   Starting announcement conversation requires to be in a DM with bot
//
// Author:
//   Stephen Ferrari <stephen.ferrari14@gmail.com>


ANNOUNCEMENT_REGEX = /^announcement: (.*)/i
ACCEPTABLE_RESPONSES_REGEX = /^(?:Yes\b|yes\b)/i

module.exports = (robot) => {
    robot.respond(/(.*)/i, (resStart) => {
        const userMessage = resStart.message.rawMessage.text;

        if (userMessage.match(ANNOUNCEMENT_REGEX)) {
            if (resStart.message.room.substring(0,1) == 'D') {
                resStart.reply(`Are you sure?\nMessage preview:\n>Announcement! ${resStart.message.user.real_name} says ${userMessage.match(/Announcement: (.*)/i)[1]}`);
                return;
            }
            resStart.reply('Sorry loudspeaker bot only works in direct messages.');
            return;
        }

        if (userMessage.match(ACCEPTABLE_RESPONSES_REGEX)) {
            robot.adapter.client.web.conversations.history(resStart.message.room, 3).then(res => {
                const confirmRegex = /(Are you sure?).*/i
                const confirmMatches = confirmRegex.exec(res.messages[1].text);
                // Change check if it from yourself
                if (confirmMatches && confirmMatches.length > 0) {
                    const statement = res.messages[2].text;
                    robot.adapter.client.web.conversations.list({types: 'public_channel,private_channel'})
                    .then(res => {
                        const allChannels = res.channels.filter(channel => channel.is_member);
                        allChannels.forEach(channel => {
                            robot.messageRoom(channel.id, `Announcement! ${resStart.message.user.real_name} says ${statement.match(/Announcement: (.*)/i)[1]}`);
                        });
                    });
                }
            });
        }
    });
}
