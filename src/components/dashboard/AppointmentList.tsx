
import { useState } from "react";
import { Calendar, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { appointments } from "@/data/mockData";
import { cn } from "@/lib/utils";

const statusStyles = {
  scheduled: "bg-blue-100 text-blue-800 hover:bg-blue-200",
  completed: "bg-green-100 text-green-800 hover:bg-green-200",
  cancelled: "bg-red-100 text-red-800 hover:bg-red-200",
  "no-show": "bg-amber-100 text-amber-800 hover:bg-amber-200",
};

const AppointmentList = () => {
  const [filter, setFilter] = useState<string>("all");
  
  // Filter appointments based on selected filter
  const filteredAppointments = filter === "all" 
    ? appointments
    : appointments.filter(appointment => appointment.status === filter);
  
  // Get upcoming appointments (scheduled appointments with future dates)
  const upcomingAppointments = filteredAppointments
    .filter(appointment => 
      appointment.status === "scheduled" && 
      new Date(appointment.date) >= new Date()
    )
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">Recent Appointments</CardTitle>
          <div className="flex gap-1">
            <Badge 
              variant="outline" 
              className={cn(
                "cursor-pointer", 
                filter === "all" && "bg-secondary"
              )}
              onClick={() => setFilter("all")}
            >
              All
            </Badge>
            <Badge 
              variant="outline" 
              className={cn(
                "cursor-pointer", 
                filter === "scheduled" && "bg-secondary"
              )}
              onClick={() => setFilter("scheduled")}
            >
              Scheduled
            </Badge>
            <Badge 
              variant="outline" 
              className={cn(
                "cursor-pointer", 
                filter === "completed" && "bg-secondary"
              )}
              onClick={() => setFilter("completed")}
            >
              Completed
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {upcomingAppointments.length > 0 ? (
            upcomingAppointments.map((appointment) => (
              <div key={appointment.id} className="flex items-center p-3 rounded-md hover:bg-muted/50">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="" alt={appointment.patientName} />
                  <AvatarFallback className="bg-hospital-100 text-hospital-800">
                    {appointment.patientName.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="ml-4 flex-1">
                  <div className="flex justify-between">
                    <p className="text-sm font-medium">{appointment.patientName}</p>
                    <Badge className={cn("text-xs", statusStyles[appointment.status])}>
                      {appointment.status}
                    </Badge>
                  </div>
                  <div className="flex items-center mt-1 text-sm text-muted-foreground">
                    <Calendar size={12} className="mr-1" />
                    <span className="mr-3">{appointment.date}</span>
                    <Clock size={12} className="mr-1" />
                    <span>{appointment.time}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    With {appointment.doctorName} • {appointment.type}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-6">
              <p className="text-sm text-muted-foreground">No appointments found</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AppointmentList;
