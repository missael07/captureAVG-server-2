"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AtBatHits = void 0;
const mongoose_1 = require("mongoose");
const atBatHitsSchema = new mongoose_1.Schema({
    atBat: {
        type: Number
    },
    hits: {
        type: Number
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'user',
        required: [true, 'No hay usuario registrado para este juego']
    },
    game: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'game',
        required: [true, 'El juego es requerido']
    }
});
exports.AtBatHits = mongoose_1.model('atBatHits', atBatHitsSchema);
