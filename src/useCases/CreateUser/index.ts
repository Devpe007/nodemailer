import { SendMailProvider } from '../../providers/implementations/SendMailProvider';

import { CreateUserUseCase } from "./CreateUserUseCase";

import { CreateUserController } from "./CreateUserController";

const sendMailProvider = new SendMailProvider();

const createUserUseCase = new CreateUserUseCase(
    sendMailProvider,
);

const createUserController = new CreateUserController(
    createUserUseCase,
);

export { createUserUseCase, createUserController };