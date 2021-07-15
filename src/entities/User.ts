import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid';

@Entity('users')
export class User {
    @PrimaryColumn()
    public readonly id: string;

    @Column()
    public name: string;

    @Column()
    public email: string;

    @Column()
    public password: string;

    constructor() {
        if(!this.id) {
            this.id = uuid();
        };
    };
};