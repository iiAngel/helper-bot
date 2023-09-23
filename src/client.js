const { Client, GatewayIntentBits, Collection } = require("discord.js")
const { config } = require("dotenv"); config();
const { applyCommands, reloadApplicationCommands } = require("./commandHandler")
const client = new Client({ intents: [
	GatewayIntentBits.Guilds,
	GatewayIntentBits.GuildMessages,
	GatewayIntentBits.MessageContent
]});

const commandsData = [];
const commands = new Collection();

// Bot config
const PREFIX = "#!"

applyCommands(commandsData, commands, "/commands/")
reloadApplicationCommands(commandsData)
.then(() => {
	console.log("Reloaded \"/\" commands!");
})
.catch((err) => {
	console.error(err);
});

// An old handler
client.on("messageCreate", async message => {
	if (message.author.bot) return

	if (!message.content.startsWith(PREFIX)) return

	const splitted = message.content.split(" ")[0]
	const final = splitted.substring(PREFIX.length, splitted.length)
	const command = commands.get(final)
	
	if (!command) {
		let responseText = "";

		if (final.length > 15) responseText = "Command \""+ final.substring(0, 15) +"...\" does not exists!"
		else responseText = "Command \""+ final +"\" does not exists!"
		
		await message.reply(responseText);

		return;
	};

	try {
		await command.execute(message, true);
	} catch(err) {
		console.error(err);
	}
})

// This is what Discord says that needs to be
client.on("interactionCreate", async interaction => {
	const command = commands.get(interaction.commandName);

	if (!command) interaction.reply("Command \"" + interaction.commandName + "\" does not exists!");

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