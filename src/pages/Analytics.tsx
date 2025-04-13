
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const monthlyData = [
  { name: "Jan", patients: 65, appointments: 42 },
  { name: "Feb", patients: 59, appointments: 38 },
  { name: "Mar", patients: 80, appointments: 56 },
  { name: "Apr", patients: 81, appointments: 63 },
  { name: "May", patients: 56, appointments: 39 },
  { name: "Jun", patients: 55, appointments: 48 },
  { name: "Jul", patients: 40, appointments: 30 },
  { name: "Aug", patients: 45, appointments: 35 },
  { name: "Sep", patients: 62, appointments: 48 },
  { name: "Oct", patients: 78, appointments: 55 },
  { name: "Nov", patients: 60, appointments: 45 },
  { name: "Dec", patients: 69, appointments: 52 },
];

const departmentData = [
  { name: "Cardiology", value: 65 },
  { name: "Neurology", value: 49 },
  { name: "Orthopedics", value: 72 },
  { name: "Pediatrics", value: 58 },
  { name: "Dermatology", value: 35 },
  { name: "Ophthalmology", value: 42 },
];

const Analytics = () => {
  return (
    <MainLayout title="Analytics">
      <div className="grid gap-6">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6 max-w-md">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="patients">Patients</TabsTrigger>
            <TabsTrigger value="departments">Departments</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Patient Activity</CardTitle>
                  <CardDescription>Total patients and appointments over the past year</CardDescription>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="patients" stroke="#3b82f6" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="appointments" stroke="#10b981" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Department Distribution</CardTitle>
                  <CardDescription>Patient distribution by department</CardDescription>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={departmentData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" fill="#3b82f6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="patients">
            <Card>
              <CardHeader>
                <CardTitle>Patient Demographics</CardTitle>
                <CardDescription>Analysis of patient age groups and genders</CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { age: "0-18", male: 45, female: 52 },
                        { age: "19-35", male: 65, female: 80 },
                        { age: "36-50", male: 78, female: 72 },
                        { age: "51-65", male: 92, female: 85 },
                        { age: "66+", male: 68, female: 75 },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="age" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="male" fill="#3b82f6" />
                      <Bar dataKey="female" fill="#ec4899" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="departments">
            <Card>
              <CardHeader>
                <CardTitle>Department Performance</CardTitle>
                <CardDescription>Appointments and patient satisfaction by department</CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { name: "Cardiology", appointments: 145, satisfaction: 92 },
                        { name: "Neurology", appointments: 98, satisfaction: 88 },
                        { name: "Orthopedics", appointments: 132, satisfaction: 95 },
                        { name: "Pediatrics", appointments: 165, satisfaction: 97 },
                        { name: "Dermatology", appointments: 87, satisfaction: 91 },
                        { name: "Ophthalmology", appointments: 76, satisfaction: 89 },
                      ]}
                      layout="vertical"
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="appointments" fill="#3b82f6" />
                      <Bar dataKey="satisfaction" fill="#10b981" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Analytics;
