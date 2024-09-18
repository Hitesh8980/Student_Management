import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import StudentList from './components/Studentlist';  // Keeping only the student list

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
    <Container>
      <h1>Student Management System</h1>

      {/* Student List and Filters */}
      <StudentList students={students} fetchStudents={fetchStudents} />
    </Container>
  );
}

export default App;
