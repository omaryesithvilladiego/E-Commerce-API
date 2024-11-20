import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  ManyToMany,
  JoinTable,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { v4 as uuid } from 'uuid';
import { Category } from './cotegorie.entity';
import { Products } from './product.entity';
import { Orders } from './order.entity';

@Entity('order_details')
export class OrderDetails {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @ManyToMany(() => Products, (products) => products.order_detail)
  products: Products[];

  @OneToOne(() => Orders)
  order:Orders

}
