import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSuggestionColumnToTask1722326143793
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "task"
        ADD COLUMN "suggestion" VARCHAR
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "task"
      DROP COLUMN "suggestion"
    `);
  }
}
