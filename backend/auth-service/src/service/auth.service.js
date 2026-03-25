import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';
import {
    generateAccessToken,
    generateRefreshToken,
} from '../utils/jwt.auth.js';
export const signUp = async (data) => {
    console.log(data);
    const { name, email, password } = data;

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
        throw new Error('User already exits');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });
    return user;
};

export const signIn = async (data) => {
    const { email, password } = data;
    const user = await User.findOne({ email });
    if (!user) throw new Error('Invalid credentials');
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid credentials');
    }
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    return { user, accessToken, refreshToken };
};
