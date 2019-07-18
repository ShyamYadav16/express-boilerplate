import {User} from "../entity/user";
import {inject, injectable} from "inversify";
import Types from '../config/types';
import {UserRepository} from "../repository/userRepository";
import {NotFound} from "../utils/exceptions";

export interface UserService {

  getAll(): Promise<User[]>;
  save(user: User): Promise<User>;
  getUserById(id: string): Promise<User>;

}

@injectable()
export class UserServiceImpl implements UserService {

  constructor(
    @inject(Types.UserRepository) private userRepoistory: UserRepository
  ) {}

  public async getAll(): Promise<User[]> {
    console.log("getAll --- >");
    let result = await this.userRepoistory.findAll();
    return result;
  }

  public async save(user: User): Promise<User> {
    const created = await this.userRepoistory.save(user);
    // if (created) return "User created successfully";
    // throw new Conflict('Cant create new user');
    return created;
  }

  public async getUserById(id: string): Promise<User> {
    let user;
    try {
      user = await this.userRepoistory.findById(id);
    } catch (e) {
     console.log(`Error ---> ${e}`);
    }
    return user;
  }

}