document.addEventListener('DOMContentLoaded', () => {
    const transactionForm = document.getElementById('transactionForm');
    const uploadForm = document.getElementById('uploadForm');
    const transactionsBody = document.getElementById('transactionsBody');
    const uploadResult = document.getElementById('uploadResult');
    const expenseByCategoryCtx = document.getElementById('expenseByCategoryChart').getContext('2d');
    const incomeVsExpenseCtx = document.getElementById('incomeVsExpenseChart').getContext('2d');

    let expenseByCategoryChart;
    let incomeVsExpenseChart;

    // Fetch and display transactions
    async function fetchTransactions() {
        try {
            const response = await fetch('/transactions');
            if (!response.ok) throw new Error('Failed to fetch transactions');
            return await response.json();
        } catch (error) {
            console.error('Error fetching transactions:', error);
            return [];
        }
    }

    function renderTransactionsTable(transactions) {
        transactionsBody.innerHTML = '';
        if (transactions.length === 0) {
            const row = document.createElement('tr');
            row.innerHTML = '<td colspan="6">No transactions found</td>';
            transactionsBody.appendChild(row);
            return;
        }
        transactions.forEach(tx => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${tx.date}</td>
                <td>${tx.description}</td>
                <td>${tx.amount.toFixed(2)}</td>
                <td>${tx.category}</td>
                <td>${tx.type === 'income' ? '<span style="color:green;">Income</span>' : '<span style="color:red;">Expense</span>'}</td>
                <td>
                    <button class="actions-btn" onclick="deleteTransaction('${tx.id}')">Delete</button>
                    <button class="actions-btn" onclick="editTransaction('${tx.id}')">Edit</button>
                </td>
            `;
            transactionsBody.appendChild(row);
        });
    }

    // Add transaction
    transactionForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(transactionForm);
        const transaction = Object.fromEntries(formData);
        transaction.amount = parseFloat(transaction.amount);

        try {
            const response = await fetch('/transactions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(transaction)
            });
            if (!response.ok) throw new Error('Failed to add transaction');
            const newTx = await response.json();
            transactionForm.reset();
            await loadTransactions();
        } catch (error) {
            console.error('Error adding transaction:', error);
            alert('Failed to add transaction');
        }
    });

    // Upload CSV
    uploadForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(uploadForm);

        try {
            const response = await fetch('/upload', {
                method: 'POST',
                body: formData
            });
            if (!response.ok) throw new Error('Failed to upload CSV');
            const result = await response.json();
            uploadResult.innerHTML = `<p style="color:green;">${result.message}</p>`;
            uploadForm.reset();
            await loadTransactions();
        } catch (error) {
            console.error('Error uploading CSV:', error);
            uploadResult.innerHTML = `<p style="color:red;">Failed to upload CSV</p>`;
        }
    });

    // Delete transaction
    window.deleteTransaction = async (id) => {
        if (!confirm('Are you sure you want to delete this transaction?')) return;
        try {
            const response = await fetch(`/transactions/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error('Failed to delete transaction');
            await loadTransactions();
        } catch (error) {
            console.error('Error deleting transaction:', error);
            alert('Failed to delete transaction');
        }
    };

    // Edit transaction (placeholder for future enhancement)
    window.editTransaction = async (id) => {
        alert('Edit functionality not implemented yet. You can delete and re-add.');
    };

    // Load transactions and update UI
    async function loadTransactions() {
        const transactions = await fetchTransactions();
        renderTransactionsTable(transactions);
        updateCharts(transactions);
    }

    // Charts
    function updateCharts(transactions) {
        // Prepare data for expense by category chart
        const expenseByCategory = {};
        const incomeVsExpense = { income: 0, expense: 0 };

        transactions.forEach(tx => {
            if (tx.type === 'expense') {
                expenseByCategory[tx.category] = (expenseByCategory[tx.category] || 0) + tx.amount;
                incomeVsExpense.expense += tx.amount;
            } else if (tx.type === 'income') {
                incomeVsExpense.income += tx.amount;
            }
        });

        // Destroy existing charts if they exist
        if (expenseByCategoryChart) expenseByCategoryChart.destroy();
        if (incomeVsExpenseChart) incomeVsExpenseChart.destroy();

        // Expense by category pie chart
        expenseByCategoryChart = new Chart(expenseByCategoryCtx, {
            type: 'pie',
            data: {
                labels: Object.keys(expenseByCategory),
                datasets: [{
                    label: 'Expenses by Category',
                    data: Object.values(expenseByCategory),
                    backgroundColor: [
                        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
                        '#9966FF', '#FF9F40', '#FF6384', '#C9CBCF'
                    ]
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top'
                    },
                    title: {
                        display: true,
                        text: 'Expenses by Category'
                    }
                }
            }
        });

        // Income vs Expense bar chart
        incomeVsExpenseChart = new Chart(incomeVsExpenseCtx, {
            type: 'bar',
            data: {
                labels: ['Income', 'Expense'],
                datasets: [{
                    label: 'Amount ($)',
                    data: [incomeVsExpense.income, incomeVsExpense.expense],
                    backgroundColor: ['#2ecc71', '#e74c3c']
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: 'Income vs Expense'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    // Initial load
    loadTransactions();
});
