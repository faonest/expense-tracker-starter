import { currencyFormatter } from '../utils/formatters'
import { getTransactionTotals } from '../utils/transactions'

const Summary = ({ transactions }) => {
  const totals = getTransactionTotals(transactions)
  const balance = totals.income - totals.expenses

  const cards = [
    {
      label: 'Income',
      value: totals.income,
      className: 'income-amount',
      accent: 'summary-income',
      detail: 'All tracked inflows for the current period',
    },
    {
      label: 'Expenses',
      value: totals.expenses,
      className: 'expense-amount',
      accent: 'summary-expense',
      detail: 'Operational spend across daily categories',
    },
    {
      label: 'Balance',
      value: balance,
      className: 'balance-amount',
      accent: 'summary-balance',
      detail: balance >= 0 ? 'Positive spread after expenses' : 'Spending is outpacing income',
    },
  ]

  return (
    <section className="summary">
      {cards.map((card) => (
        <article key={card.label} className={`summary-card ${card.accent}`}>
          <div className="summary-topline">
            <p className="summary-label">{card.label}</p>
            <span className="summary-rule" />
          </div>
          <p className={card.className}>{currencyFormatter.format(card.value)}</p>
          <p className="summary-detail">{card.detail}</p>
        </article>
      ))}
    </section>
  )
}

export default Summary
