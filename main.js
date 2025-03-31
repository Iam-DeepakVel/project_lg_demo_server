import app from './server.js';
import connectDB from './db/connection.js';

const PORT = process.env.PORT || 3001;

connectDB().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
