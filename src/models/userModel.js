// import Package ...
const { Schema, model, Mongoose } = require('mongoose')
const { hash, compare } = require('bcryptjs')
const { sign } = require('jsonwebtoken')
const crypto = require('crypto');

const userSchema = new Schema({
    avatar: {
        type: String,
        required: false
    },
    name: {
        type: String,
    },
    age: {
        type: Number,
    },
    gender: {
        type: String,
        default: "male",
        enum: ['male', 'female']
    },
    email: {
        type: String,
    },
    phone: {
        type: Number,
    },
    password: {
        type: String,
        select: false
    },
    role: {
        type: Number,
        default: 0,
    },
    is_deleted: {
        type: Boolean,
        default: false,
        select: false
    },
    is_loggedOut: {
        type: Boolean,
        default: false,
        select: false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
}, { timestamps: true });

// Password hashing ...
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await hash(this.password, 10);
})

// JWT token ...
userSchema.methods.getJWTtoken = async function () {
    return sign({ id: this._id }, process.env.SECRET, {
        expiresIn: Date.now() + 3 * 60 * 60 * 1000,
    });
};

// Compare Password ...
userSchema.methods.comparePassword = async function (password) {
    return await compare(password, this.password)
}

// Reset password token generater ...
userSchema.methods.getResetPasswordToken = async function () {
    // Generating Token
    const ResetToken = crypto.randomBytes(20).toString('hex');
    /// implement hash algorythm in token and asign token to userSchema's token
    this.resetPasswordToken = crypto.createHash("sha256").update(ResetToken).digest("hex");
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
    return ResetToken;
}

// Model export ...
const User = model('user', userSchema);
module.exports = { User }