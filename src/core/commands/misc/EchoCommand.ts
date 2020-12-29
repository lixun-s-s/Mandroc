/*
 * Copyright (c) MenuDocs 2020.
 * You may not share this code outside of the MenuDocs Team unless given permission by Management.
 */

import { adminCommand, Embed, MandrocCommand } from "@lib";
import type { Message } from "discord.js";

@adminCommand("echo", {
  aliases: ["echo", "say", "repeat"],
  description: {
    content: "Makes the bot repeat after you",
    examples: (prefix: string) => [`${prefix}echo -e R1zeN > 2D`],
  },
  args: [
    {
      id: "embed",
      match: "flag",
      flag: ["-e", "--embed"]
    },
    {
      id: "content",
      match: "rest",
      prompt: {
        start: "Please provide some content for me to repeat.",
        retry: "Please try again ... Example: `!echo -e Connor is a nice man`"
      }
    }
  ]
})
export default class EchoCommand extends MandrocCommand {
  public async exec(message: Message, { embed, content }: args) {
    if (message.deletable) await message.delete();
    return embed ? message.util?.send(Embed.Primary(content)) : message.util?.send(content);
  }
}

type args = {
  embed: boolean;
  content: string;
}