/* ==============================================
   Notification System
   ============================================== */

/**
 * Show a toast notification
 * @param {string} message - Message to display
 * @param {number} duration - Duration in milliseconds (default 3000)
 */
export function showNotification(message, duration = 3000) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => notification.remove(), 300);
    }, duration);
}

/**
 * Show success notification
 * @param {string} message - Success message
 */
export function showSuccess(message) {
    showNotification(message);
}

/**
 * Show error notification
 * @param {string} message - Error message
 */
export function showError(message) {
    showNotification(message);
}
