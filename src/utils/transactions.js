export function normalizeTransaction(transaction) {
  const parsedAmount = Number(transaction.amount)

  return {
    ...transaction,
    amount: Number.isFinite(parsedAmount) ? Math.abs(parsedAmount) : 0,
    type: typeof transaction.type === 'string' ? transaction.type.trim().toLowerCase() : '',
    category: typeof transaction.category === 'string' ? transaction.category.trim().toLowerCase() : 'other',
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
  return transactions
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
}

export function getRecentTransactions(transactions, limit = 3) {
  return [...transactions]
    .sort((left, right) => new Date(right.date) - new Date(left.date))
    .slice(0, limit)
}
