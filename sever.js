const app = require("./src/app");
const config = require("./src/configs/config.mongodb");
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

process.on("SIGINT", (err, promise) => {
    server.close(() => console.log('Exit Sever Express'));
});

