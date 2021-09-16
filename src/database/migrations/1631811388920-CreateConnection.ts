import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateConnection1631811388920 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
          name: 'connections',
          columns: [
              {
                  name: 'id',
                  type: 'uuid',
                  isPrimary: true,
                  generationStrategy: 'uuid',
                  default: 'uuid_generate_v4()',
              },
              {
                name: 'user_interest_id',
                type: 'uuid',
                isNullable: true
              },
              {
                name: 'user_interested_id',
                type: 'uuid',
                isNullable: true
              },
              {
                name: 'match',
                type: 'bool',
                isNullable: true
              },
              {
                name: 'created_at',
                type: 'timestamp',
                default: 'now()'
              },
              {
                name: 'updated_at',
                type: 'timestamp',
                default: 'now()'
              },
          ]
      })
    )

    await queryRunner.createForeignKey('connections', new TableForeignKey({
      name: 'ConnectionInterest',
      columnNames: ['user_interest_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }));

    await queryRunner.createForeignKey('connections', new TableForeignKey({
      name: 'ConnectionInterested',
      columnNames: ['user_interested_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('connections', 'ConnectionInterested');
    await queryRunner.dropForeignKey('connections', 'ConnectionInterest');
    await queryRunner.dropTable('connections');
  }

}
