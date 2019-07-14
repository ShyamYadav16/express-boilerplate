import {User} from "../entity/user";
import {inject, injectable} from "inversify";
import Types from '../config/types';
import {UserRepository} from "../repository/userRepository";

export interface UserService {

  getAll(): Promise<User[]>;

}

@injectable()
export class UserServiceImpl implements UserService {

  constructor(
    @inject(Types.UserRepository) private userRepoistory: UserRepository
  ) {}

  public async getAll(): Promise<User[]> {
    return await this.userRepoistory.findAll();
  }

}