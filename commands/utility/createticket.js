const { SlashCommandBuilder, ThreadAutoArchiveDuration, ChannelType } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('createticket')
        .setDescription('Creates a support ticket'),
    async execute(interaction) {
        const channel = interaction.channel;

        const thread = await channel.threads.create({
            name: 'test',
            autoArchiveDuration: ThreadAutoArchiveDuration.OneWeek,
            type: ChannelType.PrivateThread
        });

        console.log(`Created thread: ${thread.name}`);
    },
};