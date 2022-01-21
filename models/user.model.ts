import { model, Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre es requerido']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es requerida']
    },
    userName: {
        type: String,
        required: [true, 'El Usuario es requerido'],
        unique: true,
    }

});

userSchema.method('comparePassword', function (password: string = ''): boolean {
    if (bcrypt.compareSync(password, this.password)) {
        return true;
    }
    return false;
})

export interface IUser extends Document {
    name: string;
    password: string;
    userName: string;
    comparePassword(password: string): boolean;
}


export const User = model<IUser>('user', userSchema);