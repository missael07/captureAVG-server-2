import { model, Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

const gameSchema = new Schema({
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
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: [true, 'No hay usuario registrado para este juego']
    },
    avg: {
        type: String
    }
});

export interface IGame extends Document {
    gameNo: string;
    atBat: number;
    hits: number;
    user: string;
    avg: string;

}


export const Games = model<IGame>('game', gameSchema);