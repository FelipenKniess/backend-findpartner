import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateAddressUser1633802839274 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'address',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'uf',
                        type: 'varchar',
                    },
                    {
                        name: 'street',
                        type: 'varchar',
                    },
                    {
                        name: 'district',
                        type: 'varchar',
                    },
                    {
                        name: 'city',
                        type: 'varchar',
                    },
                    {
                        name: 'number',
                        type: 'varchar',
                    },
                    {
                        name: 'longitude',
                        type: 'varchar',
                    },
                    {
                        name: 'latitude',
                        type: 'varchar',
                    },
                    {
                        name: 'user_id',
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

        await queryRunner.createForeignKey('address', new TableForeignKey({
            name: 'User',
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('address', 'User');
        await queryRunner.dropTable('address');
    }

}
