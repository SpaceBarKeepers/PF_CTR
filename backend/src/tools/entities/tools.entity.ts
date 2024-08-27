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

  @Column({ type: 'boolean', default: false })
  caseStudyOnePublishedEn: boolean;

  @Column({ type: 'varchar', default: '' })
  caseStudyOneTitleEn: string;

  @Column({ type: 'varchar', default: '' })
  caseStudyOneImgEn: string;

  @Column({ type: 'varchar', default: '' })
  caseStudyOneDescEn: string;

  @Column({ type: 'varchar', default: '' })
  caseStudyOneHighlightOneEn: string;

  @Column({ type: 'varchar', default: '' })
  caseStudyOneHighlightTwoEn: string;

  @Column({ type: 'varchar', default: '' })
  caseStudyOneHighlightThreeEn: string;

  @Column({ type: 'varchar', default: '' })
  caseStudyOneHighlightFourEn: string;

  @Column({ type: 'boolean', default: false })
  caseStudyOnePublishedCs: boolean;

  @Column({ type: 'varchar', default: '' })
  caseStudyOneTitleCs: string;

  @Column({ type: 'varchar', default: '' })
  caseStudyOneImgCs: string;

  @Column({ type: 'varchar', default: '' })
  caseStudyOneDescCs: string;

  @Column({ type: 'varchar', default: '' })
  caseStudyOneHighlightOneCs: string;

  @Column({ type: 'varchar', default: '' })
  caseStudyOneHighlightTwoCs: string;

  @Column({ type: 'varchar', default: '' })
  caseStudyOneHighlightThreeCs: string;

  @Column({ type: 'varchar', default: '' })
  caseStudyOneHighlightFourCs: string;

  @Column({ type: 'boolean', default: false })
  caseStudyTwoPublishedEn: boolean;

  @Column({ type: 'varchar', default: '' })
  caseStudyTwoTitleEn: string;

  @Column({ type: 'varchar', default: '' })
  caseStudyTwoImgEn: string;

  @Column({ type: 'varchar', default: '' })
  caseStudyTwoDescEn: string;

  @Column({ type: 'varchar', default: '' })
  caseStudyTwoHighlightOneEn: string;

  @Column({ type: 'varchar', default: '' })
  caseStudyTwoHighlightTwoEn: string;

  @Column({ type: 'varchar', default: '' })
  caseStudyTwoHighlightThreeEn: string;

  @Column({ type: 'varchar', default: '' })
  caseStudyTwoHighlightFourEn: string;

  @Column({ type: 'boolean', default: false })
  caseStudyTwoPublishedCs: boolean;

  @Column({ type: 'varchar', default: '' })
  caseStudyTwoTitleCs: string;

  @Column({ type: 'varchar', default: '' })
  caseStudyTwoImgCs: string;

  @Column({ type: 'varchar', default: '' })
  caseStudyTwoDescCs: string;

  @Column({ type: 'varchar', default: '' })
  caseStudyTwoHighlightOneCs: string;

  @Column({ type: 'varchar', default: '' })
  caseStudyTwoHighlightTwoCs: string;

  @Column({ type: 'varchar', default: '' })
  caseStudyTwoHighlightThreeCs: string;

  @Column({ type: 'varchar', default: '' })
  caseStudyTwoHighlightFourCs: string;

  // @ManyToMany(() => Tools, { eager: true })
  // @JoinTable()
  // similarTools: Tools[];
}
