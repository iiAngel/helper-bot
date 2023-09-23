const { SlashCommandBuilder, SlashCommandUserOption } = require("discord.js");
const commandData = new SlashCommandBuilder();
const userOption = new SlashCommandUserOption();

userOption.setName("user")
userOption.setDescription("User to ping")
userOption.setRequired(true)

commandData.setName("ping_user");
commandData.setDescription("Pings an user");
commandData.addUserOption(userOption)

async function execute(interaction) {
	await interaction.reply(`${interaction.options.getUser('user')}`)
}

module.exports = { commandData, execute };