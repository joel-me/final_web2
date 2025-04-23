import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Pemesanan {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  petani: User;

  @ManyToOne(() => User)
  buruh: User;

  @Column()
  tanggal: string;

  @Column()
  catatan: string;

  @Column({ default: 'Menunggu' })
  status: string;
}
