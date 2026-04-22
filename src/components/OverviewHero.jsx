import { currencyFormatter, labelize } from '../utils/formatters'
import { getSpendingByCategory, getTransactionTotals } from '../utils/transactions'

const OverviewHero = ({ transactions }) => {
  const totals = getTransactionTotals(transactions)
  const balance = totals.income - totals.expenses
  const spendingByCategory = getSpendingByCategory(transactions)
  const largestExpense = spendingByCategory[0]
  const savingsRate = totals.income > 0 ? Math.round((balance / totals.income) * 100) : 0
  const transactionCount = transactions.length

  return (
    <section className="hero-card">
      <div className="hero-copy">
        <div className="hero-kicker-row">
          <p className="eyebrow">Personal finance overview</p>
          <p className="hero-edition">April briefing</p>
        </div>
        <h1>Cash flow, framed like a weekly briefing.</h1>
        <p className="subtitle">
          Track income, pressure-test spending, and read the month at a glance through a calmer,
          sharper layout built for daily decisions.
        </p>
        <div className="hero-tags" aria-label="Key metrics">
          <span>{transactionCount} entries logged</span>
          <span>{currencyFormatter.format(totals.income)} incoming</span>
          <span>{currencyFormatter.format(totals.expenses)} outgoing</span>
        </div>
      </div>

      <div className="hero-panel">
        <div className="hero-panel-header">
          <p className="hero-panel-label">Net position</p>
          <span className="hero-panel-stamp">{balance >= 0 ? 'In surplus' : 'Under pressure'}</span>
        </div>
        <p className="hero-balance">{currencyFormatter.format(balance)}</p>
        <p className="hero-panel-note">
          The current run rate leaves {savingsRate}% of tracked income unspent.
        </p>
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
