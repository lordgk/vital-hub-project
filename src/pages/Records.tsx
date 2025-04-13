
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Search, Filter, Download } from "lucide-react";

// Sample data for medical records
const medicalRecordsData = [
  {
    id: "MR001",
    patientId: "P001",
    patientName: "John Doe",
    recordType: "Lab Results",
    date: "2023-07-15",
    department: "Cardiology",
    doctor: "Dr. Sarah Parker",
    status: "complete",
  },
  {
    id: "MR002",
    patientId: "P002",
    patientName: "Jane Smith",
    recordType: "X-Ray",
    date: "2023-07-12",
    department: "Orthopedics",
    doctor: "Dr. Thomas Lee",
    status: "pending",
  },
  {
    id: "MR003",
    patientId: "P003",
    patientName: "Robert Johnson",
    recordType: "Prescription",
    date: "2023-07-10",
    department: "Neurology",
    doctor: "Dr. James Wilson",
    status: "complete",
  },
  {
    id: "MR004",
    patientId: "P004",
    patientName: "Emily Wilson",
    recordType: "MRI Scan",
    date: "2023-07-08",
    department: "Neurology",
    doctor: "Dr. James Wilson",
    status: "complete",
  },
  {
    id: "MR005",
    patientId: "P005",
    patientName: "Michael Brown",
    recordType: "Blood Test",
    date: "2023-07-05",
    department: "Cardiology",
    doctor: "Dr. Sarah Parker",
    status: "complete",
  },
  {
    id: "MR006",
    patientId: "P001",
    patientName: "John Doe",
    recordType: "ECG",
    date: "2023-06-30",
    department: "Cardiology",
    doctor: "Dr. Sarah Parker",
    status: "complete",
  },
  {
    id: "MR007",
    patientId: "P002",
    patientName: "Jane Smith",
    recordType: "Allergy Test",
    date: "2023-06-28",
    department: "Dermatology",
    doctor: "Dr. Elizabeth Chen",
    status: "pending",
  },
];

const Records = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRecords, setFilteredRecords] = useState(medicalRecordsData);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    
    if (query.trim() === "") {
      setFilteredRecords(medicalRecordsData);
    } else {
      const filtered = medicalRecordsData.filter(
        record =>
          record.patientName.toLowerCase().includes(query) ||
          record.recordType.toLowerCase().includes(query) ||
          record.doctor.toLowerCase().includes(query) ||
          record.department.toLowerCase().includes(query)
      );
      setFilteredRecords(filtered);
    }
  };

  return (
    <MainLayout title="Medical Records">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search records..."
              className="pl-9 w-full"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Filter size={16} />
              <span>Filter</span>
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Download size={16} />
              <span>Export</span>
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full sm:w-auto">
            <TabsTrigger value="all" className="flex-1 sm:flex-initial">All Records</TabsTrigger>
            <TabsTrigger value="lab" className="flex-1 sm:flex-initial">Lab Results</TabsTrigger>
            <TabsTrigger value="imaging" className="flex-1 sm:flex-initial">Imaging</TabsTrigger>
            <TabsTrigger value="prescriptions" className="flex-1 sm:flex-initial">Prescriptions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-4">
            <Card>
              <CardHeader className="bg-gray-50 border-b pb-3">
                <CardTitle className="text-lg">Medical Records</CardTitle>
                <CardDescription>
                  View and manage all patient medical records
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Record ID</TableHead>
                        <TableHead>Patient</TableHead>
                        <TableHead>Record Type</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Doctor</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="w-[100px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredRecords.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                            No records found
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredRecords.map((record) => (
                          <TableRow key={record.id}>
                            <TableCell className="font-medium">{record.id}</TableCell>
                            <TableCell>{record.patientName}</TableCell>
                            <TableCell>{record.recordType}</TableCell>
                            <TableCell>{record.date}</TableCell>
                            <TableCell>{record.department}</TableCell>
                            <TableCell>{record.doctor}</TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className={
                                  record.status === "complete" 
                                    ? "bg-green-50 text-green-700 border-green-200" 
                                    : "bg-amber-50 text-amber-700 border-amber-200"
                                }
                              >
                                {record.status === "complete" ? "Complete" : "Pending"}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Button variant="ghost" size="icon" title="View Record">
                                <FileText size={16} />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t bg-gray-50 p-3">
                <div className="text-sm text-muted-foreground">
                  Showing {filteredRecords.length} of {medicalRecordsData.length} records
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="lab">
            <Card>
              <CardHeader>
                <CardTitle>Lab Results</CardTitle>
                <CardDescription>View laboratory test results</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Filter by selecting the Lab Results tab</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="imaging">
            <Card>
              <CardHeader>
                <CardTitle>Imaging Records</CardTitle>
                <CardDescription>X-rays, MRIs, CT scans and other imaging records</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Filter by selecting the Imaging tab</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="prescriptions">
            <Card>
              <CardHeader>
                <CardTitle>Prescriptions</CardTitle>
                <CardDescription>Patient medication prescriptions</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Filter by selecting the Prescriptions tab</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Records;
