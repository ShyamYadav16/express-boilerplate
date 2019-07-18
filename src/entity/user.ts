import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {Length} from "class-validator";

@Entity('user')
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { "length": 5})
    name: string;

    @Column()
    email: string;

}