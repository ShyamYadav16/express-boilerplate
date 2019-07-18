import {RegisterableController} from "./RegisterableController";
import { Application, Request, NextFunction, Response } from 'express';
import {UserService} from "../service/userService";
import {inject, injectable} from "inversify";
import Types from "../config/types";
import {dataResponse} from "../utils/response";
import {User} from "../entity/user";

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

    app.route('/user/create/')
      .post(async (req: Request, res: Response, next: NextFunction) => {
        try {
          const body = req.body;

          let user = new User();
          user.name = body.name;
          user.email = body.email;

          const result = await this.userService.save(user);
          return dataResponse(res, result);
        } catch (error) {
          return next(error);
        }
      });

    app.route('/user/:id')
      .get(async (req: Request, res: Response, next: NextFunction) => {
        try {
          const id = req.params.id;

          const result = await this.userService.getUserById(id);
          return dataResponse(res, result);
        } catch (e) {
          return next(e);
        }
      });
  }

}

export default UserController;