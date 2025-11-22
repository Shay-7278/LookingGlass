/* ==============================================
   Closet Component
   ============================================== */

import {
    closetItems,
    currentFilter,
    setFilter,
    getFilteredItems,
    deleteItem as removeItem
} from '../store.js';
import { renderCarousels } from './outfit-builder.js';
import { updateAnalytics } from './analytics.js';
import { showNotification } from '../utils/notifications.js';

/**
 * Initialize closet filters
 */
export function initClosetFilters() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            setFilter(btn.dataset.filter);
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderCloset();
        });
    });
}

/**
 * Render the closet grid
 */
export function renderCloset() {
    const grid = document.getElementById('closetGrid');
    const filteredItems = getFilteredItems();

    if (filteredItems.length === 0) {
        grid.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1;">
                <div class="empty-icon">🫥</div>
                <div class="empty-text">No items in this category</div>
                <div class="empty-subtext">Click the + button to add your first item</div>
            </div>
        `;
        return;
    }

    grid.innerHTML = filteredItems.map(item => `
        <div class="clothing-card" data-id="${item.id}">
            <button class="delete-btn" onclick="window.deleteItem(${item.id})">×</button>
            <div class="clothing-image" style="background: ${item.color}20;">
                <span>${item.icon}</span>
            </div>
            <div class="clothing-info">
                <div class="clothing-name">${item.name}</div>
                <div class="clothing-details">${item.brand} • ${item.season}</div>
            </div>
        </div>
    `).join('');
}

/**
 * Delete an item from the closet
 * @param {number} id - Item ID to delete
 */
export function deleteItem(id) {
    if (confirm('Remove this item from your closet?')) {
        removeItem(id);
        renderCloset();
        renderCarousels();
        updateAnalytics();
        showNotification('Item removed from closet');
    }
}

// Expose deleteItem to global scope for onclick handlers
window.deleteItem = deleteItem;
