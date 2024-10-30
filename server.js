import app from './app.js';
import config from './src/config/config.js';

const port = config.PORT;

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
