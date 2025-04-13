
import { useState } from "react";
import { Search, Plus, Filter } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import DoctorCard from "@/components/doctors/DoctorCard";
import { Doctor, doctors as initialDoctors } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const Doctors = () => {
  const [doctors, setDoctors] = useState<Doctor[]>(initialDoctors);
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const { toast } = useToast();

  // Extract unique departments for filter dropdown
  const departments = Array.from(new Set(doctors.map(doctor => doctor.department)));

  // Filter doctors based on search query and department filter
  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = departmentFilter === "all" || doctor.department === departmentFilter;
    
    return matchesSearch && matchesDepartment;
  });

  const handleViewProfile = (id: string) => {
    toast({
      title: "Doctor Profile",
      description: `Viewing profile for doctor ID: ${id}`,
    });
  };

  const handleAddDoctor = () => {
    toast({
      title: "Add Doctor",
      description: "Opening new doctor registration form",
    });
  };

  return (
    <MainLayout title="Doctor Directory">
      <div className="space-y-6">
        {/* Header and Actions */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Doctors & Staff</h1>
            <p className="text-muted-foreground mt-1">
              View and manage medical professionals
            </p>
          </div>
          <Button onClick={handleAddDoctor}>
            <Plus className="mr-2 h-4 w-4" />
            Add New Doctor
          </Button>
        </div>
        
        {/* Filters */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by name or specialty"
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Filter by department">
                <div className="flex items-center">
                  <Filter className="mr-2 h-4 w-4" />
                  <span>{departmentFilter === "all" ? "All Departments" : departmentFilter}</span>
                </div>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              {departments.map((department) => (
                <SelectItem key={department} value={department}>
                  {department}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Doctor Cards */}
        {filteredDoctors.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredDoctors.map((doctor) => (
              <DoctorCard
                key={doctor.id}
                doctor={doctor}
                onViewProfile={handleViewProfile}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-full bg-muted p-3 mb-3">
              <Search className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold">No doctors found</h3>
            <p className="text-muted-foreground mt-1">
              Try adjusting your search or filters to find what you're looking for.
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Doctors;
