import 'dotenv/config';
import app from './app.js';
import connectDB from './config/db.js';

connectDB();
app.listen(process.env.PORT, () => {
    console.log(`Auth service is ruuning in the port ${process.env.PORT}`);
});
