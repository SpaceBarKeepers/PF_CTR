import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Feed {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date', default: new Date() })
  date: Date;

  @Column({ type: 'varchar', length: 200, default: '' })
  titleCs: string;

  @Column({ type: 'varchar', length: 200, default: '' })
  titleEn: string;

  @Column({ type: 'varchar', length: 300, default: '' })
  url: string;
}
