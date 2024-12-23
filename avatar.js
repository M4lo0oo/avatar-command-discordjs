const { SlashCommandBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Displays the avatar of a user.')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user whose avatar to display')
        ),

    async execute(interaction) {
        try {
            const user = interaction.options.getUser('user') || interaction.user;
            const avatarUrl = user.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 });

            const embed = new EmbedBuilder()
                .setTitle(`${user.username}'s Avatar`)
                .setImage(avatarUrl)
                .setColor(0x0089D8)
                .setFooter({ text: 'Secury ©' });

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error displaying the avatar.', ephemeral: true });
        }
    }
};
