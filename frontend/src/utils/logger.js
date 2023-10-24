
const logLevels = ['trace', 'debug', 'info', 'warn', 'error'];

// // Set the log level based on the environment (production/development)
// log.setLevel(process.env.NODE_ENV === 'production' ? logLevels[2] : logLevels[0]);

function logMessage(level, message, component, user, customData) {
    const timestamp = new Date().toLocaleString();
    const logData = {
        timestamp,
        level,
        message,
        component,
        user,
        customData,
    };
    if (level === 'error') {
        console.error(JSON.stringify(logData));
    }
    else console.log(JSON.stringify(logData));
}

const customLogger = {
    trace: (message, component, user, customData) => logMessage('trace', message, component, user, customData),
    debug: (message, component, user, customData) => logMessage('debug', message, component, user, customData),
    info: (message, component, user, customData) => logMessage('info', message, component, user, customData),
    warn: (message, component, user, customData) => logMessage('warn', message, component, user, customData),
    error: (message, component, user, customData) => logMessage('error', message, component, user, customData),
};

export default customLogger;
