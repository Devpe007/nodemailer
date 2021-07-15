import { getCustomRepository } from 'typeorm';

import { hash } from 'bcrypt';

import { ICreateUser } from "./CreateUserDTO";

import { IMailProvider } from "../../providers/IMailProvider";

import { User } from "../../entities/User";
import { UserRepository } from '../../repositories/UserRepository';

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

        const passwordHash = await hash(data.password, 8);

        const user = userRepository.create({
            name: data.name,
            email: data.email,
            password: passwordHash,
        });
        
        await userRepository.save(user);

        await this.mailProvider.sendMail({
            to: {
                name: data.name,
                email: data.email,
            },
            from: {
                name: 'Equipe do Meu App',
                email: 'equipe@meuapp.com',
            },
            subject: 'Seja bem-vindo à plataforma',
            body: '<p>Você já pode fazer login em nossa plataforma.</p>'
        });

        return user;
    };
};