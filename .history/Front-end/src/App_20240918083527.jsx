import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StudentForm from './components/Studentform';
import StudentList from './components/Studentlist';

function App() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/students');
      setStudents(response.data); 
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  return (
    <div>
      <h1>Student Management</h1>
      
      {/* Student List Table */}
      <StudentList students={students} />
    </div>
  );
}

export default App;
