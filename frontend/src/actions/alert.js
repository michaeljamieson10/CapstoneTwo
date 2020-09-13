import { alertConstants } from '../constants/alert';
/** in order to create a popup window stating 
 * process occurred.
 */
export const alertActions = {
    success,
    error,
    clear
};

/**
 * creates a green pop window with message of what has occurred
 */
function success(message) {
    return { type: alertConstants.SUCCESS, message };
}

/**
 * creates a red pop window with message of what has occurred
 */
function error(message) {
    return { type: alertConstants.ERROR, message };
}
/**
 * removes the pop window that has occurred on change of page within the app
 */
function clear() {
    return { type: alertConstants.CLEAR };
}