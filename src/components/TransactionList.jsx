import { currencyFormatter, dateFormatter, labelize } from '../utils/formatters'

const TransactionList = ({
  transactions,
  categories,
  filterType,
  filterCategory,
  onFilterTypeChange,
  onFilterCategoryChange,
}) => {
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
        <select value={filterType} onChange={(event) => onFilterTypeChange(event.target.value)}>
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select value={filterCategory} onChange={(event) => onFilterCategoryChange(event.target.value)}>
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
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default TransactionList
