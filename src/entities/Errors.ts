import { Column, Entity } from 'typeorm';
import { Base } from './base/Base';

@Entity()
export class Errors extends Base {
  @Column({
    type: 'int',
  })
  code: number;

  @Column({
    type: 'int',
  })
  status: number;

  @Column({
    type: 'varchar',
    length: 255,
  })
  descri: string;
}
