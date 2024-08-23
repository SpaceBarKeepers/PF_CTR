import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tools {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  toolsName: string;

  @Column({ type: 'varchar', nullable: true })
  logo: string;

  @Column({ type: 'varchar', length: 500, default: '' })
  descEn: string;

  @Column({ type: 'varchar', length: 500, default: '' })
  descCS: string;

  @Column({ type: 'varchar', array: true, default: [] })
  featuresEn: string[];

  @Column({ type: 'varchar', array: true, default: [] })
  featuresCs: string[];

  @Column({ type: 'varchar', length: 800, default: '' })
  dataProtectionEn: string;

  @Column({ type: 'varchar', length: 800, default: '' })
  dataProtectionCs: string;

  @Column({ type: 'varchar', length: 800, default: '' })
  authenticationEn: string;

  @Column({ type: 'varchar', length: 800, default: '' })
  authenticationCs: string;

  @Column({ type: 'varchar', length: 800, default: '' })
  nextProductUpdateEn: string;

  @Column({ type: 'varchar', length: 800, default: '' })
  nextProductUpdateCs: string;

  @Column({ type: 'varchar', array: true, default: [] })
  feedEn: string[];

  @Column({ type: 'varchar', array: true, default: [] })
  feedCs: string[];

  @Column({ type: 'varchar', array: true, default: [] })
  accessibilityTag: string[];

  @Column({ type: 'varchar', length: 100, default: '' })
  established: string;

  @Column({ type: 'varchar', length: 100, default: '' })
  noOfClients: string;

  @Column({ type: 'varchar', length: 800, default: '' })
  team: string;

  @Column({ type: 'varchar', length: 100, default: '' })
  email: string;

  @Column({ type: 'varchar', length: 100, default: '' })
  phone: string;

  @Column({ type: 'varchar', length: 100, default: '' })
  web: string;

  @Column({ type: 'varchar', array: true, default: [] })
  countries: string[];

  @Column({ type: 'varchar', length: 800, default: '' })
  partners: string;

  @Column({ type: 'varchar', array: true, default: [] })
  socialPositioningTag: string[];

  @Column({ type: 'varchar', array: true, default: [] })
  featureTag: string[];

  // @ManyToMany(() => Tools, { eager: true })
  // @JoinTable()
  // similarTools: Tools[];
}
