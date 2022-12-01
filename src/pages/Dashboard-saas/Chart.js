import React from "react";
import {
  Area,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Sun",
    uv: 4,
    pv: 2,
    amt: 2,
    "val:": 30,
  },
  {
    name: "Mon",
    uv: 5,
    pv: 8,
    amt: 3,
    "val:": 30,
  },
  {
    name: "Tue",
    uv: 5,
    pv: 2,
    amt: 6,
    "val:": 30,
  },
  {
    name: "Wed",
    uv: 7,
    pv: 3,
    amt: 2,
    "val:": 30,
  },
  {
    name: "Thur",
    uv: 1,
    pv: 4,
    amt: 2,
    "val:": 30,
  },
  {
    name: "Fri",
    uv: 2,
    pv: 8,
    amt: 5,
    "val:": 30,
  },
  {
    name: "Sat",
    uv: 3,
    pv: 2,
    amt: 4,
    "val:": 30,
  },
];


export const ChartComp = () => {
  return (
    <div style={{ backgroundColor: '#fff', width: '95%', height:'95%', backgroundColor: '#fff', marginLeft: '14px' }}>
      <ResponsiveContainer width='100%' height='100%' id='stats__'>
        <AreaChart
          margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
          data={data}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#32FF00" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#32FF00" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            opacity={0.4}
            fontWeight={200}
            fontFamily=" 'Manrope', sans-serif"
            dataKey="name"
            display={"block"}
          />
          <YAxis opacity={0.4} fontWeight={200} />
          <CartesianGrid strokeDasharray="10" vertical={false} />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="uv"
            strokeWidth={1}
            stroke="#32FF00"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>

  )
}