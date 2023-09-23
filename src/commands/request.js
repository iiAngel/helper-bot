const { SlashCommandBuilder } = require("discord.js");
const commandData = new SlashCommandBuilder();

commandData.setName("request");
commandData.setDescription("Sends an HTTP request to a certain website!");

async function execute(interaction, isMessage) {

    let messageContent = ""

    if (isMessage) messageContent = interaction.content
    if (!isMessage) messageContent = interaction.message.content

    

	await interaction.reply(`${messageContent}`)
}

module.exports = { commandData, execute };