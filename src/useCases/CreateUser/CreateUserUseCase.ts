import { hash } from 'bcrypt';

import { UserRepository } from "../../repositories/implementations/UserRepository";

import { ICreateUser } from "./CreateUserDTO";

import { IMailProvider } from "../../providers/IMailProvider";
import { User } from "../../entities/User";

export class CreateUserUseCase {
    constructor(
        private userRepository: UserRepository,
        private mailProvider: IMailProvider,
    ) {};

    async execute(data: ICreateUser) {
        const userAlreadyExists = await this.userRepository.findByEmail(data.email);

        if(userAlreadyExists) {
            throw new Error ('User already exists');
        };

        const passwordHash = await hash(data.password, 8);

        const user = new User({
            name: data.name,
            email: data.email,
            password: passwordHash,
        });

        await this.userRepository.save(user);

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