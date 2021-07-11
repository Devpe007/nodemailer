import { getCustomRepository } from "typeorm";

import { UserRepository } from "../../repositories/UserRepository";

import { ICreateUser } from "./CreateUserDTO";

export class CreateUserUseCase {
    async execute(data: ICreateUser) {
        const userRepository = getCustomRepository(UserRepository);

        const userAlreadyExists = await userRepository.findOne({
            email: data.email,
        });

        if(userAlreadyExists) {
            throw new Error ('User already exists');
        };

        const user = userRepository.create({
            name: data.name,
            email: data.email,
            password: data.password,
        });

        await userRepository.save(user);

        return user;
    };
};