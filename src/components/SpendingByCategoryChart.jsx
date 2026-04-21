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

const chartColors = ['#54e2df', '#7a6dff', '#ff89a6', '#ffb25c', '#6ac7ff', '#79f0b4', '#c09bff']

const SpendingByCategoryChart = ({ data, totalExpenses }) => {
  return (
    <section className="chart-card">
      <div className="section-heading">
        <div>
          <p className="section-label">Spending</p>
          <h2>Spending by Category</h2>
          <p>Expense totals grouped by category</p>
        </div>
        <span className="chart-total">{currencyFormatter.format(totalExpenses)}</span>
      </div>

      <div className="chart-shell">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{ top: 8, right: 16, left: 8, bottom: 8 }}
          >
            <CartesianGrid stroke="rgba(233, 238, 255, 0.12)" strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="name"
              tickFormatter={(value) => labelize(value)}
              tick={{ fill: '#b6c2ef', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tickFormatter={(value) => currencyFormatter.format(value)}
              tick={{ fill: '#b6c2ef', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              cursor={{ fill: 'rgba(31, 111, 95, 0.08)' }}
              contentStyle={{
                borderRadius: 18,
                border: '1px solid rgba(175, 192, 255, 0.16)',
                backgroundColor: 'rgba(11, 18, 42, 0.92)',
                color: '#eef2ff',
                boxShadow: '0 20px 40px rgba(3, 6, 22, 0.35)',
              }}
              labelFormatter={(value) => labelize(value)}
              formatter={(value) => currencyFormatter.format(value)}
            />
            <Legend wrapperStyle={{ color: '#cdd6fa' }} />
            <Bar
              data={data}
              dataKey="value"
              name="Spending"
              radius={[10, 10, 0, 0]}
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
