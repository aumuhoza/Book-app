import app from './app';

const port = process.env.PORT || 8080;

const server = app.listen(port, () => {
    console.log(`Server started, App running on port ${port}`);
});

export default server;