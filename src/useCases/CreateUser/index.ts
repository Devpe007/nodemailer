import { SendMailProvider } from '../../providers/implementations/SendMailProvider';
import { UserRepository } from "../../repositories/implementations/UserRepository";

import { CreateUserUseCase } from "./CreateUserUseCase";

import { CreateUserController } from "./CreateUserController";

const sendMailProvider = new SendMailProvider();
const userRepository = new UserRepository();

const createUserUseCase = new CreateUserUseCase(
    userRepository,
    sendMailProvider,
);

const createUserController = new CreateUserController(
    createUserUseCase,
);

export { createUserUseCase, createUserController };