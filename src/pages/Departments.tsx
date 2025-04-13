
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Users, CalendarClock } from "lucide-react";

const departmentsData = [
  {
    id: 1,
    name: "Cardiology",
    description: "Diagnosis and treatment of heart disorders",
    doctors: 12,
    patients: 143,
    appointmentsToday: 18,
  },
  {
    id: 2,
    name: "Neurology",
    description: "Diagnosis and treatment of nervous system disorders",
    doctors: 8,
    patients: 98,
    appointmentsToday: 11,
  },
  {
    id: 3,
    name: "Orthopedics",
    description: "Diagnosis and treatment of musculoskeletal system",
    doctors: 10,
    patients: 126,
    appointmentsToday: 14,
  },
  {
    id: 4,
    name: "Pediatrics",
    description: "Medical care for infants, children, and adolescents",
    doctors: 14,
    patients: 187,
    appointmentsToday: 22,
  },
  {
    id: 5,
    name: "Dermatology",
    description: "Diagnosis and treatment of skin disorders",
    doctors: 6,
    patients: 78,
    appointmentsToday: 9,
  },
  {
    id: 6,
    name: "Ophthalmology",
    description: "Diagnosis and treatment of eye disorders",
    doctors: 7,
    patients: 84,
    appointmentsToday: 12,
  },
];

const Departments = () => {
  return (
    <MainLayout title="Departments">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {departmentsData.map((department) => (
          <Card key={department.id} className="overflow-hidden">
            <CardHeader className="bg-hospital-50 border-b pb-3">
              <div className="flex justify-between items-center">
                <CardTitle>{department.name}</CardTitle>
                <Badge variant="outline" className="bg-hospital-100 text-hospital-700 hover:bg-hospital-200">
                  Active
                </Badge>
              </div>
              <CardDescription>{department.description}</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-hospital-500 mr-2" />
                  <div>
                    <p className="text-sm font-semibold">{department.doctors}</p>
                    <p className="text-xs text-muted-foreground">Doctors</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Building2 className="h-5 w-5 text-hospital-500 mr-2" />
                  <div>
                    <p className="text-sm font-semibold">{department.patients}</p>
                    <p className="text-xs text-muted-foreground">Patients</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <CalendarClock className="h-5 w-5 text-hospital-500 mr-2" />
                  <div>
                    <p className="text-sm font-semibold">{department.appointmentsToday}</p>
                    <p className="text-xs text-muted-foreground">Today</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t bg-gray-50 flex justify-between pt-3">
              <span className="text-sm text-muted-foreground">Floor {Math.floor(Math.random() * 5) + 1}</span>
              <span className="text-sm text-hospital-600 hover:text-hospital-700 cursor-pointer">View Details</span>
            </CardFooter>
          </Card>
        ))}
      </div>
    </MainLayout>
  );
};

export default Departments;
