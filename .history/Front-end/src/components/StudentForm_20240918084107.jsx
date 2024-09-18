import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

function StudentForm({ fetchStudents }) {
  const [student, setStudent] = useState({
    name: '',
    age: '',
    class: '',
    rollNumber: '',
    section: '',
    admissionNumber: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!student.admissionNumber || !student.name) {
      alert('Admission Number and Name are required.');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/students', {
        id: student.admissionNumber,
        data: student
      });
      setStudent({
        name: '',
        age: '',
        class: '',
        rollNumber: '',
        section: '',
        admissionNumber: ''
      });
      fetchStudents();
    } catch (error) {
      console.error('Error adding/updating student:', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter name"
          name="name"
          value={student.name}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group controlId="formBasicAge">
        <Form.Label>Age</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter age"
          name="age"
          value={student.age}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group controlId="formBasicClass">
        <Form.Label>Class</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter class"
          name="class"
          value={student.class}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group controlId="formBasicRollNumber">
        <Form.Label>Roll Number</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter roll number"
          name="rollNumber"
          value={student.rollNumber}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group controlId="formBasicSection">
        <Form.Label>Section</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter section"
          name="section"
          value={student.section}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group controlId="formBasicAdmissionNumber">
        <Form.Label>Admission Number</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter admission number"
          name="admissionNumber"
          value={student.admissionNumber}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Add Student
      </Button>
    </Form>
  );
}

export default StudentForm; 