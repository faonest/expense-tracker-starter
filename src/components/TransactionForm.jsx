import { useState } from 'react'
import { categories } from '../constants/categories'

const TransactionForm = ({ onAddTransaction }) => {
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [type, setType] = useState('expense')
  const [category, setCategory] = useState('food')

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!description || !amount) return

    onAddTransaction({
      id: Date.now(),
      description,
      amount: Number(amount),
      type,
      category,
      date: new Date().toISOString().split('T')[0],
    })

    setDescription('')
    setAmount('')
    setType('expense')
    setCategory('food')
  }

  return (
    <section className="add-transaction">
      <div className="section-heading">
        <div>
          <p className="section-label">Entry</p>
          <h2>Log a new line item</h2>
        </div>
        <p className="section-caption">Capture a new income or expense in a single clean pass.</p>
      </div>

      <form onSubmit={handleSubmit}>
        <label className="field field-wide">
          <span>Description</span>
          <input
            type="text"
            placeholder="Freelance payment"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </label>
        <label className="field">
          <span>Amount</span>
          <input
            type="number"
            placeholder="0"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
          />
        </label>
        <label className="field">
          <span>Type</span>
          <select value={type} onChange={(event) => setType(event.target.value)}>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </label>
        <label className="field">
          <span>Category</span>
          <select value={category} onChange={(event) => setCategory(event.target.value)}>
            {categories.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </label>
        <button type="submit">Add transaction</button>
      </form>
    </section>
  )
}

export default TransactionForm
