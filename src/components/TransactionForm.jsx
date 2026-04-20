function TransactionForm({
  description,
  amount,
  type,
  category,
  categories,
  onDescriptionChange,
  onAmountChange,
  onTypeChange,
  onCategoryChange,
  onSubmit,
}) {
  return (
    <section className="add-transaction">
      <div className="section-heading">
        <div>
          <p className="section-label">Entry</p>
          <h2>Add transaction</h2>
        </div>
        <p className="section-caption">Capture a new income or expense in one pass.</p>
      </div>

      <form onSubmit={onSubmit}>
        <label className="field field-wide">
          <span>Description</span>
          <input
            type="text"
            placeholder="Freelance payment"
            value={description}
            onChange={(event) => onDescriptionChange(event.target.value)}
          />
        </label>
        <label className="field">
          <span>Amount</span>
          <input
            type="number"
            placeholder="0"
            value={amount}
            onChange={(event) => onAmountChange(event.target.value)}
          />
        </label>
        <label className="field">
          <span>Type</span>
          <select value={type} onChange={(event) => onTypeChange(event.target.value)}>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </label>
        <label className="field">
          <span>Category</span>
          <select value={category} onChange={(event) => onCategoryChange(event.target.value)}>
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
