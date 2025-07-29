// Memory-efficient state management
const sidebarState = {
  isCollapsed: false,
  searchActive: false,
};

// Current period state
let currentPeriod = "monthly";

// Chart instances for proper cleanup
let chartInstances = {};

// Toggle dropdown functionality
function toggleDropdown(element) {
  const navItem = element.closest(".nav-item");
  const isExpanded = navItem.classList.contains("expanded");

  // Close all other dropdowns
  document.querySelectorAll(".nav-item.expanded").forEach((item) => {
    item.classList.remove("expanded");
  });

  // Toggle current dropdown
  if (!isExpanded) {
    navItem.classList.add("expanded");
  }
}

// Set active navigation item
function setActiveNavItem() {
  const currentPage =
    window.location.pathname.split("/").pop() ||
    "2StockManagementModule.html";
  const navLinks = document.querySelectorAll(".nav-link, .nav-child");

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
      // If it's a dropdown child, expand the parent
      if (link.classList.contains("nav-child")) {
        const parentDropdown = link.closest(".nav-item.dropdown");
        if (parentDropdown) {
          parentDropdown.classList.add("expanded");
        }
      }
    }
  });
}

// Logout function
function logout() {
  if (confirm("Are you sure you want to logout?")) {
    window.location.href = "login.html";
  }
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

// PERIOD CHANGE FUNCTION - Changes all data based on Monthly/Yearly selection
function changePeriod() {
  const periodSelect = document.getElementById("periodSelect");
  currentPeriod = periodSelect.value;

  updateDataBasedOnPeriod(currentPeriod);
  showToast(`Dashboard updated to ${currentPeriod} view`, "info");
}

// UPDATE DATA BASED ON PERIOD SELECTION
function updateDataBasedOnPeriod(period) {
  if (period === "yearly") {
    // UPDATE PURCHASE CARD
    document.getElementById("purchaseTitle").textContent =
      "Purchases This Year";
    document.getElementById("purchaseValue").textContent = "₹98.7L";
    document.getElementById("purchaseChange").innerHTML =
      '<i class="fas fa-arrow-up"></i> +18.5% vs 2024';

    // UPDATE STOCK DISTRIBUTION
    document.getElementById("stockDistributionValue").textContent =
      "156,789 Items";
    document.getElementById("stockDistributionSubtitle").textContent =
      "Across 12 categories";

    // UPDATE PURCHASE TRENDS CHART
    document.getElementById("purchaseTrendsValue").textContent = "₹98.7L";
    document.getElementById("purchaseTrendsSubtitle").textContent =
      "+18.5% growth";
    document.getElementById("thisMonthLabel").textContent = "This Year:";
    document.getElementById("thisMonthValue").textContent = "₹98.7L";
    document.getElementById("lastMonthLabel").textContent = "Last Year:";
    document.getElementById("lastMonthValue").textContent = "₹83.2L";
    document.getElementById("growthValue").textContent = "+18.5%";
    document.getElementById("purchaseDescription").textContent =
      "Last 5 years performance";

    // UPDATE TOP VENDORS
    document.getElementById("topVendorsValue").textContent = "96%";
    document.getElementById("topVendorsSubtitle").textContent =
      "Annual avg. performance";
    document.getElementById("bestVendorName").textContent =
      "Global Trading Co";
    document.getElementById("bestVendorScore").textContent = "97%";
    document.getElementById("activeVendors").textContent = "12 vendors";
    document.getElementById("vendorDescription").textContent =
      "Top 5 vendors this year";

    // UPDATE CHART DATA
    inventoryData.stockDistribution.data = [
      48900, 32450, 28900, 21560, 18900, 16540, 9870, 8560,
    ];
    inventoryData.purchaseTrends.data = [
      8200000, 8500000, 8800000, 9100000, 9870000,
    ];
    inventoryData.purchaseTrends.labels = [
      "2021",
      "2022",
      "2023",
      "2024",
      "2025",
    ];
    inventoryData.vendorPerformance.data = [97, 94, 92, 89, 86];
    inventoryData.vendorPerformance.labels = [
      "Global Trading Co",
      "Supreme Materials",
      "Elite Suppliers",
      "Prime Corp",
      "Mega Industries",
    ];
  } else {
    // RESET TO MONTHLY DATA
    document.getElementById("purchaseTitle").textContent =
      "Purchases This Month";
    document.getElementById("purchaseValue").textContent = "₹8.4L";
    document.getElementById("purchaseChange").innerHTML =
      '<i class="fas fa-arrow-up"></i> +12.8% vs July 2024';

    document.getElementById("stockDistributionValue").textContent =
      "12,547 Items";
    document.getElementById("stockDistributionSubtitle").textContent =
      "Across 8 categories";

    document.getElementById("purchaseTrendsValue").textContent = "₹8.4L";
    document.getElementById("purchaseTrendsSubtitle").textContent =
      "+12.8% growth";
    document.getElementById("thisMonthLabel").textContent = "This Month:";
    document.getElementById("thisMonthValue").textContent = "₹8.4L";
    document.getElementById("lastMonthLabel").textContent = "Last Month:";
    document.getElementById("lastMonthValue").textContent = "₹7.9L";
    document.getElementById("growthValue").textContent = "+12.8%";
    document.getElementById("purchaseDescription").textContent =
      "Last 6 months performance";

    document.getElementById("topVendorsValue").textContent = "98%";
    document.getElementById("topVendorsSubtitle").textContent =
      "Avg. performance";
    document.getElementById("bestVendorName").textContent =
      "ABC Suppliers";
    document.getElementById("bestVendorScore").textContent = "95%";
    document.getElementById("activeVendors").textContent = "5 vendors";
    document.getElementById("vendorDescription").textContent =
      "Top 5 vendors this month";

    // RESET CHART DATA
    inventoryData.stockDistribution.data = [
      3245, 2890, 1870, 1654, 987, 756, 645, 500,
    ];
    inventoryData.purchaseTrends.data = [
      650000, 720000, 680000, 840000, 790000, 840000,
    ];
    inventoryData.purchaseTrends.labels = [
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
    ];
    inventoryData.vendorPerformance.data = [95, 89, 87, 82, 78];
    inventoryData.vendorPerformance.labels = [
      "ABC Suppliers",
      "XYZ Materials",
      "Global Trading",
      "Prime Vendors",
      "Elite Supply",
    ];
  }

  // DESTROY AND RECREATE CHARTS WITH NEW DATA
  destroyExistingCharts();
  setTimeout(() => {
    initializeCharts();
  }, 100);
}

// Destroy existing charts
function destroyExistingCharts() {
  Object.values(chartInstances).forEach((chart) => {
    if (chart && typeof chart.destroy === "function") {
      chart.destroy();
    }
  });
  chartInstances = {};
}

// Enhanced Inventory Management Data with Ultra-Thin Vertical Bar Configuration
const inventoryData = {
  stockDistribution: {
    labels: [
      "Raw Materials",
      "Finished Goods",
      "Tools & Equipment",
      "Consumables",
      "Safety Equipment",
      "Packaging",
      "Spare Parts",
      "Others",
    ],
    data: [3245, 2890, 1870, 1654, 987, 756, 645, 500],
    colors: [
      "#1dd1a1",
      "#667eea",
      "#4fd1c7",
      "#ffa726",
      "#ff6b6b",
      "#ec407a",
      "#42a5f5",
      "#ab47bc",
    ],
  },
  purchaseTrends: {
    labels: ["Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    data: [650000, 720000, 680000, 840000, 790000, 840000],
  },
  vendorPerformance: {
    labels: [
      "ABC Suppliers",
      "XYZ Materials",
      "Global Trading",
      "Prime Vendors",
      "Elite Supply",
    ],
    data: [95, 89, 87, 82, 78],
    colors: ["#1dd1a1", "#667eea", "#4fd1c7", "#ffa726", "#ff6b6b"],
  },
};

// Enhanced Product Requests Data with Multiple Items Support and Individual Approval Items
const requestsData = {
  "REQ-2025-001": {
    id: "REQ-2025-001",
    employee: "John Doe",
    department: "Construction",
    items: [
      { 
        id: 1, 
        name: "Premium Sand", 
        quantity: 50, 
        unit: "units", 
        status: "pending", 
        estimatedCost: 15000 
      },
      { 
        id: 2, 
        name: "Steel Rods", 
        quantity: 25, 
        unit: "units", 
        status: "pending", 
        estimatedCost: 20000 
      },
      { 
        id: 3, 
        name: "Cement Blocks", 
        quantity: 100, 
        unit: "units", 
        status: "pending", 
        estimatedCost: 12000 
      },
      { 
        id: 4, 
        name: "Granite Stone", 
        quantity: 75, 
        unit: "units", 
        status: "pending", 
        estimatedCost: 8000 
      }
    ],
    totalQuantity: "250 units",
    priority: "High",
    status: "Pending Approval",
    date: "23 Jul 2025",
    expectedDelivery: "25 Jul 2025",
    projectCode: "PROJ-2025-089",
    cost: "₹55,000",
    requestedBy: "Site Manager",
    description:
      "Multiple items required for construction project. Premium sand for concrete mixing, steel rods for reinforcement, cement blocks for boundary construction, and granite stone for pathway work. All items are critical for project timeline completion.",
  },
  "REQ-2025-002": {
    id: "REQ-2025-002",
    employee: "Jane Smith",
    department: "Manufacturing",
    items: [
      { 
        id: 1, 
        name: "Steel Rods", 
        quantity: 25, 
        unit: "units", 
        status: "pending", 
        estimatedCost: 20000 
      },
      { 
        id: 2, 
        name: "Iron Ore", 
        quantity: 200, 
        unit: "units", 
        status: "pending", 
        estimatedCost: 30000 
      }
    ],
    totalQuantity: "225 units",
    priority: "Critical",
    status: "Pending Approval",
    date: "23 Jul 2025",
    expectedDelivery: "24 Jul 2025",
    projectCode: "PROJ-2025-090",
    cost: "₹53,750",
    requestedBy: "Production Head",
    description:
      "Critical requirement for steel rods and iron ore in manufacturing assembly line. Current inventory is critically low and production may halt without immediate restocking.",
  },
  "REQ-2025-003": {
    id: "REQ-2025-003",
    employee: "Mike Johnson",
    department: "Infrastructure",
    items: [
      { 
        id: 1, 
        name: "Granite Stone", 
        quantity: 75, 
        unit: "units", 
        status: "pending", 
        estimatedCost: 22350 
      }
    ],
    totalQuantity: "75 units",
    priority: "Medium",
    status: "Under Review",
    date: "22 Jul 2025",
    expectedDelivery: "26 Jul 2025",
    projectCode: "PROJ-2025-091",
    cost: "₹22,350",
    requestedBy: "Project Manager",
    description:
      "Granite stone required for pathway construction in the company premises. This is part of the infrastructure improvement project scheduled for completion next month.",
  },
  "REQ-2025-004": {
    id: "REQ-2025-004",
    employee: "Sarah Wilson",
    department: "Construction",
    items: [
      { 
        id: 1, 
        name: "Cement Blocks", 
        quantity: 100, 
        unit: "units", 
        status: "pending", 
        estimatedCost: 12000 
      },
      { 
        id: 2, 
        name: "Aluminum Sheets", 
        quantity: 30, 
        unit: "units", 
        status: "pending", 
        estimatedCost: 18000 
      },
      { 
        id: 3, 
        name: "PVC Pipes", 
        quantity: 80, 
        unit: "units", 
        status: "pending", 
        estimatedCost: 9600 
      },
      { 
        id: 4, 
        name: "Copper Pipes", 
        quantity: 120, 
        unit: "units", 
        status: "pending", 
        estimatedCost: 28800 
      },
      { 
        id: 5, 
        name: "Safety Equipment", 
        quantity: 45, 
        unit: "units", 
        status: "pending", 
        estimatedCost: 13500 
      }
    ],
    totalQuantity: "375 units",
    priority: "Low",
    status: "Pending Approval",
    date: "22 Jul 2025",
    expectedDelivery: "28 Jul 2025",
    projectCode: "PROJ-2025-092",
    cost: "₹68,000",
    requestedBy: "Assistant Manager",
    description:
      "Multiple construction materials needed for various ongoing projects. Including cement blocks for boundary wall construction, pipes for plumbing work, and safety equipment for workers.",
  },
  "REQ-2025-005": {
    id: "REQ-2025-005",
    employee: "David Brown",
    department: "Mining",
    items: [
      { 
        id: 1, 
        name: "Iron Ore", 
        quantity: 200, 
        unit: "units", 
        status: "approved", 
        estimatedCost: 35000 
      }
    ],
    totalQuantity: "200 units",
    priority: "High",
    status: "Approved",
    date: "21 Jul 2025",
    expectedDelivery: "23 Jul 2025",
    projectCode: "PROJ-2025-093",
    cost: "₹35,000",
    requestedBy: "Operations Manager",
    description:
      "Iron ore required for processing and refinement operations. This request has been approved and delivery is scheduled for tomorrow. Quality specifications have been verified.",
  },
  "REQ-2025-006": {
    id: "REQ-2025-006",
    employee: "Emily Davis",
    department: "Manufacturing", 
    items: [
      { 
        id: 1, 
        name: "Aluminum Sheets", 
        quantity: 30, 
        unit: "units", 
        status: "pending", 
        estimatedCost: 18000 
      },
      { 
        id: 2, 
        name: "Safety Tools", 
        quantity: 15, 
        unit: "units", 
        status: "pending", 
        estimatedCost: 4500 
      },
      { 
        id: 3, 
        name: "Protective Gear", 
        quantity: 25, 
        unit: "units", 
        status: "pending", 
        estimatedCost: 7500 
      }
    ],
    totalQuantity: "70 units",
    priority: "Medium",
    status: "Pending Approval",
    date: "21 Jul 2025",
    expectedDelivery: "25 Jul 2025",
    projectCode: "PROJ-2025-094",
    cost: "₹24,250",
    requestedBy: "Fabrication Lead",
    description:
      "Aluminum sheets needed for fabrication work along with safety tools and protective gear. Standard grade aluminum with specific thickness requirements as per project specifications.",
  },
  "REQ-2025-007": {
    id: "REQ-2025-007",
    employee: "Robert Garcia",
    department: "Plumbing",
    items: [
      { 
        id: 1, 
        name: "Copper Pipes", 
        quantity: 120, 
        unit: "units", 
        status: "pending", 
        estimatedCost: 28800 
      }
    ],
    totalQuantity: "120 units",
    priority: "High",
    status: "Under Review",
    date: "20 Jul 2025",
    expectedDelivery: "24 Jul 2025",
    projectCode: "PROJ-2025-095",
    cost: "₹28,800",
    requestedBy: "Plumbing Supervisor",
    description:
      "Copper pipes required for the new building's plumbing installation. High-quality pipes needed to meet building standards and regulations. Installation scheduled for next week.",
  },
  "REQ-2025-008": {
    id: "REQ-2025-008",
    employee: "Lisa Martinez",
    department: "Maintenance",
    items: [
      { 
        id: 1, 
        name: "PVC Pipes", 
        quantity: 80, 
        unit: "units", 
        status: "rejected", 
        estimatedCost: 4800 
      }
    ],
    totalQuantity: "80 units",
    priority: "Low",
    status: "Rejected",
    date: "20 Jul 2025",
    expectedDelivery: "N/A",
    projectCode: "PROJ-2025-096",
    cost: "₹4,800",
    requestedBy: "Maintenance Head",
    description:
      "PVC pipes requested for general maintenance work. Request rejected due to sufficient inventory already available in maintenance department storage.",
  },
};

// ITEM EXPANSION FUNCTIONALITY FOR MULTIPLE ITEMS
function toggleItemExpand(element) {
  // Close all other expanded items first
  document.querySelectorAll(".item-display.expanded").forEach((item) => {
    if (item !== element) {
      item.classList.remove("expanded");
    }
  });

  // Toggle current item
  element.classList.toggle("expanded");

  // Add click outside listener to close when clicking elsewhere
  if (element.classList.contains("expanded")) {
    setTimeout(() => {
      document.addEventListener("click", function closeExpanded(e) {
        if (!element.contains(e.target)) {
          element.classList.remove("expanded");
          document.removeEventListener("click", closeExpanded);
        }
      });
    }, 10);
  }
}

// Enhanced Stock Distribution Chart (Pie Chart)
function initializeStockDistributionChart() {
  const ctx = document.getElementById("stockDistributionChart");
  if (!ctx) return;

  const data = inventoryData.stockDistribution;

  chartInstances.stockDistribution = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: data.labels,
      datasets: [
        {
          data: data.data,
          backgroundColor: data.colors,
          borderWidth: 2,
          borderColor: "#ffffff",
          hoverBorderWidth: 3,
          hoverBorderColor: "#ffffff",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          titleColor: "#2d3748",
          bodyColor: "#4a5568",
          borderColor: "#e2e8f0",
          borderWidth: 1,
          cornerRadius: 8,
          displayColors: true,
          callbacks: {
            label: function (context) {
              const total = context.dataset.data.reduce(
                (a, b) => a + b,
                0
              );
              const percentage = ((context.parsed / total) * 100).toFixed(
                1
              );
              return `${
                context.label
              }: ${context.parsed.toLocaleString()} (${percentage}%)`;
            },
          },
        },
      },
      cutout: "60%",
      animation: {
        animateRotate: true,
        animateScale: true,
        duration: 1500,
        easing: "easeInOutQuart",
      },
    },
  });

  // Create custom legend
  createCustomLegend("stockDistributionLegend", data);
}

// Enhanced Purchase Trends Chart (Line Chart)
function initializePurchaseTrendChart() {
  const ctx = document.getElementById("purchaseTrendChart");
  if (!ctx) return;

  const data = inventoryData.purchaseTrends;

  chartInstances.purchaseTrend = new Chart(ctx, {
    type: "line",
    data: {
      labels: data.labels,
      datasets: [
        {
          label: "Purchase Amount",
          data: data.data,
          borderColor: "#1dd1a1",
          backgroundColor: "rgba(29, 209, 161, 0.1)",
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: "#1dd1a1",
          pointBorderColor: "#ffffff",
          pointBorderWidth: 2,
          pointRadius: 5,
          pointHoverRadius: 7,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          titleColor: "#2d3748",
          bodyColor: "#4a5568",
          borderColor: "#e2e8f0",
          borderWidth: 1,
          cornerRadius: 8,
          callbacks: {
            label: function (context) {
              return `₹${(context.parsed.y / 100000).toFixed(1)}L`;
            },
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: "rgba(226, 232, 240, 0.5)",
          },
          ticks: {
            color: "#64748b",
            font: {
              size: 10,
            },
            callback: function (value) {
              return "₹" + (value / 100000).toFixed(1) + "L";
            },
          },
        },
        x: {
          grid: {
            display: false,
          },
          ticks: {
            color: "#64748b",
            font: {
              size: 10,
            },
          },
        },
      },
      animation: {
        duration: 2000,
        easing: "easeInOutQuart",
      },
    },
  });
}

// Enhanced Vendor Performance Chart with Ultra-Thin VERTICAL Bars and Hover-Only Names
function initializeVendorPerformanceChart() {
  const ctx = document.getElementById("vendorPerformanceChart");
  if (!ctx) return;

  const data = inventoryData.vendorPerformance;

  chartInstances.vendorPerformance = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["", "", "", "", ""], // Empty labels - names only on hover
      datasets: [
        {
          label: "Performance Score",
          data: data.data,
          backgroundColor: [
            "rgba(29, 209, 161, 0.8)",
            "rgba(102, 126, 234, 0.8)",
            "rgba(79, 209, 199, 0.8)",
            "rgba(255, 167, 38, 0.8)",
            "rgba(255, 107, 107, 0.8)",
          ],
          borderColor: [
            "#1dd1a1",
            "#667eea",
            "#4fd1c7",
            "#ffa726",
            "#ff6b6b",
          ],
          borderWidth: 1,
          borderRadius: 2,
          borderSkipped: false,
          // ULTRA-THIN VERTICAL BAR CONFIGURATION
          barThickness: 8, // Ultra-thin bars (8px)
          maxBarThickness: 8, // Maximum thickness
          categoryPercentage: 0.6, // Reduced spacing between categories
          barPercentage: 0.7, // Tighter bar spacing
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      // DEFAULT VERTICAL ORIENTATION (no indexAxis specified)
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          backgroundColor: "rgba(0, 0, 0, 0.9)",
          titleColor: "#ffffff",
          bodyColor: "#ffffff",
          cornerRadius: 8,
          padding: 12,
          displayColors: true,
          callbacks: {
            title: function (context) {
              // Show vendor name only on hover
              return data.labels[context[0].dataIndex];
            },
            label: function (context) {
              return `Performance: ${context.raw}%`;
            },
          },
        },
      },
      scales: {
        y: {
          display: true,
          min: 0,
          max: 100,
          grid: {
            display: true,
            color: "rgba(0, 0, 0, 0.08)",
            lineWidth: 0.5,
          },
          ticks: {
            display: false, // Hide y-axis numbers for cleaner look
          },
        },
        x: {
          display: false, // Hide x-axis completely
          grid: {
            display: false,
          },
        },
      },
      animation: {
        duration: 1200,
        easing: "easeInOutQuart",
      },
      layout: {
        padding: {
          top: 8,
          bottom: 8,
          left: 8,
          right: 8,
        },
      },
    },
  });
}

// Create custom legend for pie chart
function createCustomLegend(containerId, data) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = "";
  data.labels.forEach((label, index) => {
    const legendItem = document.createElement("div");
    legendItem.className = "legend-item";
    legendItem.innerHTML = `
      <div class="legend-color" style="background-color: ${data.colors[index]}"></div>
      <span>${label}</span>
    `;
    container.appendChild(legendItem);
  });
}

// Initialize all charts
function initializeCharts() {
  // Use requestAnimationFrame for better performance
  requestAnimationFrame(() => {
    initializeStockDistributionChart();
    initializePurchaseTrendChart();
    initializeVendorPerformanceChart();
  });
}

// Enhanced Notification System
let notificationCount = 6;
let isNotificationOpen = false;

function toggleNotifications() {
  const portal = document.getElementById("notificationPortal");
  isNotificationOpen = !isNotificationOpen;
  portal.style.display = isNotificationOpen ? "block" : "none";

  if (isNotificationOpen) {
    // Add animation class
    setTimeout(() => {
      document.getElementById("notificationDropdown").style.transform =
        "scale(1)";
    }, 10);
  }
}

function closeNotifications() {
  const portal = document.getElementById("notificationPortal");
  document.getElementById("notificationDropdown").style.transform =
    "scale(0.95)";
  setTimeout(() => {
    portal.style.display = "none";
    isNotificationOpen = false;
  }, 150);
}

function markAllAsRead() {
  const unreadItems = document.querySelectorAll(
    ".notification-item.unread"
  );
  unreadItems.forEach((item) => {
    item.classList.remove("unread");
  });
  updateNotificationCount(0);
  showToast("All notifications marked as read", "success");
}

function updateNotificationCount(count) {
  notificationCount = count;
  const countElement = document.getElementById("notificationCount");
  countElement.textContent = count;
  countElement.style.display = count > 0 ? "flex" : "none";
}

function viewAllNotifications() {
  closeNotifications();
  window.location.href = "2Notification&Alertpage.html";
}

// Enhanced Toast Notification System
function showToast(message, type = "success") {
  const toast = document.getElementById("toast");
  const icon =
    type === "success"
      ? "fas fa-check-circle"
      : type === "error"
      ? "fas fa-exclamation-circle"
      : type === "warning"
      ? "fas fa-exclamation-triangle"
      : "fas fa-info-circle";

  const bgColor =
    type === "success"
      ? "#1dd1a1"
      : type === "error"
      ? "#ff6b6b"
      : type === "warning"
      ? "#ffa726"
      : "#667eea";

  toast.innerHTML = `<i class="${icon}"></i>${message}`;
  toast.style.background = bgColor;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

// Enhanced Request Management System with Individual Approval
let currentRequestId = null;
let currentRequestData = null;

function approveRequest(requestId) {
  const statusElement = document.getElementById(`status-${requestId}`);
  const approveBtn = document.getElementById(`approve-${requestId}`);
  const rejectBtn = document.getElementById(`reject-${requestId}`);

  if (statusElement && approveBtn && rejectBtn) {
    statusElement.innerHTML =
      '<span class="status-badge approved">Approved</span>';
    approveBtn.style.display = "none";
    rejectBtn.style.display = "none";

    showToast(`Request ${requestId} approved successfully`, "success");

    // Update requests data
    if (requestsData[requestId]) {
      requestsData[requestId].status = "Approved";
      // Approve all items in the request
      requestsData[requestId].items.forEach(item => {
        item.status = "approved";
      });
    }
  }
}

function rejectRequest(requestId) {
  const statusElement = document.getElementById(`status-${requestId}`);
  const approveBtn = document.getElementById(`approve-${requestId}`);
  const rejectBtn = document.getElementById(`reject-${requestId}`);

  if (statusElement && approveBtn && rejectBtn) {
    statusElement.innerHTML =
      '<span class="status-badge rejected">Rejected</span>';
    approveBtn.style.display = "none";
    rejectBtn.style.display = "none";

    showToast(`Request ${requestId} rejected`, "error");

    // Update requests data
    if (requestsData[requestId]) {
      requestsData[requestId].status = "Rejected";
      // Reject all items in the request
      requestsData[requestId].items.forEach(item => {
        item.status = "rejected";
      });
    }
  }
}

// ======================================================================= 
// INDIVIDUAL APPROVAL FUNCTIONALITY (NEW ADDITIONS)
// =======================================================================

function viewRequest(requestId) {
  currentRequestId = requestId;
  currentRequestData = requestsData[requestId];

  if (currentRequestData) {
    // Populate modal with request data
    document.getElementById("modal-request-id").textContent = currentRequestData.id;
    document.getElementById("modal-employee").textContent = currentRequestData.employee;
    document.getElementById("modal-department").textContent = currentRequestData.department;

    // Handle multiple items display in modal
    if (currentRequestData.items.length > 1) {
      document.getElementById("modal-items").textContent = `${currentRequestData.items.length} Different Items`;
    } else {
      document.getElementById("modal-items").textContent = currentRequestData.items[0].name;
    }

    document.getElementById("modal-quantity").textContent = currentRequestData.totalQuantity;
    document.getElementById("modal-priority").innerHTML = `<span class="priority-badge ${currentRequestData.priority.toLowerCase()}">${currentRequestData.priority}</span>`;
    document.getElementById("modal-status").innerHTML = `<span class="status-badge ${currentRequestData.status.toLowerCase().replace(" ", "-")}">${currentRequestData.status}</span>`;
    document.getElementById("modal-date").textContent = currentRequestData.date;
    document.getElementById("modal-delivery").textContent = currentRequestData.expectedDelivery;
    document.getElementById("modal-project").textContent = currentRequestData.projectCode;
    document.getElementById("modal-cost").textContent = currentRequestData.cost;
    document.getElementById("modal-requested-by").textContent = currentRequestData.requestedBy;
    document.getElementById("modal-description").textContent = currentRequestData.description;

    // Generate items breakdown with individual controls
    generateItemsBreakdown(currentRequestData.items);
    
    // Update approval summary
    updateApprovalSummary();

    // Show modal
    document.getElementById("requestModal").style.display = "flex";
  }
}

function generateItemsBreakdown(items) {
  const container = document.getElementById("modal-items-breakdown");
  container.innerHTML = "";

  items.forEach((item, index) => {
    const itemElement = document.createElement("div");
    itemElement.className = `approval-item ${item.status}`;
    itemElement.setAttribute("data-item-id", item.id);
    
    itemElement.innerHTML = `
      <div class="item-info">
        <div class="item-name">${item.name}</div>
        <div class="item-details">
          <span><i class="fas fa-cubes"></i> ${item.quantity} ${item.unit}</span>
          <span><i class="fas fa-rupee-sign"></i> ₹${item.estimatedCost.toLocaleString()}</span>
        </div>
      </div>
      <div class="item-actions">
        <div class="item-status ${item.status}">${getStatusText(item.status)}</div>
        <button class="item-action-btn approve" 
                onclick="approveItem(${item.id})" 
                ${item.status === "approved" ? "disabled" : ""}>
          <i class="fas fa-check"></i> Approve
        </button>
        <button class="item-action-btn reject" 
                onclick="rejectItem(${item.id})" 
                ${item.status === "rejected" ? "disabled" : ""}>
          <i class="fas fa-times"></i> Reject
        </button>
      </div>
    `;
    
    container.appendChild(itemElement);
  });
}

function approveItem(itemId) {
  if (!currentRequestData) return;
  
  const item = currentRequestData.items.find(item => item.id === itemId);
  if (item) {
    item.status = "approved";
    updateItemDisplay(itemId, "approved");
    updateApprovalSummary();
    showToast(`${item.name} approved successfully!`, "success");
  }
}

function rejectItem(itemId) {
  if (!currentRequestData) return;
  
  const item = currentRequestData.items.find(item => item.id === itemId);
  if (item) {
    item.status = "rejected";
    updateItemDisplay(itemId, "rejected");
    updateApprovalSummary();
    showToast(`${item.name} rejected`, "error");
  }
}

function updateItemDisplay(itemId, status) {
  const itemElement = document.querySelector(`[data-item-id="${itemId}"]`);
  if (itemElement) {
    // Update item container class
    itemElement.className = `approval-item ${status}`;
    
    // Update status badge
    const statusElement = itemElement.querySelector(".item-status");
    statusElement.className = `item-status ${status}`;
    statusElement.textContent = getStatusText(status);
    
    // Update buttons
    const approveBtn = itemElement.querySelector(".approve");
    const rejectBtn = itemElement.querySelector(".reject");
    
    if (status === "approved") {
      approveBtn.disabled = true;
      rejectBtn.disabled = false;
    } else if (status === "rejected") {
      rejectBtn.disabled = true;
      approveBtn.disabled = false;
    }
  }
}

function approveAllItems() {
  if (!currentRequestData) return;
  
  currentRequestData.items.forEach(item => {
    if (item.status !== "approved") {
      item.status = "approved";
      updateItemDisplay(item.id, "approved");
    }
  });
  
  updateApprovalSummary();
  showToast("All items approved successfully!", "success");
}

function rejectAllItems() {
  if (!currentRequestData) return;
  
  currentRequestData.items.forEach(item => {
    if (item.status !== "rejected") {
      item.status = "rejected";
      updateItemDisplay(item.id, "rejected");
    }
  });
  
  updateApprovalSummary();
  showToast("All items rejected", "error");
}

function updateApprovalSummary() {
  if (!currentRequestData) return;
  
  const approved = currentRequestData.items.filter(item => item.status === "approved").length;
  const rejected = currentRequestData.items.filter(item => item.status === "rejected").length;
  const pending = currentRequestData.items.filter(item => item.status === "pending").length;
  
  document.getElementById("approved-count").textContent = approved;
  document.getElementById("rejected-count").textContent = rejected;
  document.getElementById("pending-count").textContent = pending;
}

function finalizeRequest() {
  if (!currentRequestData) return;
  
  const approved = currentRequestData.items.filter(item => item.status === "approved").length;
  const rejected = currentRequestData.items.filter(item => item.status === "rejected").length;
  const total = currentRequestData.items.length;
  
  if (approved === 0 && rejected === 0) {
    showToast("Please approve or reject at least one item before finalizing", "warning");
    return;
  }
  
  // Update overall request status
  let overallStatus;
  if (approved === total) {
    overallStatus = "approved";
  } else if (rejected === total) {
    overallStatus = "rejected";
  } else {
    overallStatus = "partially-approved";
  }
  
  // Update the main table
  updateMainTableStatus(currentRequestData.id, overallStatus);
  
  // Close modal
  closeModal();
  
  // Show success message
  showToast(`Request ${currentRequestData.id} finalized successfully!`, "success");
}

function updateMainTableStatus(requestId, status) {
  const statusElement = document.getElementById(`status-${requestId}`);
  if (statusElement) {
    statusElement.className = `status-badge ${status}`;
    statusElement.textContent = getStatusText(status);
  }
  
  // Hide/show action buttons based on status
  const approveBtn = document.getElementById(`approve-${requestId}`);
  const rejectBtn = document.getElementById(`reject-${requestId}`);
  
  if (status === "approved" || status === "rejected" || status === "partially-approved") {
    if (approveBtn) approveBtn.style.display = "none";
    if (rejectBtn) rejectBtn.style.display = "none";
  }
}

function getStatusText(status) {
  switch (status) {
    case "approved": return "Approved";
    case "rejected": return "Rejected";
    case "pending": return "Pending";
    case "partially-approved": return "Partially Approved";
    default: return "Unknown";
  }
}

function getStatusClass(status) {
  switch (status.toLowerCase()) {
    case "approved": return "approved";
    case "rejected": return "rejected";
    case "pending approval": return "pending";
    case "under review": return "review";
    case "partially approved": return "partial";
    default: return "pending";
  }
}

// ======================================================================= 
// END OF INDIVIDUAL APPROVAL FUNCTIONALITY
// =======================================================================

function approveFromModal() {
  if (currentRequestId) {
    approveRequest(currentRequestId);
    closeModal();
  }
}

function rejectFromModal() {
  if (currentRequestId) {
    rejectRequest(currentRequestId);
    closeModal();
  }
}

function closeModal() {
  document.getElementById("requestModal").style.display = "none";
  currentRequestId = null;
  currentRequestData = null;
}

// Enhanced Data Refresh Functions
function refreshData() {
  showToast("Refreshing dashboard data...", "info");

  // Simulate data refresh with loading animation
  const refreshBtn = document.querySelector(".refresh-btn");
  const icon = refreshBtn.querySelector("i");

  icon.style.animation = "spin 1s linear infinite";

  setTimeout(() => {
    icon.style.animation = "";
    showToast("Dashboard data refreshed successfully", "success");

    // Update some dynamic values to show refresh effect
    const stockInValue = document.getElementById("stockInValue");
    const stockOutValue = document.getElementById("stockOutValue");

    if (stockInValue && stockOutValue) {
      const newStockIn = 8547 + Math.floor(Math.random() * 100);
      const newStockOut = 4000 + Math.floor(Math.random() * 50);

      stockInValue.textContent = newStockIn.toLocaleString();
      stockOutValue.textContent = newStockOut.toLocaleString();
    }
  }, 2000);
}

function syncData() {
  showToast("Syncing with external systems...", "info");

  const syncBtn = document.querySelector(".sync-btn");
  const icon = syncBtn.querySelector("i");

  icon.style.animation = "spin 1s linear infinite";

  setTimeout(() => {
    icon.style.animation = "";
    showToast("Data synchronized successfully", "success");
  }, 3000);
}

// Add spin animation
const style = document.createElement("style");
style.textContent = `
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;
document.head.appendChild(style);

// Navigation Functions
function viewStockDetails() {
  window.location.href = "2StockManagementModule.html";
}

function viewAllActivities() {
  window.location.href = "2Notification&Alertpage.html";
}

function viewAllAlerts() {
  window.location.href = "2Notification&Alertpage.html";
}

function viewAllRequests() {
  window.location.href = "2PurchaseRequestsModule.html";
}

// Enhanced Initialization with Memory Management
document.addEventListener("DOMContentLoaded", function () {
  // Initialize navigation
  setActiveNavItem();

  // Initialize charts with delay for better performance
  setTimeout(() => {
    initializeCharts();
  }, 300);

  // Show welcome toast
  setTimeout(() => {
    showToast("Inventory Dashboard loaded successfully!", "success");
  }, 1000);

  // Initialize notification count
  updateNotificationCount(6);

  // Setup dropdown functionality
  document.querySelectorAll(".nav-dropdown").forEach((dropdown) => {
    dropdown.addEventListener("click", function (e) {
      e.preventDefault();
      toggleDropdown(this);
    });
  });

  // Setup modal close on backdrop click
  document
    .getElementById("requestModal")
    .addEventListener("click", function (e) {
      if (e.target === this) {
        closeModal();
      }
    });

  // Setup keyboard navigation
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      if (isNotificationOpen) {
        closeNotifications();
      }
      if (
        document.getElementById("requestModal").style.display === "flex"
      ) {
        closeModal();
      }
      // Close any expanded item displays
      document
        .querySelectorAll(".item-display.expanded")
        .forEach((item) => {
          item.classList.remove("expanded");
        });
    }
  });
});

// Memory cleanup on page unload
window.addEventListener("beforeunload", function () {
  // Destroy chart instances
  Object.values(chartInstances).forEach((chart) => {
    if (chart && typeof chart.destroy === "function") {
      chart.destroy();
    }
  });

  // Clear intervals and timeouts
  clearTimeout(resizeTimeout);
});

// Performance monitoring
window.addEventListener("load", function () {
  if (window.performance && window.performance.timing) {
    const loadTime =
      window.performance.timing.loadEventEnd -
      window.performance.timing.navigationStart;
    console.log(`Dashboard loaded in ${loadTime}ms`);
  }
});
