import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Events {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'boolean', default: false })
  publishedCs: boolean;

  @Column({ type: 'varchar', length: 100, default: '' })
  titleCs: string;

  @Column({ type: 'boolean', default: false })
  publishedEn: boolean;

  @Column({ type: 'varchar', length: 100, default: '' })
  titleEn: string;

  @Column({ type: 'date', default: new Date() })
  eventAt: Date;

  @Column({ type: 'varchar', nullable: true })
  eventTimeAt: string;

  @Column({ type: 'varchar', nullable: true })
  location: string;
}
