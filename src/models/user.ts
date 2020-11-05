import mongoose, { PassportLocalSchema } from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
    },
});
userSchema.plugin(passportLocalMongoose);

export default mongoose.model('User', userSchema as PassportLocalSchema);
