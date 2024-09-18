import { useState } from 'react'


function App() {

  return (
    <>
    <Container>
      <h1>Student Management System</h1>

      {/* Student List and Filters */}
      <StudentList students={students} fetchStudents={fetchStudents} />
    </Container>
      
    </>
  )
}

export default App
