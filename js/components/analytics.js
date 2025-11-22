/* ==============================================
   Analytics Component
   ============================================== */

import { closetItems, savedOutfits } from '../store.js';
import { getColorName, getBrightness } from '../utils/colors.js';

/**
 * Update all analytics displays
 */
export function updateAnalytics() {
    updateTotalItems();
    updateFavoriteCategory();
    updateDominantColor();
    updateSavedCount();
    updateColorChart();
    updateStyleProfile();
}

/**
 * Update total items count
 */
function updateTotalItems() {
    const el = document.getElementById('totalItems');
    if (el) el.textContent = closetItems.length;
}

/**
 * Update favorite category display
 */
function updateFavoriteCategory() {
    const categoryCounts = {};
    closetItems.forEach(item => {
        categoryCounts[item.category] = (categoryCounts[item.category] || 0) + 1;
    });

    const favCat = Object.keys(categoryCounts).reduce((a, b) =>
        categoryCounts[a] > categoryCounts[b] ? a : b, 'none');

    const el = document.getElementById('favCategory');
    if (el) el.textContent = favCat.charAt(0).toUpperCase() + favCat.slice(1);
}

/**
 * Update dominant color display
 */
function updateDominantColor() {
    const colorCounts = {};
    closetItems.forEach(item => {
        const colorName = getColorName(item.color);
        colorCounts[colorName] = (colorCounts[colorName] || 0) + 1;
    });

    const domColor = Object.keys(colorCounts).reduce((a, b) =>
        colorCounts[a] > colorCounts[b] ? a : b, 'None');

    const el = document.getElementById('domColor');
    if (el) el.textContent = domColor;
}

/**
 * Update saved outfits count
 */
function updateSavedCount() {
    const el = document.getElementById('savedCount');
    if (el) el.textContent = savedOutfits.length;
}

/**
 * Update color distribution chart
 */
function updateColorChart() {
    const colorChart = document.getElementById('colorChart');
    if (!colorChart) return;

    const uniqueColors = {};
    closetItems.forEach(item => {
        const colorName = getColorName(item.color);
        if (!uniqueColors[colorName]) {
            uniqueColors[colorName] = { count: 0, color: item.color };
        }
        uniqueColors[colorName].count++;
    });

    colorChart.innerHTML = Object.entries(uniqueColors).map(([name, data]) => `
        <div class="color-stat">
            <div class="color-box" style="background: ${data.color};"></div>
            <span>${name} (${data.count})</span>
        </div>
    `).join('');
}

/**
 * Update style profile analysis
 */
export function updateStyleProfile() {
    // Determine style type
    let styleType = 'Minimalist';
    if (closetItems.length > 10) styleType = 'Maximalist';
    if (closetItems.filter(i => i.category === 'accessories').length > 3) styleType = 'Accessory-focused';

    // Determine color preference
    const colorCounts = { dark: 0, light: 0, neutral: 0 };
    closetItems.forEach(item => {
        const brightness = getBrightness(item.color);
        if (brightness < 50) colorCounts.dark++;
        else if (brightness > 200) colorCounts.light++;
        else colorCounts.neutral++;
    });

    const colorPref = Object.keys(colorCounts).reduce((a, b) =>
        (colorCounts[a] || 0) > (colorCounts[b] || 0) ? a : b, 'neutral');

    const styleEl = document.getElementById('styleType');
    const colorEl = document.getElementById('colorPref');

    if (styleEl) styleEl.textContent = styleType;
    if (colorEl) colorEl.textContent = colorPref + ' tones';
}
