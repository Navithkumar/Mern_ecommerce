import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import * as authService from '../service/auth.service.js';
import { generateAccessToken } from '../utils/jwt.auth.js';

export const signUp = asyncHandler(async (req, res) => {
    const user = await authService.signUp(req.body);
    return res.status(200).json({
        isv1: true,
        status: 'Success',
        message: 'User created Successfully',
        data: { user },
    });
});

export const signIn = asyncHandler(async (req, res) => {
    const { user, accessToken, refreshToken } = await authService.signIn(
        req.body,
    );
    res.cookie('refreshtoken', refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
    });

    return res.status(200).json({
        isv1: true,
        status: 'Success',
        data: {
            accessToken,
            user: {
                id: user._id,
                role: user.role,
            },
        },
    });
});

export const refreshToken = (req, res) => {
    const token = req.cookies.refreshToken;

    if (!token) return res.status(401).json({ message: 'No refresh token' });

    try {
        const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

        const accessToken = generateAccessToken({
            _id: decoded.userId,
            role: 'user',
        });

        res.json({ isv1: true, status: 'Success', data: { accessToken } });
    } catch {
        res.status(403).json({ message: 'Invalid refresh token' });
    }
};
