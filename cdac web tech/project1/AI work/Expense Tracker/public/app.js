// ═══════════════════════════════════════════════════════════
// app.js — Expense Tracker Frontend Application
// ═══════════════════════════════════════════════════════════
// This single file handles ALL frontend behavior:
//   1. Fetching data from the Express API
//   2. Rendering transactions in table/list/graph views
//   3. The add/edit form and delete confirmation
//   4. Dashboard summary cards and charts
//   5. Search and filter functionality
// ═══════════════════════════════════════════════════════════

// ── Application State ─────────────────────────────────────
// These variables hold the current state of the UI.
let transactions   = [];      // All transactions from the API
let editingId      = null;    // ID of transaction being edited (null = adding)
let currentView    = 'tabular'; // 'tabular' | 'listed' | 'graph'
let spendingChart  = null;    // Chart.js instance (line chart)
let categoryChart  = null;    // Chart.js instance (doughnut chart)
let graphViewChart = null;    // Chart.js instance (bar chart in graph view)

// ── Constants ─────────────────────────────────────────────
const API = '/api';

// Maps category names → CSS class suffix for colored badges
const CATEGORY_CLASSES = {
    'Food & drinks':  'cat-food',
    'Transport':      'cat-transport',
    'Shopping':       'cat-shopping',
    'Rent & bills':   'cat-rent',
    'Entertainment':  'cat-entertainment',
    'Subscriptions':  'cat-subscriptions',
    'Healthcare':     'cat-healthcare',
    'Education':      'cat-education',
    'Groceries':      'cat-groceries',
    'Salary':         'cat-salary',
    'Freelance':      'cat-freelance',
    'Investment':     'cat-investment',
    'Other':          'cat-other'
};

// Emoji icons per category (for listed view)
const CATEGORY_ICONS = {
    'Food & drinks': '🍕', 'Transport': '🚗', 'Shopping': '🛍️',
    'Rent & bills': '🏠', 'Entertainment': '🎬', 'Subscriptions': '📱',
    'Healthcare': '🏥', 'Education': '📚', 'Groceries': '🥬',
    'Salary': '💰', 'Freelance': '💼', 'Investment': '📈', 'Other': '📦'
};

// Colors for chart segments
const CHART_COLORS = [
    '#5a6b2f', '#8b6914', '#2b6ca3', '#6b3fa0', '#a34e2b',
    '#a32b7a', '#2ba37a', '#8b8b14', '#2b2ba3', '#4a7a2b',
    '#c0392b', '#e67e22'
];


// ═══════════════════════════════════════════════════════════
// INITIALIZATION — runs when the page finishes loading
// ═══════════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', init);

function init() {
    setDefaultDate();
    setupEventListeners();
    updateMonthBadge();
    loadDashboard();
    loadTransactions();
}

// Set the date input to today's date by default
function setDefaultDate() {
    const today = new Date().toISOString().split('T')[0]; // "2026-10-20"
    document.getElementById('transactionDate').value = today;
}

// Update the month badge in the header
function updateMonthBadge() {
    const now = new Date();
    const month = now.toLocaleString('en-IN', { month: 'long', year: 'numeric' });
    document.getElementById('currentMonth').textContent = '📅 ' + month;
}


// ═══════════════════════════════════════════════════════════
// EVENT LISTENERS
// ═══════════════════════════════════════════════════════════
function setupEventListeners() {
    // Form submit (add or edit)
    document.getElementById('transactionForm').addEventListener('submit', handleFormSubmit);

    // Search input (filter as you type)
    document.getElementById('searchInput').addEventListener('input', renderTransactions);

    // Category filter dropdown
    document.getElementById('categoryFilter').addEventListener('change', renderTransactions);

    // Type filter dropdown
    document.getElementById('typeFilter').addEventListener('change', renderTransactions);

    // View toggle buttons (Graph / Tabular / Listed)
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentView = btn.dataset.view;
            renderTransactions();
        });
    });

    // Sidebar navigation — view shortcuts
    document.querySelectorAll('.nav-sub .nav-link[data-view]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const view = link.dataset.view;
            currentView = view;
            // Update toggle buttons
            document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
            const matchBtn = document.querySelector(`.view-btn[data-view="${view}"]`);
            if (matchBtn) matchBtn.classList.add('active');
            renderTransactions();
            // Scroll to history section
            document.querySelector('.history-section').scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Sidebar main nav links
    document.querySelectorAll('.nav-link[data-section]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            if (link.classList.contains('disabled')) return;
            // Update active state
            document.querySelectorAll('.nav-link[data-section]').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            const section = link.dataset.section;
            if (section === 'history') {
                document.querySelector('.history-section').scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}


// ═══════════════════════════════════════════════════════════
// API FUNCTIONS — Talk to the Express backend
// ═══════════════════════════════════════════════════════════

// Fetch all transactions from the database
async function fetchTransactions() {
    const res = await fetch(`${API}/transactions`);
    const data = await res.json();
    if (!data.success) throw new Error(data.message || 'Failed to fetch');
    return data.data;
}

// Create a new transaction
async function createTransaction(txn) {
    const res = await fetch(`${API}/transactions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(txn)
    });
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.errors ? data.errors.join(', ') : data.message);
    }
    return data.data;
}

// Update an existing transaction
async function updateTransaction(id, txn) {
    const res = await fetch(`${API}/transactions/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(txn)
    });
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.errors ? data.errors.join(', ') : data.message);
    }
    return data.data;
}

// Delete a transaction
async function deleteTransactionAPI(id) {
    const res = await fetch(`${API}/transactions/${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return data;
}

// Fetch dashboard summary from the server
async function fetchDashboard() {
    const res = await fetch(`${API}/dashboard`);
    const data = await res.json();
    if (!data.success) throw new Error(data.message);
    return data.data;
}


// ═══════════════════════════════════════════════════════════
// DATA LOADING
// ═══════════════════════════════════════════════════════════

async function loadTransactions() {
    try {
        transactions = await fetchTransactions();
        renderTransactions();
    } catch (error) {
        showToast('Failed to load transactions: ' + error.message, 'error');
    }
}

async function loadDashboard() {
    try {
        const data = await fetchDashboard();
        renderDashboardCards(data);
        renderCharts(data);
    } catch (error) {
        console.error('Dashboard error:', error);
    }
}


// ═══════════════════════════════════════════════════════════
// FORM HANDLING — Add / Edit transactions
// ═══════════════════════════════════════════════════════════

async function handleFormSubmit(e) {
    e.preventDefault();

    // Gather form values
    const txn = {
        title:            document.getElementById('title').value.trim(),
        amount:           parseFloat(document.getElementById('amount').value),
        type:             document.getElementById('type').value,
        category:         document.getElementById('category').value,
        payment_method:   document.getElementById('paymentMethod').value,
        transaction_date: document.getElementById('transactionDate').value
    };

    // Basic frontend validation
    if (!txn.title) return showToast('Please enter a title', 'error');
    if (!txn.amount || txn.amount <= 0) return showToast('Please enter a valid amount', 'error');
    if (!txn.transaction_date) return showToast('Please select a date', 'error');

    try {
        if (editingId) {
            // UPDATE existing transaction
            await updateTransaction(editingId, txn);
            showToast('Transaction updated! ✏️', 'success');
            cancelEdit();
        } else {
            // CREATE new transaction
            await createTransaction(txn);
            showToast('Transaction added! 🎉', 'success');
        }

        // Reset form and reload data
        document.getElementById('transactionForm').reset();
        setDefaultDate();
        await loadTransactions();
        await loadDashboard();
    } catch (error) {
        showToast(error.message, 'error');
    }
}

// Populate the form for editing an existing transaction
function startEdit(id) {
    const txn = transactions.find(t => t.id === id);
    if (!txn) return;

    editingId = id;

    document.getElementById('editId').value        = id;
    document.getElementById('title').value          = txn.title;
    document.getElementById('amount').value         = txn.amount;
    document.getElementById('type').value           = txn.type;
    document.getElementById('category').value       = txn.category;
    document.getElementById('paymentMethod').value  = txn.payment_method;

    // Format date for the input (YYYY-MM-DD)
    const d = new Date(txn.transaction_date);
    document.getElementById('transactionDate').value = d.toISOString().split('T')[0];

    // Update UI to show "editing" state
    document.getElementById('formTitle').textContent = 'Editing transaction...';
    const btn = document.getElementById('submitBtn');
    btn.textContent = '✏️ Update expense';
    btn.classList.add('editing');
    document.getElementById('cancelEditBtn').style.display = 'inline-block';

    // Scroll to the form
    document.querySelector('.add-expense-section').scrollIntoView({ behavior: 'smooth' });
}

// Cancel editing and reset the form
function cancelEdit() {
    editingId = null;
    document.getElementById('editId').value = '';
    document.getElementById('transactionForm').reset();
    setDefaultDate();
    document.getElementById('formTitle').textContent = "What's your expense today?";
    const btn = document.getElementById('submitBtn');
    btn.textContent = '+ Add expense';
    btn.classList.remove('editing');
    document.getElementById('cancelEditBtn').style.display = 'none';
}
// Make cancelEdit available globally for onclick
window.cancelEdit = cancelEdit;


// ═══════════════════════════════════════════════════════════
// DELETE — with confirmation modal
// ═══════════════════════════════════════════════════════════

let pendingDeleteId = null;

function confirmDelete(id) {
    pendingDeleteId = id;
    document.getElementById('deleteModal').style.display = 'flex';
    document.getElementById('confirmDeleteBtn').onclick = async () => {
        try {
            await deleteTransactionAPI(pendingDeleteId);
            showToast('Transaction deleted 🗑️', 'success');
            closeDeleteModal();
            await loadTransactions();
            await loadDashboard();
        } catch (error) {
            showToast(error.message, 'error');
        }
    };
}

function closeDeleteModal() {
    pendingDeleteId = null;
    document.getElementById('deleteModal').style.display = 'none';
}
window.closeDeleteModal = closeDeleteModal;


// ═══════════════════════════════════════════════════════════
// RENDERING — Display transactions based on current view
// ═══════════════════════════════════════════════════════════

function getFilteredTransactions() {
    const search   = document.getElementById('searchInput').value.toLowerCase().trim();
    const catFilter  = document.getElementById('categoryFilter').value;
    const typeFilter = document.getElementById('typeFilter').value;

    return transactions.filter(txn => {
        const matchSearch = !search ||
            txn.title.toLowerCase().includes(search) ||
            txn.category.toLowerCase().includes(search) ||
            txn.payment_method.toLowerCase().includes(search);
        const matchCat  = catFilter === 'all' || txn.category === catFilter;
        const matchType = typeFilter === 'all' || txn.type === typeFilter;
        return matchSearch && matchCat && matchType;
    });
}

function renderTransactions() {
    const filtered = getFilteredTransactions();
    const container = document.getElementById('transactionsContainer');

    // Update count badge
    document.getElementById('historyCount').textContent = `${filtered.length} transaction${filtered.length !== 1 ? 's' : ''}`;

    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">📭</div>
                <h3>No transactions found</h3>
                <p>Add your first expense using the form above!</p>
            </div>`;
        return;
    }

    switch (currentView) {
        case 'tabular': renderTableView(filtered, container); break;
        case 'listed':  renderListView(filtered, container);  break;
        case 'graph':   renderGraphView(filtered, container);  break;
    }
}

// ── Tabular View ──────────────────────────────────
function renderTableView(data, container) {
    let html = `
    <table class="txn-table">
        <thead>
            <tr>
                <th>Expense</th>
                <th>Date</th>
                <th>Category</th>
                <th>Payment method</th>
                <th style="text-align:right">Amount</th>
                <th style="text-align:center">Actions</th>
            </tr>
        </thead>
        <tbody>`;

    data.forEach(txn => {
        const catClass = CATEGORY_CLASSES[txn.category] || 'cat-other';
        const amtClass = txn.type === 'expense' ? 'expense' : 'income';
        const amtSign  = txn.type === 'expense' ? '-' : '+';

        html += `
        <tr>
            <td>
                <div class="txn-title-cell">
                    <span class="txn-title">${escHtml(txn.title)}</span>
                    <span class="txn-subtitle">${txn.type === 'income' ? 'Income' : 'Expense'}</span>
                </div>
            </td>
            <td class="txn-date">${formatDate(txn.transaction_date)}</td>
            <td><span class="category-badge ${catClass}">${escHtml(txn.category)}</span></td>
            <td class="txn-payment">${escHtml(txn.payment_method)}</td>
            <td class="txn-amount ${amtClass}">${amtSign}₹${formatNum(txn.amount)}</td>
            <td class="txn-actions">
                <button class="btn-icon" onclick="startEdit(${txn.id})" title="Edit">✏️</button>
                <button class="btn-icon delete" onclick="confirmDelete(${txn.id})" title="Delete">🗑️</button>
            </td>
        </tr>`;
    });

    html += '</tbody></table>';
    container.innerHTML = html;
}

// ── Listed View ───────────────────────────────────
function renderListView(data, container) {
    let html = '<div class="txn-list">';

    data.forEach(txn => {
        const icon     = CATEGORY_ICONS[txn.category] || '📦';
        const catClass = CATEGORY_CLASSES[txn.category] || 'cat-other';
        const amtClass = txn.type === 'expense' ? 'expense' : 'income';
        const amtSign  = txn.type === 'expense' ? '-' : '+';

        html += `
        <div class="txn-list-item">
            <div class="txn-list-left">
                <div class="txn-list-icon category-badge ${catClass}">${icon}</div>
                <div class="txn-list-info">
                    <span class="txn-list-title">${escHtml(txn.title)}</span>
                    <span class="txn-list-meta">${formatDate(txn.transaction_date)} · ${escHtml(txn.category)} · ${escHtml(txn.payment_method)}</span>
                </div>
            </div>
            <div class="txn-list-right">
                <span class="txn-list-amount ${amtClass}">${amtSign}₹${formatNum(txn.amount)}</span>
                <button class="btn-icon" onclick="startEdit(${txn.id})" title="Edit">✏️</button>
                <button class="btn-icon delete" onclick="confirmDelete(${txn.id})" title="Delete">🗑️</button>
            </div>
        </div>`;
    });

    html += '</div>';
    container.innerHTML = html;
}

// ── Graph View ────────────────────────────────────
function renderGraphView(data, container) {
    // Build a bar chart showing category totals
    container.innerHTML = `
        <div class="graph-view-container">
            <div class="chart-container">
                <canvas id="graphViewCanvas"></canvas>
            </div>
        </div>`;

    // Aggregate by category
    const catTotals = {};
    data.forEach(txn => {
        if (txn.type === 'expense') {
            catTotals[txn.category] = (catTotals[txn.category] || 0) + Number(txn.amount);
        }
    });

    const labels = Object.keys(catTotals);
    const values = Object.values(catTotals);

    // Destroy old chart instance if exists
    if (graphViewChart) graphViewChart.destroy();

    const ctx = document.getElementById('graphViewCanvas');
    if (!ctx) return;

    graphViewChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Spending by Category (₹)',
                data: values,
                backgroundColor: CHART_COLORS.slice(0, labels.length),
                borderRadius: 6,
                borderSkipped: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: ctx => '₹' + formatNum(ctx.raw)
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: val => '₹' + formatNum(val)
                    }
                }
            }
        }
    });
}


// ═══════════════════════════════════════════════════════════
// DASHBOARD — Summary cards and charts
// ═══════════════════════════════════════════════════════════

function renderDashboardCards(data) {
    document.getElementById('totalExpense').textContent  = '₹' + formatNum(data.totalExpense);
    document.getElementById('totalIncome').textContent   = '₹' + formatNum(data.totalIncome);
    document.getElementById('dailyAverage').textContent  = '₹' + formatNum(data.dailyAverage);

    document.getElementById('expenseSub').textContent = `Current month expenses`;
    document.getElementById('balanceSub').textContent = `Balance: ₹${formatNum(data.balance)}`;
    document.getElementById('avgSub').textContent     = `Across ${data.transactionCount} transactions`;
}

function renderCharts(data) {
    renderSpendingChart(data.dailySpending);
    renderCategoryChart(data.categoryBreakdown);
}

// ── Line chart: spending over time ────────────────
function renderSpendingChart(dailyData) {
    if (spendingChart) spendingChart.destroy();

    const ctx = document.getElementById('spendingChart');
    if (!ctx) return;

    // If no data, show empty
    if (!dailyData || dailyData.length === 0) {
        spendingChart = new Chart(ctx, {
            type: 'line',
            data: { labels: ['No data yet'], datasets: [{ data: [0] }] },
            options: { responsive: true, maintainAspectRatio: false }
        });
        return;
    }

    // Build cumulative spending
    const labels = dailyData.map(d => {
        const date = new Date(d.date);
        return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
    });
    let cumulative = 0;
    const cumulativeData = dailyData.map(d => {
        cumulative += d.total;
        return cumulative;
    });

    spendingChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Cumulative Spending',
                data: cumulativeData,
                borderColor: '#5a6b2f',
                backgroundColor: 'rgba(90, 107, 47, 0.08)',
                fill: true,
                tension: 0.3,
                pointRadius: 3,
                pointBackgroundColor: '#5a6b2f',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: ctx => '₹' + formatNum(ctx.raw)
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: val => '₹' + formatNum(val)
                    }
                },
                x: {
                    ticks: { maxTicksLimit: 10 }
                }
            }
        }
    });
}

// ── Doughnut chart: category breakdown ────────────
function renderCategoryChart(categories) {
    if (categoryChart) categoryChart.destroy();

    const ctx = document.getElementById('categoryChart');
    if (!ctx) return;

    const legend = document.getElementById('categoryLegend');

    if (!categories || categories.length === 0) {
        categoryChart = new Chart(ctx, {
            type: 'doughnut',
            data: { labels: ['No expenses'], datasets: [{ data: [1], backgroundColor: ['#e8e5dd'] }] },
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
        });
        legend.innerHTML = '<p style="color:#999;font-size:13px;">No expense data this month</p>';
        return;
    }

    const totalExp = categories.reduce((sum, c) => sum + c.total, 0);

    categoryChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: categories.map(c => c.category),
            datasets: [{
                data: categories.map(c => c.total),
                backgroundColor: CHART_COLORS.slice(0, categories.length),
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '65%',
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: ctx => `${ctx.label}: ₹${formatNum(ctx.raw)}`
                    }
                }
            }
        }
    });

    // Custom legend below the doughnut
    legend.innerHTML = categories.map((c, i) => {
        const pct = totalExp > 0 ? Math.round((c.total / totalExp) * 100) : 0;
        return `
        <div class="legend-item">
            <div class="legend-left">
                <span class="legend-dot" style="background:${CHART_COLORS[i % CHART_COLORS.length]}"></span>
                <span>${escHtml(c.category)}</span>
            </div>
            <div>
                <span class="legend-amount">₹${formatNum(c.total)}</span>
                <span class="legend-percent">${pct}%</span>
            </div>
        </div>`;
    }).join('');
}


// ═══════════════════════════════════════════════════════════
// UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════

// Format number with Indian locale: 12345.5 → "12,345.50"
function formatNum(n) {
    return Number(n).toLocaleString('en-IN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

// Format date: "2026-10-09" → "09 Oct 2026"
function formatDate(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

// Escape HTML to prevent XSS
function escHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

// Show a toast notification
function showToast(message, type = '') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = 'toast show ' + type;
    setTimeout(() => { toast.className = 'toast'; }, 3000);
}

// Placeholder for CSV export
function exportPlaceholder() {
    showToast('CSV export is coming soon! 📄', '');
}
window.exportPlaceholder = exportPlaceholder;

// Make functions available globally (called from onclick in HTML)
window.startEdit     = startEdit;
window.confirmDelete = confirmDelete;
