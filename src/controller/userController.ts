import {RegisterableController} from "./RegisterableController";
import { Application, Request, NextFunction, Response } from 'express';
import {UserService} from "../UserService/userService";
import {inject, injectable} from "inversify";
import Types from "../config/types";
import {dataResponse} from "../utils/response";

@injectable()
export class UserController implements RegisterableController {

  @inject(Types.UserService)
  private userService: UserService;

  public register(app: Application): void {
    app.route('/user/all')
      .get(async (req: Request, res: Response, next: NextFunction) => {
        try {
          const result = await this.userService.getAll();
          return dataResponse(res, result);
        } catch (error) {
          return next(error);
        }
      });
  }

}

export default UserController;