import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Tools {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  toolsName: string;

  @Column({ type: 'varchar', length: 500, default: '' })
  descEn: string;

  @Column({ type: 'varchar', length: 500, default: '' })
  descCS: string;

  @Column({ type: 'varchar', array: true, default: [] })
  featuresEn: string[];

  @Column({ type: 'varchar', array: true, default: [] })
  featuresCs: string[];

  @Column({ type: 'varchar', length: 200, default: '' })
  dataProtectionEn: string;

  @Column({ type: 'varchar', length: 200, default: '' })
  dataProtectionCs: string;

  @Column({ type: 'varchar', length: 200, default: '' })
  authenticationEn: string;

  @Column({ type: 'varchar', length: 200, default: '' })
  authenticationCs: string;

  @Column({ type: 'varchar', length: 300, default: '' })
  nextProductUpdateEn: string;

  @Column({ type: 'varchar', length: 300, default: '' })
  nextProductUpdateCs: string;

  @Column({ type: 'varchar', array: true, default: [] })
  feedEn: string[];

  @Column({ type: 'varchar', array: true, default: [] })
  feedCs: string[];

  @Column({ type: 'int2', array: true, default: [] })
  accessibilityTag: number[];

  @Column({ type: 'varchar', length: 100, default: '' })
  established: string;

  @Column({ type: 'varchar', length: 100, default: '' })
  noOfClients: string;

  @Column({ type: 'varchar', length: 300, default: '' })
  team: string;

  @Column({ type: 'varchar', length: 100, default: '' })
  email: string;

  @Column({ type: 'varchar', length: 100, default: '' })
  phone: string;

  @Column({ type: 'varchar', length: 100, default: '' })
  web: string;

  @Column({ type: 'varchar', array: true, default: [] })
  countries: string[];

  @Column({ type: 'varchar', length: 300, default: '' })
  partners: string;

  @Column({ type: 'int2', array: true, default: [] })
  socialPositioningTag: number[];

  @Column({ type: 'int2', array: true, default: [] })
  featureTag: number[];

  // @ManyToMany(() => Tools, { eager: true })
  // @JoinTable()
  // similarTools: Tools[];
}
