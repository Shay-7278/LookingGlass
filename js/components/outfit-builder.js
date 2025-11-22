/* ==============================================
   Outfit Builder Component
   ============================================== */

import {
    closetItems,
    savedOutfits,
    selectedOutfit,
    resetSelectedOutfit,
    getItemsByCategory,
    findItemById,
    addOutfit
} from '../store.js';
import { renderSavedOutfits } from './saved-outfits.js';
import { showNotification } from '../utils/notifications.js';

/**
 * Render category carousels for outfit builder
 */
export function renderCarousels() {
    const categories = {
        tops: document.getElementById('topsCarousel'),
        bottoms: document.getElementById('bottomsCarousel'),
        shoes: document.getElementById('shoesCarousel'),
        accessories: document.getElementById('accessoriesCarousel')
    };

    Object.keys(categories).forEach(cat => {
        const items = getItemsByCategory(cat);
        const carousel = categories[cat];

        if (!carousel) return;

        if (items.length === 0) {
            carousel.innerHTML = '<div style="color: #666;">No items</div>';
        } else {
            carousel.innerHTML = items.map(item => `
                <div class="carousel-item"
                     data-id="${item.id}"
                     data-category="${cat}"
                     onclick="window.selectItem(${item.id}, '${cat}')"
                     style="background: ${item.color}20;">
                    ${item.icon}
                </div>
            `).join('');
        }
    });
}

/**
 * Select an item for the current outfit
 * @param {number} id - Item ID
 * @param {string} category - Item category
 */
export function selectItem(id, category) {
    const item = findItemById(id);
    if (!item) return;

    // Update selection
    selectedOutfit[category] = item;

    // Update UI
    document.querySelectorAll(`.carousel-item[data-category="${category}"]`).forEach(el => {
        el.classList.remove('selected');
    });
    const selectedEl = document.querySelector(`.carousel-item[data-id="${id}"]`);
    if (selectedEl) {
        selectedEl.classList.add('selected');
    }

    // Update preview
    updateOutfitPreview();
}

/**
 * Update the outfit preview display
 */
function updateOutfitPreview() {
    if (selectedOutfit.top) {
        const top = document.getElementById('selectedTop');
        if (top) {
            top.innerHTML = selectedOutfit.top.icon;
            top.style.background = selectedOutfit.top.color + '20';
        }
    }
    if (selectedOutfit.bottom) {
        const bottom = document.getElementById('selectedBottom');
        if (bottom) {
            bottom.innerHTML = selectedOutfit.bottom.icon;
            bottom.style.background = selectedOutfit.bottom.color + '20';
        }
    }
    if (selectedOutfit.shoes) {
        const shoes = document.getElementById('selectedShoes');
        if (shoes) {
            shoes.innerHTML = selectedOutfit.shoes.icon;
            shoes.style.background = selectedOutfit.shoes.color + '20';
        }
    }
}

/**
 * Save the current outfit
 */
export function saveOutfit() {
    if (!selectedOutfit.top || !selectedOutfit.bottom || !selectedOutfit.shoes) {
        alert('Please select at least a top, bottom, and shoes to save an outfit.');
        return;
    }

    const outfit = {
        id: Date.now(),
        items: { ...selectedOutfit },
        date: new Date().toLocaleDateString(),
        name: `Outfit ${savedOutfits.length + 1}`
    };

    addOutfit(outfit);
    renderSavedOutfits();
    showNotification('Outfit saved successfully!');

    // Reset selection
    resetSelectedOutfit();
    document.querySelectorAll('.carousel-item').forEach(el => el.classList.remove('selected'));

    // Reset preview
    const top = document.getElementById('selectedTop');
    const bottom = document.getElementById('selectedBottom');
    const shoes = document.getElementById('selectedShoes');
    if (top) { top.innerHTML = '👔'; top.style.background = ''; }
    if (bottom) { bottom.innerHTML = '👖'; bottom.style.background = ''; }
    if (shoes) { shoes.innerHTML = '👟'; shoes.style.background = ''; }
}

// Expose functions to global scope for onclick handlers
window.selectItem = selectItem;
window.saveOutfit = saveOutfit;
