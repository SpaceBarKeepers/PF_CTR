import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class KnowledgeBase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'boolean', default: false })
  publishedCs: boolean;

  @Column({ type: 'varchar', length: 800, default: '' })
  titleCs: string;

  @Column({ type: 'varchar', length: 800, default: '' })
  subtitleCs: string;

  @Column({ type: 'varchar', default: '' })
  contentCs: string;

  @Column({ type: 'boolean', default: false })
  publishedEn: boolean;

  @Column({ type: 'varchar', length: 800, default: '' })
  titleEn: string;

  @Column({ type: 'varchar', length: 800, default: '' })
  subtitleEn: string;

  @Column({ type: 'varchar', default: '' })
  contentEn: string;

  @Column({ type: 'varchar', default: '' })
  thumbnail: string;

  @Column({ type: 'int2', nullable: true, default: null })
  featuredPosition: number | null;

  @Column({ type: 'timestamp', default: new Date() })
  createdAt: Date;

  @Column({ type: 'timestamp', default: new Date() })
  updatedAt: Date;
}
