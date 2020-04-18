import { PostgresDriver } from "../services/PostgresDriver";

import { ModerationLogRepository } from "./ModerationLogRepository";

export class RepositoryRegistry {
  public readonly moderationLogRepository: ModerationLogRepository;

  constructor(postgresDriver: PostgresDriver) {
    this.moderationLogRepository = new ModerationLogRepository(postgresDriver);
  }
}
