import jwt from 'jsonwebtoken';

export const protect = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(404).json({
            isv1: true,
            status: false,
            message: 'Token not found',
        });
    }

    try {
        const decoder = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoder;
        next();
    } catch {
        res.status(401).json({
            isv1: true,
            status: false,
            message: 'Invalid token',
        });
    }
};
