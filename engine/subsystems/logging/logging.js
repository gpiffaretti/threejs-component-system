
class Logger{

    logMessage(channel, message){
        console.log(message);
    }

    logError(channel, message){
        console.log(message);
    }

}

const logger = new Logger();

export default logger;