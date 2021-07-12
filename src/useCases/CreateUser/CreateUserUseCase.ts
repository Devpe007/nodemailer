import { getCustomRepository } from "typeorm";
import { hash } from 'bcrypt';

import { UserRepository } from "../../repositories/implementations/UserRepository";

import { ICreateUser } from "./CreateUserDTO";

import { SendMailUser } from "../../services/Mail/SendMailUser";

export class CreateUserUseCase {
    async execute(data: ICreateUser) {
        const userRepository = getCustomRepository(UserRepository);

        const sendMailUser = new SendMailUser();

        const userAlreadyExists = await userRepository.findOne({
            email: data.email,
        });

        if(userAlreadyExists) {
            throw new Error ('User already exists');
        };

        const passwordHash = await hash(data.password, 8);

        const user = userRepository.create({
            name: data.name,
            email: data.email,
            password: passwordHash,
        });

        await userRepository.save(user);

        await sendMailUser.execute(user);

        return user;
    };
};