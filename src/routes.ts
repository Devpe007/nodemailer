import { Router } from "express";

import { CreateUserController } from "./useCases/CreateUser/CreateUserController";

const createUserController = new CreateUserController()

const routes = Router();

routes.post('/users', createUserController.handle);

export { routes };