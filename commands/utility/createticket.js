const { SlashCommandBuilder, ThreadAutoArchiveDuration, ChannelType } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('createticket')
        .setDescription('Creates a support ticket')
        .addStringOption(option =>
            option
                .setName('reason')
                .setDescription('What can we help you with?')
                .setRequired(true)
                .addChoices(
                    { name: 'Address Change', value: 'address_change' },
                    { name: 'Order Status', value: 'order_status' },
                    { name: 'Incorrect or Damaged Item', value: 'defective_item' },
                    { name: 'Expedited Order Request', value: 'expedited_request' },
                    { name: 'Product Design Request', value: 'product_design_request' },
                    { name: 'General Questions', value: 'general_question' },
                )
        ),
    async execute(interaction) {
        // Fetch the #support-tickets channel. 1260666089407250516 is the channel id
        const channel = await interaction.guild.channels.fetch('1260666089407250516');

        const thread = await channel.threads.create({
            name: 'test',
            autoArchiveDuration: ThreadAutoArchiveDuration.OneWeek,
            type: ChannelType.PrivateThread
        });
        await thread.members.add(interaction.user.id);
        await interaction.reply({ content: `A new ticket has been created. You can view it here <#${thread.id}>`, ephemeral: true })
        console.log(`Created thread: ${interaction}`);

    },
};