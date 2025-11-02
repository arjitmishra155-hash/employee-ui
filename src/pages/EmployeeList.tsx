import { useEffect, useState } from "react";

interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
}

interface EmployeeListProps {
  reload: boolean; // ya koi bhi type jo tum bhej rahe ho
  onEdit: (emp: Employee) => void;
}

export default function EmployeeList({ reload, onEdit }: EmployeeListProps) {
  const [employees, setEmployees] = useState<Employee[]>([]);

  const fetchEmployees = async () => {
    const res = await fetch("http://localhost:8080/api/employees");
    const data = await res.json();
    setEmployees(data);
  };

  useEffect(() => {
    fetchEmployees();
  }, [reload]);

  const handleDelete = async (id: number) => {
    await fetch(`http://localhost:8080/api/employees/${id}`, { method: "DELETE" });
    fetchEmployees();
  };

  return (
    <div className="max-w-5xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Employee List</h2>

      <table className="w-full border border-gray-300 shadow-md rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="th">ID</th>
            <th className="th">Full Name</th>
            <th className="th">Email</th>
            <th className="th">Department</th>
            <th className="th">Action</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id} className="hover:bg-gray-50">
              <td className="td">{emp.id}</td>
              <td className="td">{emp.firstName} {emp.lastName}</td>
              <td className="td">{emp.email}</td>
              <td className="td">{emp.department}</td>
              <td className="td space-x-2">
                <button className="btn-primary" onClick={() => onEdit(emp)}>Edit</button>
                <button className="btn-danger" onClick={() => handleDelete(emp.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
