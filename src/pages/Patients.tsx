
import { useState } from "react";
import { Plus, UserSearch } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import PatientCard from "@/components/patients/PatientCard";
import { Patient, patients as initialPatients } from "@/data/mockData";
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

const Patients = () => {
  const [patients, setPatients] = useState<Patient[]>(initialPatients);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { toast } = useToast();

  // Filter patients based on search query and status filter
  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         patient.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || patient.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleViewDetails = (id: string) => {
    toast({
      title: "Patient Details",
      description: `Viewing details for patient ID: ${id}`,
    });
  };

  const handleAddPatient = () => {
    toast({
      title: "Add Patient",
      description: "Opening new patient registration form",
    });
  };

  return (
    <MainLayout title="Patient Management">
      <div className="space-y-6">
        {/* Header and Actions */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Patients</h1>
            <p className="text-muted-foreground mt-1">
              Manage and view patient information
            </p>
          </div>
          <Button onClick={handleAddPatient}>
            <Plus className="mr-2 h-4 w-4" />
            Add New Patient
          </Button>
        </div>
        
        {/* Filters */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <UserSearch className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search patients by name or ID"
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="discharged">Discharged</SelectItem>
              <SelectItem value="waiting">Waiting</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Patient Cards */}
        {filteredPatients.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPatients.map((patient) => (
              <PatientCard
                key={patient.id}
                patient={patient}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-full bg-muted p-3 mb-3">
              <UserSearch className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold">No patients found</h3>
            <p className="text-muted-foreground mt-1">
              Try adjusting your search or filters to find what you're looking for.
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Patients;
