import { currencyFormatter, labelize } from '../utils/formatters'
import { getSpendingByCategory, getTransactionTotals } from '../utils/transactions'

const OverviewHero = ({ transactions }) => {
  const totals = getTransactionTotals(transactions)
  const balance = totals.income - totals.expenses
  const spendingByCategory = getSpendingByCategory(transactions)
  const largestExpense = spendingByCategory[0]
  const savingsRate = totals.income > 0 ? Math.round((balance / totals.income) * 100) : 0

  return (
    <section className="hero-card">
      <div className="hero-copy">
        <p className="eyebrow">Personal finance overview</p>
        <h1>Finance Tracker</h1>
        <p className="subtitle">
          A cleaner view of income, spending, and where your money is going this month.
        </p>
      </div>

      <div className="hero-panel">
        <p className="hero-panel-label">Current balance</p>
        <p className="hero-balance">{currencyFormatter.format(balance)}</p>
        <div className="hero-insights">
          <div className="hero-insight">
            <span>Savings rate</span>
            <strong>{savingsRate}%</strong>
          </div>
          <div className="hero-insight">
            <span>Largest category</span>
            <strong>{largestExpense ? labelize(largestExpense.name) : 'None'}</strong>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OverviewHero
