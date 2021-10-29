import { Request, Response, NextFunction } from 'express';
import { IUser } from '../interfaces/IUsers';
import * as jwt from 'jsonwebtoken';

export const verify = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization');

    try {
        if (token) {
            const string = token.split(' ')[1];

            const decoded = jwt.verify(string, process.env.JWT_SECRET);

            res.locals.jwt = decoded;

            next();
        } else {
            return res.status(401).json({
                message: 'Permission denied.'
            });
        }
    } catch (e) {
        res.status(401).json({
            message: 'Invalid token'
        });
    }
}

export const sign = (user: IUser): string => {
    try {
        const result = jwt.sign({
            _id: user._id,
            name_lastname: user.name_lastname,
            email: user.email
        }, process.env.JWT_SECRET);

        return result;
    } catch (e) {
        throw new Error(e);
    }
}