document.addEventListener('DOMContentLoaded', function() {
    // Initialize application
    const app = {
        // State
        transactions: [],
        currentPage: 1,
        transactionsPerPage: 10,
        editingTransactionId: null,
        
        // DOM Elements
        sections: {
            dashboard: document.getElementById('dashboard-section'),
            transactions: document.getElementById('transactions-section'),
            upload: document.getElementById('upload-section')
        },
        navLinks: {
            dashboard: document.getElementById('dashboard-link'),
            transactions: document.getElementById('transactions-link'),
            upload: document.getElementById('upload-link')
        },
        
        // Stats elements
        stats: {
            totalIncome: document.getElementById('total-income'),
            totalExpenses: document.getElementById('total-expenses'),
            balance: document.getElementById('balance'),
            transactionCount: document.getElementById('transaction-count')
        },
        
        // Charts
        charts: {
            categoryChart: null,
            monthlyChart: null
        },
        
        // Transaction form elements
        transactionForm: {
            modal: document.getElementById('transaction-modal'),
            editModal: document.getElementById('edit-transaction-modal'),
            form: document.getElementById('transaction-form'),
            editForm: document.getElementById('edit-transaction-form'),
            title: document.getElementById('modal-title'),
            editTitle: document.getElementById('edit-modal-title'),
            date: document.getElementById('modal-date'),
            editDate: document.getElementById('edit-modal-date'),
            type: document.getElementById('modal-type'),
            editType: document.getElementById('edit-modal-type'),
            amount: document.getElementById('modal-amount'),
            editAmount: document.getElementById('edit-modal-amount'),
            category: document.getElementById('modal-category'),
            editCategory: document.getElementById('edit-modal-category'),
            description: document.getElementById('modal-description'),
            editDescription: document.getElementById('edit-modal-description'),
            submitBtn: document.getElementById('submit-transaction-btn'),
            updateBtn: document.getElementById('update-transaction-btn'),
            cancelBtn: document.getElementById('cancel-transaction-btn'),
            cancelEditBtn: document.getElementById('cancel-edit-transaction-btn'),
            closeBtns: [
                document.querySelector('.close-btn'),
                document.querySelector('.close-edit-btn')
            ]
        },
        
        // Table elements
        table: {
            tbody: document.querySelector('#transactions-table tbody'),
            prevPageBtn: document.getElementById('prev-page'),
            nextPageBtn: document.getElementById('next-page'),
            pageInfo: document.getElementById('page-info')
        },
        
        // Upload elements
        upload: {
            area: document.getElementById('upload-area'),
            fileInput: document.getElementById('csv-file-input'),
            previewTable: document.querySelector('#preview-table tbody'),
            importBtn: document.getElementById('import-btn'),
            previewContainer: document.getElementById('upload-preview')
        }
    };

    // Initialize the application
    init();

    function init() {
        // Event listeners
        setupNavigation();
        setupTransactionForm();
        setupTableNavigation();
        setupUploadHandlers();
        
        // Load initial data
        loadDashboardData();
        loadTransactions();
    }

    // Navigation handlers
    function setupNavigation() {
        app.navLinks.dashboard.addEventListener('click', function(e) {
            e.preventDefault();
            showSection('dashboard');
            loadDashboardData();
        });
        
        app.navLinks.transactions.addEventListener('click', function(e) {
            e.preventDefault();
            showSection('transactions');
            loadTransactions();
        });
        
        app.navLinks.upload.addEventListener('click', function(e) {
            e.preventDefault();
            showSection('upload');
        });
    }

    function showSection(sectionName) {
        // Hide all sections
        Object.values(app.sections).forEach(section => {
            section.classList.remove('active');
        });
        
        // Remove active class from all nav links
        Object.values(app.navLinks).forEach(link => {
            link.classList.remove('active');
        });
        
        // Show selected section
        app.sections[sectionName].classList.add('active');
        app.navLinks[sectionName].classList.add('active');
        
        // Close any open modals
        closeModals();
    }

    // Transaction form handlers
    function setupTransactionForm() {
        // Open add transaction modal
        document.getElementById('add-transaction-btn').addEventListener('click', function() {
            openAddTransactionModal();
        });
        
        // Form submissions
        app.transactionForm.form.addEventListener('submit', function(e) {
            e.preventDefault();
            addTransaction();
        });
        
        app.transactionForm.editForm.addEventListener('submit', function(e) {
            e.preventDefault();
            updateTransaction();
        });
        
        // Cancel buttons
        app.transactionForm.cancelBtn.addEventListener('click', closeModals);
        app.transactionForm.cancelEditBtn.addEventListener('click', closeModals);
        
        // Close buttons (X)
        app.transactionForm.closeBtns.forEach(btn => {
            btn.addEventListener('click', closeModals);
        });
        
        // Close modal when clicking outside
        window.addEventListener('click', function(e) {
            if (e.target === app.transactionForm.modal || e.target === app.transactionForm.editModal) {
                closeModals();
            }
        });
        
        // Escape key to close modal
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeModals();
            }
        });
    }

    function openAddTransactionModal() {
        app.transactionForm.title.textContent = 'Add Transaction';
        app.transactionForm.form.reset();
        app.transactionForm.editTransactionId = null;
        app.transactionForm.modal.style.display = 'block';
    }

    function openEditTransactionModal(transaction) {
        app.transactionForm.editTitle.textContent = 'Edit Transaction';
        app.transactionForm.editTransactionId = transaction.id;
        
        // Populate form with transaction data
        app.transactionForm.editDate.value = transaction.date;
        app.transactionForm.editType.value = transaction.type;
        app.transactionForm.editAmount.value = transaction.amount;
        app.transactionForm.editCategory.value = transaction.category;
        app.transactionForm.editDescription.value = transaction.description || '';
        
        app.transactionForm.editModal.style.display = 'block';
    }

    function closeModals() {
        app.transactionForm.modal.style.display = 'none';
        app.transactionForm.editModal.style.display = 'none';
        app.transactionForm.editTransactionId = null;
    }

    // Transaction CRUD operations
    function addTransaction() {
        const transaction = {
            date: app.transactionForm.date.value,
            type: app.transactionForm.type.value,
            amount: parseFloat(app.transactionForm.amount.value),
            category: app.transactionForm.category.value,
            description: app.transactionForm.description.value
        };

        // Simple validation
        if (!transaction.date || !transaction.type || isNaN(transaction.amount) || !transaction.category) {
            showAlert('Please fill in all required fields', 'error');
            return;
        }

        // Disable form during submission
        app.transactionForm.submitBtn.disabled = true;
        app.transactionForm.submitBtn.textContent = 'Saving...';

        // Send to backend
        fetch('/api/transactions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(transaction)
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                throw new Error(data.error);
            }
            showAlert('Transaction added successfully!', 'success');
            closeModals();
            loadDashboardData();
            loadTransactions();
        })
        .catch(error => {
            showAlert('Error adding transaction: ' + error.message, 'error');
        })
        .finally(() => {
            app.transactionForm.submitBtn.disabled = false;
            app.transactionForm.submitBtn.textContent = 'Save Transaction';
        });
    }

    function updateTransaction() {
        if (!app.transactionForm.editTransactionId) return;

        const transaction = {
            date: app.transactionForm.editDate.value,
            type: app.transactionForm.editType.value,
            amount: parseFloat(app.transactionForm.editAmount.value),
            category: app.transactionForm.editCategory.value,
            description: app.transactionForm.editDescription.value
        };

        // Simple validation
        if (!transaction.date || !transaction.type || isNaN(transaction.amount) || !transaction.category) {
            showAlert('Please fill in all required fields', 'error');
            return;
        }

        // Disable form during submission
        app.transactionForm.updateBtn.disabled = true;
        app.transactionForm.updateBtn.textContent = 'Updating...';

        // Send to backend
        fetch(`/api/transactions/${app.transactionForm.editTransactionId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(transaction)
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                throw new Error(data.error);
            }
            showAlert('Transaction updated successfully!', 'success');
            closeModals();
            loadDashboardData();
            loadTransactions();
        })
        .catch(error => {
            showAlert('Error updating transaction: ' + error.message, 'error');
        })
        .finally(() => {
            app.transactionForm.updateBtn.disabled = false;
            app.transactionForm.updateBtn.textContent = 'Update Transaction';
        });
    }

    function deleteTransaction(id) {
        if (!confirm('Are you sure you want to delete this transaction?')) return;

        fetch(`/api/transactions/${id}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                throw new Error(data.error);
            }
            showAlert('Transaction deleted successfully!', 'success');
            loadDashboardData();
            loadTransactions();
        })
        .catch(error => {
            showAlert('Error deleting transaction: ' + error.message, 'error');
        });
    }

    // Table rendering and pagination
    function loadTransactions() {
        showLoadingState(app.table.tbody, 'Loading transactions...');
        
        fetch('/api/transactions')
        .then(response => response.json())
        .then(transactions => {
            app.transactions = transactions;
            renderTransactions();
        })
        .catch(error => {
            app.table.tbody.innerHTML = `<tr><td colspan="6" class="error">Error loading transactions: ${error.message}</td></tr>`;
        });
    }

    function renderTransactions() {
        const startIndex = (app.currentPage - 1) * app.transactionsPerPage;
        const endIndex = startIndex + app.transactionsPerPage;
        const paginatedTransactions = app.transactions.slice(startIndex, endIndex);
        
        if (app.transactions.length === 0) {
            app.table.tbody.innerHTML = `<tr><td colspan="6">No transactions found</td></tr>`;
            updatePaginationUI(0, 0, 0);
            return;
        }
        
        app.table.tbody.innerHTML = paginatedTransactions.map(transaction => {
            const amountClass = transaction.type === 'income' ? 'positive' : 'negative';
            const amountSign = transaction.type === 'income' ? '+' : '-';
            return `
                <tr>
                    <td>${new Date(transaction.date).toLocaleDateString()}</td>
                    <td>${transaction.description || '-'}</td>
                    <td>${transaction.category}</td>
                    <td>${transaction.type}</td>
                    <td class="${amountClass}">${amountSign}$${Math.abs(transaction.amount).toFixed(2)}</td>
                    <td>
                        <button class="actions-btn edit-btn" data-id="${transaction.id}">Edit</button>
                        <button class="actions-btn delete-btn" data-id="${transaction.id}">Delete</button>
                    </td>
                </tr>
            `).join('');
        
        // Add event listeners to action buttons
        document.querySelectorAll('.edit-btn').forEach(button => {
            button.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                const transaction = app.transactions.find(t => t.id === id);
                if (transaction) {
                    openEditTransactionModal(transaction);
                }
            });
        });
        
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                deleteTransaction(id);
            });
        });
        
        updatePaginationUI(startIndex, endIndex, app.transactions.length);
    }

    function updatePaginationUI(startIndex, endIndex, total) {
        const totalPages = Math.ceil(total / app.transactionsPerPage) || 1;
        app.table.pageInfo.textContent = `Page ${app.currentPage} of ${totalPages}`;
        app.table.prevPageBtn.disabled = app.currentPage <= 1;
        app.table.nextPageBtn.disabled = app.currentPage >= totalPages;
    }

    function setupTableNavigation() {
        app.table.prevPageBtn.addEventListener('click', function() {
            if (app.currentPage > 1) {
                app.currentPage--;
                loadTransactions();
            }
        });
        
        app.table.nextPageBtn.addEventListener('click', function() {
            const totalPages = Math.ceil(app.transactions.length / app.transactionsPerPage) || 1;
            if (app.currentPage < totalPages) {
                app.currentPage++;
                loadTransactions();
            }
        });
    }

    // Dashboard data loading
    function loadDashboardData() {
        // Load summary stats
        fetch('/api/transactions/summary/summary')
        .then(response => response.json())
        .then(data => {
            app.stats.totalIncome.textContent = `$${data.totalIncome || 0}`;
            app.stats.totalExpenses.textContent = `$${data.totalExpense || 0}`;
            const balance = (data.totalIncome || 0) - (data.totalExpense || 0);
            app.stats.balance.textContent = `$${balance}`;
            app.stats.balance.className = balance >= 0 ? 'positive' : 'negative';
            app.stats.transactionCount.textContent = data.transactionCount || 0;
        })
        .catch(error => {
            console.error('Error loading summary:', error);
        });

        // Load category data for pie chart
        fetch('/api/transactions/summary/categories')
        .then(response => response.json())
        .then(data => {
            renderCategoryChart(data);
        })
        .catch(error => {
            console.error('Error loading category data:', error);
        });

        // Load monthly data for line chart
        fetch('/api/transactions/summary/monthly')
        .then(response => response.json())
        .then(data => {
            renderMonthlyChart(data);
        })
        .catch(error => {
            console.error('Error loading monthly data:', error);
        });
    }

    // Chart rendering
    function renderCategoryChart(data) {
        const ctx = document.getElementById('expenses-by-category-chart').getContext('2d');
        
        if (app.charts.categoryChart) {
            app.charts.categoryChart.destroy();
        }
        
        app.charts.categoryChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: data.map(item => item.category),
                datasets: [{
                    data: data.map(item => item.total),
                    backgroundColor: [
                        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', 
                        '#9966FF', '#FF9F40', '#FF6384', '#C9CBCF'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.parsed || 0;
                                return `${label}: $${value.toFixed(2)}`;
                            }
                        }
                    }
                }
            }
        });
    }

    function renderMonthlyChart(data) {
        const ctx = document.getElementById('monthly-expenses-chart').getContext('2d');
        
        if (app.charts.monthlyChart) {
            app.charts.monthlyChart.destroy();
        }
        
        app.charts.monthlyChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.map(item => item.month),
                datasets: [{
                    label: 'Monthly Expenses',
                    data: data.map(item => item.total),
                    borderColor: '#36A2EB',
                    backgroundColor: 'rgba(54, 162, 235, 0.1)',
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '$' + value;
                            }
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `$${context.parsed.y.toFixed(2)}`;
                            }
                        }
                    }
                }
            }
        });
    }

    // Upload functionality
    function setupUploadHandlers() {
        app.upload.area.addEventListener('click', function() {
            app.upload.fileInput.click();
        });
        
        app.upload.area.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.classList.add('dragover');
        });
        
        app.upload.area.addEventListener('dragleave', function() {
            this.classList.remove('dragover');
        });
        
        app.upload.area.addEventListener('drop', function(e) {
            e.preventDefault();
            this.classList.remove('dragover');
            
            if (e.dataTransfer.files.length) {
                handleFileUpload(e.dataTransfer.files[0]);
            }
        });
        
        app.upload.fileInput.addEventListener('change', function() {
            if (this.files.length) {
                handleFileUpload(this.files[0]);
            }
        });
        
        app.upload.importBtn.addEventListener('click', importTransactions);
    }

    function handleFileUpload(file) {
        if (!file.name.toLowerCase().endsWith('.csv')) {
            showAlert('Please select a CSV file', 'error');
            return;
        }
        
        // Reset preview
        app.upload.previewTable.innerHTML = '';
        app.upload.importBtn.disabled = true;
        app.upload.previewContainer.style.display = 'none';
        
        // Read CSV file
        const reader = new FileReader();
        reader.onload = function(e) {
            const text = e.target.result;
            const rows = text.split('\n').filter(row => row.trim() !== '');
            
            if (rows.length === 0) {
                showAlert('The CSV file is empty', 'error');
                return;
            }
            
            // Assume first row is header
            const headers = rows[0].split(',').map(h => h.trim());
            const dataRows = rows.slice(1);
            
            // Display preview (first 5 rows)
            const previewRows = dataRows.slice(0, 5);
            app.upload.previewTable.innerHTML = previewRows.map(row => {
                const cells = row.split(',').map(cell => cell.trim());
                // Pad or truncate to 5 columns (date, amount, type, category, description)
                while (cells.length < 5) cells.push('');
                if (cells.length > 5) cells.length = 5;
                
                return `<tr>${cells.map(cell => `<td>${cell}</td>`).join('')}</tr>`;
            }).join('');
            
            // Enable import button if we have data
            if (dataRows.length > 0) {
                app.upload.importBtn.disabled = false;
                app.upload.previewContainer.style.display = 'block';
                
                // Store the file data for import
                app.upload.fileData = {
                    file: file,
                    headers: headers,
                    rows: dataRows
                };
            } else {
                showAlert('No data found in CSV file', 'error');
            }
        };
        
        reader.onerror = function() {
            showAlert('Error reading CSV file', 'error');
        };
        
        reader.readAsText(file);
    }

    function importTransactions() {
        if (!app.upload.fileData) {
            showAlert('No file selected for import', 'error');
            return;
        }
        
        const { headers, rows } = app.upload.fileData;
        
        // Simple validation - check if we have minimum required columns
        if (headers.length < 3) {
            showAlert('CSV file must have at least 3 columns', 'error');
            return;
        }
        
        // Show loading state
        app.upload.importBtn.disabled = true;
        app.upload.importBtn.textContent = 'Importing...';
        
        // Parse and validate transactions
        const transactions = [];
        const errors = [];
        
        rows.forEach((row, index) => {
            try {
                const cells = row.split(',').map(cell => cell.trim());
                
                // Map cells to transaction fields (simple mapping by position)
                // Assuming order: date, amount, type, category, description
                const transaction = {
                    date: cells[0] || '',
                    amount: parseFloat(cells[1]) || 0,
                    type: cells[2]?.toLowerCase() || '',
                    category: cells[3] || 'Other',
                    description: cells[4] || ''
                };
                
                // Basic validation
                if (!transaction.date || isNaN(transaction.amount) || 
                    !transaction.type || (transaction.type !== 'income' && transaction.type !== 'expense')) {
                    errors.push(`Row ${index + 2}: Invalid data`);
                    return;
                }
                
                transactions.push(transaction);
            } catch (err) {
                errors.push(`Row ${index + 2}: ${err.message}`);
            }
        });
        
        if (errors.length > 0) {
            app.upload.importBtn.disabled = false;
            app.upload.importBtn.textContent = 'Import Transactions';
            showAlert(`Validation failed: ${errors.join('; ')}`, 'error');
            return;
        }
        
        if (transactions.length === 0) {
            app.upload.importBtn.disabled = false;
            app.upload.importBtn.textContent = 'Import Transactions';
            showAlert('No valid transactions found in CSV', 'error');
            return;
        }
        
        // Import transactions
        const importPromises = transactions.map(transaction => {
            return fetch('/api/transactions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(transaction)
            });
        });
        
        Promise.all(importPromises)
        .then(responses => Promise.all(responses.map(r => r.json())))
        .then(results => {
            // Check for errors
            const errorResults = results.filter(r => r.error);
            if (errorResults.length > 0) {
                throw new Error(`Import failed: ${errorResults.map(r => r.error).join('; ')}`);
            }
            
            showAlert(`${transactions.length} transactions imported successfully!`, 'success');
            // Reset upload form
            app.upload.fileInput.value = '';
            app.upload.previewTable.innerHTML = '';
            app.upload.importBtn.disabled = true;
            app.upload.previewContainer.style.display = 'none';
            app.upload.fileData = null;
            
            // Refresh data
            loadDashboardData();
            loadTransactions();
        })
        .catch(error => {
            showAlert('Error importing transactions: ' + error.message, 'error');
        })
        .finally(() => {
            app.upload.importBtn.disabled = false;
            app.upload.importBtn.textContent = 'Import Transactions';
        });
    }

    // Utility functions
    function showLoadingState(element, message) {
        element.innerHTML = `<tr><td colspan="6" class="loading">${message}</td></tr>`;
    }

    function showAlert(message, type) {
        // Remove any existing alerts
        const existingAlert = document.querySelector('.alert');
        if (existingAlert) {
            existingAlert.remove();
        }
        
        const alert = document.createElement('div');
        alert.className = `alert alert-${type}`;
        alert.textContent = message;
        
        // Insert alert at the top of main content
        document.querySelector('main').insertBefore(alert, document.querySelector('main').firstChild);
        
        // Remove alert after 5 seconds
        setTimeout(() => {
            if (alert.parentNode) {
                alert.remove();
            }
        }, 5000);
    }
});