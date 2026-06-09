import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import styles from "./SynodAdminDashboard.module.css";

interface DashboardChartsProps {
  timeFilter: number;
  setTimeFilter: (val: number) => void;
  chartMetric: "revenue" | "delegates";
  setChartMetric: (val: "revenue" | "delegates") => void;
  currentChartTotal: number;
  chartData: any[];
  pieData: any[];
}

const PIE_COLORS = [
  "#c52810",
  "#f59e0b",
  "#1f0805",
  "#3b82f6",
  "#10b981",
  "#8b5cf6",
  "#ec4899",
  "#06b6d4",
];

export default function DashboardCharts({
  timeFilter,
  setTimeFilter,
  chartMetric,
  setChartMetric,
  currentChartTotal,
  chartData,
  pieData,
}: DashboardChartsProps) {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length && payload[0].value > 0) {
      return (
        <div className={styles.customTooltip}>
          <p className={styles.tooltipLabel}>{label}</p>
          <p className={styles.tooltipData}>
            {chartMetric === "revenue" ? "₦" : ""}
            {payload[0].value.toLocaleString()}{" "}
            {chartMetric === "revenue" ? "" : "Delegates"}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={styles.dashboardGrid}>
      <div className={styles.chartCard}>
        <div className={styles.chartControlsRow}>
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(Number(e.target.value))}
            className={styles.chartSelect}
          >
            <option value={7}>Last 7 days</option>
            <option value={30}>Last 30 days</option>
            <option value={90}>Last 90 days</option>
          </select>

          <select
            value={chartMetric}
            onChange={(e) =>
              setChartMetric(e.target.value as "revenue" | "delegates")
            }
            className={styles.chartSelectBold}
          >
            <option value="revenue">Revenue NGN</option>
            <option value="delegates">Registered Delegates</option>
          </select>
        </div>

        <div className={styles.chartTotalDisplay}>
          {chartMetric === "revenue" ? "₦" : ""}
          {currentChartTotal.toLocaleString()}
        </div>

        <div className={styles.barChartWrapper}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              style={{ outline: "none" }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f0f0f0"
              />
              <XAxis
                dataKey="displayDate"
                tick={{ fontSize: 12, fill: "#888" }}
                axisLine={false}
                tickLine={false}
                dy={10}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "#888" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) =>
                  chartMetric === "revenue" && value >= 1000
                    ? `${value / 1000}k`
                    : value
                }
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{
                  fill: "rgba(0,0,0,0.04)",
                  style: { outline: "none" },
                }}
              />
              <Bar
                dataKey={chartMetric}
                fill={chartMetric === "revenue" ? "#dcfce7" : "#dbeafe"}
                stroke={chartMetric === "revenue" ? "#22c55e" : "#3b82f6"}
                strokeWidth={1}
                radius={[4, 4, 0, 0]}
                barSize={timeFilter === 7 ? 40 : 15}
                animationDuration={1000}
                style={{ outline: "none" }}
                activeBar={false}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className={styles.pieCard}>
        <h3 className={styles.pieTitle}>Archdeaconry Breakdown</h3>
        {pieData.length > 0 ? (
          <div className={styles.pieChartWrapper}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart style={{ outline: "none" }}>
                <Pie
                  data={pieData}
                  cx="40%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                  style={{ outline: "none" }}
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={PIE_COLORS[index % PIE_COLORS.length]}
                      style={{ outline: "none" }}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: any) => [
                    `${value || 0} Delegates`,
                    "Registrations",
                  ]}
                  contentStyle={{
                    borderRadius: "8px",
                    border: "none",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                />
                <Legend
                  layout="vertical"
                  verticalAlign="middle"
                  align="right"
                  iconType="circle"
                  wrapperStyle={{ fontSize: "12px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className={styles.emptyPie}>No data available yet.</div>
        )}
      </div>
    </div>
  );
}
