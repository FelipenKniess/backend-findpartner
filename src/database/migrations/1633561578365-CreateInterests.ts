import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateInterests1633561578365 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'interests',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'description',
                        type: 'varchar',
                        isUnique: true
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

        await queryRunner.createTable(
            new Table({
                name: 'user_interest',
                columns: [
                    {
                        name: 'user_id',
                        type: 'uuid',
                    },
                    {
                        name: 'interest_id',
                        type: 'uuid',
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

        await queryRunner.createForeignKey('user_interest', new TableForeignKey({
            name: 'User',
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        }));

        await queryRunner.createForeignKey('user_interest', new TableForeignKey({
            name: 'Interest',
            columnNames: ['interest_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'interests',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('user_interest', 'Interest');
        await queryRunner.dropForeignKey('user_interest', 'User');
        await queryRunner.dropTable('interests');
        await queryRunner.dropTable('user_interest');
    }

}
