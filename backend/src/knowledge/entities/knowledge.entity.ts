import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tag } from '../../tag/entities/tag.entity';

@Entity()
export class KnowledgeBase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'boolean', default: false })
  publishedCs: boolean;

  @Column({ type: 'varchar', length: 100, default: '' })
  titleCs: string;

  @Column({ type: 'varchar', length: 100, default: '' })
  subtitleCs: string;

  @Column({ type: 'varchar', default: '' })
  contentCs: string;

  @Column({ type: 'boolean', default: false })
  publishedEn: boolean;

  @Column({ type: 'varchar', length: 100, default: '' })
  titleEn: string;

  @Column({ type: 'varchar', length: 100, default: '' })
  subtitleEn: string;

  @Column({ type: 'varchar', default: '' })
  contentEn: string;

  @Column({ type: 'varchar', length: 300, default: '' })
  thumbnail: string;

  @Column({ type: 'int2', nullable: true, default: null })
  featuredPosition: number | null;

  // @ManyToMany(() => Tag, { eager: true })
  // @JoinTable()
  // tags: Tag[];

  @Column({ type: 'timestamp', default: new Date() })
  createdAt: Date;

  @Column({ type: 'timestamp', default: new Date() })
  updatedAt: Date;
}
