import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [assignments, setAssignments] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'start_date', direction: 'desc' });

  const fetchAssignments = async () => {
    try {
      const res = await axios.get('/api/project_assignments');
      setAssignments(res.data);
    } catch (err) {
      console.error('Error fetching assignments:', err);
    }
  };

  useEffect(() => {
    fetchAssignments();
    const interval = setInterval(fetchAssignments, 60000);
    return () => clearInterval(interval);
  }, []);

  const sortData = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    const sorted = [...assignments].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    setAssignments(sorted);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Latest Project Assignments</h1>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr>
            <th className="cursor-pointer" onClick={() => sortData('employee_id')}>Employee ID</th>
            <th className="cursor-pointer" onClick={() => sortData('employee_name')}>Employee Name</th>
            <th className="cursor-pointer" onClick={() => sortData('project_name')}>Project Name</th>
            <th className="cursor-pointer" onClick={() => sortData('start_date')}>Start Date</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((a, index) => (
            <tr key={index} className="border-t">
              <td>{a.employee_id.employee_id}</td>
              <td>{a.employee_id.full_name}</td>
              <td>{a.project_code.project_name}</td>
              <td>{new Date(a.start_date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
