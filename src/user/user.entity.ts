import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsEmail, IsEnum, IsNotEmpty, MinLength } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty() // Ensure username is not empty
  username: string;

  @Column({ unique: true })
  @IsEmail() // Ensure email is valid
  email: string;

  @Column()
  @IsNotEmpty() // Ensure password is not empty
  @MinLength(8) // Minimum password length
  password: string; // Plain text password

  @Column()
  @IsEnum(['buruh', 'petani']) // Validate role
  role: 'buruh' | 'petani';
}
