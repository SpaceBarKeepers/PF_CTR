import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Page {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'varchar', default: '' })
  contentCs: string;

  @Column({ type: 'varchar', default: '' })
  contentEn: string;

  @Column({ type: 'timestamp', default: new Date() })
  updatedAt: Date;
}
