export function normalizeTransaction(transaction) {
  const parsedAmount = Number(transaction.amount)
  const normalizedType = typeof transaction.type === 'string' ? transaction.type.trim().toLowerCase() : ''
  const normalizedCategory = typeof transaction.category === 'string'
    ? transaction.category.trim().toLowerCase()
    : ''

  return {
    ...transaction,
    amount: Number.isFinite(parsedAmount) ? Math.abs(parsedAmount) : 0,
    type: normalizedType || 'expense',
    category: normalizedCategory || 'other',
  }
}

export function getTransactionTotals(transactions) {
  return transactions.reduce((summary, transaction) => {
    if (transaction.type === 'income') {
      summary.income += transaction.amount
    }

    if (transaction.type === 'expense') {
      summary.expenses += transaction.amount
    }

    return summary
  }, { income: 0, expenses: 0 })
}

export function getSpendingByCategory(transactions) {
  const totalsByCategory = transactions
    .filter((transaction) => transaction.type === 'expense')
    .reduce((categoryMap, transaction) => {
      const currentTotal = categoryMap.get(transaction.category) ?? 0
      categoryMap.set(transaction.category, currentTotal + transaction.amount)
      return categoryMap
    }, new Map())

  return [...totalsByCategory.entries()]
    .map(([name, value]) => ({ name, value }))
    .sort((left, right) => right.value - left.value)
}

export function getRecentTransactions(transactions, limit = 3) {
  return [...transactions]
    .sort((left, right) => new Date(right.date) - new Date(left.date))
    .slice(0, limit)
}
