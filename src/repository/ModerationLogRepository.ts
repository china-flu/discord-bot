import { Repository } from "./Repository";

export class ModerationLogRepository extends Repository {
  public async getTopModerators(action: string, floorTimestamp: string): Promise<Array<any>> {
    const statement = "SELECT u.username as username, count(*) as count FROM moderation_logs ml INNER JOIN users u on ml.moderator_user_id = u.user_id " +
      "WHERE log_timestamp > $1 AND action = $2 " +
      "GROUP BY ml.moderator_user_id, u.username ORDER BY count(*) DESC LIMIT 10";
    const results = await this.postgresDriver.query(statement, [floorTimestamp, action]);
    return results.rows;
  }

  public async getTopOffenders(action: string, floorTimestamp: string): Promise<Array<any>> {
    const statement = "SELECT u.username as username, count(*) as count FROM moderation_logs ml INNER JOIN users u on ml.affected_user_id = u.user_id " +
      "WHERE log_timestamp > $1 AND action = $2 " +
      "GROUP BY ml.affected_user_id, u.username ORDER BY count(*) DESC LIMIT 10";
    const results = await this.postgresDriver.query(statement, [floorTimestamp, action]);
    return results.rows;
  }
}
