/* ==============================================
   Modal Component
   ============================================== */

import { addItem } from '../store.js';
import { renderCloset } from './closet.js';
import { renderCarousels } from './outfit-builder.js';
import { showNotification } from '../utils/notifications.js';

/**
 * Initialize modal functionality
 */
export function initModal() {
    // Color preview update
    const colorInput = document.getElementById('itemColor');
    const colorPreview = document.getElementById('colorPreview');

    if (colorInput && colorPreview) {
        colorInput.addEventListener('input', (e) => {
            colorPreview.style.background = e.target.value;
        });
    }

    // Form submission
    const form = document.getElementById('addItemForm');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }

    // Close modal on backdrop click
    const modal = document.getElementById('addItemModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
}

/**
 * Open the add item modal
 */
export function openModal() {
    const modal = document.getElementById('addItemModal');
    if (modal) {
        modal.classList.add('active');
    }
}

/**
 * Close the add item modal
 */
export function closeModal() {
    const modal = document.getElementById('addItemModal');
    const form = document.getElementById('addItemForm');

    if (modal) {
        modal.classList.remove('active');
    }
    if (form) {
        form.reset();
    }

    // Reset color preview
    const colorPreview = document.getElementById('colorPreview');
    if (colorPreview) {
        colorPreview.style.background = '#ff3366';
    }
}

/**
 * Handle form submission
 * @param {Event} e - Submit event
 */
function handleFormSubmit(e) {
    e.preventDefault();

    const newItem = {
        id: Date.now(),
        name: document.getElementById('itemName').value,
        category: document.getElementById('itemCategory').value,
        color: document.getElementById('itemColor').value,
        brand: document.getElementById('itemBrand').value || 'No Brand',
        season: document.getElementById('itemSeason').value,
        icon: document.getElementById('itemIcon').value
    };

    addItem(newItem);
    renderCloset();
    renderCarousels();
    closeModal();

    showNotification('Item added to your closet!');
}

// Expose to global scope for onclick handlers
window.openModal = openModal;
window.closeModal = closeModal;
