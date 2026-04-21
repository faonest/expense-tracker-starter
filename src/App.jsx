import { useState } from 'react'
import './App.css'
import { categories } from './constants/categories'
import Highlights from './components/Highlights'
import SpendingByCategoryChart from './components/SpendingByCategoryChart'
import Summary from './components/Summary'
import TransactionForm from './components/TransactionForm'
import TransactionList from './components/TransactionList'
import { currencyFormatter, labelize } from './utils/formatters'
import { normalizeTransaction } from './utils/transactions'

const App = () => {
  const [transactions, setTransactions] = useState([
    { id: 1, description: 'Salary', amount: 5000, type: 'income', category: 'salary', date: '2025-01-01' },
    { id: 2, description: 'Rent', amount: 1200, type: 'expense', category: 'housing', date: '2025-01-02' },
    { id: 3, description: 'Groceries', amount: 150, type: 'expense', category: 'food', date: '2025-01-03' },
    { id: 4, description: 'Freelance Work', amount: 800, type: 'income', category: 'salary', date: '2025-01-05' },
    { id: 5, description: 'Electric Bill', amount: 95, type: 'expense', category: 'utilities', date: '2025-01-06' },
    { id: 6, description: 'Dinner Out', amount: 65, type: 'expense', category: 'food', date: '2025-01-07' },
    { id: 7, description: 'Gas', amount: 45, type: 'expense', category: 'transport', date: '2025-01-08' },
    { id: 8, description: 'Netflix', amount: 15, type: 'expense', category: 'entertainment', date: '2025-01-10' },
  ])

  const [filterType, setFilterType] = useState('all')
  const [filterCategory, setFilterCategory] = useState('all')

  const normalizedTransactions = transactions.map(normalizeTransaction)

  const totals = normalizedTransactions.reduce((summary, transaction) => {
    if (transaction.type === 'income') {
      summary.income += transaction.amount
    }

    if (transaction.type === 'expense') {
      summary.expenses += transaction.amount
    }

    return summary
  }, { income: 0, expenses: 0 })

  const totalIncome = totals.income
  const totalExpenses = totals.expenses
  const balance = totalIncome - totalExpenses

  const spendingByCategory = normalizedTransactions
    .filter((transaction) => transaction.type === 'expense')
    .reduce((totalsByCategory, transaction) => {
      const existingCategory = totalsByCategory.find((item) => item.name === transaction.category)

      if (existingCategory) {
        existingCategory.value += transaction.amount
      } else {
        totalsByCategory.push({ name: transaction.category, value: transaction.amount })
      }

      return totalsByCategory
    }, [])
    .sort((left, right) => right.value - left.value)

  let filteredTransactions = normalizedTransactions
  if (filterType !== 'all') {
    filteredTransactions = filteredTransactions.filter((transaction) => transaction.type === filterType)
  }
  if (filterCategory !== 'all') {
    filteredTransactions = filteredTransactions.filter((transaction) => transaction.category === filterCategory)
  }

  const recentTransactions = [...normalizedTransactions]
    .sort((left, right) => new Date(right.date) - new Date(left.date))
    .slice(0, 3)

  const largestExpense = spendingByCategory[0]
  const savingsRate = totalIncome > 0 ? Math.round((balance / totalIncome) * 100) : 0

  const handleAddTransaction = (transaction) => {
    setTransactions([...transactions, transaction])
  }

  return (
    <main className="app-shell">
      <div className="app-backdrop app-backdrop-left" />
      <div className="app-backdrop app-backdrop-right" />

      <div className="app">
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

        <Summary transactions={normalizedTransactions} />

        <section className="content-grid">
          <div className="left-rail">
            <TransactionForm
              categories={categories}
              onAddTransaction={handleAddTransaction}
            />

            <Highlights transactions={recentTransactions} />
          </div>

          <SpendingByCategoryChart
            data={spendingByCategory}
            totalExpenses={totalExpenses}
          />
        </section>

        <TransactionList
          transactions={filteredTransactions}
          categories={categories}
          filterType={filterType}
          filterCategory={filterCategory}
          onFilterTypeChange={setFilterType}
          onFilterCategoryChange={setFilterCategory}
        />
      </div>
    </main>
  )
}

export default App
