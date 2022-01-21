import { model, Schema, Document } from 'mongoose';

const atBatHitsSchema = new Schema({
    atBat: {
        type: Number
    },
    hits: {
        type: Number
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: [true, 'No hay usuario registrado para este juego']
    },
    game: {
        type: Schema.Types.ObjectId,
        ref: 'game',
        required: [true, 'El juego es requerido']
    }
});

export interface IatBatHits extends Document {
    atBat: Number;
    hits: Number;
    user: string;
    game: string;
}


export const AtBatHits = model<IatBatHits>('atBatHits', atBatHitsSchema);