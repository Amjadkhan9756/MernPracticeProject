import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true

    },
    userName: {
        type: String,
        require: true,
        unique: true

    },
    email: {
        type: String,
        require: true,
        unique: true

    },
    Active: {
        type: Boolean,
        default: false

    },
    password: {
        type: String,
        require: true

    },
    profilePicture: {
        type: String,
        default: "default.jpg",
    },
    createdAt: {
        type: Date,
        defaut: Date.now,
    },
    token: {
        type: String,
        default: ' '
    },

})

const User = mongoose.model("User", UserSchema);
export default User;
