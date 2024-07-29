import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity("pizza")
export class PizzaEntity {
    @PrimaryGeneratedColumn()
    pizza_id: number;

    @Column({ unique: true })
    name: string;

    @Column({
        type: "enum",
        enum: ["Vegetarian", "Non-Vegetarian"], 
    })
    type: string;

    @Column()
    imageUrl: string;

    @Column({ type: "text" })
    description: string;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    regularPrice: number;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    mediumPrice: number;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    largePrice: number;
}
