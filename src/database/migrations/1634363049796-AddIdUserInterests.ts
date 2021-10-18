import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddIdUserInterests1634363049796 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.addColumn('user_interest', new TableColumn({
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('user_interest', 'id')
    }

}
