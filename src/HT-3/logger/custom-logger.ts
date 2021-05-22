import winston from 'winston';

export class CustomLogger {

  static logger = winston.createLogger({
    level: 'info',
    format: winston.format.simple(),
    defaultMeta: {
      service: 'user-service'
    },
    transports: [
      new winston.transports.File({ filename: './logs/error.log', level: 'error' }),
      new winston.transports.File({ filename: './logs/combined.log' })
    ],
    exceptionHandlers: [
      new winston.transports.File({ filename: './logs/exceptions.log' })
    ]
  });
}
