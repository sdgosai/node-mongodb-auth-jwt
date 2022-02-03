const mongoose = require('mongoose');
const {hash,compare} = require('bcryptjs')
const {sign} = require('jsonwebtoken')

const subSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    gender: {
        type: String,
        default: 'male',
        enum: ["male", "female"]
    },
    address: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true
    },
    contactNo: {
        type: Number,
    },
    password: {
        type: String,
        trim: true
    },
    role: {
        type: Number,
        default: 1
    },
});

// Password hashing ...
subSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await hash(this.password, 10);
})

// JWT token ...
subSchema.methods.getJWTtoken = async function () {
    return sign({ id: this._id }, process.env.SECRET, {
        expiresIn: Date.now() + 3 * 60 * 60 * 1000,
    });
};

// Compare Password ...
subSchema.methods.comparePassword = async function (password) {
    return await compare(password, this.password)
}
const subs = mongoose.model('subs', subSchema);
module.exports = { subs };