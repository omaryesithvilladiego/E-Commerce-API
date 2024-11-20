import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinTable,
  ManyToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Category } from './cotegorie.entity';
import { OrderDetails } from './order-detail.entity';
import { v4 as uuid } from 'uuid';
import { User } from './user.entity';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

@Entity('orders')
export class Orders {

  @ApiHideProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();



  @Column({ type: 'varchar' })
  date: string;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @OneToOne(() => OrderDetails)
  @JoinColumn({ name: 'order_detail' })
  order_detail: OrderDetails;
}
