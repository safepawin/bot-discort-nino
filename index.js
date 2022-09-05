const { Client, GatewayIntentBits, } = require('discord.js');
const client = new Client({
    intents: [GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages,
    ]
});
const dotenv = require('dotenv')
dotenv.config();
const { START_MESSAGE, STOP_MESSAGE } = require('./config.json');

let isEnableNotify = false;
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', msg => {
    if (msg.author.bot) return;

    if (msg.content === "-+bot") {
        isEnableNotify = !isEnableNotify
        var currentdate = new Date();
        let noti = {
            hour: [
                4 - 1, 10 - 1, 16 - 1, 22 - 1
            ],
            min: [
                60 - 5, 30 - 5
            ]
        }
        let hourIndex = noti.hour.findIndex(hour => hour == currentdate.getHours())
        let minIndex = noti.min.findIndex(min => min == currentdate.getMinutes())

        let loop = setInterval(() => {
            if (currentdate.getSeconds() % 10 == 0) {
                if (hourIndex != -1 && minIndex != -1) {
                    msg.channel.send('@here อิก 5 นาที บอสจะมาแล้ว')
                }
            }
            if (!isEnableNotify) {
                clearInterval(loop)
            }
        }, 2000)
        msg.channel.send(isEnableNotify ? START_MESSAGE : STOP_MESSAGE)
    }

})


client.login(process.env.TOKEN);