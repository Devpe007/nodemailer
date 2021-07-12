import { EntityRepository } from "typeorm";

import { User } from "../../entities/User";
import { ICreateUser } from "../../useCases/CreateUser/CreateUserDTO";
import { IUserRepository } from "../IUserRepository";

@EntityRepository(User)
export class UserRepository implements IUserRepository {
    private users: User[] = [];

    async createUser(user: User): Promise<void> {
        this.users.push(user);
    };

    async findByEmail(email: string): Promise<User> {
        const user = this.users.find(user => user.email === email);

        return user;
    };

    async save(user: User): Promise<void> {
        this.users.push(user);
    };
};