const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('register')
        .setDescription('Register yourself so we know who you are')
        .addStringOption(option =>
            option
                .setName('first')
                .setDescription('Your first name')
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName('last')
                .setDescription('Your last name')
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName('alias')
                .setDescription('Your alias or screen name')
                .setRequired(false)
        )
        .addStringOption(option =>
            option
                .setName('org')
                .setDescription('Your organization')
                .setRequired(false)
        ),
    async execute(interaction) {
        const firstName = interaction.options.getString('first');
        const lastName = interaction.options.getString('last');
        const alias = interaction.options.getString('alias');
        const org = interaction.options.getString('org');

        const nickname = `${firstName}${alias ? ' "' + alias + '"' : ''} ${lastName}${org ? ' - ' + org : ''}`

        await interaction.member.setNickname(nickname);
        await interaction.reply({ content: 'Thanks for registering! If you need to change anything in the future, just run the \`/register\` command again.', ephemeral: true })
    }
}