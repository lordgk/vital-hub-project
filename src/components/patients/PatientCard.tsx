
import { User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Patient } from "@/data/mockData";

interface PatientCardProps {
  patient: Patient;
  onViewDetails: (id: string) => void;
}

const statusStyles = {
  active: "bg-green-100 text-green-800 hover:bg-green-200",
  discharged: "bg-gray-100 text-gray-800 hover:bg-gray-200",
  waiting: "bg-amber-100 text-amber-800 hover:bg-amber-200",
};

const PatientCard = ({ patient, onViewDetails }: PatientCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <div className="flex items-center p-4 border-b">
          <Avatar className="h-12 w-12">
            <AvatarImage src="" alt={patient.name} />
            <AvatarFallback className="bg-hospital-100 text-hospital-800">
              <User size={20} />
            </AvatarFallback>
          </Avatar>
          <div className="ml-4">
            <div className="flex items-center space-x-2">
              <h4 className="font-semibold">{patient.name}</h4>
              <Badge className={`${statusStyles[patient.status]}`}>
                {patient.status}
              </Badge>
            </div>
            <div className="text-sm text-muted-foreground">
              ID: {patient.id}
            </div>
          </div>
        </div>
        
        <div className="p-4 space-y-3">
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            <div>
              <span className="text-muted-foreground">Age:</span>{" "}
              <span className="font-medium">{patient.age}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Gender:</span>{" "}
              <span className="font-medium">{patient.gender}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Blood Type:</span>{" "}
              <span className="font-medium">{patient.bloodType}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Registered:</span>{" "}
              <span className="font-medium">{patient.registrationDate}</span>
            </div>
          </div>
          
          <div className="text-sm">
            <span className="text-muted-foreground">Medical History: </span>
            <span className="font-medium">{patient.medicalHistory}</span>
          </div>
          
          <Button 
            variant="outline" 
            className="w-full mt-2 text-hospital-600 border-hospital-200 hover:bg-hospital-50"
            onClick={() => onViewDetails(patient.id)}
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PatientCard;
