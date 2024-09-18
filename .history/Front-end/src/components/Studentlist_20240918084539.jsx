import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Collapse, Row, Col } from 'react-bootstrap';
import QRCodeGenerator from './QrcodeGenerator'; 
import StudentForm from './StudentForm';  
import FileUpload from './Fileupload';  
import axios from 'axios';
import '../index.css'; 

function StudentList() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [filters, setFilters] = useState({
    name: '',
    rollNumber: '',
    class: ''
  });

  const [showForm, setShowForm] = useState(false);  
  const [showFileUpload, setShowFileUpload] = useState(false);  

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    setFilteredStudents(students); 
    applyFilters();
  }, [students, filters]);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/students'); 
      console.log(response.data); // Check if the data is an array
      const studentData = Array.isArray(response.data.students) ? response.data.students : [];
      setStudents(studentData);
      setFilteredStudents(studentData); // Update filteredStudents initially with all students
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };
  

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    if (!Array.isArray(students)) return;
  
    const { name, rollNumber, class: studentClass } = filters;
  
    const filtered = students.filter((student) => {
      return (
        (name === '' || student.name?.toLowerCase().includes(name.toLowerCase())) &&
        (rollNumber === '' || student.rollNumber?.toLowerCase().includes(rollNumber.toLowerCase())) &&
        (studentClass === '' || student.class?.toLowerCase().includes(studentClass.toLowerCase()))
      );
    });
  
    setFilteredStudents(filtered);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/students/${id}`);
      fetchStudents(); 
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  const toggleForm = () => setShowForm((prev) => !prev);
  const toggleFileUpload = () => setShowFileUpload((prev) => !prev);

  return (
    <div className="table-container">
      {/* Filter Form */}
      <Form className="filter-form">
        <Row>
          <Col md={4}>
            <Form.Group controlId="filterName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Filter by name"
                name="name"
                value={filters.name}
                onChange={handleFilterChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="filterRollNumber">
              <Form.Label>Roll Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Filter by roll number"
                name="rollNumber"
                value={filters.rollNumber}
                onChange={handleFilterChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="filterClass">
              <Form.Label>Class</Form.Label>
              <Form.Control
                type="text"
                placeholder="Filter by class"
                name="class"
                value={filters.class}
                onChange={handleFilterChange}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>

      {/* Buttons to toggle forms */}
      <div className="button-group" style={{ margin: '20px 0' }}>
        <Button variant="primary" onClick={toggleForm}>
          Add Student using Form
        </Button>
        <Button variant="secondary" onClick={toggleFileUpload} style={{ marginLeft: '10px' }}>
          Upload Excel File
        </Button>
      </div>

      {/* Conditionally rendering the Student Form */}
      {showForm && (
        <Collapse in={showForm}>
          <div>
            <StudentForm fetchStudents={fetchStudents} />
          </div>
        </Collapse>
      )}

      {/* Conditionally rendering the File Upload Form */}
      {showFileUpload && (
        <Collapse in={showFileUpload}>
          <div>
            <FileUpload fetchStudents={fetchStudents} />
          </div>
        </Collapse>
      )}

      {/* Student Table */}
      <Table striped bordered hover responsive className="student-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Class</th>
            <th>Roll Number</th>
            <th>Section</th>
            <th>Admission Number</th>
            <th>QR Code</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
  {filteredStudents.map((student) => (
    <tr key={student.admissionNumber}>
      <td>{student.name}</td>
      <td>{student.age}</td>
      <td>{student.class}</td>
      <td>{student.rollNumber}</td>
      <td>{student.section}</td>
      <td>{student.admissionNumber}</td>
      <td>
        <QRCodeGenerator value={student.admissionNumber} />
      </td>
      <td>
        <Button
          variant="danger"
          onClick={() => handleDelete(student.admissionNumber)}
        >
          Delete
        </Button>
      </td>
    </tr>
  ))}
</tbody>
      </Table>
    </div>
  );
}

export default StudentList;
