/* ==============================================
   Color Utilities
   ============================================== */

// Color name mapping
const COLOR_MAP = {
    '#000000': 'Black',
    '#ffffff': 'White',
    '#ff0000': 'Red',
    '#00ff00': 'Green',
    '#0000ff': 'Blue',
    '#ffff00': 'Yellow',
    '#ff00ff': 'Magenta',
    '#00ffff': 'Cyan',
    '#808080': 'Gray',
    '#ff3366': 'Pink',
    '#4169e1': 'Blue',
    '#ffd700': 'Gold'
};

/**
 * Convert hex color to RGB object
 * @param {string} hex - Hex color string
 * @returns {Object} RGB values
 */
export function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
}

/**
 * Calculate distance between two colors
 * @param {string} hex1 - First hex color
 * @param {string} hex2 - Second hex color
 * @returns {number} Color distance
 */
export function colorDistance(hex1, hex2) {
    const rgb1 = hexToRgb(hex1);
    const rgb2 = hexToRgb(hex2);

    return Math.sqrt(
        Math.pow(rgb1.r - rgb2.r, 2) +
        Math.pow(rgb1.g - rgb2.g, 2) +
        Math.pow(rgb1.b - rgb2.b, 2)
    );
}

/**
 * Get human-readable color name from hex
 * @param {string} hex - Hex color string
 * @returns {string} Color name
 */
export function getColorName(hex) {
    let closestColor = 'Other';
    let minDistance = Infinity;

    Object.entries(COLOR_MAP).forEach(([color, name]) => {
        const distance = colorDistance(hex, color);
        if (distance < minDistance) {
            minDistance = distance;
            closestColor = name;
        }
    });

    return closestColor;
}

/**
 * Get brightness value from hex color
 * @param {string} hex - Hex color string
 * @returns {number} Brightness value (0-255)
 */
export function getBrightness(hex) {
    const rgb = hexToRgb(hex);
    return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
}

/**
 * Determine if color is dark, light, or neutral
 * @param {string} hex - Hex color string
 * @returns {string} Color tone category
 */
export function getColorTone(hex) {
    const brightness = getBrightness(hex);
    if (brightness < 50) return 'dark';
    if (brightness > 200) return 'light';
    return 'neutral';
}
