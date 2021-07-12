import { Router } from "express";

import { CreateUserController } from "./useCases/CreateUser/CreateUserController";

import { createUserController } from "./useCases/CreateUser";

const routes = Router();

routes.post('/users', (request, response) => {
    return createUserController.handle(request, response);
});


export { routes };