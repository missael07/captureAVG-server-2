import { NextFunction } from 'express';
import Token from '../classes/token';

export const verifyToken = (_req: any, _resp:any, next: NextFunction) => {
    const userToken = _req.get('x-token') || '';
    Token.validateToken(userToken).then((decoded: any) => {
        _req.user = decoded.user;
        next();
    }).catch(err => {
        _resp.json({ ok: false, message: 'Token incorrecto' });
    })
}

