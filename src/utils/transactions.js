export function normalizeTransaction(transaction) {
  const parsedAmount = Number(transaction.amount)

  return {
    ...transaction,
    amount: Number.isFinite(parsedAmount) ? Math.abs(parsedAmount) : 0,
    type: typeof transaction.type === 'string' ? transaction.type.trim().toLowerCase() : '',
    category: typeof transaction.category === 'string' ? transaction.category.trim().toLowerCase() : 'other',
  }
}
