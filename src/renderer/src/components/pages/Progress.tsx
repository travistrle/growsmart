import { useState, useEffect, type ReactElement } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'
import type { TypingDataEntry } from '@preload/index'
import { TIME_FILTERS, type TimeFilter } from '../../config'

// Define the shape of our chart data
interface ChartData {
  date: string
  wpm: number
  accuracy: number
}
const FILTER_OPTIONS = [
  { id: TIME_FILTERS.SEVEN_DAYS, label: '7 Days' },
  { id: TIME_FILTERS.FOUR_WEEKS, label: '4 Weeks' },
  { id: TIME_FILTERS.ONE_YEAR, label: '1 Year' }
]

export function Progress(): ReactElement {
  const [allData, setAllData] = useState<TypingDataEntry[]>([])
  const [chartData, setChartData] = useState<ChartData[]>([])
  const [timeFilter, setTimeFilter] = useState<TimeFilter>(TIME_FILTERS.SEVEN_DAYS)

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const data = await window.progressApi.getTypingData()
        setAllData(data)
      } catch (error) {
        console.error('Failed to fetch typing data:', error)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    const now = new Date()
    let filtered: TypingDataEntry[] = []

    if (timeFilter === TIME_FILTERS.SEVEN_DAYS) {
      const sevenDaysAgo = new Date(now.setDate(now.getDate() - 7))
      filtered = allData.filter((entry) => new Date(entry.timestamp) >= sevenDaysAgo)
    } else if (timeFilter === TIME_FILTERS.FOUR_WEEKS) {
      const fourWeeksAgo = new Date(now.setDate(now.getDate() - 28))
      filtered = allData.filter((entry) => new Date(entry.timestamp) >= fourWeeksAgo)
    } else if (timeFilter === TIME_FILTERS.ONE_YEAR) {
      const oneYearAgo = new Date(now.setFullYear(now.getFullYear() - 1))
      filtered = allData.filter((entry) => new Date(entry.timestamp) >= oneYearAgo)
    }

    // Format the filtered data for the chart
    const formattedForChart = filtered.map((entry) => ({
      date: new Date(entry.timestamp).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      }),
      wpm: entry.wpm,
      accuracy: entry.accuracy
    }))

    setChartData(formattedForChart)
  }, [allData, timeFilter])

  // Calculate summary statistics
  const averageWpm =
    chartData.length > 0
      ? Math.round(chartData.reduce((acc, cur) => acc + cur.wpm, 0) / chartData.length)
      : 0
  const averageAccuracy =
    chartData.length > 0
      ? (chartData.reduce((acc, cur) => acc + cur.accuracy, 0) / chartData.length).toFixed(1)
      : 0

  return (
    <div className="p-8 h-full w-full flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h1 className="bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text mb-4 font-bold text-3xl text-center">
          Your Progress
        </h1>

        <div className="flex gap-2 p-1 bg-blue-400 rounded-lg">
          {FILTER_OPTIONS.map((option) => (
            <button
              key={option.id}
              onClick={() => setTimeFilter(option.id)}
              className={`px-4 py-1 rounded-md transition-all ${
                timeFilter === option.id
                  ? 'bg-white/20 shadow'
                  : 'border border-transparent hover:bg-white/10'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="text-gray-500 mb-2">Average Speed</h3>
          <p className="text-4xl font-bold text-gray-400 dark:text-gray-600">
            {averageWpm} <span className="text-xl text-gray-400 ">WPM</span>
          </p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="text-gray-500 mb-2">Average Accuracy</h3>
          <p className="text-4xl font-bold text-gray-400 dark:text-gray-600">{averageAccuracy}%</p>
        </div>
      </div>

      {/* 5. The Chart */}
      <div className="w-full h-96 bg-white p-4 rounded-lg shadow">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" label={{ value: 'WPM', angle: -90, position: 'insideLeft' }} />
              <YAxis
                yAxisId="right"
                orientation="right"
                domain={[0, 100]}
                label={{ value: 'Accuracy (%)', angle: 90, position: 'insideRight' }}
              />
              <Tooltip />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="wpm"
                stroke="#8884d8"
                strokeWidth={2}
                name="Words Per Minute"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="accuracy"
                stroke="#82ca9d"
                strokeWidth={2}
                name="Accuracy"
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex justify-center items-center h-full text-gray-500">
            <p>No typing data found for this period. Go practice!</p>
          </div>
        )}
      </div>
    </div>
  )
}
