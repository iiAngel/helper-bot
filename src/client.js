const { Client, GatewayIntentBits, Collection } = require("discord.js")
const { config } = require("dotenv"); config();
const { applyCommands, reloadApplicationCommands } = require("./commandHandler")
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const commandsData = [];
const commands = new Collection();

applyCommands(commandsData, commands, "/commands/")
reloadApplicationCommands(commandsData)
.then(() => {
	console.log("Reloaded \"/\" commands!");
})
.catch((err) => {
	console.error(err);
});

client.on("interactionCreate", async interaction => {
	const command = commands.get(interaction.commandName);
	
	try {
		await command.execute(interaction);
	} catch(err) {
		console.error(err);
	}
});

client.on("ready", () => {
	console.log(`Logged as "${client.user.username}"!`)
})

client.login(process.env.BOT_TOKEN)