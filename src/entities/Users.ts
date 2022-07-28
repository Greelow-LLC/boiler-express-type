import {
  Entity,
  Column,
  JoinColumn,
  ManyToOne,
  OneToMany,
  Timestamp,
  OneToOne,
} from 'typeorm';
import { Base } from './base/Base';

@Entity()
export class Users extends Base {
  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({ nullable: false })
  phone: string;

  @Column({ default: false })
  isAdmin: boolean;

  @Column({
    type: 'timestamp',
    nullable: false,
    transformer: {
      from: (value?: Date | null) =>
        value === undefined || value === null
          ? value
          : new Date(value).getTime(),
      to: (value?: string | null) => value,
    },
  })
  dateOfBirth: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
    default: null,
    transformer: {
      from: (value?: Date | null) =>
        value === undefined || value === null
          ? value
          : new Date(value).getTime(),
      to: (value?: string | null) => value,
    },
  })
  lastPurchase: Date;

  @Column({ nullable: false })
  address: string;

  @Column({ nullable: true })
  deviceToken: string;
}
