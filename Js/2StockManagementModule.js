// Enhanced Stock Data with product images and phone numbers
const stockData = [
    { 
        id: 1, 
        productName: "HP ProBook 450 G8 Laptop", 
        productImage: "https://images.unsplash.com/photo-1593642532871-8b12e02d091c?w=100&h=100&fit=crop&crop=center",
        availableQty: 15, 
        minQty: 5, 
        status: "normal", 
        lastUpdated: "2025-07-23 14:30:00", 
        type: "inward",
        vendor: "ABC Electronics Pvt Ltd",
        warehouseKeeper: "John Doe",
        phoneNumber: "+91-9876543210",
        quantity: 20,
        reason: "New Purchase Delivery",
        reasonDetail: "Bulk order received"
    },
    { 
        id: 2, 
        productName: "Premium Copy Paper A4", 
        productImage: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=100&h=100&fit=crop&crop=center",
        availableQty: 230, 
        minQty: 50, 
        status: "normal", 
        lastUpdated: "2025-07-23 11:45:00", 
        type: "outward",
        vendor: "XYZ Paper Materials Ltd",
        warehouseKeeper: "Jane Smith",
        phoneNumber: "+91-9876543211",
        quantity: 50,
        reason: "Office Supply Request",
        reasonDetail: "Monthly office requirements"
    },
    { 
        id: 3, 
        productName: "Steel Rods 12mm", 
        productImage: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=100&h=100&fit=crop&crop=center",
        availableQty: 8, 
        minQty: 20, 
        status: "critical", 
        lastUpdated: "2025-07-23 08:15:00", 
        type: "outward",
        vendor: "Global Steel Trading Co",
        warehouseKeeper: "Mike Johnson",
        phoneNumber: "+91-9876543212",
        quantity: 15,
        reason: "Project Request",
        reasonDetail: "Construction Project Alpha"
    },
    { 
        id: 4, 
        productName: "Safety Helmets - White", 
        productImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&h=100&fit=crop&crop=center",
        availableQty: 45, 
        minQty: 15, 
        status: "normal", 
        lastUpdated: "2025-07-23 13:20:00", 
        type: "inward",
        vendor: "Prime Safety Equipment",
        warehouseKeeper: "Sarah Wilson",
        phoneNumber: "+91-9876543213",
        quantity: 30,
        reason: "Safety Compliance",
        reasonDetail: "Monthly safety stock"
    },
    { 
        id: 5, 
        productName: "Power Drill Set", 
        productImage: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=100&h=100&fit=crop&crop=center",
        availableQty: 6, 
        minQty: 3, 
        status: "low", 
        lastUpdated: "2025-07-23 12:10:00", 
        type: "outward",
        vendor: "Elite Tool Supply Corp",
        warehouseKeeper: "David Brown",
        phoneNumber: "+91-9876543214",
        quantity: 8,
        reason: "Maintenance Request",
        reasonDetail: "Equipment maintenance"
    },
    { 
        id: 6, 
        productName: "Industrial Lubricant Oil", 
        productImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop&crop=center",
        availableQty: 12, 
        minQty: 8, 
        status: "low", 
        lastUpdated: "2025-07-23 10:25:00", 
        type: "inward",
        vendor: "ABC Chemical Industries",
        warehouseKeeper: "Robert Garcia",
        phoneNumber: "+91-9876543215",
        quantity: 25,
        reason: "Supplier Delivery",
        reasonDetail: "Regular maintenance stock"
    },
    { 
        id: 7, 
        productName: "Office Chairs - Ergonomic", 
        productImage: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=100&h=100&fit=crop&crop=center",
        availableQty: 35, 
        minQty: 10, 
        status: "normal", 
        lastUpdated: "2025-07-23 16:45:00", 
        type: "inward",
        vendor: "Premium Furniture Hub",
        warehouseKeeper: "Emily Chen",
        phoneNumber: "+91-9876543216",
        quantity: 40,
        reason: "Office Expansion",
        reasonDetail: "New department setup"
    },
    { 
        id: 8, 
        productName: "LED Strip Lights 5M", 
        productImage: "https://images.unsplash.com/photo-1558002401-b2c96f1fc467?w=100&h=100&fit=crop&crop=center",
        availableQty: 4, 
        minQty: 15, 
        status: "critical", 
        lastUpdated: "2025-07-23 09:20:00", 
        type: "outward",
        vendor: "Bright Light Solutions",
        warehouseKeeper: "Alex Rodriguez",
        phoneNumber: "+91-9876543217",
        quantity: 12,
        reason: "Installation Project",
        reasonDetail: "Office lighting upgrade"
    }
];

let filteredStockData = [...stockData];
let currentFilter = 'all';
let currentTimePeriod = 'thisMonth';
let currentEditingStockId = null; // Track currently editing stock

// Memory-efficient state management for sidebar
const sidebarState = {
    isCollapsed: false,
    searchActive: false
};

// Sidebar search functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const navItems = document.querySelectorAll('.nav-item');
            sidebarState.searchActive = searchTerm.length > 0;

            navItems.forEach(item => {
                const text = item.textContent.toLowerCase();
                const shouldShow = text.includes(searchTerm) || searchTerm === '';
                item.style.display = shouldShow ? 'block' : 'none';
            });
        });
    }

    // Initialize the stock management system
    renderStockTable();
    renderStockCards(); // ✅ ADD THIS LINE
    updateStats();
    initializeCharts();
    startRealTimeUpdates();
    setActiveNavItem();
    showToast('Stock Management loaded successfully!', 'success');
});

// Set active navigation item
function setActiveNavItem() {
    const currentPage = window.location.pathname.split('/').pop() || '2StockManagementModule.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage || 
            (currentPage === '2StockManagementModule.html' && link.getAttribute('href') === '2StockManagementModule.html')) {
            link.classList.add('active');
        }
    });
}

// Mobile sidebar toggle
function toggleMobileSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('open');
}

// Close mobile sidebar when clicking outside
document.addEventListener('click', function(e) {
    const sidebar = document.getElementById('sidebar');
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    
    if (window.innerWidth <= 768 && 
        !sidebar.contains(e.target) && 
        !mobileBtn.contains(e.target)) {
        sidebar.classList.remove('open');
    }
});

// Memory-efficient resize handler
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
        const sidebar = document.getElementById('sidebar');
        if (window.innerWidth > 768) {
            sidebar.classList.remove('open');
        }
    }, 250);
});

// Logout function
function logout() {
    if (confirm("Are you sure you want to logout?")) {
        window.location.href = "login.html";
    }
}

// ========================================================================== 
// UPDATED TABLE RENDERING FOR NEW STOCK IN/OUT STRUCTURE
// ==========================================================================

// Updated render function to match the new HTML structure
function renderStockTable() {
    const tbody = document.getElementById('stockTableBody');
    const headerRow = document.getElementById('tableHeaders');
    
    // Set the exact headers as defined in your HTML
    const headers = [
        'Product Image',
        'Product Name', 
        'In/Out Badge',
        'Reason',
        'Product List',
        'Warehouse Keeper',
        'Updated Time',
        'Actions'
    ];
    
    headerRow.innerHTML = headers.map(header => `<th>${header}</th>`).join('');
    
    if (filteredStockData.length === 0) {
        tbody.innerHTML = `
            <tr><td colspan="${headers.length}" class="empty-state">
                <i class="fas fa-box-open"></i>
                <h3>No Stock Data Found</h3>
                <p>No stock items match your current filters.</p>
            </td></tr>
        `;
        return;
    }
    
    tbody.innerHTML = filteredStockData.map(stock => `
        <tr>
            <td>
                <img src="${stock.productImage}" alt="${stock.productName}" class="product-image" />
            </td>
            <td>
                <div class="product-info">
                    <div class="product-name">${stock.productName}</div>
                    <div class="product-sku">SKU: ${stock.id.toString().padStart(3, '0')}</div>
                </div>
            </td>
            <td>
                <span class="movement-badge ${stock.type}">
                    <i class="fas fa-arrow-${stock.type === 'inward' ? 'down' : 'up'}"></i>
                    Stock ${stock.type === 'inward' ? 'In' : 'Out'}
                </span>
            </td>
            <td>
                <div class="reason-info">
                    <div class="reason-title">${stock.reason}</div>
                    <div class="reason-detail">${stock.reasonDetail}</div>
                </div>
            </td>
            <td>
                <div class="product-list">
                    <div class="product-item">${stock.productName} (${stock.quantity} units)</div>
                    <div class="product-quantity">Total: ${stock.quantity} units</div>
                </div>
            </td>
            <td>
                <div class="keeper-info">
                    <div class="keeper-name">${stock.warehouseKeeper}</div>
                    <div class="keeper-id">ID: WK-${stock.id.toString().padStart(3, '0')}</div>
                </div>
            </td>
            <td>
                <div class="time-info">
                    <div class="update-time">${formatTime(stock.lastUpdated)}</div>
                    <div class="time-ago">${getTimeAgo(stock.lastUpdated)}</div>
                </div>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn-sm view" onclick="viewStockDetails(${stock.id})" title="View Details">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn-sm edit" onclick="editStockMovement(${stock.id})" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn-sm delete" onclick="deleteStockMovement(${stock.id})" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

// ========================================================================== 
// ✅ PROFESSIONAL STOCK CARDS FUNCTIONALITY - ADDED MISSING SECTION
// ==========================================================================

// Function to render All Stocks card
function renderAllStocksCard() {
    const container = document.getElementById('allStocksList');
    if (!container) return;
    
    const allStocks = [...stockData];
    
    if (allStocks.length === 0) {
        container.innerHTML = `
            <div class="stock-empty-state">
                <i class="fas fa-box-open"></i>
                <h4>No Stock Items</h4>
                <p>No stock items available in inventory.</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = allStocks.map(stock => `
        <div class="stock-item" onclick="viewStockDetails(${stock.id})" title="Click to view details">
            <img src="${stock.productImage}" alt="${stock.productName}" class="stock-item-image" loading="lazy" />
            <div class="stock-item-info">
                <div class="stock-item-name">${stock.productName}</div>
                <div class="stock-item-vendor">${stock.vendor}</div>
                <div class="stock-item-details">SKU: ${stock.id.toString().padStart(3, '0')}</div>
            </div>
            <div class="stock-item-right">
                <div class="stock-item-qty">
                    <span class="available-qty ${stock.status}">${stock.availableQty}</span>
                    <span>/</span>
                    <span class="min-qty">${stock.minQty}</span>
                </div>
                <div class="stock-status-badge ${stock.status}">
                    <div class="status-dot ${stock.status}"></div>
                    ${getStatusText(stock.status)}
                </div>
                <div class="stock-item-time">${formatStockTime(stock.lastUpdated)}</div>
            </div>
        </div>
    `).join('');
}

// Function to render Low Stocks card
function renderLowStocksCard() {
    const container = document.getElementById('lowStocksList');
    if (!container) return;
    
    const lowStocks = stockData.filter(stock => 
        stock.status === 'low' || stock.status === 'critical'
    );
    
    if (lowStocks.length === 0) {
        container.innerHTML = `
            <div class="stock-empty-state">
                <i class="fas fa-check-circle"></i>
                <h4>All Stock Levels Good</h4>
                <p>No items with low or critical stock levels.</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = lowStocks.map(stock => `
        <div class="stock-item" onclick="viewStockDetails(${stock.id})" title="Click to view details">
            <img src="${stock.productImage}" alt="${stock.productName}" class="stock-item-image" loading="lazy" />
            <div class="stock-item-info">
                <div class="stock-item-name">${stock.productName}</div>
                <div class="stock-item-vendor">${stock.vendor}</div>
                <div class="stock-item-details">SKU: ${stock.id.toString().padStart(3, '0')}</div>
            </div>
            <div class="stock-item-right">
                <div class="stock-item-qty">
                    <span class="available-qty ${stock.status}">${stock.availableQty}</span>
                    <span>/</span>
                    <span class="min-qty">${stock.minQty}</span>
                </div>
                <div class="stock-status-badge ${stock.status}">
                    <div class="status-dot ${stock.status}"></div>
                    ${getStatusText(stock.status)}
                </div>
                <div class="stock-item-time">${formatStockTime(stock.lastUpdated)}</div>
            </div>
        </div>
    `).join('');
}

// Function to format time for stock cards
function formatStockTime(dateTimeString) {
    const date = new Date(dateTimeString);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return '1 day ago';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    
    return date.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short'
    });
}

// Function to render both stock cards
function renderStockCards() {
    // Add loading state
    showStockLoading();
    
    // Simulate network delay and render
    setTimeout(() => {
        renderAllStocksCard();
        renderLowStocksCard();
    }, 300);
}

// Show loading state
function showStockLoading() {
    const containers = ['allStocksList', 'lowStocksList'];
    containers.forEach(id => {
        const container = document.getElementById(id);
        if (container) {
            container.innerHTML = `
                <div class="stock-loading">
                    <i class="fas fa-spinner"></i>
                </div>
            `;
        }
    });
}

// View All functionality
function viewAllStocks() {
    showToast('Opening All Stocks view...', 'info');
    // Add your navigation logic here
    // Example: window.location.href = 'all-stocks.html';
}

function viewLowStocks() {
    showToast('Opening Low Stocks view...', 'info');
    // Add your navigation logic here
    // Example: window.location.href = 'low-stocks.html';
}

// ========================================================================== 
// MODAL FUNCTIONS FOR VIEW, EDIT, DELETE ACTIONS
// ==========================================================================

// VIEW STOCK DETAILS MODAL
function viewStockDetails(stockId) {
    const stock = stockData.find(s => s.id === stockId);
    if (!stock) {
        showToast('Stock item not found!', 'error');
        return;
    }
    
    // Populate view modal with stock data
    document.getElementById('viewProductImage').src = stock.productImage;
    document.getElementById('viewProductName').textContent = stock.productName;
    document.getElementById('viewProductSKU').textContent = `SKU-${stock.id.toString().padStart(3, '0')}`;
    document.getElementById('viewQuantity').textContent = `${stock.quantity} units`;
    document.getElementById('viewReason').textContent = stock.reason;
    document.getElementById('viewReasonDetail').textContent = stock.reasonDetail;
    document.getElementById('viewDateTime').textContent = formatDateTime(stock.lastUpdated);
    document.getElementById('viewWarehouseKeeper').textContent = stock.warehouseKeeper;
    document.getElementById('viewPhoneNumber').textContent = stock.phoneNumber;
    document.getElementById('viewVendor').textContent = stock.vendor;
    
    // Set movement badge
    const movementBadge = document.getElementById('viewMovementBadge');
    movementBadge.className = `movement-badge-large ${stock.type}`;
    movementBadge.innerHTML = `
        <i class="fas fa-arrow-${stock.type === 'inward' ? 'down' : 'up'}"></i>
        Stock ${stock.type === 'inward' ? 'In' : 'Out'}
    `;
    
    // Show modal
    const modal = document.getElementById('viewStockModal');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeViewModal() {
    const modal = document.getElementById('viewStockModal');
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

function printStockDetails() {
    const stockId = document.getElementById('viewProductSKU').textContent;
    showToast(`Printing details for ${stockId}`, 'info');
    // Add actual print functionality here
    window.print();
}

// EDIT STOCK MOVEMENT MODAL
function editStockMovement(stockId) {
    const stock = stockData.find(s => s.id === stockId);
    if (!stock) {
        showToast('Stock item not found!', 'error');
        return;
    }
    
    currentEditingStockId = stockId;
    
    // Populate edit form with stock data
    document.getElementById('editProductName').value = stock.productName;
    document.getElementById('editProductSKU').value = `SKU-${stock.id.toString().padStart(3, '0')}`;
    document.getElementById('editMovementType').value = stock.type;
    document.getElementById('editQuantity').value = stock.quantity;
    document.getElementById('editReason').value = stock.reason;
    document.getElementById('editReasonDetail').value = stock.reasonDetail;
    document.getElementById('editWarehouseKeeper').value = stock.warehouseKeeper;
    document.getElementById('editPhoneNumber').value = stock.phoneNumber;
    document.getElementById('editVendor').value = stock.vendor;
    
    // Show modal
    const modal = document.getElementById('editStockModal');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeEditModal() {
    const modal = document.getElementById('editStockModal');
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
    currentEditingStockId = null;
    
    // Reset form
    document.getElementById('editStockForm').reset();
}

function saveStockMovement() {
    if (!currentEditingStockId) {
        showToast('No stock item selected for editing!', 'error');
        return;
    }
    
    const stockIndex = stockData.findIndex(s => s.id === currentEditingStockId);
    if (stockIndex === -1) {
        showToast('Stock item not found!', 'error');
        return;
    }
    
    // Get form data
    const formData = {
        type: document.getElementById('editMovementType').value,
        quantity: parseInt(document.getElementById('editQuantity').value),
        reason: document.getElementById('editReason').value,
        reasonDetail: document.getElementById('editReasonDetail').value,
        warehouseKeeper: document.getElementById('editWarehouseKeeper').value,
        phoneNumber: document.getElementById('editPhoneNumber').value,
        vendor: document.getElementById('editVendor').value,
        lastUpdated: new Date().toISOString()
    };
    
    // Validate required fields
    if (!formData.quantity || !formData.reason || !formData.reasonDetail) {
        showToast('Please fill in all required fields!', 'error');
        return;
    }
    
    if (formData.quantity <= 0) {
        showToast('Quantity must be greater than 0!', 'error');
        return;
    }
    
    // Update stock data
    stockData[stockIndex] = { ...stockData[stockIndex], ...formData };
    
    // Update status based on new quantity
    const stock = stockData[stockIndex];
    if (stock.availableQty === 0) {
        stock.status = 'critical';
    } else if (stock.availableQty <= stock.minQty) {
        stock.status = 'low';
    } else {
        stock.status = 'normal';
    }
    
    // Update filtered data if needed
    filteredStockData = getFilteredData();
    
    // Close modal and refresh everything
    closeEditModal();
    renderStockTable();
    renderStockCards(); // ✅ ADD THIS LINE
    updateStats();
    showToast('Stock movement updated successfully!', 'success');
}

// DELETE STOCK MOVEMENT MODAL
function deleteStockMovement(stockId) {
    const stock = stockData.find(s => s.id === stockId);
    if (!stock) {
        showToast('Stock item not found!', 'error');
        return;
    }
    
    // Populate delete confirmation with stock data
    document.getElementById('deleteMovementId').textContent = `SM-${stock.id.toString().padStart(3, '0')}`;
    document.getElementById('deleteProductName').textContent = stock.productName;
    document.getElementById('deleteMovementType').textContent = `Stock ${stock.type === 'inward' ? 'In' : 'Out'}`;
    
    // Store the stock ID for deletion
    currentEditingStockId = stockId;
    
    // Show modal
    const modal = document.getElementById('deleteStockModal');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeDeleteModal() {
    const modal = document.getElementById('deleteStockModal');
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
    currentEditingStockId = null;
}

function confirmDeleteStockMovement() {
    if (!currentEditingStockId) {
        showToast('No stock item selected for deletion!', 'error');
        return;
    }
    
    const stockIndex = stockData.findIndex(s => s.id === currentEditingStockId);
    if (stockIndex === -1) {
        showToast('Stock item not found!', 'error');
        return;
    }
    
    const deletedStock = stockData[stockIndex];
    
    // Remove from main data
    stockData.splice(stockIndex, 1);
    
    // Update filtered data
    filteredStockData = getFilteredData();
    
    // Close modal and refresh everything
    closeDeleteModal();
    renderStockTable();
    renderStockCards(); // ✅ ADD THIS LINE
    updateStats();
    showToast(`Stock movement ${deletedStock.productName} deleted successfully!`, 'success');
}

// Helper function to get filtered data based on current filter
function getFilteredData() {
    switch(currentFilter) {
        case 'all':
            return [...stockData];
        case 'inward':
            return stockData.filter(stock => stock.type === 'inward');
        case 'outward':
            return stockData.filter(stock => stock.type === 'outward');
        case 'lowStock':
            return stockData.filter(stock => stock.status === 'low' || stock.status === 'critical');
        default:
            return [...stockData];
    }
}

// ========================================================================== 
// ADDITIONAL FUNCTIONS
// ==========================================================================

function addNewStockMovement() {
    showToast('Opening new stock movement form', 'info');
    // You can implement a new stock movement form here
    // For now, we'll just show a message
}

function exportCurrentStock() {
    exportStockReport('excel');
}

function viewProductDetails(productId) {
    showToast(`Viewing product details for ${productId}`, 'info');
    // Add your product details logic here
}

function editProductStock(productId) {
    showToast(`Editing stock for product ${productId}`, 'info');
    // Add your edit stock logic here
}

// ========================================================================== 
// UTILITY FUNCTIONS
// ==========================================================================

function formatTime(dateTimeString) {
    const date = new Date(dateTimeString);
    return date.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit'
    });
}

function getTimeAgo(dateTimeString) {
    const date = new Date(dateTimeString);
    const now = new Date();
    const diff = Math.floor((now - date) / (1000 * 60 * 60)); // hours
    
    if (diff < 1) return 'Just now';
    if (diff === 1) return '1h ago';
    if (diff < 24) return `${diff}h ago`;
    
    const days = Math.floor(diff / 24);
    if (days === 1) return '1 day ago';
    return `${days} days ago`;
}

function formatDateTime(dateTimeString) {
    const date = new Date(dateTimeString);
    return date.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    }) + ' ' + date.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Quick filter functions updated for new structure
function setQuickFilter(filterType) {
    document.querySelectorAll('.quick-filter-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-filter="${filterType}"]`).classList.add('active');
    
    currentFilter = filterType;
    filteredStockData = getFilteredData();
    
    renderStockTable();
    renderStockCards(); // ✅ ADD THIS LINE
    updateStats();
    showToast(`Applied ${filterType} filter. Found ${filteredStockData.length} items.`, 'info');
}

// Custom Alert System
function showCustomAlert(title, message, type = 'confirm', callback = null) {
    const overlay = document.getElementById('customAlertOverlay');
    const titleEl = document.getElementById('customAlertTitle');
    const messageEl = document.getElementById('customAlertMessage');
    const iconEl = document.getElementById('customAlertIcon');
    const confirmBtn = document.getElementById('customAlertConfirm');
    const cancelBtn = document.getElementById('customAlertCancel');

    titleEl.textContent = title;
    messageEl.textContent = message;

    // Set icon and style based on type
    iconEl.className = `custom-alert-icon ${type}`;
    switch(type) {
        case 'success':
            iconEl.innerHTML = '<i class="fas fa-check-circle"></i>';
            break;
        case 'error':
            iconEl.innerHTML = '<i class="fas fa-times-circle"></i>';
            break;
        case 'confirm':
        default:
            iconEl.innerHTML = '<i class="fas fa-question-circle"></i>';
            break;
    }

    overlay.classList.add('show');

    // Handle button clicks
    const handleConfirm = () => {
        overlay.classList.remove('show');
        if (callback) callback(true);
        cleanup();
    };

    const handleCancel = () => {
        overlay.classList.remove('show');
        if (callback) callback(false);
        cleanup();
    };

    const cleanup = () => {
        confirmBtn.removeEventListener('click', handleConfirm);
        cancelBtn.removeEventListener('click', handleCancel);
    };

    confirmBtn.addEventListener('click', handleConfirm);
    cancelBtn.addEventListener('click', handleCancel);

    // Close on overlay click
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            handleCancel();
        }
    });
}

// Time period update
function updateTimePeriod() {
    currentTimePeriod = document.getElementById('timePeriod').value;
    updateChartData();
    showToast(`Updated to ${currentTimePeriod} period.`, 'info');
}

// Chart initialization with vibrant colors
function initializeCharts() {
    initStockMovementChart();
    initStockDistributionChart();
}

function initStockMovementChart() {
    const ctx = document.getElementById('stockMovementChart').getContext('2d');
    
    const inwardGradient = ctx.createLinearGradient(0, 0, 0, 200);
    inwardGradient.addColorStop(0, 'rgba(75, 192, 192, 0.8)');
    inwardGradient.addColorStop(1, 'rgba(75, 192, 192, 0.2)');
    
    const outwardGradient = ctx.createLinearGradient(0, 0, 0, 200);
    outwardGradient.addColorStop(0, 'rgba(255, 99, 132, 0.8)');
    outwardGradient.addColorStop(1, 'rgba(255, 99, 132, 0.2)');
    
    window.stockChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: getTimeLabels(),
            datasets: [
                {
                    label: 'Stock Inward',
                    data: getInwardData(),
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: inwardGradient,
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: 'rgba(75, 192, 192, 1)',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 6
                },
                {
                    label: 'Stock Outward',
                    data: getOutwardData(),
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: outwardGradient,
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: 'rgba(255, 99, 132, 1)',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 6
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: 'var(--text-secondary)',
                        font: { size: 11, weight: 'bold' },
                        usePointStyle: true
                    }
                }
            },
            scales: {
                x: {
                    grid: { color: 'rgba(0, 0, 0, 0.1)', drawBorder: false },
                    ticks: { color: 'var(--text-muted)', font: { size: 10, weight: 'bold' } }
                },
                y: {
                    grid: { color: 'rgba(0, 0, 0, 0.1)', drawBorder: false },
                    ticks: { color: 'var(--text-muted)', font: { size: 10, weight: 'bold' } }
                }
            }
        }
    });
}

function initStockDistributionChart() {
    const ctx = document.getElementById('stockDistributionChart').getContext('2d');
    
    // Create category data based on product types
    const categoryData = {
        'Electronics': 0,
        'Stationery': 0,
        'Materials': 0,
        'Safety': 0,
        'Tools': 0,
        'Consumables': 0,
        'Furniture': 0,
        'Lighting': 0
    };
    
    // Categorize products based on their names
    stockData.forEach(stock => {
        if (stock.productName.toLowerCase().includes('laptop') || stock.productName.toLowerCase().includes('electronic')) {
            categoryData['Electronics'] += stock.availableQty;
        } else if (stock.productName.toLowerCase().includes('paper') || stock.productName.toLowerCase().includes('copy')) {
            categoryData['Stationery'] += stock.availableQty;
        } else if (stock.productName.toLowerCase().includes('steel') || stock.productName.toLowerCase().includes('rod')) {
            categoryData['Materials'] += stock.availableQty;
        } else if (stock.productName.toLowerCase().includes('helmet') || stock.productName.toLowerCase().includes('safety')) {
            categoryData['Safety'] += stock.availableQty;
        } else if (stock.productName.toLowerCase().includes('drill') || stock.productName.toLowerCase().includes('tool')) {
            categoryData['Tools'] += stock.availableQty;
        } else if (stock.productName.toLowerCase().includes('oil') || stock.productName.toLowerCase().includes('lubricant')) {
            categoryData['Consumables'] += stock.availableQty;
        } else if (stock.productName.toLowerCase().includes('chair') || stock.productName.toLowerCase().includes('furniture')) {
            categoryData['Furniture'] += stock.availableQty;
        } else if (stock.productName.toLowerCase().includes('led') || stock.productName.toLowerCase().includes('light')) {
            categoryData['Lighting'] += stock.availableQty;
        }
    });
    
    // Filter out categories with zero values
    const filteredCategories = Object.keys(categoryData).filter(key => categoryData[key] > 0);
    const filteredValues = filteredCategories.map(key => categoryData[key]);
    
    const vibrantColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#FF9F40', '#9966FF'];
    
    window.distributionChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: filteredCategories,
            datasets: [{
                data: filteredValues,
                backgroundColor: vibrantColors,
                borderColor: '#ffffff',
                borderWidth: 3,
                cutout: '60%'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: 'var(--text-secondary)',
                        padding: 15,
                        font: { size: 10, weight: 'bold' },
                        usePointStyle: true
                    }
                }
            }
        }
    });
}

// Update chart data based on time period
function updateChartData() {
    if (window.stockChart) {
        window.stockChart.data.labels = getTimeLabels();
        window.stockChart.data.datasets[0].data = getInwardData();
        window.stockChart.data.datasets[1].data = getOutwardData();
        window.stockChart.update();
    }
}

// Get time labels based on selected period
function getTimeLabels() {
    const period = document.getElementById('timePeriod').value;
    switch(period) {
        case 'last7Days':
            return ['20 Jul', '21 Jul', '22 Jul', '23 Jul', '24 Jul', '25 Jul', '26 Jul'];
        case 'thisMonth':
            return ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
        case 'thisYear':
            return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        default:
            return ['20 Jul', '21 Jul', '22 Jul', '23 Jul', '24 Jul', '25 Jul', '26 Jul'];
    }
}

// Get inward data based on time period
function getInwardData() {
    const period = document.getElementById('timePeriod').value;
    switch(period) {
        case 'last7Days':
            return [150, 180, 120, 200, 160, 140, 190];
        case 'thisMonth':
            return [800, 950, 720, 1100];
        case 'thisYear':
            return [2400, 2800, 2100, 3200, 2600, 2200, 2900, 3100, 2700, 2500, 2800, 3000];
        default:
            return [150, 180, 120, 200, 160, 140, 190];
    }
}

// Get outward data based on time period
function getOutwardData() {
    const period = document.getElementById('timePeriod').value;
    switch(period) {
        case 'last7Days':
            return [120, 140, 110, 170, 130, 160, 150];
        case 'thisMonth':
            return [650, 780, 620, 890];
        case 'thisYear':
            return [2000, 2300, 1800, 2700, 2200, 1900, 2400, 2600, 2200, 2100, 2300, 2500];
        default:
            return [120, 140, 110, 170, 130, 160, 150];
    }
}

function updateStats() {
    const totalItems = filteredStockData.reduce((sum, stock) => sum + stock.availableQty, 0);
    document.getElementById('totalStockItems').textContent = totalItems.toLocaleString();
    
    const criticalItems = filteredStockData.filter(stock => stock.status === 'critical').length;
    document.getElementById('criticalStock').textContent = criticalItems;
}

// Export functionality
function exportStockReport(format) {
    if (format === 'excel') {
        const exportData = filteredStockData.map(stock => ({
            'Product Name': stock.productName,
            'Vendor Name': stock.vendor,
            'Available Quantity': stock.availableQty,
            'Minimum Quantity': stock.minQty,
            'Status': getStatusText(stock.status),
            'Warehouse Keeper': stock.warehouseKeeper,
            'Phone Number': stock.phoneNumber,
            'Last Updated': stock.lastUpdated
        }));
        
        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Stock Report');
        
        const fileName = `stock_report_${new Date().toISOString().split('T')[0]}.xlsx`;
        XLSX.writeFile(workbook, fileName);
        
        showToast('Excel report exported successfully!', 'success');
    }
}

function refreshStockData() {
    stockData.forEach(stock => {
        if (Math.random() > 0.8) {
            const change = Math.floor(Math.random() * 5) - 2;
            stock.availableQty = Math.max(0, stock.availableQty + change);
            stock.lastUpdated = new Date().toISOString();
            
            // Update status based on new quantity
            if (stock.availableQty === 0) {
                stock.status = 'critical';
            } else if (stock.availableQty <= stock.minQty) {
                stock.status = 'low';
            } else {
                stock.status = 'normal';
            }
        }
    });
    
    setQuickFilter(currentFilter);
    renderStockCards(); // ✅ ADD THIS LINE
    updateLastUpdatedTime();
    showToast('Stock data refreshed successfully!', 'success');
}

function startRealTimeUpdates() {
    setInterval(() => {
        updateLastUpdatedTime();
        
        if (Math.random() > 0.7) {
            const randomStock = stockData[Math.floor(Math.random() * stockData.length)];
            const change = Math.floor(Math.random() * 3) - 1;
            if (change !== 0) {
                randomStock.availableQty = Math.max(0, randomStock.availableQty + change);
                randomStock.lastUpdated = new Date().toISOString();
                
                // Update status
                if (randomStock.availableQty === 0) {
                    randomStock.status = 'critical';
                } else if (randomStock.availableQty <= randomStock.minQty) {
                    randomStock.status = 'low';
                } else {
                    randomStock.status = 'normal';
                }
                
                if (currentFilter === 'all' || 
                    (currentFilter === 'lowStock' && (randomStock.status === 'low' || randomStock.status === 'critical'))) {
                    renderStockTable();
                    renderStockCards(); // ✅ ADD THIS LINE
                    updateStats();
                }
            }
        }
    }, 15000);
}

function updateLastUpdatedTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    document.getElementById('lastUpdated').textContent = timeString;
}

function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    const icon = toast.querySelector('i');
    
    toast.className = `toast-notification ${type}`;
    toastMessage.textContent = message;
    
    // Set icon based on type
    switch(type) {
        case 'success':
            icon.className = 'fas fa-check-circle';
            break;
        case 'error':
            icon.className = 'fas fa-times-circle';
            break;
        case 'warning':
            icon.className = 'fas fa-exclamation-triangle';
            break;
        case 'info':
        default:
            icon.className = 'fas fa-info-circle';
            break;
    }
    
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Utility functions
function getStatusColor(status) {
    switch(status) {
        case 'critical': return 'var(--error)';
        case 'low': return 'var(--warning)';
        case 'normal': return 'var(--success)';
        default: return 'var(--text-muted)';
    }
}

function getStatusText(status) {
    switch(status) {
        case 'critical': return 'Critical';
        case 'low': return 'Low Stock';
        case 'normal': return 'Normal';
        default: return 'Unknown';
    }
}

// Close modals when clicking outside or pressing Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeViewModal();
        closeEditModal();
        closeDeleteModal();
    }
});

// Close modals when clicking on overlay
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal-overlay')) {
        closeViewModal();
        closeEditModal();
        closeDeleteModal();
    }
});





// JAVASCRIPT FOR SEARCH DROPDOWN FUNCTIONALITY 

        /* ===== CATEGORY FILTER FUNCTIONS ===== */
        function showCategorySuggestions() {
            document.getElementById('categorySuggestions').style.display = 'block';
        }
        function hideCategorySuggestions() {
            document.getElementById('categorySuggestions').style.display = 'none';
        }
        function filterCategorySuggestions(val) {
            const box = document.getElementById('categorySuggestions');
            const items = box.querySelectorAll('[data-value]');
            const q = val.trim().toLowerCase();
            let any = false;
            items.forEach(it => {
                const text = it.textContent.toLowerCase();
                const match = text.includes(q) || it.dataset.value === '';
                it.style.display = match ? 'block' : 'none';
                if (match) any = true;
            });
            box.style.display = any ? 'block' : 'none';
        }
        function selectCategory(v) {
            const displayText = v === '' ? '' : document.querySelector(`#categorySuggestions [data-value="${v}"]`).textContent;
            document.getElementById('filterCategory').value = displayText;
            hideCategorySuggestions();
            if (typeof applyStockFilters === 'function') applyStockFilters();
        }

        /* ===== VENDOR FILTER FUNCTIONS ===== */
        function showVendorSuggestions() {
            document.getElementById('vendorSuggestions').style.display = 'block';
        }
        function hideVendorSuggestions() {
            document.getElementById('vendorSuggestions').style.display = 'none';
        }
        function filterVendorSuggestions(val) {
            const box = document.getElementById('vendorSuggestions');
            const items = box.querySelectorAll('[data-value]');
            const q = val.trim().toLowerCase();
            let any = false;
            items.forEach(it => {
                const text = it.textContent.toLowerCase();
                const match = text.includes(q) || it.dataset.value === '';
                it.style.display = match ? 'block' : 'none';
                if (match) any = true;
            });
            box.style.display = any ? 'block' : 'none';
        }
        function selectVendor(v) {
            const displayText = v === '' ? '' : document.querySelector(`#vendorSuggestions [data-value="${v}"]`).textContent;
            document.getElementById('filterVendor').value = displayText;
            hideVendorSuggestions();
            if (typeof applyStockFilters === 'function') applyStockFilters();
        }

        /* ===== STOCK FILTER FUNCTIONS ===== */
        function applyStockFilters() {
            // Get all filter values
            const searchProduct = document.getElementById('searchProduct').value.toLowerCase();
            const category = document.getElementById('filterCategory').value;
            const status = document.getElementById('filterStatus').value;
            const vendor = document.getElementById('filterVendor').value;
            const movement = document.getElementById('filterMovement').value;
            const dateFrom = document.getElementById('dateFrom').value;
            const dateTo = document.getElementById('dateTo').value;

            console.log('Applying stock filters:', {
                searchProduct, category, status, vendor, movement, dateFrom, dateTo
            });

            // Call your existing filter logic here
            if (typeof setQuickFilter === 'function') {
                setQuickFilter('all'); // This will trigger the existing filter system
            }

            // Show toast message
            const filterCount = [searchProduct, category, status, vendor, movement, dateFrom, dateTo]
                .filter(f => f && f.trim() !== '').length;
            
            if (typeof showToast === 'function') {
                showToast(`Applied ${filterCount} filters to stock data`, 'info');
            }
        }

        function clearStockFilters() {
            // Clear all filter inputs
            document.getElementById('searchProduct').value = '';
            document.getElementById('filterCategory').value = '';
            document.getElementById('filterStatus').value = '';
            document.getElementById('filterVendor').value = '';
            document.getElementById('filterMovement').value = '';
            document.getElementById('dateFrom').value = '';
            document.getElementById('dateTo').value = '';

            // Reset to show all data
            if (typeof setQuickFilter === 'function') {
                setQuickFilter('all');
            }

            if (typeof showToast === 'function') {
                showToast('All filters cleared', 'info');
            }
        }

        /* ===== CLOSE DROPDOWNS WHEN CLICKING OUTSIDE ===== */
        document.addEventListener('click', function(e) {
            if (!e.target.closest('#filterCategory') && !e.target.closest('#categorySuggestions')) {
                hideCategorySuggestions();
            }
            if (!e.target.closest('#filterVendor') && !e.target.closest('#vendorSuggestions')) {
                hideVendorSuggestions();
            }
        });
   