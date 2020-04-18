import { PostgresDriver } from "./services/PostgresDriver";
import { DiscordService } from "./services/DiscordService";
import { RepositoryRegistry } from "./repository/RepositoryRegistry";

import { DiscordCommandListener } from "./discord/DiscordCommandListener";
import { DiscordCommandDependencies } from "./definitions/dependencies/DiscordCommandDependencies";

export class Application {
  private readonly discordService: DiscordService;
  private readonly postgresDriver: PostgresDriver;

  public constructor() {
    this.discordService = new DiscordService();
    this.postgresDriver = new PostgresDriver();

    const repositoryRegistry = new RepositoryRegistry(this.postgresDriver);

    const dependencies = { discordService: this.discordService, repositoryRegistry: repositoryRegistry };

    this.bindListeners(dependencies);
  }

  private bindListeners(dependencies: DiscordCommandDependencies): void {
    new DiscordCommandListener(dependencies);
  }

  public async start(): Promise<void> {
    await this.postgresDriver.start();
    console.log("Connected to DB");
    await this.discordService.start();
    console.log("Connected to Discord");
  }

  public async stop(): Promise<void> {
    this.discordService.stop();
    await this.postgresDriver.stop();
  }
}
