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
const auth_1 = require("../middlewares/auth");
const atBatsHits_model_1 = require("../models/atBatsHits.model");
const atBatHitsRoutes = express_1.Router();
atBatHitsRoutes.post('/create', auth_1.verifyToken, (_req, _resp) => {
    const { atBat, hits, game } = _req.body;
    const atBatHits = {
        atBat,
        hits,
        user: _req.user.id,
        game
    };
    atBatsHits_model_1.AtBatHits.create(atBatHits).then((atbathitsDB) => __awaiter(void 0, void 0, void 0, function* () {
        yield atbathitsDB.populate('user', '-password');
        yield atbathitsDB.populate('game');
        _resp.json({ ok: true, atbathitsDB });
    })).catch(err => _resp.json({ err }));
});
atBatHitsRoutes.get('/', (_req, _resp) => __awaiter(void 0, void 0, void 0, function* () {
    const hits = yield atBatsHits_model_1.AtBatHits.find().populate('user', '-password').populate('game').sort({ gameNo: 1 });
    _resp.json({
        ok: true,
        hits,
    });
}));
exports.default = atBatHitsRoutes;
