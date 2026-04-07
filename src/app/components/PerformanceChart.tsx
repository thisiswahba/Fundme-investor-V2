import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatSAR, formatChartValue } from '../utils/currency';

const data = [
  { month: 'يناير', value: 150000 },
  { month: 'فبراير', value: 165000 },
  { month: 'مارس', value: 180000 },
  { month: 'أبريل', value: 195000 },
  { month: 'مايو', value: 220000 },
  { month: 'يونيو', value: 245800 },
];

// Custom tooltip component
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div 
        className="bg-white rounded-xl px-4 py-3 border-none shadow-2xl"
        style={{
          boxShadow: '0 12px 40px rgba(0, 46, 131, 0.15)',
        }}
      >
        <div className="text-[13px] text-[#002E83]" style={{ fontWeight: 600 }}>
          {formatSAR(payload[0].value)}
        </div>
      </div>
    );
  }
  return null;
};

export function PerformanceChart() {
  return (
    <div className="bg-white rounded-[20px] p-6 border border-[#E8ECF2]">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="text-[18px] text-[#002E83]" style={{ fontWeight: 600 }}>
          أداء المحفظة
        </div>
        <div className="bg-[#F5F7FA] rounded-full px-4 py-2">
          <span className="text-[12px] text-[#002E83]" style={{ fontWeight: 500 }}>
            ٦ أشهر
          </span>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-xl" style={{ height: '340px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0D82F9" stopOpacity={0.25}/>
                <stop offset="95%" stopColor="#0D82F9" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#F0F3F7" vertical={false} strokeOpacity={0.5} />
            <XAxis 
              dataKey="month" 
              tick={{ fill: '#8896AD', fontSize: 11 }}
              axisLine={{ stroke: '#F0F3F7' }}
              tickLine={false}
            />
            <YAxis 
              tick={{ fill: '#8896AD', fontSize: 11 }}
              axisLine={{ stroke: '#F0F3F7' }}
              tickLine={false}
              tickFormatter={(value) => formatChartValue(value)}
              orientation="right"
            />
            <Tooltip 
              content={<CustomTooltip />}
              cursor={{ stroke: '#0D82F9', strokeWidth: 1, strokeDasharray: '5 5' }}
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#0D82F9" 
              strokeWidth={3}
              fill="url(#colorValue)"
              dot={false}
              activeDot={{ 
                r: 6, 
                fill: '#0D82F9', 
                strokeWidth: 3, 
                stroke: 'white',
                style: { filter: 'drop-shadow(0 2px 8px rgba(13, 130, 249, 0.4))' }
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}