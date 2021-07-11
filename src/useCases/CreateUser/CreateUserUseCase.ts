import { getCustomRepository } from "typeorm";

import { IMailProvider } from "../../providers/IMailProvider";

import { UserRepository } from "../../repositories/implementations/UserRepository";

import { ICreateUser } from "./CreateUserDTO";

export class CreateUserUseCase {
    constructor(
        private mailProvider: IMailProvider,
    ) {};

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

        await this.mailProvider.sendMail({
            to: {
                name: data.name,
                email: data.email,
            },
            from: {
                name: 'Ferreira Equipe',
                email: 'ferreiravendas.80@gmail.com',
            },
            subject: 'Seja bem-vindo à plataforma',
            body: '<p>Você já pode fazer login em nossa plataforma.</p>',
        });

        return user;
    };
};