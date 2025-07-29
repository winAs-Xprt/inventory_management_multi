
   
        // Global Variables
        let categories = [
            { id: 1, name: 'Electronics', description: 'Electronic devices and components' },
            { id: 2, name: 'Stationery', description: 'Office and writing supplies' },
            { id: 3, name: 'Tools & Equipment', description: 'Industrial tools and equipment' },
            { id: 4, name: 'Raw Materials', description: 'Manufacturing raw materials' },
            { id: 5, name: 'Consumables', description: 'Consumable items and supplies' },
            { id: 6, name: 'Safety Equipment', description: 'Safety gear and protective equipment' }
        ];

        let products = [
            {
                id: 1,
                name: "HP ProBook 450 G8 Laptop",
                category: "electronics",
                code: "ELE-450-001",
                brand: "HP",
                currentStock: 25,
                minQty: 5,
                unit: "piece",
                purchasePrice: 45000,
                sellingPrice: 52000,
                vendor: "abc-suppliers",
                location: "Warehouse A-1",
                status: "normal",
                usability: "high-demand",
                image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=100&h=100&fit=crop",
                description: "High-performance business laptop",
                expiry: null,
                lastUpdated: "2025-01-25"
            },
            {
                id: 2,
                name: "Premium Copy Paper A4",
                category: "stationery",
                code: "STA-A4-002",
                brand: "JK Paper",
                currentStock: 480,
                minQty: 100,
                unit: "pack",
                purchasePrice: 250,
                sellingPrice: 300,
                vendor: "xyz-materials",
                location: "Warehouse B-2",
                status: "normal",
                usability: "medium-demand",
                image: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=100&h=100&fit=crop",
                description: "High-quality A4 copy paper",
                expiry: null,
                lastUpdated: "2025-01-24"
            },
            {
                id: 3,
                name: "Steel Measuring Tape 5M",
                category: "tools",
                code: "TOL-5M-003",
                brand: "Stanley",
                currentStock: 8,
                minQty: 15,
                unit: "piece",
                purchasePrice: 450,
                sellingPrice: 550,
                vendor: "global-trading",
                location: "Warehouse C-3",
                status: "low",
                usability: "low-demand",
                image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=100&h=100&fit=crop",
                description: "Professional steel measuring tape",
                expiry: null,
                lastUpdated: "2025-01-23"
            },
            {
                id: 4,
                name: "Safety Helmet - White",
                category: "safety",
                code: "SAF-WHT-004",
                brand: "3M",
                currentStock: 2,
                minQty: 20,
                unit: "piece",
                purchasePrice: 850,
                sellingPrice: 1000,
                vendor: "prime-vendors",
                location: "Warehouse D-1",
                status: "critical",
                usability: "high-demand",
                image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&h=100&fit=crop",
                description: "Industrial safety helmet",
                expiry: null,
                lastUpdated: "2025-01-22"
            }
        ];

        let filteredProducts = [...products];
        let currentPage = 1;
        let itemsPerPage = 10;
        let selectedProducts = new Set();
        let isEditMode = false;
        let editingProductId = null;

        // Custom Alert System - NO DEFAULT BROWSER ALERTS
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
                    confirmBtn.className = 'custom-alert-btn primary';
                    confirmBtn.textContent = 'OK';
                    cancelBtn.style.display = 'none';
                    break;
                case 'error':
                    iconEl.innerHTML = '<i class="fas fa-times-circle"></i>';
                    confirmBtn.className = 'custom-alert-btn danger';
                    confirmBtn.textContent = 'OK';
                    cancelBtn.style.display = 'none';
                    break;
                case 'confirm':
                default:
                    iconEl.innerHTML = '<i class="fas fa-question-circle"></i>';
                    confirmBtn.className = 'custom-alert-btn danger';
                    confirmBtn.textContent = 'Confirm';
                    cancelBtn.style.display = 'inline-block';
                    break;
            }

            overlay.classList.add('show');

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

            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    handleCancel();
                }
            });
        }

        // Toast Notification System
        function showToast(message, type = 'success') {
            const toast = document.getElementById('toast');
            const toastMessage = document.getElementById('toastMessage');
            const icon = toast.querySelector('i');
            
            toast.className = 'toast-notification';
            
            if (type === 'success') {
                icon.className = 'fas fa-check-circle';
                toast.style.background = 'var(--success)';
            } else if (type === 'warning') {
                icon.className = 'fas fa-exclamation-triangle';
                toast.style.background = 'var(--warning)';
                toast.style.color = 'var(--text-primary)';
            } else if (type === 'error') {
                icon.className = 'fas fa-times-circle';
                toast.style.background = 'var(--error)';
            } else {
                icon.className = 'fas fa-info-circle';
                toast.style.background = 'var(--info)';
            }
            
            toastMessage.textContent = message;
            toast.classList.add('show');
            
            setTimeout(() => toast.classList.remove('show'), 4000);
        }

        // Initialize Application
        document.addEventListener('DOMContentLoaded', function() {
            updateCategoryDropdowns();
            renderProductTable();
            updateStats();
            setupEventListeners();
            showToast('Product Management System loaded successfully!', 'success');
        });

        // Setup Event Listeners including Usability filter
        function setupEventListeners() {
            let searchTimeout;
            document.getElementById('searchProduct').addEventListener('input', function() {
                clearTimeout(searchTimeout);
                searchTimeout = setTimeout(applyFilters, 300);
            });
            
            ['filterCategory', 'filterVendor', 'filterStock', 'filterUsability', 'dateFrom', 'dateTo'].forEach(id => {
                const element = document.getElementById(id);
                if (element) {
                    element.addEventListener('change', applyFilters);
                }
            });

            document.getElementById('productCategory').addEventListener('change', generateProductCode);
        }

        // Category Management
        function openAddCategoryModal() {
            document.getElementById('categoryModal').classList.add('show');
            document.getElementById('categoryForm').reset();
            clearCategoryValidation();
        }

        function closeCategoryModal() {
            document.getElementById('categoryModal').classList.remove('show');
        }

        function saveCategory() {
            const categoryName = document.getElementById('categoryName').value.trim();
            const categoryDescription = document.getElementById('categoryDescription').value.trim();

            if (!validateCategoryForm()) return;

            const exists = categories.some(cat => 
                cat.name.toLowerCase() === categoryName.toLowerCase()
            );

            if (exists) {
                showCustomAlert('Duplicate Category', 'A category with this name already exists.', 'error');
                return;
            }

            const newCategory = {
                id: Date.now(),
                name: categoryName,
                description: categoryDescription
            };

            categories.push(newCategory);
            updateCategoryDropdowns();
            closeCategoryModal();
            showToast(`Category "${categoryName}" added successfully!`, 'success');
            updateStats();
        }

        function validateCategoryForm() {
            const categoryName = document.getElementById('categoryName').value.trim();
            clearCategoryValidation();

            if (!categoryName || categoryName.length < 2) {
                showCategoryFieldError('categoryName', 'Category name is required and must be at least 2 characters');
                return false;
            }
            return true;
        }

        function showCategoryFieldError(fieldId, message) {
            const field = document.getElementById(fieldId);
            const errorElement = document.getElementById(fieldId + 'Error');
            field.parentElement.classList.add('error');
            errorElement.textContent = message;
        }

        function clearCategoryValidation() {
            const field = document.getElementById('categoryName');
            field.parentElement.classList.remove('error');
        }

        function updateCategoryDropdowns() {
            const dropdowns = ['productCategory', 'filterCategory'];
            
            dropdowns.forEach(dropdownId => {
                const dropdown = document.getElementById(dropdownId);
                if (!dropdown) return;
                
                const currentValue = dropdown.value;
                while (dropdown.children.length > 1) {
                    dropdown.removeChild(dropdown.lastChild);
                }
                
                categories.forEach(category => {
                    const option = document.createElement('option');
                    option.value = category.name.toLowerCase().replace(/\s+/g, '-').replace(/&/g, '');
                    option.textContent = category.name;
                    dropdown.appendChild(option);
                });
                
                if (currentValue) {
                    dropdown.value = currentValue;
                }
            });
        }

        // Product Management Functions
        function openAddProductModal() {
            isEditMode = false;
            editingProductId = null;
            
            document.getElementById('productModal').classList.add('show');
            document.getElementById('modalTitle').innerHTML = '<i class="fas fa-plus"></i> Add New Product';
            document.getElementById('saveProductBtn').innerHTML = '<i class="fas fa-save"></i> Save Product';
            
            document.getElementById('productForm').reset();
            clearFormValidation();
            generateProductCode();
        }

        function closeProductModal() {
            document.getElementById('productModal').classList.remove('show');
        }

        function editProduct(productId) {
            const product = products.find(p => p.id === productId);
            if (!product) {
                showCustomAlert('Error', 'Product not found!', 'error');
                return;
            }

            isEditMode = true;
            editingProductId = productId;
            
            document.getElementById('productModal').classList.add('show');
            document.getElementById('modalTitle').innerHTML = '<i class="fas fa-edit"></i> Edit Product';
            document.getElementById('saveProductBtn').innerHTML = '<i class="fas fa-save"></i> Update Product';
            
            // Populate form with product data
            Object.entries({
                'productName': product.name,
                'productCategory': product.category,
                'productCode': product.code,
                'productBrand': product.brand || '',
                'productStock': product.currentStock,
                'productMinQty': product.minQty,
                'productUnit': product.unit,
                'productPrice': product.purchasePrice,
                'productSellingPrice': product.sellingPrice || '',
                'productVendor': product.vendor,
                'productLocation': product.location || '',
                'productExpiry': product.expiry || '',
                'productDescription': product.description || ''
            }).forEach(([fieldId, value]) => {
                const field = document.getElementById(fieldId);
                if (field) field.value = value;
            });
            
            clearFormValidation();
        }

        function deleteProduct(productId) {
            const product = products.find(p => p.id === productId);
            if (!product) {
                showCustomAlert('Error', 'Product not found!', 'error');
                return;
            }

            showCustomAlert(
                'Delete Product',
                `Are you sure you want to delete "${product.name}"? This action cannot be undone.`,
                'confirm',
                (confirmed) => {
                    if (confirmed) {
                        products = products.filter(p => p.id !== productId);
                        applyFilters();
                        updateStats();
                        showToast(`Product "${product.name}" deleted successfully!`, 'success');
                    }
                }
            );
        }

        function saveProduct() {
            if (!validateProductForm()) return;

            const formData = getProductFormData();
            
            if (isEditMode) {
                const index = products.findIndex(p => p.id === editingProductId);
                if (index !== -1) {
                    products[index] = { ...products[index], ...formData, lastUpdated: new Date().toISOString().split('T')[0] };
                    showToast('Product updated successfully!', 'success');
                }
            } else {
                const newProduct = {
                    id: Date.now(),
                    ...formData,
                    lastUpdated: new Date().toISOString().split('T')[0],
                    usability: 'medium-demand',
                    image: `https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=100&h=100&fit=crop&random=${Date.now()}`
                };
                products.push(newProduct);
                showToast('Product added successfully!', 'success');
            }
            
            closeProductModal();
            applyFilters();
            updateStats();
        }

        function getProductFormData() {
            return {
                name: document.getElementById('productName').value.trim(),
                category: document.getElementById('productCategory').value,
                code: document.getElementById('productCode').value.trim(),
                brand: document.getElementById('productBrand').value.trim(),
                currentStock: parseInt(document.getElementById('productStock').value),
                minQty: parseInt(document.getElementById('productMinQty').value),
                unit: document.getElementById('productUnit').value,
                purchasePrice: parseFloat(document.getElementById('productPrice').value),
                sellingPrice: parseFloat(document.getElementById('productSellingPrice').value) || null,
                vendor: document.getElementById('productVendor').value,
                location: document.getElementById('productLocation').value.trim(),
                expiry: document.getElementById('productExpiry').value || null,
                description: document.getElementById('productDescription').value.trim(),
                status: getStockStatus(parseInt(document.getElementById('productStock').value), parseInt(document.getElementById('productMinQty').value))
            };
        }

        function validateProductForm() {
            const requiredFields = ['productName', 'productCategory', 'productCode', 'productStock', 'productMinQty', 'productUnit', 'productPrice', 'productVendor'];
            clearFormValidation();
            let isValid = true;

            requiredFields.forEach(fieldId => {
                const field = document.getElementById(fieldId);
                if (!field.value.trim()) {
                    showFieldError(fieldId);
                    isValid = false;
                }
            });

            // Additional validations
            const stock = parseInt(document.getElementById('productStock').value);
            const minQty = parseInt(document.getElementById('productMinQty').value);
            const price = parseFloat(document.getElementById('productPrice').value);
            const productCode = document.getElementById('productCode').value.trim();

            if (stock < 0 || minQty < 0 || price < 0) isValid = false;

            const isDuplicate = products.some(p => p.code === productCode && (!isEditMode || p.id !== editingProductId));
            if (isDuplicate) {
                showFieldError('productCode');
                isValid = false;
            }

            return isValid;
        }

        function showFieldError(fieldId) {
            const field = document.getElementById(fieldId);
            field.parentElement.classList.add('error');
        }

        function clearFormValidation() {
            const errorFields = ['productName', 'productCategory', 'productCode', 'productStock', 'productMinQty', 'productUnit', 'productPrice', 'productVendor'];
            errorFields.forEach(fieldId => {
                const field = document.getElementById(fieldId);
                field.parentElement.classList.remove('error');
            });
        }

        function generateProductCode() {
            const category = document.getElementById('productCategory').value;
            if (!category) return;
            
            const categoryCode = category.toUpperCase().substring(0, 3);
            const timestamp = Date.now().toString().slice(-6);
            const code = `${categoryCode}-${timestamp}`;
            
            document.getElementById('productCode').value = code;
        }

        // Filter and Search Functions with Usability
        function applyFilters() {
            const searchTerm = document.getElementById('searchProduct').value.toLowerCase();
            const categoryFilter = document.getElementById('filterCategory').value;
            const vendorFilter = document.getElementById('filterVendor').value;
            const stockFilter = document.getElementById('filterStock').value;
            const usabilityFilter = document.getElementById('filterUsability').value;
            const dateFromFilter = document.getElementById('dateFrom').value;
            const dateToFilter = document.getElementById('dateTo').value;

            filteredProducts = products.filter(product => {
                const matchesSearch = !searchTerm || 
                    product.name.toLowerCase().includes(searchTerm) ||
                    product.code.toLowerCase().includes(searchTerm) ||
                    (product.brand && product.brand.toLowerCase().includes(searchTerm));

                const matchesCategory = !categoryFilter || product.category === categoryFilter;
                const matchesVendor = !vendorFilter || product.vendor === vendorFilter;
                const matchesStock = !stockFilter || product.status === stockFilter;
                const matchesUsability = !usabilityFilter || product.usability === usabilityFilter;

                let matchesDate = true;
                if (dateFromFilter || dateToFilter) {
                    const productDate = new Date(product.lastUpdated);
                    if (dateFromFilter) matchesDate = matchesDate && productDate >= new Date(dateFromFilter);
                    if (dateToFilter) matchesDate = matchesDate && productDate <= new Date(dateToFilter + 'T23:59:59');
                }

                return matchesSearch && matchesCategory && matchesVendor && matchesStock && matchesUsability && matchesDate;
            });

            currentPage = 1;
            renderProductTable();
        }

        function clearFilters() {
            ['searchProduct', 'filterCategory', 'filterVendor', 'filterStock', 'filterUsability', 'dateFrom', 'dateTo'].forEach(id => {
                const element = document.getElementById(id);
                if (element) element.value = '';
            });
            
            applyFilters();
            showToast('Filters cleared successfully!', 'info');
        }

        // Table Rendering
        function renderProductTable() {
            const tableBody = document.getElementById('productTableBody');
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const productsToShow = filteredProducts.slice(startIndex, endIndex);

            if (productsToShow.length === 0) {
                tableBody.innerHTML = `
                    <tr>
                        <td colspan="14" style="text-align: center; padding: 40px; color: var(--text-muted);">
                            <i class="fas fa-search" style="font-size: 48px; margin-bottom: 16px; display: block;"></i>
                            <h3>No Products Found</h3>
                            <p>Try adjusting your search criteria or add new products.</p>
                        </td>
                    </tr>
                `;
                return;
            }

            tableBody.innerHTML = productsToShow.map(product => `
                <tr>
                    <td>
                        <input type="checkbox" ${selectedProducts.has(product.id) ? 'checked' : ''} 
                               onchange="toggleProductSelection(${product.id})">
                    </td>
                    <td>
                        <img src="${product.image || 'https://via.placeholder.com/40x40'}" 
                             alt="${product.name}" class="product-image" 
                             onerror="this.src='https://via.placeholder.com/40x40'">
                    </td>
                    <td>
                        <div style="font-weight: 600; margin-bottom: 4px;">${product.name}</div>
                        <div style="font-size: 10px; color: var(--text-muted);">${product.brand || 'No Brand'}</div>
                    </td>
                    <td><span class="category-badge">${getCategoryName(product.category)}</span></td>
                    <td><code style="font-size: 10px;">${product.code}</code></td>
                    <td>
                        <span style="font-weight: 600; color: ${getStockColor(product.status)};">
                            ${product.currentStock}
                        </span>
                    </td>
                    <td>${product.minQty}</td>
                    <td>${product.unit}</td>
                    <td>₹${product.purchasePrice.toLocaleString()}</td>
                    <td>${getVendorName(product.vendor)}</td>
                    <td>${product.location || 'Not Set'}</td>
                    <td><span class="status-badge ${product.status}">${getStatusText(product.status)}</span></td>
                    <td>${formatDate(product.lastUpdated)}</td>
                    <td>
                        <button class="action-btn view" onclick="viewProduct(${product.id})" title="View Details">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="action-btn edit" onclick="editProduct(${product.id})" title="Edit Product">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="action-btn delete" onclick="deleteProduct(${product.id})" title="Delete Product">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `).join('');
        }

        // Bulk Operations
        function toggleBulkMode() {
            const bulkBar = document.getElementById('bulkActionsBar');
            const isActive = bulkBar.classList.contains('show');
            
            if (isActive) {
                bulkBar.classList.remove('show');
                clearSelection();
            } else {
                bulkBar.classList.add('show');
            }
        }

        function toggleSelectAll() {
            const selectAllCheckbox = document.getElementById('selectAll');
            const productsToShow = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

            if (selectAllCheckbox.checked) {
                productsToShow.forEach(product => selectedProducts.add(product.id));
            } else {
                productsToShow.forEach(product => selectedProducts.delete(product.id));
            }

            updateBulkSelection();
            renderProductTable();
        }

        function toggleProductSelection(productId) {
            if (selectedProducts.has(productId)) {
                selectedProducts.delete(productId);
            } else {
                selectedProducts.add(productId);
            }
            updateBulkSelection();
        }

        function updateBulkSelection() {
            const selectedCount = document.getElementById('selectedCount');
            selectedCount.textContent = selectedProducts.size;
        }

        function clearSelection() {
            selectedProducts.clear();
            updateBulkSelection();
            renderProductTable();
        }

        function bulkDelete() {
            if (selectedProducts.size === 0) {
                showCustomAlert('No Selection', 'Please select products to delete.', 'error');
                return;
            }

            showCustomAlert(
                'Bulk Delete',
                `Are you sure you want to delete ${selectedProducts.size} selected products? This action cannot be undone.`,
                'confirm',
                (confirmed) => {
                    if (confirmed) {
                        const deletedCount = selectedProducts.size;
                        products = products.filter(product => !selectedProducts.has(product.id));
                        clearSelection();
                        applyFilters();
                        updateStats();
                        showToast(`${deletedCount} products deleted successfully!`, 'success');
                    }
                }
            );
        }

        function bulkExport() {
            if (selectedProducts.size === 0) {
                showCustomAlert('No Selection', 'Please select products to export.', 'error');
                return;
            }
            showToast(`${selectedProducts.size} products exported successfully!`, 'success');
        }

        // Export Functions
        function exportProducts(format) {
            if (format === 'excel') {
                const exportData = filteredProducts.map(product => ({
                    'Product Name': product.name,
                    'Category': getCategoryName(product.category),
                    'SKU/Code': product.code,
                    'Brand': product.brand || '',
                    'Current Stock': product.currentStock,
                    'Minimum Quantity': product.minQty,
                    'Unit': product.unit,
                    'Purchase Price': product.purchasePrice,
                    'Selling Price': product.sellingPrice || '',
                    'Vendor': getVendorName(product.vendor),
                    'Location': product.location || '',
                    'Status': getStatusText(product.status),
                    'Usability': getUsabilityText(product.usability),
                    'Description': product.description || '',
                    'Last Updated': formatDate(product.lastUpdated)
                }));

                const worksheet = XLSX.utils.json_to_sheet(exportData);
                const workbook = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(workbook, worksheet, 'Products');
                
                const fileName = `products_export_${new Date().toISOString().split('T')[0]}.xlsx`;
                XLSX.writeFile(workbook, fileName);
                
                showToast('Excel file exported successfully!', 'success');
            }
        }

        function printTable() {
            window.print();
        }

        // Utility Functions
        function getCategoryName(categoryValue) {
            const category = categories.find(cat => 
                cat.name.toLowerCase().replace(/\s+/g, '-').replace(/&/g, '') === categoryValue
            );
            return category ? category.name : categoryValue;
        }

        function getVendorName(vendorValue) {
            const vendors = {
                'abc-suppliers': 'ABC Suppliers',
                'xyz-materials': 'XYZ Materials',
                'global-trading': 'Global Trading',
                'prime-vendors': 'Prime Vendors',
                'elite-supply': 'Elite Supply'
            };
            return vendors[vendorValue] || vendorValue;
        }

        function getStockStatus(currentStock, minQty) {
            if (currentStock === 0) return 'out';
            if (currentStock <= minQty * 0.5) return 'critical';
            if (currentStock <= minQty) return 'low';
            return 'normal';
        }

        function getStatusText(status) {
            const statusTexts = {
                'normal': 'Normal',
                'low': 'Low Stock',
                'critical': 'Critical',
                'out': 'Out of Stock'
            };
            return statusTexts[status] || status;
        }

        function getUsabilityText(usability) {
            const usabilityTexts = {
                'high-demand': 'High Demand',
                'medium-demand': 'Medium Demand',
                'low-demand': 'Low Demand'
            };
            return usabilityTexts[usability] || usability;
        }

        function getStockColor(status) {
            const colors = {
                'normal': 'var(--success)',
                'low': 'var(--warning)',
                'critical': 'var(--error)',
                'out': 'var(--text-muted)'
            };
            return colors[status] || 'var(--text-primary)';
        }

        function formatDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-IN', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
            });
        }

        function updateStats() {
            const totalProducts = products.length;
            const activeCategories = new Set(products.map(p => p.category)).size;
            const lowStockItems = products.filter(p => p.status === 'low' || p.status === 'critical').length;
            const totalValue = products.reduce((sum, p) => sum + (p.purchasePrice * p.currentStock), 0);

            document.getElementById('totalProducts').textContent = totalProducts.toLocaleString();
            document.getElementById('activeCategories').textContent = activeCategories;
            document.getElementById('lowStockItems').textContent = lowStockItems;
            document.getElementById('totalValue').textContent = `₹${(totalValue / 100000).toFixed(1)}L`;
        }

        // Additional Functions
        function viewProduct(productId) {
            const product = products.find(p => p.id === productId);
            if (!product) {
                showCustomAlert('Error', 'Product not found!', 'error');
                return;
            }

            const productDetails = `
Product: ${product.name}
Category: ${getCategoryName(product.category)}
SKU: ${product.code}
Brand: ${product.brand || 'Not specified'}
Current Stock: ${product.currentStock} ${product.unit}
Minimum Quantity: ${product.minQty} ${product.unit}
Purchase Price: ₹${product.purchasePrice.toLocaleString()}
Vendor: ${getVendorName(product.vendor)}
Location: ${product.location || 'Not specified'}
Status: ${getStatusText(product.status)}
Usability: ${getUsabilityText(product.usability)}
Last Updated: ${formatDate(product.lastUpdated)}
            `;

            showCustomAlert('Product Details', productDetails, 'success');
        }

        function refreshProducts() {
            products.forEach(product => {
                if (Math.random() > 0.7) {
                    product.lastUpdated = new Date().toISOString().split('T')[0];
                }
            });
            
            applyFilters();
            updateStats();
            showToast('Product data refreshed successfully!', 'success');
        }

        function toggleMobileSidebar() {
            const sidebar = document.getElementById('sidebar');
            sidebar.classList.toggle('open');
        }

        function logout() {
            showCustomAlert(
                'Confirm Logout',
                'Are you sure you want to logout?',
                'confirm',
                (confirmed) => {
                    if (confirmed) {
                        window.location.href = 'login.html';
                    }
                }
            );
        }
   



        //    <!-- JAVASCRIPT FOR SEARCH DROPDOWN FUNCTIONALITY -->
 
        /* ===== FILTER SECTION - CATEGORY FUNCTIONS ===== */
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
            if (typeof applyFilters === 'function') applyFilters();
        }

        /* ===== FILTER SECTION - VENDOR FUNCTIONS ===== */
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
            if (typeof applyFilters === 'function') applyFilters();
        }

        /* ===== MODAL - CATEGORY FUNCTIONS ===== */
        function showModalCategorySuggestions() {
            document.getElementById('modalCategorySuggestions').style.display = 'block';
        }
        function hideModalCategorySuggestions() {
            document.getElementById('modalCategorySuggestions').style.display = 'none';
        }
        function filterModalCategorySuggestions(val) {
            const box = document.getElementById('modalCategorySuggestions');
            const items = box.querySelectorAll('[data-value]');
            const q = val.trim().toLowerCase();
            let any = false;
            items.forEach(it => {
                const text = it.textContent.toLowerCase();
                const match = text.includes(q);
                it.style.display = match ? 'block' : 'none';
                if (match) any = true;
            });
            box.style.display = any ? 'block' : 'none';
        }
        function selectModalCategory(v) {
            const displayText = document.querySelector(`#modalCategorySuggestions [data-value="${v}"]`).textContent;
            document.getElementById('productCategory').value = displayText;
            document.getElementById('productCategory').setAttribute('data-value', v);
            hideModalCategorySuggestions();
        }

        /* ===== MODAL - VENDOR FUNCTIONS ===== */
        function showModalVendorSuggestions() {
            document.getElementById('modalVendorSuggestions').style.display = 'block';
        }
        function hideModalVendorSuggestions() {
            document.getElementById('modalVendorSuggestions').style.display = 'none';
        }
        function filterModalVendorSuggestions(val) {
            const box = document.getElementById('modalVendorSuggestions');
            const items = box.querySelectorAll('[data-value]');
            const q = val.trim().toLowerCase();
            let any = false;
            items.forEach(it => {
                const text = it.textContent.toLowerCase();
                const match = text.includes(q);
                it.style.display = match ? 'block' : 'none';
                if (match) any = true;
            });
            box.style.display = any ? 'block' : 'none';
        }
        function selectModalVendor(v) {
            const displayText = document.querySelector(`#modalVendorSuggestions [data-value="${v}"]`).textContent;
            document.getElementById('productVendor').value = displayText;
            document.getElementById('productVendor').setAttribute('data-value', v);
            hideModalVendorSuggestions();
        }

        /* ===== CLOSE DROPDOWNS WHEN CLICKING OUTSIDE ===== */
        document.addEventListener('click', function(e) {
            // Filter section dropdowns
            if (!e.target.closest('#filterCategory') && !e.target.closest('#categorySuggestions')) {
                hideCategorySuggestions();
            }
            if (!e.target.closest('#filterVendor') && !e.target.closest('#vendorSuggestions')) {
                hideVendorSuggestions();
            }
            
            // Modal dropdowns
            if (!e.target.closest('#productCategory') && !e.target.closest('#modalCategorySuggestions')) {
                hideModalCategorySuggestions();
            }
            if (!e.target.closest('#productVendor') && !e.target.closest('#modalVendorSuggestions')) {
                hideModalVendorSuggestions();
            }
        });
   