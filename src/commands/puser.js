const { SlashCommandBuilder, SlashCommandUserOption } = require("discord.js");
const commandData = new SlashCommandBuilder();
const userOption = new SlashCommandUserOption();

userOption.setName("user");
userOption.setDescription("User to ping");
userOption.setRequired(true);

commandData.setName("ping_user");
commandData.setDescription("Pings an user");
commandData.addUserOption(userOption);

async function execute(interaction, isMessage) {
	if (isMessage) {
		let str = "";
		let count = 0;

		interaction.mentions.members.forEach(element => {
			str += "<@" + element.user.id + "> ";
			count++;
		});

		if (count>1) {
			await interaction.reply(`${str}fueron pingeados por <@${interaction.author.id}>`)
		} else {
			await interaction.reply(`${str}fuiste pingeado por <@${interaction.author.id}>`)
		}

		return
	}

	await interaction.reply(`<@${interaction.options.getUser('user').id}> fuiste pingeado por "${interaction.user.username}"`)
}

module.exports = { commandData, execute };