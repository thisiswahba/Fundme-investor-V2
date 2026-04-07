import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatSAR, formatChartValue } from '../../utils/currency';
import { useState, useId } from 'react';

const dataByPeriod = {
  '1M': [
    { month: 'أسبوع ١', value: 440000, id: '1m-week1' },
    { month: 'أسبوع ٢', value: 455000, id: '1m-week2' },
    { month: 'أسبوع ٣', value: 465000, id: '1m-week3' },
    { month: 'أسبوع ٤', value: 485000, id: '1m-week4' },
  ],
  '6M': [
    { month: 'يناير', value: 350000, id: '6m-jan' },
    { month: 'فبراير', value: 380000, id: '6m-feb' },
    { month: 'مارس', value: 410000, id: '6m-mar' },
    { month: 'أبريل', value: 440000, id: '6m-apr' },
    { month: 'مايو', value: 465000, id: '6m-may' },
    { month: 'يونيو', value: 485000, id: '6m-jun' },
  ],
  '1Y': [
    { month: 'ينا', value: 250000, id: '1y-jan' },
    { month: 'فبر', value: 280000, id: '1y-feb' },
    { month: 'مار', value: 310000, id: '1y-mar' },
    { month: 'أبر', value: 340000, id: '1y-apr' },
    { month: 'ماي', value: 370000, id: '1y-may' },
    { month: 'يون', value: 395000, id: '1y-jun' },
    { month: 'يول', value: 420000, id: '1y-jul' },
    { month: 'أغس', value: 440000, id: '1y-aug' },
    { month: 'سبت', value: 455000, id: '1y-sep' },
    { month: 'أكت', value: 470000, id: '1y-oct' },
    { month: 'نوف', value: 480000, id: '1y-nov' },
    { month: 'ديس', value: 485000, id: '1y-dec' },
  ],
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div 
        className="bg-white rounded-xl px-4 py-3 border-none"
        style={{
          boxShadow: '0 12px 40px rgba(11, 26, 58, 0.15)',
        }}
      >
        <div className="text-[14px] text-[#0B1A3A]" style={{ fontWeight: 700 }}>
          {formatSAR(payload[0].value)}
        </div>
      </div>
    );
  }
  return null;
};

export function PerformanceSection() {
  const [period, setPeriod] = useState<'1M' | '6M' | '1Y'>('6M');
  const data = dataByPeriod[period];
  const gradientId = useId();

  return (
    <div className="bg-white rounded-2xl p-6" style={{ boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)' }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-[18px] text-[#0B1A3A]" style={{ fontWeight: 600 }}>
          أداء المحفظة
        </h3>
        
        {/* Period Filters */}
        <div className="flex items-center gap-2 bg-[#F9FAFB] rounded-lg p-1">
          {(['1M', '6M', '1Y'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 rounded-md text-[12px] transition-all ${
                period === p
                  ? 'bg-white text-[#0B1A3A] shadow-sm'
                  : 'text-[#6B7280] hover:text-[#0B1A3A]'
              }`}
              style={{ fontWeight: 500 }}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div style={{ height: '320px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
          >
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563EB" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F4F9" vertical={false} strokeOpacity={0.6} />
            <XAxis 
              dataKey="month" 
              tick={{ fill: '#9CA3AF', fontSize: 11 }}
              axisLine={{ stroke: '#F1F4F9' }}
              tickLine={false}
            />
            <YAxis 
              tick={{ fill: '#9CA3AF', fontSize: 11 }}
              axisLine={{ stroke: '#F1F4F9' }}
              tickLine={false}
              tickFormatter={(value) => formatChartValue(value)}
              orientation="right"
            />
            <Tooltip 
              content={<CustomTooltip />}
              cursor={{ stroke: '#2563EB', strokeWidth: 1, strokeDasharray: '5 5' }}
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#2563EB" 
              strokeWidth={3}
              fill={`url(#${gradientId})`}
              dot={false}
              activeDot={{ 
                r: 6, 
                fill: '#2563EB', 
                strokeWidth: 3, 
                stroke: 'white',
                style: { filter: 'drop-shadow(0 2px 8px rgba(37, 99, 235, 0.4))' }
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
