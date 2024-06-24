import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  username: string;

  @Column({ type: 'varchar', length: 200 })
  password: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  activeDevice: string;

  @Column({ type: 'date', default: new Date() })
  registered: Date;

  @Column({ type: 'varchar', default: 'manual' })
  registrationType: 'manual' | 'paygate';

  @Column({ type: 'date', default: new Date() })
  lastLogin: Date;
}
