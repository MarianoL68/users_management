import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class UserModel {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'varchar',
        unique: true,
        nullable: false
    })
    email: string;

    @Column({
        type: 'varchar',
        nullable: false
    })
    password: string;

    @Column({
        type: 'varchar',
        nullable: false
    })
    firstName: string;

    @Column({
        type: 'varchar',
        nullable: false
    })
    lastName: string;
}
