import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true })
  username: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  activeDevice: string;

  @Column({ type: 'date', default: new Date() })
  registered: Date;

  @Column({ type: 'varchar', default: 'manual' })
  registrationType: 'manual' | 'paygate';

  @Column({ type: 'varchar', nullable: true })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  organization: string;

  @Column({ type: 'varchar', nullable: true })
  phone: string;

  @Column({ type: 'varchar', nullable: true })
  address: string;

  @Column({ type: 'varchar', length: 2, nullable: true })
  shippingCode: string;

  @Column({ type: 'date', default: new Date() })
  lastLogin: Date;
}
