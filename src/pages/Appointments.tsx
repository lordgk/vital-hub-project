
import { useState } from "react";
import { Calendar as CalendarIcon, Plus, Filter, Search, Clock } from "lucide-react";
import { format } from "date-fns";
import MainLayout from "@/components/layout/MainLayout";
import { Appointment, appointments as initialAppointments } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const statusStyles = {
  scheduled: "bg-blue-100 text-blue-800 hover:bg-blue-200",
  completed: "bg-green-100 text-green-800 hover:bg-green-200",
  cancelled: "bg-red-100 text-red-800 hover:bg-red-200",
  "no-show": "bg-amber-100 text-amber-800 hover:bg-amber-200",
};

const Appointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  // Filter appointments based on search query, status filter, and date filter
  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = 
      appointment.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.doctorName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || appointment.status === statusFilter;
    
    const matchesDate = !selectedDate || appointment.date === format(selectedDate, "yyyy-MM-dd");
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  const handleAddAppointment = () => {
    toast({
      title: "New Appointment",
      description: "Opening appointment scheduling form",
    });
  };

  const handleViewDetails = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsDialogOpen(true);
  };

  const updateAppointmentStatus = (id: string, newStatus: string) => {
    setAppointments(prevAppointments => 
      prevAppointments.map(appointment => 
        appointment.id === id ? { ...appointment, status: newStatus as Appointment["status"] } : appointment
      )
    );
    
    setIsDialogOpen(false);
    
    toast({
      title: "Status Updated",
      description: `Appointment status changed to ${newStatus}`,
    });
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header and Actions */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Appointments</h1>
            <p className="text-muted-foreground mt-1">
              Schedule and manage patient appointments
            </p>
          </div>
          <Button onClick={handleAddAppointment}>
            <Plus className="mr-2 h-4 w-4" />
            New Appointment
          </Button>
        </div>
        
        {/* Filters */}
        <div className="flex flex-wrap gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by patient or doctor"
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status filter">
                <div className="flex items-center">
                  <Filter className="mr-2 h-4 w-4" />
                  <span>Status: {statusFilter === "all" ? "All" : statusFilter}</span>
                </div>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
              <SelectItem value="no-show">No Show</SelectItem>
            </SelectContent>
          </Select>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-[180px] justify-start text-left font-normal",
                  !selectedDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
              {selectedDate && (
                <div className="border-t p-3 flex justify-between">
                  <Button variant="ghost" size="sm" onClick={() => setSelectedDate(undefined)}>
                    Clear
                  </Button>
                </div>
              )}
            </PopoverContent>
          </Popover>
        </div>
        
        {/* Appointments Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Doctor</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAppointments.length > 0 ? (
                filteredAppointments.map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell className="font-medium">{appointment.patientName}</TableCell>
                    <TableCell>{appointment.doctorName}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span>{appointment.date}</span>
                        <span className="text-xs text-muted-foreground flex items-center">
                          <Clock className="h-3 w-3 mr-1" /> {appointment.time}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{appointment.type}</TableCell>
                    <TableCell>
                      <Badge className={statusStyles[appointment.status]}>
                        {appointment.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewDetails(appointment)}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No appointments found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Appointment Details Dialog with Status Update */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Appointment Details</DialogTitle>
            <DialogDescription>
              View and manage appointment information
            </DialogDescription>
          </DialogHeader>
          
          {selectedAppointment && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Patient</h3>
                  <p className="mt-1">{selectedAppointment.patientName}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Doctor</h3>
                  <p className="mt-1">{selectedAppointment.doctorName}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Date</h3>
                  <p className="mt-1">{selectedAppointment.date}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Time</h3>
                  <p className="mt-1">{selectedAppointment.time}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Type</h3>
                  <p className="mt-1">{selectedAppointment.type}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Status</h3>
                  <p className="mt-1">
                    <Badge className={statusStyles[selectedAppointment.status]}>
                      {selectedAppointment.status}
                    </Badge>
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Change Status</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="bg-blue-100 text-blue-800 hover:bg-blue-200"
                    onClick={() => updateAppointmentStatus(selectedAppointment.id, "scheduled")}
                  >
                    Scheduled
                  </Button>
                  <Button 
                    variant="outline"
                    size="sm"
                    className="bg-green-100 text-green-800 hover:bg-green-200"
                    onClick={() => updateAppointmentStatus(selectedAppointment.id, "completed")}
                  >
                    Completed
                  </Button>
                  <Button 
                    variant="outline"
                    size="sm"
                    className="bg-red-100 text-red-800 hover:bg-red-200"
                    onClick={() => updateAppointmentStatus(selectedAppointment.id, "cancelled")}
                  >
                    Cancelled
                  </Button>
                  <Button 
                    variant="outline"
                    size="sm"
                    className="bg-amber-100 text-amber-800 hover:bg-amber-200"
                    onClick={() => updateAppointmentStatus(selectedAppointment.id, "no-show")}
                  >
                    No-Show
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default Appointments;
