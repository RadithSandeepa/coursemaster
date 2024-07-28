import winston from "winston";

// Define the log levels
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
};

// Define the colors corresponding to each log level
const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  debug: "blue",
};

// Create a Winston logger instance
const logger = winston.createLogger({
  levels: levels,
  transports: [
    // Log to console
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
    // Log to file
    new winston.transports.File({ filename: "error.log" }),
  ],
});

// Add colors to the logger
winston.addColors(colors);

export default logger;
