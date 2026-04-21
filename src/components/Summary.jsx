import { currencyFormatter } from '../utils/formatters'
import { getTransactionTotals } from '../utils/transactions'

const Summary = ({ transactions }) => {
  const totals = getTransactionTotals(transactions)
  const balance = totals.income - totals.expenses

  const cards = [
    { label: 'Income', value: totals.income, className: 'income-amount', accent: 'summary-income' },
    { label: 'Expenses', value: totals.expenses, className: 'expense-amount', accent: 'summary-expense' },
    { label: 'Balance', value: balance, className: 'balance-amount', accent: 'summary-balance' },
  ]

  return (
    <section className="summary">
      {cards.map((card) => (
        <article key={card.label} className={`summary-card ${card.accent}`}>
          <p className="summary-label">{card.label}</p>
          <p className={card.className}>{currencyFormatter.format(card.value)}</p>
        </article>
      ))}
    </section>
  )
}

export default Summary
