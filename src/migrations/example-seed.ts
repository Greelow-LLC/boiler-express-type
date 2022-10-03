import { Errors } from 'entities/Errors';
import { Users } from 'entities/Users';
import { AppDataSource } from 'ormconfig';
import { ErrorsSeed } from 'seeds/Errors.Seed';
import { UsersSeed } from 'seeds/Users.Seed';
import { MigrationInterface } from 'typeorm';

export class seed1655131781717 implements MigrationInterface {
  public async up(): Promise<void> {
    const users: any = UsersSeed;
    await AppDataSource.manager.save(Users, users);
    await AppDataSource.manager.save(Errors, ErrorsSeed);
  }

  public async down(): Promise<void> {
    await AppDataSource.manager.delete(Errors, {
      code: [1, 2, 3, 4, 5, 6, 7],
    });
    await AppDataSource.manager.delete(Users, {
      firstName: ['admin', 'active', 'inactive'],
    });
  }
}
