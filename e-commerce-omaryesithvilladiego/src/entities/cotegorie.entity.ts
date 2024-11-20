import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  OneToOne,
  JoinColumn,
  ManyToOne,
  JoinTable,
} from 'typeorm';
import { Products } from './product.entity';
import { v4 as uuid } from 'uuid';
import { OrderDetails } from './order-detail.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ type: 'varchar', length: 50, nullable: false, unique:true
})
  name!: string;

 @OneToMany(() => Products, product => product.category)
 product:Products[]

 
}
