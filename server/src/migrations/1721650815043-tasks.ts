import { MigrationInterface, QueryRunner } from "typeorm";

export class Tasks1721650815043 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        --Table Definition
        CREATE TABLE "task"  (
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
            "title" character varying NOT NULL,
            "description" character varying,
            "status" VARCHAR,
            "priority" VARCHAR,
            "deadline" TIMESTAMP,
            "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
            "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
            "userId" uuid,
            CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"),
            CONSTRAINT "FK_task_user" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL
          )
          
          
          
          
          
          `),
      undefined;
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "tasks"`, undefined);
  }
}
