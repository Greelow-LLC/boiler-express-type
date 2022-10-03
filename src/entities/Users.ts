import { Base } from 'entities/base/Base';
import { Entity, Column } from 'typeorm';

@Entity()
export class Users extends Base {
  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({ nullable: false })
  phone: string;
}
