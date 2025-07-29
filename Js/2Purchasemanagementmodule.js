// Purchase Management System - Updated with clean vendor stock history

// Custom confirmation callback
let confirmCallback = null;

// Custom Confirmation System
function showCustomConfirm(message, callback) {
  confirmCallback = callback;
  document.getElementById("confirmMessage").textContent = message;
  document.getElementById("customConfirm").classList.add("show");
}

function hideCustomConfirm(result) {
  document.getElementById("customConfirm").classList.remove("show");
  if (confirmCallback && result) {
    confirmCallback();
  }
  confirmCallback = null;
}

// ========================================================================== //
// VENDOR STOCK DATA - CLEANED (NO RATING/FEEDBACK)
// ========================================================================== //

// Sample vendor stock data - ratings and feedback removed
const vendorStockData = {
  1: [ // ABC Suppliers
    {
      id: "STK-2025-015",
      date: "2025-07-28T14:30:00",
      warehouseKeeper: "Rajesh Kumar",
      products: [
        { name: "Dell Laptops", quantity: 25 },
        { name: "Wireless Mouse", quantity: 50 },
        { name: "USB Cables", quantity: 100 }
      ]
    },
    {
      id: "STK-2025-012",
      date: "2025-07-25T10:15:00",
      warehouseKeeper: "Priya Sharma",
      products: [
        { name: "Dell Laptops", quantity: 15 },
        { name: "Keyboards", quantity: 30 }
      ]
    },
    {
      id: "STK-2025-008",
      date: "2025-07-22T16:45:00",
      warehouseKeeper: "Amit Singh",
      products: [
        { name: "Monitors", quantity: 20 },
        { name: "HDMI Cables", quantity: 25 }
      ]
    },
    {
      id: "STK-2025-005",
      date: "2025-07-18T11:20:00",
      warehouseKeeper: "Rajesh Kumar",
      products: [
        { name: "Wireless Mouse", quantity: 40 },
        { name: "Mouse Pads", quantity: 60 }
      ]
    },
    {
      id: "STK-2025-002",
      date: "2025-07-15T09:30:00",
      warehouseKeeper: "Sneha Patel",
      products: [
        { name: "Dell Laptops", quantity: 10 },
        { name: "Laptop Bags", quantity: 15 }
      ]
    }
  ],
  2: [ // TechCorp Industries
    {
      id: "STK-2025-014",
      date: "2025-07-27T13:45:00",
      warehouseKeeper: "Vikram Reddy",
      products: [
        { name: "Network Switches", quantity: 8 },
        { name: "Ethernet Cables", quantity: 200 }
      ]
    },
    {
      id: "STK-2025-011",
      date: "2025-07-24T15:20:00",
      warehouseKeeper: "Anjali Nair",
      products: [
        { name: "Routers", quantity: 12 },
        { name: "Power Adapters", quantity: 25 }
      ]
    },
    {
      id: "STK-2025-007",
      date: "2025-07-20T12:10:00",
      warehouseKeeper: "Kiran Joshi",
      products: [
        { name: "Server Racks", quantity: 5 },
        { name: "Cooling Fans", quantity: 15 }
      ]
    },
    {
      id: "STK-2025-004",
      date: "2025-07-17T14:30:00",
      warehouseKeeper: "Rajesh Kumar",
      products: [
        { name: "Network Switches", quantity: 6 },
        { name: "Fiber Optic Cables", quantity: 50 }
      ]
    },
    {
      id: "STK-2025-001",
      date: "2025-07-12T10:45:00",
      warehouseKeeper: "Meera Gupta",
      products: [
        { name: "UPS Systems", quantity: 4 },
        { name: "Backup Batteries", quantity: 8 }
      ]
    }
  ],
  3: [ // OfficeMax Solutions
    {
      id: "STK-2025-013",
      date: "2025-07-26T11:15:00",
      warehouseKeeper: "Suresh Yadav",
      products: [
        { name: "Executive Chairs", quantity: 20 },
        { name: "Office Desks", quantity: 15 }
      ]
    },
    {
      id: "STK-2025-010",
      date: "2025-07-23T16:30:00",
      warehouseKeeper: "Kavya Menon",
      products: [
        { name: "Filing Cabinets", quantity: 12 },
        { name: "Office Lamps", quantity: 25 }
      ]
    },
    {
      id: "STK-2025-006",
      date: "2025-07-19T13:20:00",
      warehouseKeeper: "Ravi Verma",
      products: [
        { name: "Conference Tables", quantity: 5 },
        { name: "Meeting Chairs", quantity: 30 }
      ]
    }
  ],
  4: [ // Industrial Hardware Co.
    {
      id: "STK-2025-009",
      date: "2025-07-21T09:40:00",
      warehouseKeeper: "Deepak Sinha",
      products: [
        { name: "Safety Equipment Set", quantity: 30 },
        { name: "Tool Kit", quantity: 15 }
      ]
    },
    {
      id: "STK-2025-003",
      date: "2025-07-16T14:50:00",
      warehouseKeeper: "Neha Kapoor",
      products: [
        { name: "Hard Hats", quantity: 50 },
        { name: "Safety Gloves", quantity: 100 }
      ]
    }
  ],
  5: [ // PrintPack Materials
    {
      id: "STK-2025-016",
      date: "2025-07-29T08:30:00",
      warehouseKeeper: "Arun Trivedi",
      products: [
        { name: "A4 Printing Paper", quantity: 100 },
        { name: "Packaging Boxes", quantity: 500 }
      ]
    }
  ]
};

// ========================================================================== //
// VENDOR STOCK MODAL FUNCTIONS - CLEANED (NO RATING/FEEDBACK)
// ========================================================================== //

// Function to show vendor stock details - rating/feedback system removed
function showVendorStockDetails(vendorId, vendorName) {
  const stockEntries = vendorStockData[vendorId] || [];
  
  document.getElementById("vendorStockModalTitle").textContent = 
    `${vendorName} - Stock History`;

  const vendorStockContent = document.getElementById("vendorStockContent");
  
  vendorStockContent.innerHTML = `
    <div class="vendor-details-section">
      <div class="form-section-title">
        <i class="fas fa-store"></i>
        Vendor Information
      </div>
      
      <div class="vendor-info-grid">
        <div class="vendor-info-item">
          <div class="vendor-info-label">Vendor Name</div>
          <div class="vendor-info-value">${vendorName}</div>
        </div>
        <div class="vendor-info-item">
          <div class="vendor-info-label">Total Stock Entries</div>
          <div class="vendor-info-value">${stockEntries.length}</div>
        </div>
        <div class="vendor-info-item">
          <div class="vendor-info-label">Last Stock Entry</div>
          <div class="vendor-info-value">
            ${stockEntries.length > 0 ? formatDate(stockEntries[0].date) : 'N/A'}
          </div>
        </div>
        <div class="vendor-info-item">
          <div class="vendor-info-label">Status</div>
          <div class="vendor-info-value">
            <span class="status-badge ${stockEntries.length > 0 ? 'approved' : 'cancelled'}">
              ${stockEntries.length > 0 ? 'ACTIVE' : 'INACTIVE'}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="stock-entries-section">
      <div class="stock-entries-header">
        <div class="stock-entries-title">
          <i class="fas fa-warehouse"></i>
          Last 5 Stock In Entries
        </div>
      </div>
      
      ${stockEntries.length > 0 ? `
        <div class="stock-entries-list">
          ${stockEntries.map((entry, index) => `
            <div class="stock-entry-card">
              <div class="stock-entry-header">
                <div class="stock-entry-id">${entry.id}</div>
                <div class="stock-entry-date">${formatDateTime(entry.date)}</div>
              </div>
              
              <div class="stock-entry-details">
                <div class="stock-entry-keeper">
                  <i class="fas fa-user"></i>
                  ${entry.warehouseKeeper}
                </div>
                <div class="total-quantity">
                  ${entry.products.reduce((sum, product) => sum + product.quantity, 0)} items
                </div>
              </div>
              
              <div class="products-summary">
                <div class="products-list">
                  ${entry.products.map(product => `
                    <div class="product-item-summary">
                      <span class="product-name-summary">${product.name}</span>
                      <span class="product-quantity-summary">Qty: ${product.quantity}</span>
                    </div>
                  `).join('')}
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      ` : `
        <div class="no-stock-entries">
          <i class="fas fa-warehouse"></i>
          <h3>No Stock Entries Found</h3>
          <p>No recent stock entries available for this vendor.</p>
        </div>
      `}
    </div>
  `;

  document.getElementById("vendorStockModal").classList.add("show");
}

// Function to close vendor stock modal
function closeVendorStockModal() {
  document.getElementById("vendorStockModal").classList.remove("show");
}

// Function to export vendor report
function exportVendorReport() {
  showToast("Exporting vendor stock report...", "info");
}

// Helper function to format date and time
function formatDateTime(dateString) {
  try {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  } catch (error) {
    return "Invalid Date";
  }
}

// ========================================================================== //
// PURCHASE ORDER DATA AND FUNCTIONALITY - PRESERVED WITH PO RATING ADDED
// ========================================================================== //

// Comprehensive Purchase Order Data - with PO rating field added
let purchaseOrderData = [
  {
    id: 1,
    poNumber: "PO-2025-001",
    purchaseDate: "2025-07-20",
    expectedDate: "2025-07-30",
    vendor: {
      id: 1,
      name: "ABC Suppliers",
      contact: "+91-9876543210",
      email: "vendor@abcsuppliers.com",
    },
    products: [
      {
        name: "Dell Laptops",
        quantity: 20,
        unitPrice: 45000,
        totalPrice: 900000,
      },
      {
        name: "Wireless Mouse",
        quantity: 50,
        unitPrice: 800,
        totalPrice: 40000,
      },
    ],
    subtotal: 940000,
    taxAmount: 169200,
    totalAmount: 1109200,
    status: "pending",
    priority: "high",
    paymentTerms: "net30",
    specialNotes: "Urgent delivery needed for new employee onboarding",
    deliveryAddress: "Main Office - Block A, 2nd Floor",
    invoiceFile: null,
    createdBy: "Admin Manager",
    createdDate: "2025-07-20T10:30:00",
    poRating: 0, // PO rating field added
  },
  {
    id: 2,
    poNumber: "PO-2025-002",
    purchaseDate: "2025-07-18",
    expectedDate: "2025-07-28",
    vendor: {
      id: 3,
      name: "OfficeMax Solutions",
      contact: "+91-9876543212",
      email: "info@officemax.co.in",
    },
    products: [
      {
        name: "Executive Chairs",
        quantity: 15,
        unitPrice: 12000,
        totalPrice: 180000,
      },
      {
        name: "Office Desks",
        quantity: 10,
        unitPrice: 8500,
        totalPrice: 85000,
      },
    ],
    subtotal: 265000,
    taxAmount: 47700,
    totalAmount: 312700,
    status: "approved",
    priority: "normal",
    paymentTerms: "net15",
    specialNotes: "Please ensure chairs match the existing office color scheme",
    deliveryAddress: "Warehouse - Loading Dock B",
    invoiceFile: "invoice_po_002.pdf",
    createdBy: "Purchase Manager",
    createdDate: "2025-07-18T14:20:00",
    poRating: 4,
  },
  {
    id: 3,
    poNumber: "PO-2025-003",
    purchaseDate: "2025-07-15",
    expectedDate: "2025-07-25",
    vendor: {
      id: 2,
      name: "TechCorp Industries",
      contact: "+91-9876543211",
      email: "sales@techcorp.in",
    },
    products: [
      {
        name: "Network Switches",
        quantity: 5,
        unitPrice: 25000,
        totalPrice: 125000,
      },
      {
        name: "Ethernet Cables",
        quantity: 100,
        unitPrice: 150,
        totalPrice: 15000,
      },
    ],
    subtotal: 140000,
    taxAmount: 25200,
    totalAmount: 165200,
    status: "received",
    priority: "normal",
    paymentTerms: "net30",
    specialNotes: "Install cables in server room",
    deliveryAddress: "IT Department - Server Room",
    invoiceFile: "invoice_po_003.pdf",
    createdBy: "IT Manager",
    createdDate: "2025-07-15T09:15:00",
    poRating: 5,
  },
  {
    id: 4,
    poNumber: "PO-2025-004",
    purchaseDate: "2025-07-22",
    expectedDate: "2025-08-01",
    vendor: {
      id: 4,
      name: "Industrial Hardware Co.",
      contact: "+91-9876543213",
      email: "orders@industrialhw.com",
    },
    products: [
      {
        name: "Safety Equipment Set",
        quantity: 25,
        unitPrice: 2500,
        totalPrice: 62500,
      },
      {
        name: "Tool Kit",
        quantity: 10,
        unitPrice: 3500,
        totalPrice: 35000,
      },
    ],
    subtotal: 97500,
    taxAmount: 17550,
    totalAmount: 115050,
    status: "pending",
    priority: "urgent",
    paymentTerms: "cod",
    specialNotes: "Immediate requirement for safety compliance",
    deliveryAddress: "Warehouse - Safety Storage Area",
    invoiceFile: null,
    createdBy: "Safety Officer",
    createdDate: "2025-07-22T11:45:00",
    poRating: 0,
  },
  {
    id: 5,
    poNumber: "PO-2025-005",
    purchaseDate: "2025-07-10",
    expectedDate: "2025-07-20",
    vendor: {
      id: 5,
      name: "PrintPack Materials",
      contact: "+91-9876543214",
      email: "sales@printpack.in",
    },
    products: [
      {
        name: "A4 Printing Paper",
        quantity: 50,
        unitPrice: 300,
        totalPrice: 15000,
      },
      {
        name: "Packaging Boxes",
        quantity: 200,
        unitPrice: 25,
        totalPrice: 5000,
      },
    ],
    subtotal: 20000,
    taxAmount: 3600,
    totalAmount: 23600,
    status: "cancelled",
    priority: "normal",
    paymentTerms: "net15",
    specialNotes: "Cancelled due to quality issues with previous order",
    deliveryAddress: "Store Room - Ground Floor",
    invoiceFile: null,
    createdBy: "Store Manager",
    createdDate: "2025-07-10T16:30:00",
    poRating: 2,
  },
];

// Pagination and filtering variables
let currentPage = 1;
let itemsPerPage = 10;
let filteredPurchaseData = [...purchaseOrderData];
let editingPOId = null;
let productItemCount = 0;

// Initialize the page
document.addEventListener("DOMContentLoaded", function () {
  try {
    renderPurchaseTable();
    updateStats();
    setActiveNavItem();

    // Set current date as default
    const today = new Date().toISOString().split("T")[0];
    document.getElementById("dateTo").value = today;
    document.getElementById("purchaseDate").value = today;

    showToast("Purchase Management loaded successfully!", "success");
  } catch (error) {
    console.error("Error initializing page:", error);
    showToast("Error loading page. Please refresh.", "error");
  }
});

// Memory-efficient state management
const sidebarState = {
  isCollapsed: false,
  searchActive: false,
};

// Set active navigation item
function setActiveNavItem() {
  const currentPage =
    window.location.pathname.split("/").pop() ||
    "2Purchasemanagementmodule.html";
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });
}

// Logout function with custom confirmation
function logout() {
  showCustomConfirm("Are you sure you want to logout?", () => {
    showToast("You have been logged out", "success");
    setTimeout(() => {
      window.location.href = "login.html";
    }, 1500);
  });
}

// Enhanced search functionality
document
  .getElementById("searchInput")
  .addEventListener("input", function (e) {
    const searchTerm = e.target.value.toLowerCase();
    const navItems = document.querySelectorAll(".nav-item");
    sidebarState.searchActive = searchTerm.length > 0;

    navItems.forEach((item) => {
      const text = item.textContent.toLowerCase();
      const shouldShow = text.includes(searchTerm) || searchTerm === "";
      item.style.display = shouldShow ? "block" : "none";
    });
  });

// Mobile sidebar toggle
function toggleMobileSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("open");
}

// Close mobile sidebar when clicking outside
document.addEventListener("click", function (e) {
  const sidebar = document.getElementById("sidebar");
  const mobileBtn = document.querySelector(".mobile-menu-btn");

  if (
    window.innerWidth <= 768 &&
    !sidebar.contains(e.target) &&
    !mobileBtn.contains(e.target)
  ) {
    sidebar.classList.remove("open");
  }
});

// Memory-efficient resize handler
let resizeTimeout;
window.addEventListener("resize", function () {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(function () {
    const sidebar = document.getElementById("sidebar");
    if (window.innerWidth > 768) {
      sidebar.classList.remove("open");
    }
  }, 250);
});

// Purchase Orders table rendering - WITH VENDOR EYE BUTTON PRESERVED
function renderPurchaseTable() {
  try {
    const tbody = document.getElementById("purchaseTableBody");
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pagePurchaseData = filteredPurchaseData.slice(
      startIndex,
      endIndex
    );

    if (!tbody) {
      throw new Error("Table body not found");
    }

    tbody.innerHTML = "";

    if (pagePurchaseData.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="9" class="empty-state">
            <i class="fas fa-shopping-cart"></i>
            <h3>No Purchase Orders Found</h3>
            <p>No purchase orders match your current filters. Try adjusting your search criteria or create new purchase orders.</p>
          </td>
        </tr>
      `;
      document.getElementById("pagination").innerHTML = "";
      return;
    }

    pagePurchaseData.forEach((po) => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td><input type="checkbox" class="po-checkbox" value="${
          po.id
        }" /></td>
        <td>
          <div class="po-number">${po.poNumber}</div>
          <div style="font-size: 8px; color: var(--text-muted);">Created: ${formatDate(
            po.createdDate
          )}</div>
        </td>
        <td>${formatDate(po.purchaseDate)}</td>
        <td>
          <div class="vendor-info">
            <div class="vendor-avatar">
              ${po.vendor.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
                .substring(0, 2)}
            </div>
            <div>
              <div style="font-weight: 600; font-size: 9px;">${
                po.vendor.name
              }</div>
              <div style="font-size: 8px; color: var(--text-muted);">${
                po.vendor.contact
              }</div>
              <div style="font-size: 8px; color: var(--text-muted);">${
                po.vendor.email
              }</div>
              <button class="vendor-details-btn" onclick="showVendorStockDetails(${po.vendor.id}, '${po.vendor.name}')" title="View Stock History">
                <i class="fas fa-eye"></i>
                Details
              </button>
            </div>
          </div>
        </td>
        <td>
          <div class="product-summary">
            ${po.products[0].name}${po.products.length > 1 ? "..." : ""}
            <span class="product-count">
              <i class="fas fa-boxes"></i>
              ${po.products.length} items
            </span>
          </div>
        </td>
        <td>
          <div class="price-display">₹${formatCurrency(
            po.totalAmount
          )}</div>
          <div style="font-size: 8px; color: var(--text-muted);">Tax: ₹${formatCurrency(
            po.taxAmount
          )}</div>
        </td>
        <td>
          <span class="status-badge ${
            po.status
          }">${po.status.toUpperCase()}</span>
          ${
            po.priority === "urgent"
              ? '<div style="font-size: 8px; color: var(--accent-red); margin-top: 2px;">URGENT</div>'
              : ""
          }
        </td>
        <td>
          ${
            po.invoiceFile
              ? `<a href="#" onclick="downloadInvoice('${po.invoiceFile}')" style="color: var(--accent-green); font-size: 9px;">
              <i class="fas fa-file-pdf"></i> Available
            </a>`
              : '<span style="color: var(--text-muted); font-size: 9px;">Pending</span>'
          }
        </td>
        <td>
          <button class="table-action-btn edit" onclick="editPurchaseOrder(${
            po.id
          })" title="Edit PO" ${
        po.status === "received" ? "disabled" : ""
      }>
            <i class="fas fa-edit"></i>
          </button>
          <button class="table-action-btn view" onclick="viewPurchaseOrder(${
            po.id
          })" title="View Details">
            <i class="fas fa-eye"></i>
          </button>
          ${
            po.status === "pending"
              ? `
            <button class="table-action-btn approve" onclick="approvePurchaseOrder(${po.id})" title="Approve PO">
              <i class="fas fa-check"></i>
            </button>
          `
              : ""
          }
          <button class="table-action-btn delete" onclick="deletePurchaseOrder(${
            po.id
          })" title="Delete PO" ${
        po.status === "received" ? "disabled" : ""
      }>
            <i class="fas fa-trash"></i>
          </button>
        </td>
      `;

      tbody.appendChild(row);
    });

    renderPagination();
  } catch (error) {
    console.error("Error rendering purchase table:", error);
    showToast(
      "Error loading purchase data. Please refresh the page.",
      "error"
    );
  }
}

function formatDate(dateString) {
  try {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch (error) {
    return "Invalid Date";
  }
}

function formatCurrency(amount) {
  try {
    if (amount >= 100000) {
      return (amount / 100000).toFixed(1) + "L";
    } else if (amount >= 1000) {
      return (amount / 1000).toFixed(1) + "K";
    }
    return amount.toLocaleString();
  } catch (error) {
    return "0";
  }
}

function renderPagination() {
  try {
    const pagination = document.getElementById("pagination");
    if (!pagination) return;

    const totalPages = Math.ceil(
      filteredPurchaseData.length / itemsPerPage
    );

    if (totalPages <= 1) {
      pagination.innerHTML = "";
      return;
    }

    let paginationHTML = `
      <button class="pagination-btn" onclick="changePage(${
        currentPage - 1
      })" ${currentPage === 1 ? "disabled" : ""}>
        <i class="fas fa-chevron-left"></i>
      </button>
    `;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 2 && i <= currentPage + 2)
      ) {
        paginationHTML += `
          <button class="pagination-btn ${
            i === currentPage ? "active" : ""
          }" onclick="changePage(${i})">
            ${i}
          </button>
        `;
      } else if (i === currentPage - 3 || i === currentPage + 3) {
        paginationHTML +=
          '<span style="padding: 4px; color: var(--text-muted);">...</span>';
      }
    }

    paginationHTML += `
      <button class="pagination-btn" onclick="changePage(${
        currentPage + 1
      })" ${currentPage === totalPages ? "disabled" : ""}>
        <i class="fas fa-chevron-right"></i>
      </button>
    `;

    pagination.innerHTML = paginationHTML;
  } catch (error) {
    console.error("Error rendering pagination:", error);
  }
}

function changePage(page) {
  try {
    const totalPages = Math.ceil(
      filteredPurchaseData.length / itemsPerPage
    );
    if (page >= 1 && page <= totalPages) {
      currentPage = page;
      renderPurchaseTable();
    }
  } catch (error) {
    console.error("Error changing page:", error);
  }
}

// Filter functions
function applyFilters() {
  try {
    const searchTerm = document
      .getElementById("searchPO")
      .value.toLowerCase();
    const vendorFilter = document.getElementById("filterVendor").value;
    const statusFilter = document.getElementById("filterStatus").value;
    const productFilter = document.getElementById("filterProduct").value;
    const dateFrom = document.getElementById("dateFrom").value;
    const dateTo = document.getElementById("dateTo").value;

    filteredPurchaseData = purchaseOrderData.filter((po) => {
      const matchesSearch =
        !searchTerm ||
        po.poNumber.toLowerCase().includes(searchTerm) ||
        po.vendor.name.toLowerCase().includes(searchTerm) ||
        po.products.some((product) =>
          product.name.toLowerCase().includes(searchTerm)
        );

      const matchesVendor =
        !vendorFilter || po.vendor.name === vendorFilter;
      const matchesStatus = !statusFilter || po.status === statusFilter;
      const matchesProduct =
        !productFilter ||
        po.products.some((product) =>
          product.name.includes(productFilter)
        );

      const poDate = new Date(po.purchaseDate);
      const matchesDateFrom = !dateFrom || poDate >= new Date(dateFrom);
      const matchesDateTo = !dateTo || poDate <= new Date(dateTo);

      return (
        matchesSearch &&
        matchesVendor &&
        matchesStatus &&
        matchesProduct &&
        matchesDateFrom &&
        matchesDateTo
      );
    });

    currentPage = 1;
    renderPurchaseTable();
    showToast(
      `Filters applied. Found ${filteredPurchaseData.length} purchase orders.`,
      "info"
    );
  } catch (error) {
    console.error("Error applying filters:", error);
    showToast("Error applying filters. Please try again.", "error");
  }
}

function clearFilters() {
  try {
    document.getElementById("searchPO").value = "";
    document.getElementById("filterVendor").value = "";
    document.getElementById("filterStatus").value = "";
    document.getElementById("filterProduct").value = "";
    document.getElementById("dateFrom").value = "";
    document.getElementById("dateTo").value = "";

    filteredPurchaseData = [...purchaseOrderData];
    currentPage = 1;
    renderPurchaseTable();
    showToast("All filters cleared.", "info");
  } catch (error) {
    console.error("Error clearing filters:", error);
    showToast("Error clearing filters.", "error");
  }
}

// Modal functions
function openCreatePOModal() {
  editingPOId = null;
  productItemCount = 0;
  document.getElementById("modalTitle").textContent =
    "Create Purchase Order";
  document.getElementById("purchaseForm").reset();

  // Generate new PO number
  const poCount = purchaseOrderData.length + 1;
  document.getElementById("poNumber").value = `PO-2025-${poCount
    .toString()
    .padStart(3, "0")}`;

  // Set current date
  document.getElementById("purchaseDate").value = new Date()
    .toISOString()
    .split("T")[0];

  // Clear products container and add initial product
  document.getElementById("productsContainer").innerHTML = "";
  addProductItem();

  document.getElementById("purchaseModal").classList.add("show");
}

function editPurchaseOrder(id) {
  const po = purchaseOrderData.find((p) => p.id === id);
  if (!po) return;

  if (po.status === "received") {
    showToast("Cannot edit received purchase orders.", "warning");
    return;
  }

  editingPOId = id;
  productItemCount = 0;
  document.getElementById("modalTitle").textContent =
    "Edit Purchase Order";

  // Populate form fields
  document.getElementById("poNumber").value = po.poNumber;
  document.getElementById("purchaseDate").value = po.purchaseDate;
  document.getElementById("expectedDate").value = po.expectedDate || "";
  document.getElementById("priority").value = po.priority;
  document.getElementById("vendorSelect").value = po.vendor.id;
  document.getElementById("vendorContact").value = po.vendor.contact;
  document.getElementById("vendorEmail").value = po.vendor.email;
  document.getElementById("paymentTerms").value = po.paymentTerms;
  document.getElementById("specialNotes").value = po.specialNotes || "";
  document.getElementById("deliveryAddress").value =
    po.deliveryAddress || "";

  // Populate products
  document.getElementById("productsContainer").innerHTML = "";
  po.products.forEach((product) => {
    addProductItem();
    const lastProductItem = document.querySelector(
      ".product-item:last-child"
    );
    lastProductItem.querySelector(".product-name").value = product.name;
    lastProductItem.querySelector(".product-quantity").value =
      product.quantity;
    lastProductItem.querySelector(".product-price").value =
      product.unitPrice;
    calculateProductTotal(lastProductItem);
  });

  calculateTotal();
  document.getElementById("purchaseModal").classList.add("show");
}

function closePurchaseModal() {
  document.getElementById("purchaseModal").classList.remove("show");
  document.getElementById("purchaseForm").reset();
  editingPOId = null;
  productItemCount = 0;
}

function savePurchaseOrder() {
  const form = document.getElementById("purchaseForm");
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const products = collectProductData();
  if (products.length === 0) {
    showToast("Please add at least one product!", "error");
    return;
  }

  const vendorSelect = document.getElementById("vendorSelect");
  const selectedOption = vendorSelect.options[vendorSelect.selectedIndex];

  const poData = {
    poNumber: document.getElementById("poNumber").value,
    purchaseDate: document.getElementById("purchaseDate").value,
    expectedDate: document.getElementById("expectedDate").value,
    vendor: {
      id: parseInt(vendorSelect.value),
      name: selectedOption.text,
      contact: document.getElementById("vendorContact").value,
      email: document.getElementById("vendorEmail").value,
    },
    products: products,
    subtotal: parseFloat(
      document
        .getElementById("subtotal")
        .textContent.replace("₹", "")
        .replace(",", "")
    ),
    taxAmount: parseFloat(
      document
        .getElementById("taxAmount")
        .textContent.replace("₹", "")
        .replace(",", "")
    ),
    totalAmount: parseFloat(
      document
        .getElementById("totalAmount")
        .textContent.replace("₹", "")
        .replace(",", "")
    ),
    status: "pending",
    priority: document.getElementById("priority").value,
    paymentTerms: document.getElementById("paymentTerms").value,
    specialNotes: document.getElementById("specialNotes").value,
    deliveryAddress: document.getElementById("deliveryAddress").value,
    invoiceFile: null,
    createdBy: "Admin Manager",
    createdDate: new Date().toISOString(),
    poRating: 0, // Initialize PO rating
  };

  if (editingPOId) {
    // Update existing PO
    const index = purchaseOrderData.findIndex(
      (p) => p.id === editingPOId
    );
    if (index !== -1) {
      purchaseOrderData[index] = {
        ...purchaseOrderData[index],
        ...poData,
      };
      showToast("Purchase order updated successfully!", "success");
    }
  } else {
    // Add new PO
    const newPO = {
      id: Date.now(),
      ...poData,
    };
    purchaseOrderData.push(newPO);
    showToast("Purchase order created successfully!", "success");
  }

  closePurchaseModal();
  applyFilters(); // Refresh the table
  updateStats();
}

function saveDraft() {
  showToast("Purchase order saved as draft!", "info");
}

// Product management functions
function addProductItem() {
  productItemCount++;
  const container = document.getElementById("productsContainer");

  const productItem = document.createElement("div");
  productItem.className = "product-item";
  productItem.innerHTML = `
    <div class="product-item-header">
      <div class="product-item-title">Product #${productItemCount}</div>
      <button type="button" class="remove-product-btn" onclick="removeProductItem(this)">
        <i class="fas fa-times"></i>
      </button>
    </div>
    <div class="product-form-grid">
      <div class="form-group">
        <label class="form-label">Product Name *</label>
        <input type="text" class="form-input product-name" placeholder="Enter product name" required />
      </div>
      <div class="form-group">
        <label class="form-label">Quantity *</label>
        <input type="number" class="form-input product-quantity" placeholder="0" min="1" required onchange="calculateProductTotal(this.closest('.product-item'))" />
      </div>
      <div class="form-group">
        <label class="form-label">Unit Price (₹) *</label>
        <input type="number" class="form-input product-price" placeholder="0.00" min="0" step="0.01" required onchange="calculateProductTotal(this.closest('.product-item'))" />
      </div>
      <div class="form-group">
        <label class="form-label">Total Price</label>
        <input type="text" class="form-input product-total" placeholder="₹0.00" readonly />
      </div>
    </div>
  `;

  container.appendChild(productItem);
}

function removeProductItem(button) {
  if (document.querySelectorAll(".product-item").length <= 1) {
    showToast("At least one product is required!", "warning");
    return;
  }

  button.closest(".product-item").remove();
  calculateTotal();
}

function calculateProductTotal(productItem) {
  const quantity =
    parseFloat(productItem.querySelector(".product-quantity").value) || 0;
  const unitPrice =
    parseFloat(productItem.querySelector(".product-price").value) || 0;
  const total = quantity * unitPrice;

  productItem.querySelector(".product-total").value =
    "₹" +
    total.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  calculateTotal();
}

function calculateTotal() {
  const productItems = document.querySelectorAll(".product-item");
  let subtotal = 0;

  productItems.forEach((item) => {
    const quantity =
      parseFloat(item.querySelector(".product-quantity").value) || 0;
    const unitPrice =
      parseFloat(item.querySelector(".product-price").value) || 0;
    subtotal += quantity * unitPrice;
  });

  const taxRate = 0.18; // 18% GST
  const taxAmount = subtotal * taxRate;
  const totalAmount = subtotal + taxAmount;

  document.getElementById("subtotal").textContent =
    "₹" +
    subtotal.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  document.getElementById("taxAmount").textContent =
    "₹" +
    taxAmount.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  document.getElementById("totalAmount").textContent =
    "₹" +
    totalAmount.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
}

function collectProductData() {
  const productItems = document.querySelectorAll(".product-item");
  const products = [];

  productItems.forEach((item) => {
    const name = item.querySelector(".product-name").value.trim();
    const quantity =
      parseInt(item.querySelector(".product-quantity").value) || 0;
    const unitPrice =
      parseFloat(item.querySelector(".product-price").value) || 0;

    if (name && quantity > 0 && unitPrice > 0) {
      products.push({
        name: name,
        quantity: quantity,
        unitPrice: unitPrice,
        totalPrice: quantity * unitPrice,
      });
    }
  });

  return products;
}

function updateVendorInfo() {
  const vendorSelect = document.getElementById("vendorSelect");
  const selectedOption = vendorSelect.options[vendorSelect.selectedIndex];

  if (selectedOption.value) {
    document.getElementById("vendorContact").value =
      selectedOption.dataset.contact || "";
    document.getElementById("vendorEmail").value =
      selectedOption.dataset.email || "";
  } else {
    document.getElementById("vendorContact").value = "";
    document.getElementById("vendorEmail").value = "";
  }
}

// ========================================================================== //
// PO RATING FUNCTIONS - FOR PURCHASE ORDER DETAILS MODAL
// ========================================================================== //

// Function to set PO rating (stars only, no comments)
function setPORAting(poId, rating) {
  const po = purchaseOrderData.find(p => p.id === poId);
  if (!po) return;
  
  po.poRating = rating;
  
  // Update visual stars
  const stars = document.querySelectorAll('.po-star-rating .star');
  stars.forEach((star, index) => {
    star.classList.toggle('active', index < rating);
  });
  
  showToast(`Purchase order rated ${rating} stars!`, "success");
}

// View Purchase Order Details - WITH PO RATING AND VENDOR EYE BUTTON
function viewPurchaseOrder(id) {
  const po = purchaseOrderData.find((p) => p.id === id);
  if (!po) return;

  document.getElementById(
    "viewModalTitle"
  ).textContent = `Purchase Order - ${po.poNumber}`;

  const viewContent = document.getElementById("viewContent");
  viewContent.innerHTML = `
    <div class="details-grid">
      <div class="detail-item">
        <div class="detail-label">PO Number</div>
        <div class="detail-value">${po.poNumber}</div>
      </div>
      <div class="detail-item">
        <div class="detail-label">Purchase Date</div>
        <div class="detail-value">${formatDate(po.purchaseDate)}</div>
      </div>
      <div class="detail-item">
        <div class="detail-label">Expected Delivery</div>
        <div class="detail-value">${formatDate(po.expectedDate)}</div>
      </div>
      <div class="detail-item">
        <div class="detail-label">Status</div>
        <div class="detail-value">
          <span class="status-badge ${
            po.status
          }">${po.status.toUpperCase()}</span>
        </div>
      </div>
      <div class="detail-item">
        <div class="detail-label">Priority</div>
        <div class="detail-value" style="text-transform: capitalize;">${
          po.priority
        }</div>
      </div>
      <div class="detail-item">
        <div class="detail-label">Payment Terms</div>
        <div class="detail-value">${po.paymentTerms.replace(
          "net",
          "Net "
        )}</div>
      </div>
      <div class="detail-item">
        <div class="detail-label">Vendor</div>
        <div class="detail-value">
          <div style="font-weight: 600; margin-bottom: 2px; display: flex; align-items: center; gap: 8px;">
            ${po.vendor.name}
            <button class="vendor-details-btn" onclick="showVendorStockDetails(${po.vendor.id}, '${po.vendor.name}')" title="View Stock History">
              <i class="fas fa-eye"></i>
              Stock History
            </button>
          </div>
          <div style="font-size: 9px; color: var(--text-muted);">${
            po.vendor.contact
          }</div>
          <div style="font-size: 9px; color: var(--text-muted);">${
            po.vendor.email
          }</div>
        </div>
      </div>
      <div class="detail-item">
        <div class="detail-label">Created By</div>
        <div class="detail-value">
          <div>${po.createdBy}</div>
          <div style="font-size: 9px; color: var(--text-muted);">${formatDate(
            po.createdDate
          )}</div>
        </div>
      </div>
    </div>
    
    <!-- PO Rating Section - Stars Only -->
    <div class="form-section">
      <div class="form-section-title">
        <i class="fas fa-star"></i>
        Rate this Purchase Order
      </div>
      <div class="po-star-rating star-rating">
        ${[1, 2, 3, 4, 5].map(star => `
          <span class="star ${star <= (po.poRating || 0) ? 'active' : ''}" 
                onclick="setPORAting(${po.id}, ${star})"
                title="${star} star${star > 1 ? 's' : ''}">
            <i class="fas fa-star"></i>
          </span>
        `).join('')}
      </div>
      <div style="font-size: 10px; color: var(--text-muted); margin-top: 4px;">
        Current Rating: ${po.poRating || 0}/5 stars
      </div>
    </div>
    
    <div class="form-section">
      <div class="form-section-title">
        <i class="fas fa-boxes"></i>
        Products & Items
      </div>
      
      <table class="products-table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          ${po.products
            .map(
              (product) => `
            <tr>
              <td>${product.name}</td>
              <td>${product.quantity}</td>
              <td>₹${product.unitPrice.toLocaleString()}</td>
              <td>₹${product.totalPrice.toLocaleString()}</td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>
      
      <div class="total-calculation" style="margin-top: 12px;">
        <div class="total-row">
          <span>Subtotal:</span>
          <span>₹${po.subtotal.toLocaleString()}</span>
        </div>
        <div class="total-row">
          <span>Tax (18% GST):</span>
          <span>₹${po.taxAmount.toLocaleString()}</span>
        </div>
        <div class="total-row">
          <span>Total Amount:</span>
          <span>₹${po.totalAmount.toLocaleString()}</span>
        </div>
      </div>
    </div>
    
    ${
      po.specialNotes
        ? `
      <div class="form-section">
        <div class="form-section-title">
          <i class="fas fa-sticky-note"></i>
          Special Notes
        </div>
        <p style="color: var(--text-secondary); font-size: 10px;">${po.specialNotes}</p>
      </div>
    `
        : ""
    }
    
    ${
      po.deliveryAddress
        ? `
      <div class="form-section">
        <div class="form-section-title">
          <i class="fas fa-map-marker-alt"></i>
          Delivery Address
        </div>
        <p style="color: var(--text-secondary); font-size: 10px;">${po.deliveryAddress}</p>
      </div>
    `
        : ""
    }
  `;

  document.getElementById("viewModal").classList.add("show");
}

function closeViewModal() {
  document.getElementById("viewModal").classList.remove("show");
}

// Action functions with custom confirmations
function approvePurchaseOrder(id) {
  const po = purchaseOrderData.find((p) => p.id === id);
  if (!po) return;

  showCustomConfirm(
    `Are you sure you want to approve ${po.poNumber}?`,
    () => {
      po.status = "approved";
      renderPurchaseTable();
      updateStats();
      showToast("Purchase order approved successfully!", "success");
    }
  );
}

function deletePurchaseOrder(id) {
  const po = purchaseOrderData.find((p) => p.id === id);
  if (!po) return;

  if (po.status === "received") {
    showToast("Cannot delete received purchase orders.", "warning");
    return;
  }

  showCustomConfirm(
    `Are you sure you want to delete ${po.poNumber}? This action cannot be undone.`,
    () => {
      const index = purchaseOrderData.findIndex((p) => p.id === id);
      if (index !== -1) {
        purchaseOrderData.splice(index, 1);
        applyFilters();
        updateStats();
        showToast("Purchase order deleted successfully!", "success");
      }
    }
  );
}

function exportPurchaseReport(format) {
  showToast(`Exporting ${format.toUpperCase()} report...`, "info");
}

function refreshPurchaseData() {
  applyFilters();
  updateStats();
  showToast("Purchase data refreshed successfully!", "success");
}

function toggleSelectAll() {
  const selectAll = document.getElementById("selectAll");
  const checkboxes = document.querySelectorAll(".po-checkbox");
  checkboxes.forEach((checkbox) => {
    checkbox.checked = selectAll.checked;
  });
}

function bulkPOActions() {
  const selectedIds = Array.from(
    document.querySelectorAll(".po-checkbox:checked")
  ).map((cb) => parseInt(cb.value));
  if (selectedIds.length === 0) {
    showToast(
      "Please select purchase orders for bulk actions.",
      "warning"
    );
    return;
  }
  showToast(
    `Bulk actions for ${selectedIds.length} purchase orders`,
    "info"
  );
}

function printPOReport() {
  window.print();
}

function printPO() {
  window.print();
}

function downloadPO() {
  showToast("Downloading PDF...", "info");
}

function downloadInvoice(filename) {
  showToast(`Downloading ${filename}...`, "info");
}

// Utility functions
function updateStats() {
  try {
    document.getElementById("totalPOs").textContent =
      purchaseOrderData.length;
    document.getElementById("pendingPOs").textContent =
      purchaseOrderData.filter((po) => po.status === "pending").length;

    const totalValue = purchaseOrderData.reduce(
      (sum, po) => sum + po.totalAmount,
      0
    );
    document.getElementById("totalValue").textContent =
      "₹" + formatCurrency(totalValue);

    const monthlyValue = purchaseOrderData
      .filter(
        (po) =>
          new Date(po.purchaseDate).getMonth() === new Date().getMonth()
      )
      .reduce((sum, po) => sum + po.totalAmount, 0);
    document.getElementById("monthlyValue").textContent =
      "₹" + formatCurrency(monthlyValue);
  } catch (error) {
    console.error("Error updating stats:", error);
  }
}

// Toast notification function
function showToast(message, type = "success") {
  try {
    const toast = document.getElementById("toast");
    const toastMessage = document.getElementById("toastMessage");
    const icon = toast.querySelector("i");

    if (!toast || !toastMessage || !icon) {
      console.error("Toast elements not found");
      return;
    }

    if (type === "success") {
      icon.className = "fas fa-check-circle";
      toast.style.background = "var(--accent-green)";
    } else if (type === "warning") {
      icon.className = "fas fa-exclamation-triangle";
      toast.style.background = "var(--accent-orange)";
    } else if (type === "error") {
      icon.className = "fas fa-times-circle";
      toast.style.background = "var(--accent-red)";
    } else {
      icon.className = "fas fa-info-circle";
      toast.style.background = "var(--accent-blue)";
    }

    toastMessage.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);
  } catch (error) {
    console.error("Error showing toast:", error);
  }
}

// Search functionality with debounce
let searchTimeout;
const searchInput = document.getElementById("searchPO");
if (searchInput) {
  searchInput.addEventListener("input", function () {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      applyFilters();
    }, 300);
  });
}

// Close modals when clicking outside - UPDATED WITH VENDOR STOCK MODAL
document.addEventListener("click", function (e) {
  const purchaseModal = document.getElementById("purchaseModal");
  const viewModal = document.getElementById("viewModal");
  const vendorStockModal = document.getElementById("vendorStockModal");
  const customConfirm = document.getElementById("customConfirm");

  if (e.target === purchaseModal) {
    closePurchaseModal();
  }

  if (e.target === viewModal) {
    closeViewModal();
  }

  if (e.target === vendorStockModal) {
    closeVendorStockModal();
  }

  if (e.target === customConfirm) {
    hideCustomConfirm(false);
  }
});

// Keyboard shortcuts - UPDATED WITH VENDOR STOCK MODAL
document.addEventListener("keydown", function (e) {
  // Escape to close modals
  if (e.key === "Escape") {
    closePurchaseModal();
    closeViewModal();
    closeVendorStockModal();
    hideCustomConfirm(false);
  }

  // Ctrl+N or Cmd+N for new purchase order
  if ((e.ctrlKey || e.metaKey) && e.key === "n") {
    e.preventDefault();
    openCreatePOModal();
  }

  // Ctrl+F or Cmd+F for search
  if ((e.ctrlKey || e.metaKey) && e.key === "f") {
    e.preventDefault();
    document.getElementById("searchPO").focus();
  }
});

console.log("Purchase Management System initialized successfully");
console.log(`Loaded ${purchaseOrderData.length} purchase orders`);
console.log("Clean vendor stock history system integrated successfully");
console.log("PO star rating system added successfully");
