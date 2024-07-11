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
                    { name: 'General Questions', value: 'general_question' },
                    { name: 'Address Change', value: 'address_change' },
                    { name: 'Order Status', value: 'order_status' },
                    { name: 'Incorrect or Damaged Item', value: 'defective_item' },
                    { name: 'Expedited Order Request', value: 'expedited_request' },
                    { name: 'Product Design Request', value: 'product_design_request' }
                )
        ),
    async execute(interaction) {
        // Fetch the #support-tickets channel. 1260666089407250516 is the channel id
        const channel = await interaction.guild.channels.fetch('1260666089407250516');
        const dateTimeHex = Date.now().toString(16).toUpperCase();
        const thread = await channel.threads.create({
            name: `#C-${dateTimeHex}`,
            autoArchiveDuration: ThreadAutoArchiveDuration.OneWeek,
            type: ChannelType.PrivateThread
        });
        const modTeamRoleId = '1255930753016139838';

        const modMembersRole = await thread.guild.roles.fetch(modTeamRoleId);
        const modMembers = modMembersRole.members;
        console.log(modMembersRole);
        modMembers?.forEach(async member => {
            await thread.members.add(member.id);
        });
        await thread.members.add(interaction.user.id);
        await interaction.reply({ content: `A new ticket has been created. You can view it here <#${thread.id}>`, ephemeral: true })

        const reason = interaction.options.getString('reason');

        switch (reason) {
            case 'general_question':
                thread.send(`What's your question?`);
                break;
            case 'address_change':
                thread.send(`What's the new address you'd like us to ship your order to?`);
                break;
            case 'order_status':
                thread.send(`What's the order number you want to get the status of?`)
                break;
            case 'defective_item':
                thread.send(`Please describe what's going on with your order.`)
                break;
            case 'expedited_request':
                thread.send(`When do you need your order by? While we can't guarantee anything, we will do what we can!`)
                break;
            case 'product_design_request':
                thread.send(`What would you like to have made? Please provide any details such as product and artwork you have.`)
                break;
        }

        thread.send(`For future reference, your ticket number is \`#C-${dateTimeHex}\``)
    },
};