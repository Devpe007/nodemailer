import { User } from "../entities/User";
import { ICreateUser } from "../useCases/CreateUser/CreateUserDTO";

export interface IUserRepository {
    createUser(user: User): Promise<void>;
    findByEmail(email: string): Promise<User>;
    save(user: User): Promise<void>;
};