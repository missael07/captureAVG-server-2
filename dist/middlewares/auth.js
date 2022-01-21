"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const token_1 = __importDefault(require("../classes/token"));
const verifyToken = (_req, _resp, next) => {
    const userToken = _req.get('x-token') || '';
    token_1.default.validateToken(userToken).then((decoded) => {
        _req.user = decoded.user;
        next();
    }).catch(err => {
        _resp.json({ ok: false, message: 'Token incorrecto' });
    });
};
exports.verifyToken = verifyToken;
