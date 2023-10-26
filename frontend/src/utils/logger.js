const logLevels = ['trace', 'debug', 'info', 'warn', 'error'];

// Determine the log level from an environment variable or use a default level.
const envLogLevel = import.meta.env.VITE_LOG_LEVEL;
const defaultLogLevel = 'error';
const selectedLogLevel = logLevels.includes(envLogLevel) ? envLogLevel : defaultLogLevel;

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
    } else {
        console.log(JSON.stringify(logData));
    }
}

const customLogger = {
    trace: (message, component, user, customData) => {
        if (logLevels.indexOf(selectedLogLevel) <= logLevels.indexOf('trace')) {
            logMessage('trace', message, component, user, customData);
        }
    },
    debug: (message, component, user, customData) => {
        if (logLevels.indexOf(selectedLogLevel) <= logLevels.indexOf('debug')) {
            logMessage('debug', message, component, user, customData);
        }
    },
    info: (message, component, user, customData) => {
        if (logLevels.indexOf(selectedLogLevel) <= logLevels.indexOf('info')) {
            logMessage('info', message, component, user, customData);
        }
    },
    warn: (message, component, user, customData) => {
        if (logLevels.indexOf(selectedLogLevel) <= logLevels.indexOf('warn')) {
            logMessage('warn', message, component, user, customData);
        }
    },
    error: (message, component, user, customData) => {
        if (logLevels.indexOf(selectedLogLevel) <= logLevels.indexOf('error')) {
            logMessage('error', message, component, user, customData);
        }
    },
};

export default customLogger;
