"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Games = void 0;
const mongoose_1 = require("mongoose");
const gameSchema = new mongoose_1.Schema({
    gameNo: {
        type: Number
    },
    atBat: {
        type: Number
    },
    hits: {
        type: Number,
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'user',
        required: [true, 'No hay usuario registrado para este juego']
    },
    avg: {
        type: String
    }
});
exports.Games = mongoose_1.model('game', gameSchema);
