
import { useState } from "react";
import { 
  Users, Activity, Calendar, Stethoscope, 
  BadgeDollarSign, Bed, Clock, HeartPulse 
} from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import StatsCard from "@/components/dashboard/StatsCard";
import AppointmentList from "@/components/dashboard/AppointmentList";
import PatientActivity from "@/components/dashboard/PatientActivity";
import { dashboardStats } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const [greeting, setGreeting] = useState(() => {
    const hour = new Date().getHours();
    return hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening";
  });
  
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{greeting}, Dr. Admin</h1>
            <p className="text-muted-foreground mt-1">
              Here's what's happening at VitalHub Hospital today.
            </p>
          </div>
          <div className="flex gap-2 mt-4 sm:mt-0">
            <Button>
              <Calendar className="mr-2 h-4 w-4" />
              New Appointment
            </Button>
            <Button variant="outline">
              <Users className="mr-2 h-4 w-4" />
              Add Patient
            </Button>
          </div>
        </div>
        
        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Patients"
            value={dashboardStats.totalPatients}
            icon={<Users className="h-6 w-6 text-hospital-600" />}
            trend={{ value: 12, isPositive: true }}
          />
          <StatsCard
            title="Total Doctors"
            value={dashboardStats.totalDoctors}
            icon={<Stethoscope className="h-6 w-6 text-hospital-600" />}
          />
          <StatsCard
            title="Today's Appointments"
            value={dashboardStats.totalAppointments}
            icon={<Calendar className="h-6 w-6 text-hospital-600" />}
            trend={{ value: 8, isPositive: true }}
          />
          <StatsCard
            title="Bed Occupancy"
            value={`${dashboardStats.occupancyRate}%`}
            icon={<Bed className="h-6 w-6 text-hospital-600" />}
            trend={{ value: 5, isPositive: false }}
          />
        </div>
        
        {/* Main Content */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="lg:col-span-3">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-medium">Hospital Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 grid-cols-2">
                <div className="flex flex-col items-center justify-center p-4 bg-hospital-50 rounded-md">
                  <HeartPulse className="h-8 w-8 text-hospital-600 mb-2" />
                  <p className="text-sm font-medium text-muted-foreground">Patient Satisfaction</p>
                  <h4 className="text-2xl font-bold mt-1">94%</h4>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-hospital-50 rounded-md">
                  <Clock className="h-8 w-8 text-hospital-600 mb-2" />
                  <p className="text-sm font-medium text-muted-foreground">Avg Wait Time</p>
                  <h4 className="text-2xl font-bold mt-1">{dashboardStats.avgWaitTime} min</h4>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-hospital-50 rounded-md">
                  <BadgeDollarSign className="h-8 w-8 text-hospital-600 mb-2" />
                  <p className="text-sm font-medium text-muted-foreground">Revenue</p>
                  <h4 className="text-2xl font-bold mt-1">${dashboardStats.revenue.toLocaleString()}</h4>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-hospital-50 rounded-md">
                  <Activity className="h-8 w-8 text-hospital-600 mb-2" />
                  <p className="text-sm font-medium text-muted-foreground">Success Rate</p>
                  <h4 className="text-2xl font-bold mt-1">98%</h4>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="text-sm font-medium mb-3">Resource Allocation</h4>
                <div className="space-y-2">
                  <div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Emergency Department</span>
                      <span className="font-medium">92%</span>
                    </div>
                    <div className="mt-1 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-hospital-600 rounded-full" style={{ width: "92%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Surgery Department</span>
                      <span className="font-medium">78%</span>
                    </div>
                    <div className="mt-1 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-hospital-600 rounded-full" style={{ width: "78%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Pediatrics Department</span>
                      <span className="font-medium">63%</span>
                    </div>
                    <div className="mt-1 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-hospital-600 rounded-full" style={{ width: "63%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="lg:col-span-4 grid gap-4 grid-cols-1">
            <AppointmentList />
          </div>
          
          <PatientActivity />
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
