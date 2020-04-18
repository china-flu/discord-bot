import { RepositoryRegistry } from "../../repository/RepositoryRegistry";
import { DiscordService } from "../../services/DiscordService";

export interface DiscordCommandDependencies {
  repositoryRegistry: RepositoryRegistry;
  discordService: DiscordService;
}
