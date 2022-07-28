import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export abstract class Base extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    select: false,
    type: 'timestamp',
    transformer: {
      from: (value?: Date | null) =>
        value === undefined || value === null
          ? value
          : new Date(value).getTime(),
      to: (value?: string | null) => value,
    },
  })
  createdAt: Date;

  @UpdateDateColumn({
    select: false,
    type: 'timestamp',
    transformer: {
      from: (value?: Date | null) =>
        value === undefined || value === null
          ? value
          : new Date(value).getTime(),
      to: (value?: string | null) => value,
    },
  })
  updatedAt: Date;

  @DeleteDateColumn({
    select: false,
    type: 'timestamp',
    transformer: {
      from: (value?: Date | null) =>
        value === undefined || value === null
          ? value
          : new Date(value).getTime(),
      to: (value?: string | null) => value,
    },
  })
  deletedAt: Date;
}
