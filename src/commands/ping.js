const { SlashCommandBuilder } = require("discord.js");
const commandData = new SlashCommandBuilder();

commandData.setName("ping");
commandData.setDescription("says \"Pong!\"");

async function execute(interaction, isMessage) {
	await interaction.reply(`Pong! :ping_pong: `)
}

module.exports = { commandData, execute };