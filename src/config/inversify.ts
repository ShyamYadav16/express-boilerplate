import { Container } from "inversify";
import { RegisterableController } from "../controller/RegisterableController";
import Types from './types';
import UserController from "../controller/userController";
import {UserService, UserServiceImpl} from "../service/userService";
import {UserRepository} from "../repository/userRepository";

const container: Container = new Container();

// Controllers
container.bind<RegisterableController>(Types.Controller).to(UserController);

// Services
container.bind<UserService>(Types.UserService).to(UserServiceImpl).inSingletonScope();

// Repositories
container.bind<UserRepository>(Types.UserRepository).to(UserRepository).inSingletonScope();

export { container };