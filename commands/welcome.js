const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('welcome')
        .setDescription('Boas vindas para os iniciantes'),

    async execute(interaction) {
        await interaction.reply(
            'Seja bem vindo a savana onde o filho chora e a  mãe não vê'
        );
    },
};
