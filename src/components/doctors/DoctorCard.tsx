
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Doctor } from "@/data/mockData";

interface DoctorCardProps {
  doctor: Doctor;
  onViewProfile: (id: string) => void;
}

const DoctorCard = ({ doctor, onViewProfile }: DoctorCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <div className="relative h-40 bg-gradient-to-r from-hospital-600 to-hospital-400">
          <div className="absolute -bottom-12 left-4">
            <Avatar className="h-24 w-24 border-4 border-white">
              <AvatarImage src={doctor.image} alt={doctor.name} />
              <AvatarFallback className="text-xl font-semibold bg-hospital-100 text-hospital-800">
                {doctor.name.substring(0, 2)}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="absolute top-4 right-4">
            <Badge className="bg-white/90 text-hospital-700 hover:bg-white">
              {doctor.experience} years exp
            </Badge>
          </div>
        </div>
        
        <div className="pt-14 px-4 pb-4 space-y-3">
          <div>
            <h4 className="font-semibold text-lg">{doctor.name}</h4>
            <p className="text-sm text-hospital-600 font-medium">{doctor.specialty}</p>
            <p className="text-xs text-muted-foreground">{doctor.department}</p>
          </div>
          
          <div className="grid grid-cols-1 gap-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Qualification:</span>
              <span className="font-medium">{doctor.qualification}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Email:</span>
              <span className="font-medium">{doctor.email}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Phone:</span>
              <span className="font-medium">{doctor.phone}</span>
            </div>
          </div>
          
          <div className="text-sm">
            <p className="text-muted-foreground mb-1">Schedule:</p>
            <div className="flex flex-wrap gap-1">
              {doctor.schedule.map((day, index) => (
                <Badge key={index} variant="outline" className="text-xs font-normal">
                  {day}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="flex gap-2 mt-4">
            <Button
              className="flex-1"
              onClick={() => onViewProfile(doctor.id)}
            >
              View Profile
            </Button>
            <Button
              variant="outline"
              className="flex-1 text-hospital-600 border-hospital-200 hover:bg-hospital-50"
            >
              Schedule
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DoctorCard;
