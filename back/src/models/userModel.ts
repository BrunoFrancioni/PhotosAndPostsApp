import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export interface IUsers extends mongoose.Document {
    name_lastname: string;
    email: string;
    password: string;
}

const UsersSchema = new Schema({
    name_lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

export default mongoose.model<IUsers>('users', UsersSchema);