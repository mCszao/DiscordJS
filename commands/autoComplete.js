const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('search')
        .setDescription('Procure algumas coisas')
        .addStringOption((option) =>
            option
                .setName('query')
                .setDescription('Phrase to search for')
                .setAutocomplete(true)
                .setRequired(true)
        ),
    async autocomplete(interaction) {
        const focusedValue = interaction.options.getFocused();
        const choices = [
            'Popular Topics: Threads',
            'Sharding: Getting started',
            'Library: Voice Connections',
            'Interactions: Replying to slash commands',
            'Popular Topics: Embed preview',
        ];
        const filtered = choices.filter((choice) =>
            choice.startsWith(focusedValue)
        );
        await interaction.respond(
            filtered.map((choice) => ({ name: choice, value: choice }))
        );
    },
    async execute(interaction) {
        const option = interaction.options.getString('query');
        await interaction.reply({
            content: `ce selecionou o tema "${option}"`,
        });
    },
};
