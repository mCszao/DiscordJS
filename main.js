const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');

const dotenv = require('dotenv').config();
const { TOKEN, CLIENT_ID, GUILD_ID } = process.env;

const fs = require('node:fs');
const path = require('node:path');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith('.js'));

commandFiles.forEach((file) => {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if (command.data && command.execute) {
        client.commands.set(command.data.name, command);
    } else {
        console.log(`O comando em ${filePath} não possui data ou execute`);
    }
});

console.log(client.commands);

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, (c) => {
    console.log(`Ready! Logged in as ${c.user.tag}`);
});

// Log in to Discord with your client's token
client.login(TOKEN);

//função para criar mensagens unicas
function CreateEphemeral(content) {
    return { content, ephemeral: true };
}
//listenner
client.on(Events.InteractionCreate, async (interaction) => {
    if (interaction.isAutocomplete()) {
        const command = interaction.client.commands.get(
            interaction.commandName
        );

        if (!command) {
            console.error(
                `No command matching ${interaction.commandName} was found.`
            );
            return;
        }

        try {
            await command.autocomplete(interaction);
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
        }
    }

    if (interaction.isChatInputCommand()) {
        const command = interaction.client.commands.get(
            interaction.commandName
        );

        if (!command) {
            console.error(
                `O comando ${interaction.commandName} não possui interação`
            );
        }
        if (interaction.commandName === 'ping') {
            try {
                await command.execute(interaction);
                await interaction.followUp(
                    CreateEphemeral('Só mais uminha po')
                );
            } catch (error) {
                console.error(error);
                await interaction.reply(
                    'Parece que estamos com problemas para executar esse comando, tente mais tarde!'
                );
            }
        }
        if (interaction.commandName === 'welcome') {
            try {
                await command.execute(interaction);
                await interaction.followUp(
                    CreateEphemeral(
                        'Você está sendo observado pelo StudyFlix, estudar é o caralho'
                    )
                );
            } catch (error) {
                await interaction.reply(
                    'Parece que estamos com problemas para executar esse comando, tente mais tarde!'
                );
            }
        }
    }
});
