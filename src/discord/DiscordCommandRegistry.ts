import { Message } from "discord.js";

import { DiscordCommand } from "./DiscordCommand";
import { DiscordCommandType } from "./DiscordCommandType";
import { DiscordCommandDependencies } from "../definitions/dependencies/DiscordCommandDependencies";

import { TopModeratorDiscordCommand } from "./aggregate/TopModeratorDiscordCommand";
import { TopOffenderDiscordCommand } from "./aggregate/TopOffenderDiscordCommand";

export class DiscordCommandRegistry {
  private static getRegistry(): Map<string, DiscordCommand> {
    const registry = new Map<DiscordCommandType, DiscordCommand>();
    registry.set(DiscordCommandType.TOP_MODERATOR, TopModeratorDiscordCommand.prototype);
    registry.set(DiscordCommandType.TOP_OFFENDER, TopOffenderDiscordCommand.prototype);
    return registry;
  }

  public static getCommand(command: string, args: Array<string>, message: Message, dependencies: DiscordCommandDependencies): DiscordCommand | null {
    const registry = this.getRegistry();

    const CommandForType = registry.get(command.toLowerCase());
    if (!CommandForType) return null;

    const ReflectedCommand = Object.create(CommandForType);
    return new ReflectedCommand.constructor(dependencies, command, args, message);
  }
}
