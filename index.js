const express = require("express");
const apiRouter = require("./apiRouter");
const rateLimit = require("express-rate-limit")
const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests, please try again later.'
  });


const app = express();

app.use(express.json());
app.use(limiter);
app.use("/api/posts",apiRouter);

app.use((req,res,next)=>{
    res.status(404).send("404: Page not found");
})


const server = app.listen(3000,()=>{
    console.log("listening on port 3000");
})

// Graceful shutdown  SIGINT (Ctrl+C) or SIGTERM (termination signal) 
process.on('SIGINT', () => {
    console.log('Received SIGINT. Closing server...');
    shutdown();
});

process.on('SIGTERM', () => {
    console.log('Received SIGTERM. Closing server...');
    shutdown();
});

function shutdown() {
    // Close the server
    server.close(() => {
        console.log('Server closed. Exiting process...');
        // Exit the process
        process.exit(0);
    });

    // Force close connections after a specific timeout (e.g., 30 seconds)
    setTimeout(() => {
        console.error('Could not close connections in time, forcefully shutting down');
        // Exit the process forcefully
        process.exit(1);
    }, 30000);
}
