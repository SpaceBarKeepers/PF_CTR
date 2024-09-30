import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 200, default: '' })
  tagEn: string;

  @Column({ type: 'varchar', length: 200, default: '' })
  tagCs: string;
}
