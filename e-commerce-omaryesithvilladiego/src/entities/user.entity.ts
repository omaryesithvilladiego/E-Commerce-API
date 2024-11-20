import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { OrderDetails } from './order-detail.entity';
import { Orders } from './order.entity';
import { IsNotEmpty } from 'class-validator';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ type: 'varchar', length: 50, nullable: false })
  name?: string;

  @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
  email?: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  password?: string;

  @Column({ type: 'int', nullable: true })
  phone?: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  country?: string;

  @Column({ type: 'text', nullable: true })
  address?: string;

  @Column({type:'boolean', default:false})
  isAdmin?:boolean

  @Column({ type: 'varchar', length: 50, nullable: true })
  city?: string;

  @OneToMany(() => Orders, (order) => order.user)
  @JoinColumn({name:'user_id'})
  orders?: Orders[];
  
}
