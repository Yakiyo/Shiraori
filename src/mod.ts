import { Command } from './types.ts';

const comms = new Map<Command['data']['name'], Command>();

for await (const file of Deno.readDir('./src/commands')) {
	const command = await import(`./commands/${file.name}`).then((b) =>
		b.default as Command
	);
	comms.set(command.data.name, command);
}

export const commands = comms;
