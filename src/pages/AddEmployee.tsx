import { useEffect, useState } from "react";

interface Employee {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
}

export default function AddEmployee({
  onAdded,
  selectedEmployee,
  onClearSelection,
}: {
  onAdded: () => void;
  selectedEmployee: Employee | null;
  onClearSelection: () => void;
}) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");

  // Fill fields when editing
  useEffect(() => {
    if (selectedEmployee) {
      setFirstName(selectedEmployee.firstName);
      setLastName(selectedEmployee.lastName);
      setEmail(selectedEmployee.email);
      setDepartment(selectedEmployee.department);
    } else {
      setFirstName("");
      setLastName("");
      setEmail("");
      setDepartment("");
    }
  }, [selectedEmployee]);

  const handleSubmit = async () => {
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !department.trim()) {
      alert("⚠️ Please fill all fields!");
      return;
    }

    const employee = { firstName, lastName, email, department };

    if (selectedEmployee) {
      await fetch(`http://localhost:8080/api/employees/${selectedEmployee.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employee),
      });
      alert("✅ Employee Updated!");
    } else {
      await fetch("http://localhost:8080/api/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employee),
      });
      alert("✅ Employee Added!");
    }

    onAdded();
    onClearSelection();
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 border rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">
        {selectedEmployee ? "✏️ Edit Employee" : "➕ Add New Employee"}
      </h2>

      <div className="space-y-4">
        <input
          className="input"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <input
          className="input"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <input
          className="input"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="input"
          placeholder="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />

        <div className="flex gap-3">
          <button className="btn-primary" onClick={handleSubmit}>
            {selectedEmployee ? "Update Employee" : "Add Employee"}
          </button>

          {selectedEmployee && (
            <button className="btn-secondary" onClick={onClearSelection}>
              Cancel Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
