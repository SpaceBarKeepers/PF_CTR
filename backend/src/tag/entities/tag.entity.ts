import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, default: ''})
  tagEn: string;

  @Column({ type: 'varchar', length: 50, default: ''})
  tagCs: string;
}
