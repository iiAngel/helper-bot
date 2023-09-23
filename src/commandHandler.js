const { REST, Routes } = require("discord.js");
const fs = require("node:fs");
path = require("node:path");
const rest = new REST({ version: '10'}).setToken(process.env.BOT_TOKEN);

function applyCommands(commandsData, commandsCollection, commandsPath) {
	const commandFiles = fs.readdirSync(__dirname + commandsPath).filter(filePath => filePath.endsWith(".js"));
	let file;

	for (file of commandFiles) {
		const filePath = path.join(__dirname + commandsPath, file);
		const command = require(filePath);

		commandsData.push(command.commandData.toJSON());
		commandsCollection.set(command.commandData.name, command);
	}
}

async function reloadApplicationCommands(commandsCollection) {
	let commands = [];
	let success = true;
	let promiseErr = null;
	
	commandsCollection.forEach(element => {
		commands.push(element);
		console.log(`Loaded "${element.name}" command`);
	});

	rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body : commandsCollection })
	.catch((err) => {
		success = false;
		promiseErr = err;
	});

	return new Promise((resolve, reject) => {
		if (!success) {
			reject(promiseErr);
			return;
		}

		resolve(success);
	})
}

module.exports = {rest, reloadApplicationCommands, applyCommands}