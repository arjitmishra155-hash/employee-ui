import { useState } from "react";
import AddEmployee from "./pages/AddEmployee";
import EmployeeList from "./pages/EmployeeList";

interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
}

function App() {
  const [reload, setReload] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const handleClearSelection = () => setSelectedEmployee(null);

  return (
    <>
    <AddEmployee 
  onAdded={() => setReload(!reload)} 
  selectedEmployee={selectedEmployee}
  onClearSelection={handleClearSelection}
/>




      
      <EmployeeList 
        reload={reload} 
        onEdit={setSelectedEmployee} 
      />
    </>
  );
}

export default App;
