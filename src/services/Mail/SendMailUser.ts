import { ICreateUser } from "../../useCases/CreateUser/CreateUserDTO";

import { IMailProvider } from "../../providers/IMailProvider";

export class SendMailUser {
    private mailProvider: IMailProvider;

    async execute(data: ICreateUser) {
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
    };
};