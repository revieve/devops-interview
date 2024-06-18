import winston from 'winston';
import fs from 'fs';
import path from 'path';

// Define log directory and files
const logDir = 'logs';
const errorLogFile = path.join(logDir, 'error.log');
const combinedLogFile = path.join(logDir, 'combined.log');

// Create logs directory if it doesn't exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// Create error.log file if it doesn't exist
if (!fs.existsSync(errorLogFile)) {
  fs.writeFileSync(errorLogFile, '');
}

// Create combined.log file if it doesn't exist
if (!fs.existsSync(combinedLogFile)) {
  fs.writeFileSync(combinedLogFile, '');
}

// Create logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`)
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: errorLogFile, level: 'error' }),
    new winston.transports.File({ filename: combinedLogFile }),
  ],
});

export default logger;
