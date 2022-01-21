"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const games_model_1 = require("../models/games.model");
const auth_1 = require("../middlewares/auth");
const gamesRoutes = express_1.Router();
gamesRoutes.post('/create', auth_1.verifyToken, (_req, _resp) => {
    const { atBat, hits, gameNo } = _req.body;
    const games = {
        atBat,
        hits,
        user: _req.user.id,
        gameNo,
        avg: hits / atBat
    };
    games_model_1.Games.findOne({ gameNo, user: games.user }, (err, gameDB) => {
        if (gameDB)
            return _resp.json({ ok: false, message: 'Juego ya capturado' });
        games_model_1.Games.create(games).then((gamesDB) => __awaiter(void 0, void 0, void 0, function* () {
            yield gamesDB.populate('user', '-password');
            _resp.json({ gamesDB });
        })).catch(err => _resp.json({ err }));
    });
});
gamesRoutes.get('/', (_req, _resp) => __awaiter(void 0, void 0, void 0, function* () {
    const games = yield games_model_1.Games.find().sort({ gameNo: 1 }).populate('user', '-password');
    _resp.json({ games });
}));
exports.default = gamesRoutes;
