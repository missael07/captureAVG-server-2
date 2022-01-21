"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_model_1 = require("../models/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const token_1 = __importDefault(require("../classes/token"));
const auth_1 = require("../middlewares/auth");
const userRoutes = express_1.Router();
//Sign In
userRoutes.post('/signin', (_req, _resp) => {
    const { userName, password } = _req.body;
    user_model_1.User.findOne({ userName }, (err, userDB) => {
        if (err)
            throw err;
        if (!userDB)
            return _resp.json({
                ok: false,
                message: 'Usuario/Contraseña incorrecto'
            });
        if (userDB.comparePassword(password)) {
            const { _id, name, userName } = userDB;
            const token = token_1.default.getJwtToken({ id: _id, name, userName });
            return _resp.json({
                ok: true,
                token
            });
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
        password: bcrypt_1.default.hashSync(password, 10),
        userName
    };
    user_model_1.User.create(user).then(userDB => {
        const { _id, name, userName } = userDB;
        const token = token_1.default.getJwtToken({ id: _id, name, userName });
        return _resp.json({
            ok: true,
            token
        });
    }).catch(err => {
        _resp.json({
            ok: false,
            err
        });
    });
});
//Update
userRoutes.post('/update', [auth_1.verifyToken], (_req, _resp) => {
    const { id } = _req.user;
    const { name, userName } = _req.body || _req.user;
    const user = {
        name,
        userName
    };
    user_model_1.User.findByIdAndUpdate(id, user, { new: true }, (err, userDB) => {
        if (err)
            throw err;
        if (!userDB)
            return _resp.json({ ok: false, message: 'Usuario inexistente' });
        const { _id, name, userName } = userDB;
        const token = token_1.default.getJwtToken({ id: _id, name, userName });
        return _resp.json({
            ok: true,
            token
        });
    });
});
exports.default = userRoutes;
