import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { Category } from './cotegorie.entity';
import { OrderDetails } from './order-detail.entity';
import { v4 as uuid } from 'uuid';
import { ApiProperty } from '@nestjs/swagger';

@Entity('products')
export class Products {

  
  @PrimaryGeneratedColumn('uuid')
  id?: string = uuid();

  /**
     * El nombre del producto debe ser un string de maximo 50 caracteres
     * @example 'Iphone 16 Pro Max'
  */
  @Column({ type: 'varchar', length: 50, unique:true })
  
  name?: string;


  /** 
     * La descripcion no puedde estar vacia
     * @example 'The best mobile device around the world'
    */
  @Column({ type: 'text' })
  description: string;


  /**
   * El precio debe ser un numero con dos posiciones  decimales
   * @example '10.34'
   */
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable:false })
  price: number;

  @Column({ type: 'int', nullable:false })
  stock: number;

  @Column({ type: 'varchar', nullable: true, default: 'https://res.cloudinary.com/de5tm90td/image/upload/v1727615602/placeholder_large_bin0vf.jpg', })
  imgUrl: string;
  
  @ManyToOne(() => Category, (category) => category.product)
  category:Category


  @ManyToMany(() => OrderDetails, (orderDetail) => orderDetail.products)
  @JoinTable({ name: 'product_order-detail' })
  order_detail: OrderDetails[];
}
