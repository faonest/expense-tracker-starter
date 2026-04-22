import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { currencyFormatter, labelize } from '../utils/formatters'
import { getSpendingByCategory, getTransactionTotals } from '../utils/transactions'

const chartColors = ['#1f6a52', '#be8a2f', '#8f3f32', '#4f5d75', '#85623d', '#335c67', '#7c7a42']

const SpendingByCategoryChart = ({ transactions }) => {
  const data = getSpendingByCategory(transactions)
  const totals = getTransactionTotals(transactions)

  return (
    <section className="chart-card">
      <div className="section-heading">
        <div>
          <p className="section-label">Spending</p>
          <h2>Spending by category</h2>
          <p className="section-caption">Expense totals grouped by category for the current ledger.</p>
        </div>
        <span className="chart-total">{currencyFormatter.format(totals.expenses)}</span>
      </div>

      <div className="chart-shell">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{ top: 8, right: 16, left: 8, bottom: 8 }}
          >
            <CartesianGrid stroke="rgba(31, 42, 41, 0.15)" strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="name"
              tickFormatter={(value) => labelize(value)}
              tick={{ fill: '#5f665b', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tickFormatter={(value) => currencyFormatter.format(value)}
              tick={{ fill: '#5f665b', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              cursor={{ fill: 'rgba(190, 138, 47, 0.08)' }}
              contentStyle={{
                borderRadius: 18,
                border: '1px solid rgba(34, 45, 42, 0.12)',
                backgroundColor: 'rgba(250, 244, 231, 0.96)',
                color: '#1f2421',
                boxShadow: '0 18px 30px rgba(54, 44, 26, 0.12)',
              }}
              labelFormatter={(value) => labelize(value)}
              formatter={(value) => currencyFormatter.format(value)}
            />
            <Legend wrapperStyle={{ color: '#485047' }} />
            <Bar
              data={data}
              dataKey="value"
              name="Spending"
              radius={[2, 2, 0, 0]}
            >
              {data.map((entry, index) => (
                <Cell
                  key={entry.name}
                  fill={chartColors[index % chartColors.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}

export default SpendingByCategoryChart
