
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const dailyData = [
  { name: "Mon", admissions: 12, discharges: 8 },
  { name: "Tue", admissions: 19, discharges: 14 },
  { name: "Wed", admissions: 15, discharges: 11 },
  { name: "Thu", admissions: 17, discharges: 19 },
  { name: "Fri", admissions: 20, discharges: 17 },
  { name: "Sat", admissions: 8, discharges: 10 },
  { name: "Sun", admissions: 5, discharges: 6 },
];

const weeklyData = [
  { name: "Week 1", admissions: 62, discharges: 48 },
  { name: "Week 2", admissions: 75, discharges: 70 },
  { name: "Week 3", admissions: 59, discharges: 63 },
  { name: "Week 4", admissions: 82, discharges: 77 },
];

const monthlyData = [
  { name: "Jan", admissions: 240, discharges: 218 },
  { name: "Feb", admissions: 210, discharges: 205 },
  { name: "Mar", admissions: 265, discharges: 248 },
  { name: "Apr", admissions: 278, discharges: 270 },
  { name: "May", admissions: 289, discharges: 274 },
  { name: "Jun", admissions: 302, discharges: 295 },
];

const PatientActivity = () => {
  const [interval, setInterval] = useState("daily");

  // Choose data based on selected interval
  const data = interval === "daily" 
    ? dailyData 
    : interval === "weekly"
      ? weeklyData
      : monthlyData;

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">Patient Activity</CardTitle>
          <Tabs value={interval} onValueChange={setInterval} className="w-auto">
            <TabsList className="grid grid-cols-3 h-8">
              <TabsTrigger value="daily" className="text-xs">Daily</TabsTrigger>
              <TabsTrigger value="weekly" className="text-xs">Weekly</TabsTrigger>
              <TabsTrigger value="monthly" className="text-xs">Monthly</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 10,
                left: -10,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis 
                dataKey="name" 
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                fontSize={11}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="admissions"
                stroke="#0ea5e9"
                activeDot={{ r: 6 }}
                strokeWidth={2}
              />
              <Line 
                type="monotone" 
                dataKey="discharges" 
                stroke="#22c55e"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center mt-4 space-x-6">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-hospital-500 mr-2" />
            <span className="text-xs font-medium">Admissions</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-2" />
            <span className="text-xs font-medium">Discharges</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PatientActivity;
