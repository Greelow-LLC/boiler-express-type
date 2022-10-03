import { Base } from 'entities/base/Base';
import { Column, Entity } from 'typeorm';

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
