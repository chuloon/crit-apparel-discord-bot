const { EmbedBuilder } = require("@discordjs/builders");
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('embed')
        .setDescription('Creates the channel embed to post helpful messages'),
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor(0xF8FF02)
            .setTitle("How to use Ticket Critter")
            .setDescription("Create support tickets and more!")
            .addFields(
                { name: "Basic Usage", value: "Using slash commands, you can create support tickets to get help and set your server nickname" },
                { name: "Create a ticket", value: "Use the \`/createticket\` command to create a support ticket. Expected field: Reason for creating the ticket", inline: true },
                { name: "Register yourself", value: "Use the \`/register\` command to set your name in the server so we know who you are. Expected fields: first/last name*, organization*, and gamer tag" }
            )
            .setImage("https://cdn.discordapp.com/attachments/1222641546634203186/1260665130945871903/Lime_Letter.png?ex=66a53d65&is=66a3ebe5&hm=189a83638f0c9bcc26583783f83cfd977e16999c524afebda55ba49839271aef&")
            .setFooter({ text: 'To play your best, you have to wear the best', iconURL: "https://cdn.discordapp.com/attachments/1222641546634203186/1260665130945871903/Lime_Letter.png?ex=66a53d65&is=66a3ebe5&hm=189a83638f0c9bcc26583783f83cfd977e16999c524afebda55ba49839271aef&" });

        await interaction.channel.send({ embeds: [embed] });
        await interaction.reply({ content: "Embed sent", ephemeral: true });
    }
}