import { useState } from 'react'
import './App.css'
import Highlights from './components/Highlights'
import OverviewHero from './components/OverviewHero'
import SpendingByCategoryChart from './components/SpendingByCategoryChart'
import Summary from './components/Summary'
import TransactionForm from './components/TransactionForm'
import TransactionList from './components/TransactionList'
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

  const normalizedTransactions = transactions.map(normalizeTransaction)

  const handleAddTransaction = (transaction) => {
    setTransactions((currentTransactions) => [...currentTransactions, transaction])
  }

  const handleDeleteTransaction = (transactionId) => {
    setTransactions((currentTransactions) => (
      currentTransactions.filter((transaction) => transaction.id !== transactionId)
    ))
  }

  return (
    <main className="app-shell">
      <div className="app-backdrop app-backdrop-left" />
      <div className="app-backdrop app-backdrop-right" />

      <div className="app">
        <OverviewHero transactions={normalizedTransactions} />

        <Summary transactions={normalizedTransactions} />

        <section className="content-grid">
          <div className="left-rail">
            <TransactionForm onAddTransaction={handleAddTransaction} />

            <Highlights transactions={normalizedTransactions} />
          </div>

          <SpendingByCategoryChart transactions={normalizedTransactions} />
        </section>

        <TransactionList
          transactions={normalizedTransactions}
          onDeleteTransaction={handleDeleteTransaction}
        />
      </div>
    </main>
  )
}

export default App
