import { useState } from 'react'
import Swal from 'sweetalert2'
import { categories } from '../constants/categories'
import { currencyFormatter, dateFormatter, labelize } from '../utils/formatters'

const TransactionList = ({ transactions, onDeleteTransaction }) => {
  const [filterType, setFilterType] = useState('all')
  const [filterCategory, setFilterCategory] = useState('all')

  const handleDeleteClick = async (transaction) => {
    const result = await Swal.fire({
      title: 'Delete transaction?',
      text: `${transaction.description} will be removed from your tracker.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
      buttonsStyling: false,
      customClass: {
        popup: 'ledger-modal',
        title: 'ledger-modal-title',
        htmlContainer: 'ledger-modal-copy',
        confirmButton: 'ledger-modal-confirm',
        cancelButton: 'ledger-modal-cancel',
        actions: 'ledger-modal-actions',
        icon: 'ledger-modal-icon',
      },
    })

    if (result.isConfirmed) {
      onDeleteTransaction(transaction.id)
    }
  }

  let filteredTransactions = transactions
  if (filterType !== 'all') {
    filteredTransactions = filteredTransactions.filter((transaction) => transaction.type === filterType)
  }
  if (filterCategory !== 'all') {
    filteredTransactions = filteredTransactions.filter((transaction) => transaction.category === filterCategory)
  }

  return (
    <section className="transactions">
      <div className="section-heading">
        <div>
          <p className="section-label">Ledger</p>
          <h2>Transactions</h2>
        </div>
        <p className="section-caption">Filter the full activity feed by type or category.</p>
      </div>

      <div className="filters">
        <select value={filterType} onChange={(event) => setFilterType(event.target.value)}>
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select value={filterCategory} onChange={(event) => setFilterCategory(event.target.value)}>
          <option value="all">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>{labelize(category)}</option>
          ))}
        </select>
      </div>

      <div className="table-shell">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{dateFormatter.format(new Date(transaction.date))}</td>
                <td className="transaction-description">{transaction.description}</td>
                <td>
                  <span className="category-pill">{labelize(transaction.category)}</span>
                </td>
                <td>
                  <span className={`type-pill ${transaction.type}`}>{labelize(transaction.type)}</span>
                </td>
                <td className={transaction.type === 'income' ? 'income-amount' : 'expense-amount'}>
                  {transaction.type === 'income' ? '+' : '-'}
                  {currencyFormatter.format(transaction.amount)}
                </td>
                <td>
                  <button
                    type="button"
                    className="row-action-btn"
                    onClick={() => handleDeleteClick(transaction)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default TransactionList
