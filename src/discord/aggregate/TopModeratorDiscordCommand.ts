import { MessageEmbed } from "discord.js";
import { DateTime } from "luxon";

import { DiscordCommand } from "../DiscordCommand";
import { DiscordCommandType } from "../DiscordCommandType";

const { DISCORD_PREFIX } = process.env;

export class TopModeratorDiscordCommand extends DiscordCommand {
  public async validate(): Promise<boolean> {
    if (this.args.length !== 2) {
      await this.message.channel.send(`Usage: \`${DISCORD_PREFIX}${DiscordCommandType.TOP_MODERATOR} <action> <day|week>\``);
      return false;
    }
    if (this.args[1].toLowerCase() !== "day" && this.args[1].toLowerCase() !== "week") {
      await this.message.channel.send(`Usage: \`${DISCORD_PREFIX}${DiscordCommandType.TOP_MODERATOR} <action> <day|week>\``);
      return false;
    }
    return true;
  }

  public async execute(): Promise<void> {
    const { moderationLogRepository } = this.dependencies.repositoryRegistry;

    const lookbackDays = this.args[1].toLowerCase() === "day" ? 1 : 7;
    const floorDate = DateTime.utc().minus({ days: lookbackDays }).toFormat("yyyy-MM-dd");
    const leaderboard = await moderationLogRepository.getTopModerators(this.args[0], floorDate);

    const embed = new MessageEmbed()
      .setColor("#d4443f")
      .setTitle("Top Moderators")
      .setDescription(`Top moderators in the last ${this.args[1]} for ${this.args[0].toLowerCase()}!`)
      .setTimestamp();

    leaderboard.forEach(({ username, count }, index) => {
      embed.addField(`${index + 1}. ${username}`, count, true);
    });

    await this.message.channel.send(embed);
  }
}
