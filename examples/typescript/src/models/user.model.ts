import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class UserModel {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;
}