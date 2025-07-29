
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

      // Sidebar functionality
      function toggleMobileSidebar() {
        const sidebar = document.getElementById("sidebar");
        sidebar.classList.toggle("open");
      }

      function setActiveNavItem() {
        const navLinks = document.querySelectorAll(".nav-link");
        navLinks.forEach((link) => {
          link.classList.remove("active");
          // Set Vendor as active for this page
          if (link.textContent.trim() === "Vendor") {
            link.classList.add("active");
          }
        });
      }

      function logout() {
        showCustomConfirm("Are you sure you want to logout?", () => {
          showToast("You have been logged out", "success");
          setTimeout(() => {
            window.location.href = "login.html";
          }, 1500);
        });
      }

      // Vendor Management Data
      let vendorData = [
        {
          id: 1,
          name: "ABC Suppliers",
          contact: "+91-9876543210",
          email: "vendor@abcsuppliers.com",
          address: "123, Anna Salai, T. Nagar, Chennai - 600017",
          location: "chennai",
          gst: "33AAAPL1234C1Z9",
          pan: "AAAPL1234C",
          account: "1234567890123456",
          ifsc: "HDFC0000123",
          creditPeriod: 30,
          creditLimit: 500000,
          products: ["Laptops", "Monitors", "Keyboards", "Mouse"],
          category: "electronics",
          registrationDate: "2024-01-15",
          status: "active",
          notes: "Reliable supplier for computer hardware",
          stockRequirements: [
            {
              id: "STK-001",
              product: "Dell Laptops",
              quantity: 50,
              unitPrice: 45000,
              totalValue: 2250000,
              requestDate: "2025-07-20",
              expectedDate: "2025-07-30",
              status: "pending",
              priority: "high",
            },
            {
              id: "STK-002",
              product: "HP Monitors",
              quantity: 25,
              unitPrice: 15000,
              totalValue: 375000,
              requestDate: "2025-07-18",
              expectedDate: "2025-07-28",
              status: "supplied",
              priority: "medium",
            },
          ],
        },
        {
          id: 2,
          name: "TechCorp Industries",
          contact: "+91-9876543211",
          email: "sales@techcorp.in",
          address: "456, MG Road, Brigade Road, Bangalore - 560001",
          location: "bangalore",
          gst: "29BBBPL5678D1Z4",
          pan: "BBBPL5678D",
          account: "2345678901234567",
          ifsc: "ICICI0000456",
          creditPeriod: 45,
          creditLimit: 750000,
          products: ["Servers", "Networking Equipment", "Storage Devices"],
          category: "electronics",
          registrationDate: "2023-08-22",
          status: "active",
          notes: "Enterprise hardware specialist",
          stockRequirements: [
            {
              id: "STK-003",
              product: "Dell Servers",
              quantity: 5,
              unitPrice: 125000,
              totalValue: 625000,
              requestDate: "2025-07-22",
              expectedDate: "2025-08-05",
              status: "pending",
              priority: "high",
            },
          ],
        },
        {
          id: 3,
          name: "OfficeMax Solutions",
          contact: "+91-9876543212",
          email: "info@officemax.co.in",
          address: "789, Fort Area, Nariman Point, Mumbai - 400001",
          location: "mumbai",
          gst: "27CCCPL9012E1Z7",
          pan: "CCCPL9012E",
          account: "3456789012345678",
          ifsc: "SBI0000789",
          creditPeriod: 15,
          creditLimit: 200000,
          products: ["Office Chairs", "Desks", "Filing Cabinets", "Stationery"],
          category: "office-supplies",
          registrationDate: "2024-03-10",
          status: "active",
          notes: "Complete office furniture and supplies",
          stockRequirements: [
            {
              id: "STK-004",
              product: "Executive Chairs",
              quantity: 20,
              unitPrice: 8500,
              totalValue: 170000,
              requestDate: "2025-07-21",
              expectedDate: "2025-07-31",
              status: "pending",
              priority: "medium",
            },
            {
              id: "STK-005",
              product: "Office Desks",
              quantity: 15,
              unitPrice: 12000,
              totalValue: 180000,
              requestDate: "2025-07-19",
              expectedDate: "2025-07-29",
              status: "overdue",
              priority: "high",
            },
          ],
        },
        {
          id: 4,
          name: "Industrial Hardware Co.",
          contact: "+91-9876543213",
          email: "orders@industrialhw.com",
          address: "321, Connaught Place, New Delhi - 110001",
          location: "delhi",
          gst: "07DDDPL3456F1Z2",
          pan: "DDDPL3456F",
          account: "4567890123456789",
          ifsc: "AXIS0000321",
          creditPeriod: 60,
          creditLimit: 1000000,
          products: [
            "Tools",
            "Machinery Parts",
            "Safety Equipment",
            "Raw Materials",
          ],
          category: "hardware",
          registrationDate: "2023-12-05",
          status: "active",
          notes: "Heavy machinery and industrial supplies",
          stockRequirements: [
            {
              id: "STK-006",
              product: "Safety Helmets",
              quantity: 100,
              unitPrice: 450,
              totalValue: 45000,
              requestDate: "2025-07-23",
              expectedDate: "2025-08-02",
              status: "pending",
              priority: "medium",
            },
          ],
        },
        {
          id: 5,
          name: "PrintPack Materials",
          contact: "+91-9876543214",
          email: "sales@printpack.in",
          address: "654, Baner Road, Pune - 411045",
          location: "pune",
          gst: "27EEEPL7890G1Z5",
          pan: "EEEPL7890G",
          account: "5678901234567890",
          ifsc: "KOTAK0000654",
          creditPeriod: 30,
          creditLimit: 300000,
          products: ["Packaging Materials", "Cartons", "Labels", "Tapes"],
          category: "packaging",
          registrationDate: "2024-06-18",
          status: "inactive",
          notes: "Packaging solutions provider - Currently under review",
          stockRequirements: [],
        },
        {
          id: 6,
          name: "ModernFurn Designs",
          contact: "+91-9876543215",
          email: "contact@modernfurn.com",
          address: "987, Jubilee Hills, Hyderabad - 500033",
          location: "hyderabad",
          gst: "36FFFPL2468H1Z8",
          pan: "FFFPL2468H",
          account: "6789012345678901",
          ifsc: "HDFC0000987",
          creditPeriod: 45,
          creditLimit: 600000,
          products: [
            "Modular Furniture",
            "Conference Tables",
            "Reception Counters",
          ],
          category: "furniture",
          registrationDate: "2024-02-28",
          status: "active",
          notes: "Modern office furniture specialist",
          stockRequirements: [
            {
              id: "STK-007",
              product: "Conference Tables",
              quantity: 8,
              unitPrice: 35000,
              totalValue: 280000,
              requestDate: "2025-07-24",
              expectedDate: "2025-08-10",
              status: "pending",
              priority: "low",
            },
          ],
        },
      ];

      // Pagination and filtering variables
      let currentPage = 1;
      let itemsPerPage = 10;
      let filteredVendorData = [...vendorData];
      let editingVendorId = null;
      let productTags = [];

      // Initialize the page
      document.addEventListener("DOMContentLoaded", function () {
        try {
          renderVendorTable();
          updateStats();
          setActiveNavItem(); // Set sidebar active item

          // Set current date as default for date filters
          const today = new Date().toISOString().split("T")[0];
          document.getElementById("dateTo").value = today;
          document.getElementById("registrationDate").value = today;

          // Initialize product tag input
          initializeProductTagInput();

          showToast("Vendor Management loaded successfully!", "success");
        } catch (error) {
          console.error("Error initializing page:", error);
          showToast("Error loading page. Please refresh.", "error");
        }
      });

      // Vendor table rendering
      function renderVendorTable() {
        try {
          const tbody = document.getElementById("vendorTableBody");
          const startIndex = (currentPage - 1) * itemsPerPage;
          const endIndex = startIndex + itemsPerPage;
          const pageVendorData = filteredVendorData.slice(startIndex, endIndex);

          if (!tbody) {
            throw new Error("Table body not found");
          }

          tbody.innerHTML = "";

          if (pageVendorData.length === 0) {
            tbody.innerHTML = `
              <tr>
                <td colspan="11" class="empty-state">
                  <i class="fas fa-truck"></i>
                  <h3>No Vendors Found</h3>
                  <p>No vendors match your current filters. Try adjusting your search criteria or add new vendors.</p>
                </td>
              </tr>
            `;
            document.getElementById("pagination").innerHTML = "";
            return;
          }

          pageVendorData.forEach((vendor) => {
            const pendingStockValue = vendor.stockRequirements
              .filter((stock) => stock.status === "pending")
              .reduce((sum, stock) => sum + stock.totalValue, 0);

            const row = document.createElement("tr");

            row.innerHTML = `
              <td><input type="checkbox" class="vendor-checkbox" value="${
                vendor.id
              }" /></td>
              <td>
                <div class="vendor-avatar">
                  ${vendor.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()
                    .substring(0, 2)}
                </div>
              </td>
              <td>
                <div style="font-weight: 600; margin-bottom: 2px;">${
                  vendor.name
                }</div>
                <div style="font-size: 9px; color: var(--text-muted);">ID: ${vendor.id
                  .toString()
                  .padStart(4, "0")}</div>
              </td>
              <td>${vendor.contact}</td>
              <td>
                <div style="font-weight: 500; margin-bottom: 2px;">${
                  vendor.email
                }</div>
                <div style="font-size: 9px; color: var(--text-muted);">Credit: ${
                  vendor.creditPeriod
                } days</div>
              </td>
              <td>
                <div style="font-weight: 600; margin-bottom: 2px;">${
                  vendor.location.charAt(0).toUpperCase() +
                  vendor.location.slice(1)
                }</div>
                <div style="font-size: 9px; color: var(--text-muted);">Reg: ${formatDate(
                  vendor.registrationDate
                )}</div>
              </td>
              <td>
                <div style="font-weight: 500; margin-bottom: 2px;">${
                  vendor.gst
                }</div>
                ${
                  vendor.pan
                    ? `<div style="font-size: 9px; color: var(--text-muted);">PAN: ${vendor.pan}</div>`
                    : ""
                }
              </td>
              <td>
                <div class="products-list">
                  ${vendor.products
                    .slice(0, 3)
                    .map(
                      (product) => `<span class="product-tag">${product}</span>`
                    )
                    .join("")}
                  ${
                    vendor.products.length > 3
                      ? `<span class="product-tag">+${
                          vendor.products.length - 3
                        }</span>`
                      : ""
                  }
                </div>
              </td>
              <td>
                ${
                  pendingStockValue > 0
                    ? `
                  <div class="pending-stock">
                    <i class="fas fa-clock"></i>
                    ₹${formatCurrency(pendingStockValue)}
                  </div>
                `
                    : '<span style="color: var(--text-muted);">No pending</span>'
                }
              </td>
              <td>
                <span class="status-badge ${vendor.status}">${
              vendor.status === "active" ? "Active" : "Inactive"
            }</span>
              </td>
              <td>
                <button class="table-action-btn edit" onclick="editVendor(${
                  vendor.id
                })" title="Edit Vendor">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="table-action-btn view" onclick="viewStock(${
                  vendor.id
                })" title="View Stock">
                  <i class="fas fa-boxes"></i>
                </button>
                <button class="table-action-btn ${
                  vendor.status === "active" ? "deactivate" : "edit"
                }" onclick="toggleVendorStatus(${vendor.id})" title="${
              vendor.status === "active" ? "Deactivate" : "Activate"
            } Vendor">
                  <i class="fas fa-${
                    vendor.status === "active" ? "ban" : "check"
                  }"></i>
                </button>
                <button class="table-action-btn delete" onclick="deleteVendor(${
                  vendor.id
                })" title="Delete Vendor">
                  <i class="fas fa-trash"></i>
                </button>
              </td>
            `;

            tbody.appendChild(row);
          });

          renderPagination();
        } catch (error) {
          console.error("Error rendering vendor table:", error);
          showToast(
            "Error loading vendor data. Please refresh the page.",
            "error"
          );
        }
      }

      // Utility functions
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
          return amount.toString();
        } catch (error) {
          return "0";
        }
      }

      function renderPagination() {
        try {
          const pagination = document.getElementById("pagination");
          if (!pagination) return;

          const totalPages = Math.ceil(
            filteredVendorData.length / itemsPerPage
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
            filteredVendorData.length / itemsPerPage
          );
          if (page >= 1 && page <= totalPages) {
            currentPage = page;
            renderVendorTable();
          }
        } catch (error) {
          console.error("Error changing page:", error);
        }
      }

      // Filter functions
      function applyFilters() {
        try {
          const searchTerm = document
            .getElementById("searchVendor")
            .value.toLowerCase();
          const categoryFilter =
            document.getElementById("filterCategory").value;
          const statusFilter = document.getElementById("filterStatus").value;
          const locationFilter =
            document.getElementById("filterLocation").value;
          const dateFrom = document.getElementById("dateFrom").value;
          const dateTo = document.getElementById("dateTo").value;

          filteredVendorData = vendorData.filter((vendor) => {
            const matchesSearch =
              !searchTerm ||
              vendor.name.toLowerCase().includes(searchTerm) ||
              vendor.email.toLowerCase().includes(searchTerm) ||
              vendor.contact.includes(searchTerm) ||
              vendor.gst.toLowerCase().includes(searchTerm) ||
              vendor.products.some((product) =>
                product.toLowerCase().includes(searchTerm)
              );

            const matchesCategory =
              !categoryFilter || vendor.category === categoryFilter;
            const matchesStatus =
              !statusFilter || vendor.status === statusFilter;
            const matchesLocation =
              !locationFilter || vendor.location === locationFilter;

            const regDate = new Date(vendor.registrationDate);
            const matchesDateFrom = !dateFrom || regDate >= new Date(dateFrom);
            const matchesDateTo = !dateTo || regDate <= new Date(dateTo);

            return (
              matchesSearch &&
              matchesCategory &&
              matchesStatus &&
              matchesLocation &&
              matchesDateFrom &&
              matchesDateTo
            );
          });

          currentPage = 1;
          renderVendorTable();
          showToast(
            `Filters applied. Found ${filteredVendorData.length} vendors.`,
            "info"
          );
        } catch (error) {
          console.error("Error applying filters:", error);
          showToast("Error applying filters. Please try again.", "error");
        }
      }

      function clearFilters() {
        try {
          document.getElementById("searchVendor").value = "";
          document.getElementById("filterCategory").value = "";
          document.getElementById("filterStatus").value = "";
          document.getElementById("filterLocation").value = "";
          document.getElementById("dateFrom").value = "";
          document.getElementById("dateTo").value = "";

          filteredVendorData = [...vendorData];
          currentPage = 1;
          renderVendorTable();
          showToast("All filters cleared.", "info");
        } catch (error) {
          console.error("Error clearing filters:", error);
          showToast("Error clearing filters.", "error");
        }
      }

      // Modal functions
      function openAddVendorModal() {
        editingVendorId = null;
        productTags = [];
        document.getElementById("modalTitle").textContent = "Add New Vendor";
        document.getElementById("vendorForm").reset();
        document.getElementById("registrationDate").value = new Date()
          .toISOString()
          .split("T")[0];
        updateProductTagsDisplay();
        document.getElementById("vendorModal").classList.add("show");
      }

      function editVendor(id) {
        const vendor = vendorData.find((v) => v.id === id);
        if (!vendor) return;

        editingVendorId = id;
        productTags = [...vendor.products];
        document.getElementById("modalTitle").textContent = "Edit Vendor";

        // Populate form fields
        document.getElementById("vendorName").value = vendor.name;
        document.getElementById("vendorContact").value = vendor.contact;
        document.getElementById("vendorEmail").value = vendor.email;
        document.getElementById("vendorAddress").value = vendor.address;
        document.getElementById("vendorLocation").value = vendor.location;
        document.getElementById("vendorGST").value = vendor.gst;
        document.getElementById("vendorPAN").value = vendor.pan || "";
        document.getElementById("vendorAccount").value = vendor.account || "";
        document.getElementById("vendorIFSC").value = vendor.ifsc || "";
        document.getElementById("creditPeriod").value =
          vendor.creditPeriod || "";
        document.getElementById("creditLimit").value = vendor.creditLimit || "";
        document.getElementById("vendorCategory").value = vendor.category;
        document.getElementById("registrationDate").value =
          vendor.registrationDate;
        document.getElementById("vendorStatus").value = vendor.status;
        document.getElementById("vendorNotes").value = vendor.notes || "";

        updateProductTagsDisplay();
        document.getElementById("vendorModal").classList.add("show");
      }

      function closeVendorModal() {
        document.getElementById("vendorModal").classList.remove("show");
        document.getElementById("vendorForm").reset();
        productTags = [];
        editingVendorId = null;
      }

      function saveVendor() {
        const form = document.getElementById("vendorForm");
        if (!form.checkValidity()) {
          form.reportValidity();
          return;
        }

        if (productTags.length === 0) {
          showToast("Please add at least one product!", "error");
          return;
        }

        const vendorInfo = {
          name: document.getElementById("vendorName").value,
          contact: document.getElementById("vendorContact").value,
          email: document.getElementById("vendorEmail").value,
          address: document.getElementById("vendorAddress").value,
          location: document.getElementById("vendorLocation").value,
          gst: document.getElementById("vendorGST").value,
          pan: document.getElementById("vendorPAN").value,
          account: document.getElementById("vendorAccount").value,
          ifsc: document.getElementById("vendorIFSC").value,
          creditPeriod:
            parseInt(document.getElementById("creditPeriod").value) || 0,
          creditLimit:
            parseInt(document.getElementById("creditLimit").value) || 0,
          products: [...productTags],
          category: document.getElementById("vendorCategory").value,
          registrationDate: document.getElementById("registrationDate").value,
          status: document.getElementById("vendorStatus").value,
          notes: document.getElementById("vendorNotes").value,
        };

        if (editingVendorId) {
          // Update existing vendor
          const index = vendorData.findIndex((v) => v.id === editingVendorId);
          if (index !== -1) {
            vendorData[index] = {
              ...vendorData[index],
              ...vendorInfo,
            };
            showToast("Vendor updated successfully!", "success");
          }
        } else {
          // Add new vendor
          const newVendor = {
            id: Date.now(),
            ...vendorInfo,
            stockRequirements: [],
          };
          vendorData.push(newVendor);
          showToast("Vendor added successfully!", "success");
        }

        closeVendorModal();
        applyFilters(); // Refresh the table
        updateStats();
      }

      // Product tags functionality
      function initializeProductTagInput() {
        const input = document.getElementById("productTagInput");
        if (input) {
          input.addEventListener("keypress", function (e) {
            if (e.key === "Enter") {
              e.preventDefault();
              const value = this.value.trim();
              if (value && !productTags.includes(value)) {
                productTags.push(value);
                updateProductTagsDisplay();
                this.value = "";
              }
            }
          });
        }
      }

      function updateProductTagsDisplay() {
        const container = document.getElementById("productTagsContainer");
        const input = document.getElementById("productTagInput");

        // Clear existing tags
        const existingTags = container.querySelectorAll(".tag-item");
        existingTags.forEach((tag) => tag.remove());

        // Add new tags
        productTags.forEach((tag, index) => {
          const tagElement = document.createElement("div");
          tagElement.className = "tag-item";
          tagElement.innerHTML = `
            ${tag}
            <button type="button" class="tag-remove" onclick="removeProductTag(${index})">
              <i class="fas fa-times"></i>
            </button>
          `;
          container.insertBefore(tagElement, input);
        });
      }

      function removeProductTag(index) {
        productTags.splice(index, 1);
        updateProductTagsDisplay();
      }

      // Stock modal functions
      function viewStock(id) {
        const vendor = vendorData.find((v) => v.id === id);
        if (!vendor) return;

        document.getElementById(
          "stockModalTitle"
        ).textContent = `Stock Details - ${vendor.name}`;

        const stockContent = document.getElementById("stockContent");
        if (vendor.stockRequirements.length === 0) {
          stockContent.innerHTML = `
            <div class="empty-state">
              <i class="fas fa-boxes"></i>
              <h3>No Stock Requirements</h3>
              <p>This vendor has no pending or completed stock requirements.</p>
            </div>
          `;
        } else {
          let stockHTML = '<div class="stock-list">';
          vendor.stockRequirements.forEach((stock) => {
            stockHTML += `
              <div class="stock-item">
                <div class="stock-header">
                  <div class="stock-name">${stock.product}</div>
                  <div class="stock-status ${stock.status}">${
              stock.status
            }</div>
                </div>
                <div class="stock-details">
                  <div class="stock-field">
                    <div class="stock-field-label">Quantity</div>
                    <div class="stock-field-value">${stock.quantity}</div>
                  </div>
                  <div class="stock-field">
                    <div class="stock-field-label">Unit Price</div>
                    <div class="stock-field-value">₹${stock.unitPrice.toLocaleString()}</div>
                  </div>
                  <div class="stock-field">
                    <div class="stock-field-label">Total Value</div>
                    <div class="stock-field-value">₹${stock.totalValue.toLocaleString()}</div>
                  </div>
                  <div class="stock-field">
                    <div class="stock-field-label">Request Date</div>
                    <div class="stock-field-value">${formatDate(
                      stock.requestDate
                    )}</div>
                  </div>
                  <div class="stock-field">
                    <div class="stock-field-label">Expected Date</div>
                    <div class="stock-field-value">${formatDate(
                      stock.expectedDate
                    )}</div>
                  </div>
                  <div class="stock-field">
                    <div class="stock-field-label">Priority</div>
                    <div class="stock-field-value">${stock.priority.toUpperCase()}</div>
                  </div>
                </div>
              </div>
            `;
          });
          stockHTML += "</div>";
          stockContent.innerHTML = stockHTML;
        }

        document.getElementById("stockModal").classList.add("show");
      }

      function closeStockModal() {
        document.getElementById("stockModal").classList.remove("show");
      }

      // Action functions with custom confirmations
      function toggleVendorStatus(id) {
        const vendor = vendorData.find((v) => v.id === id);
        if (!vendor) return;

        const action = vendor.status === "active" ? "deactivate" : "activate";
        showCustomConfirm(
          `${action.charAt(0).toUpperCase() + action.slice(1)} ${vendor.name}?`,
          () => {
            vendor.status = vendor.status === "active" ? "inactive" : "active";
            renderVendorTable();
            updateStats();
            showToast(`Vendor ${action}d successfully!`, "success");
          }
        );
      }

      function deleteVendor(id) {
        const vendor = vendorData.find((v) => v.id === id);
        if (!vendor) return;

        showCustomConfirm(
          `Delete ${vendor.name}? This action cannot be undone.`,
          () => {
            const index = vendorData.findIndex((v) => v.id === id);
            if (index !== -1) {
              vendorData.splice(index, 1);
              applyFilters();
              updateStats();
              showToast("Vendor deleted successfully!", "success");
            }
          }
        );
      }

      function exportVendorReport(format) {
        if (format === "excel") {
          exportToExcel();
        } else if (format === "pdf") {
          exportToPDF();
        }
      }

      function exportToExcel() {
        try {
          const exportData = filteredVendorData.map((vendor) => ({
            ID: vendor.id.toString().padStart(4, "0"),
            Name: vendor.name,
            Contact: vendor.contact,
            Email: vendor.email,
            Location: vendor.location,
            GST: vendor.gst,
            PAN: vendor.pan,
            Category: vendor.category,
            "Registration Date": vendor.registrationDate,
            Status: vendor.status,
            "Credit Period": vendor.creditPeriod,
            "Credit Limit": vendor.creditLimit,
            Products: vendor.products.join(", "),
            Notes: vendor.notes,
          }));

          const worksheet = XLSX.utils.json_to_sheet(exportData);
          const workbook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(workbook, worksheet, "Vendors");

          const fileName = `vendor_report_${
            new Date().toISOString().split("T")[0]
          }.xlsx`;
          XLSX.writeFile(workbook, fileName);

          showToast("Excel report exported successfully!", "success");
        } catch (error) {
          console.error("Error exporting to Excel:", error);
          showToast("Error exporting Excel file.", "error");
        }
      }

      function exportToPDF() {
        try {
          showToast("PDF export feature coming soon!", "info");
        } catch (error) {
          console.error("Error exporting to PDF:", error);
          showToast("Error exporting PDF file.", "error");
        }
      }

      function refreshVendorData() {
        applyFilters();
        updateStats();
        showToast("Data refreshed successfully!", "success");
      }

      function toggleSelectAll() {
        const selectAll = document.getElementById("selectAll");
        const checkboxes = document.querySelectorAll(".vendor-checkbox");
        checkboxes.forEach((checkbox) => {
          checkbox.checked = selectAll.checked;
        });
      }

      function bulkVendorActions() {
        const selectedIds = Array.from(
          document.querySelectorAll(".vendor-checkbox:checked")
        ).map((cb) => parseInt(cb.value));
        if (selectedIds.length === 0) {
          showToast("Please select vendors for bulk actions.", "warning");
          return;
        }
        showToast(`Bulk actions for ${selectedIds.length} vendors`, "info");
      }

      function printVendorReport() {
        window.print();
      }

      // Utility functions
      function updateStats() {
        try {
          const totalVendors = vendorData.length;
          const activeVendors = vendorData.filter(
            (v) => v.status === "active"
          ).length;

          // Calculate pending stock value
          const pendingStockValue = vendorData.reduce((total, vendor) => {
            return (
              total +
              vendor.stockRequirements
                .filter((stock) => stock.status === "pending")
                .reduce((sum, stock) => sum + stock.totalValue, 0)
            );
          }, 0);

          // You can update stats display here if you have stats cards
          console.log(
            `Total Vendors: ${totalVendors}, Active: ${activeVendors}, Pending Stock: ₹${pendingStockValue}`
          );
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
      const searchInput = document.getElementById("searchVendor");
      if (searchInput) {
        searchInput.addEventListener("input", function () {
          clearTimeout(searchTimeout);
          searchTimeout = setTimeout(() => {
            applyFilters();
          }, 300);
        });
      }

      // Close modals when clicking outside
      document.addEventListener("click", function (e) {
        const vendorModal = document.getElementById("vendorModal");
        const stockModal = document.getElementById("stockModal");
        const customConfirm = document.getElementById("customConfirm");

        if (e.target === vendorModal) {
          closeVendorModal();
        }

        if (e.target === stockModal) {
          closeStockModal();
        }

        if (e.target === customConfirm) {
          hideCustomConfirm(false);
        }
      });

      // Keyboard shortcuts
      document.addEventListener("keydown", function (e) {
        // Escape to close modals
        if (e.key === "Escape") {
          closeVendorModal();
          closeStockModal();
          hideCustomConfirm(false);
        }

        // Ctrl+N or Cmd+N for new vendor
        if ((e.ctrlKey || e.metaKey) && e.key === "n") {
          e.preventDefault();
          openAddVendorModal();
        }

        // Ctrl+F or Cmd+F for search
        if ((e.ctrlKey || e.metaKey) && e.key === "f") {
          e.preventDefault();
          document.getElementById("searchVendor").focus();
        }
      });

      console.log("Vendor Management System initialized successfully");
      console.log(`Loaded ${vendorData.length} vendors`);
