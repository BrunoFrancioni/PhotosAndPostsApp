import { Request, Response } from "express";
import { UsersController } from "../controllers/UsersController";
import { ICreateUsersResult, ILoginResult } from "../interfaces/IUsers";

class UsersRoutes {
    private usersController: UsersController = new UsersController();

    public routes(app): void {
        app.route('/users/signup')
            .post(async (req: Request, res: Response) => {
                try {
                    const result: ICreateUsersResult = await this.usersController
                        .createUser(req.body.createUser);

                    if (result.result) {
                        return res.status(201).json({
                            message: result.message
                        });
                    } else if (result.message !== null) {
                        return res.status(400).json({
                            message: result.message
                        });
                    } else {
                        return res.status(500).json({
                            message: 'Server error'
                        });
                    }
                } catch (e) {
                    console.log(e);

                    return res.status(500).json({
                        message: 'Server error'
                    });
                }
            });

        app.route('/users/login')
            .post(async (req: Request, res: Response) => {
                try {
                    const result: ILoginResult = await this.usersController
                        .login(req.body.loginUser);

                    if (result.result) {
                        return res.status(200).json({
                            token: result.token,
                            user: result.user
                        });
                    } else if (result.message !== null) {
                        return res.status(400).json({
                            message: result.message
                        });
                    } else {
                        return res.status(500).json({
                            message: 'Server error'
                        });
                    }
                } catch (e) {
                    console.log(e);

                    return res.status(500).json({
                        message: 'Server error'
                    });
                }
            });
    }
}

export default UsersRoutes;