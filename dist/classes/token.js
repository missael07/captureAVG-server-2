"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class Token {
    cosntructor() { }
    static getJwtToken(payload) {
        return jsonwebtoken_1.default.sign({ user: payload }, this.seed, { expiresIn: this.expire });
    }
    static validateToken(userToken) {
        return new Promise((resolve, reject) => {
            jsonwebtoken_1.default.verify(userToken, this.seed, (err, decoded) => {
                if (err) { }
                resolve(decoded);
            });
        });
    }
}
exports.default = Token;
Token.seed = 'jwT-seed';
Token.expire = '30d';
