import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

function FileUpload({ fetchStudents }) {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post('http://localhost:5000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      fetchStudents(); // Refresh the student list after upload
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <Form onSubmit={handleFileUpload}>
      <Form.Group controlId="formFile">
        <Form.Label>Select Excel File</Form.Label>
        <Form.Control type="file" onChange={handleFileChange} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Upload File
      </Button>
    </Form>
  );
}

export default FileUpload;
