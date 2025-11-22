/* ==============================================
   Store - State Management & LocalStorage
   ============================================== */

// Application State
export let closetItems = JSON.parse(localStorage.getItem('closetItems')) || [];
export let savedOutfits = JSON.parse(localStorage.getItem('savedOutfits')) || [];
export let currentFilter = 'all';
export let selectedOutfit = {
    top: null,
    bottom: null,
    shoes: null,
    accessories: null
};

/**
 * Set the current filter
 * @param {string} filter - Filter value
 */
export function setFilter(filter) {
    currentFilter = filter;
}

/**
 * Reset selected outfit
 */
export function resetSelectedOutfit() {
    selectedOutfit = {
        top: null,
        bottom: null,
        shoes: null,
        accessories: null
    };
}

/**
 * Save closet items to localStorage
 */
export function saveClosetItems() {
    localStorage.setItem('closetItems', JSON.stringify(closetItems));
}

/**
 * Save outfits to localStorage
 */
export function saveOutfits() {
    localStorage.setItem('savedOutfits', JSON.stringify(savedOutfits));
}

/**
 * Add a new item to the closet
 * @param {Object} item - Item to add
 */
export function addItem(item) {
    closetItems.push(item);
    saveClosetItems();
}

/**
 * Delete an item from the closet
 * @param {number} id - Item ID to delete
 */
export function deleteItem(id) {
    closetItems = closetItems.filter(item => item.id !== id);
    saveClosetItems();
}

/**
 * Add a new outfit to saved outfits
 * @param {Object} outfit - Outfit to save
 */
export function addOutfit(outfit) {
    savedOutfits.push(outfit);
    saveOutfits();
}

/**
 * Load default items for demo
 */
export function loadDefaultItems() {
    if (closetItems.length === 0) {
        const defaultItems = [
            { id: Date.now() + 1, name: 'White T-Shirt', category: 'tops', color: '#ffffff', brand: 'Uniqlo', season: 'all', icon: '👕' },
            { id: Date.now() + 2, name: 'Black Jeans', category: 'bottoms', color: '#000000', brand: "Levi's", season: 'all', icon: '👖' },
            { id: Date.now() + 3, name: 'White Sneakers', category: 'shoes', color: '#ffffff', brand: 'Nike', season: 'all', icon: '👟' },
            { id: Date.now() + 4, name: 'Denim Jacket', category: 'outerwear', color: '#4169e1', brand: 'Gap', season: 'spring', icon: '🧥' },
            { id: Date.now() + 5, name: 'Black Cap', category: 'accessories', color: '#000000', brand: 'New Era', season: 'summer', icon: '🧢' }
        ];
        closetItems = defaultItems;
        saveClosetItems();
    }
}

/**
 * Get filtered items
 * @returns {Array} Filtered closet items
 */
export function getFilteredItems() {
    return currentFilter === 'all'
        ? closetItems
        : closetItems.filter(item => item.category === currentFilter);
}

/**
 * Get items by category
 * @param {string} category - Category to filter by
 * @returns {Array} Items in the category
 */
export function getItemsByCategory(category) {
    return closetItems.filter(item => item.category === category);
}

/**
 * Find item by ID
 * @param {number} id - Item ID
 * @returns {Object|undefined} Found item
 */
export function findItemById(id) {
    return closetItems.find(item => item.id === id);
}
