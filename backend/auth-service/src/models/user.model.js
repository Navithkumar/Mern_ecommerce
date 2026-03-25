import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
            trim: true,
        },
        phone: {
            type: String,
            required: true,
        },
        addressLine: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        pincode: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
            default: 'India',
        },
        isDefault: {
            type: Boolean,
            default: false,
        },
    },
    { _id: false }, 
);

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
        },

        password: {
            type: String,
            required: true,
            minlength: 6,
            select: false, 
        },

        phone_number: {
            type: String,
        },

        addresses: [addressSchema], 

        role: {
            type: String,
            enum: ['user', 'admin', 'seller'],
            default: 'user',
        },
    },
    { timestamps: true },
);

export default mongoose.model('User', userSchema);
