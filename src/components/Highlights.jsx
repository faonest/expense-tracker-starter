import { currencyFormatter, labelize } from '../utils/formatters'

function Highlights({ transactions }) {
  return (
    <section className="highlights-card">
      <div className="section-heading">
        <div>
          <p className="section-label">Highlights</p>
          <h2>Recent activity</h2>
        </div>
      </div>

      <div className="highlight-list">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="highlight-item">
            <div>
              <p className="highlight-title">{transaction.description}</p>
              <p className="highlight-meta">
                {labelize(transaction.category)} • {transaction.date}
              </p>
            </div>
            <strong className={transaction.type === 'income' ? 'income-amount' : 'expense-amount'}>
              {transaction.type === 'income' ? '+' : '-'}
              {currencyFormatter.format(transaction.amount)}
            </strong>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Highlights
