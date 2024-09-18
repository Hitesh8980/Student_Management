import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap';

function FileUpload({ fetchStudents }) {
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setErrors(null); // Reset errors when a new file is selected
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      setErrors([{ error: 'Please select a file before uploading.' }]);
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.message) {
        fetchStudents(); 
        setErrors(null); // Clear any existing errors
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        console.error('Error uploading file:', error);
        setErrors([{ error: 'An unexpected error occurred.' }]);
      }
    }
  };

  return (
    <div>
      <Form onSubmit={handleFileUpload}>
        <Form.Group controlId="formFile">
          <Form.Label>Select Excel File</Form.Label>
          <Form.Control type="file" onChange={handleFileChange} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Upload File
        </Button>
      </Form>

      {/* Error messages display */}
      {errors && (
        <div style={{ marginTop: '20px' }}>
          {errors.map((err, index) => (
            <Alert key={index} variant="danger">
              {`Row ${err.row}: ${err.error}`}
            </Alert>
          ))}
        </div>
      )}
    </div>
  );
}

export default FileUpload;
