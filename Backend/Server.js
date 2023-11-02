const dotenv = require("dotenv");
const app = require("./app");
const cloudinary = require("cloudinary").v2;
const connectDatabase = require("./config/database")
const hostAddress = "13.48.67.62"


//handeling uncaught exception
process.on("uncaughtExceptionMonitor", (err) => {
    console.log(`Error : ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Promise Rejection`);
    server.close(() => {
        process.exit(1);
    });
});
dotenv.config({ path: "Backend/config/config.env" });
connectDatabase();
cloudinary.config({
    cloud_name: 'dolhv9nau',
    api_key: '324913168177256',
    api_secret: '1bNkakhD1eBCoOR5NWrnbzII58Q',
    
});
 
const server = app.listen('4000', () => {
    console.log(`Server is running on http://${hostAddress}:4000`);
});

process.on("unhandledRejection", (err) => {
    console.log(`Error : ${err}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);
    server.close(() => {
        process.exit(1);
    });
});