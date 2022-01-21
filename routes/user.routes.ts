import { Router, Request } from 'express';
import { User, IUser } from '../models/user.model';
import bcrypt from 'bcrypt';
import Token from '../classes/token';
import { verifyToken } from '../middlewares/auth';

const userRoutes = Router();

//Sign In
userRoutes.post('/signin', (_req, _resp) => { 
    const { userName, password } = _req.body;

    User.findOne({ userName }, (err: any, userDB: IUser) => {
        if (err) throw err;
        if(!userDB) return _resp.json({
            ok: false,
            message: 'Usuario/Contraseña incorrecto'
        });

        if (userDB.comparePassword(password)) {
            const { _id, name, userName } = userDB;
            const token = Token.getJwtToken({id: _id, name, userName});
            return _resp.json({
                ok: true,
                token
            })
        }
        return _resp.json({
            ok: false,
            message: 'Usuario/Contraseña incorrecto'
        });

    });
});


//Create user info
userRoutes.post('/create', (_req, _resp) => {
    const { name, password, userName } = _req.body;

    const user = {
        name,
        password: bcrypt.hashSync(password, 10),
        userName
    };
    
    User.create(user).then(userDB => {
        const { _id, name, userName } = userDB;
        const token = Token.getJwtToken({id: _id, name, userName});
        return _resp.json({
                ok: true,
                token
            })
    }).catch(err => {
        _resp.json({
            ok: false,
            err
        });
    });

});

//Update
userRoutes.post('/update', [verifyToken], (_req: any, _resp: any) => {
    const { id } = _req.user;
    const { name, userName } = _req.body || _req.user;
    const user = {
        name,
        userName
    }

    User.findByIdAndUpdate(id, user, { new: true }, (err, userDB) => {
        if (err) throw err;
        if (!userDB) return _resp.json({ ok: false, message: 'Usuario inexistente' });
        const { _id, name, userName } = userDB;
        const token = Token.getJwtToken({id: _id, name, userName});
        return _resp.json({
                ok: true,
                token
            })
    }); 
});

export default userRoutes;