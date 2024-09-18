const express = require('express');
const { db } = require('../config/firebaseAdminConfig');
const xlsx = require('xlsx');

const router = express.Router();

// Get all students
router.get('/students', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; 
    const limit = parseInt(req.query.limit) || 10;
    const snapshot = await db.collection('students').limit(limit).offset((page-1)*limit).get();
    const students = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    const totalSnapshot = await db.collection('students').get();
    const totalStudents = totalSnapshot.docs.length;
    
    res.json({
      page: page,
      limit: limit,
      total: totalStudents,
      totalPages: Math.ceil(totalStudents / limit),
      students: students,
    });
  } catch (error) {
    res.status(500).send('Error fetching students: ' + error.message);
  }
});

// Add or update student
router.post('/students', async (req, res) => {
  try {
    const { id, data } = req.body;
    if (!id || !data) {
      return res.status(400).send('Missing student data.');
    }

    const studentRef = db.collection('students').doc(id);
    await studentRef.set(data, { merge: true });

    res.status(200).send('Student data saved successfully.');
  } catch (error) {
    console.error('Error saving student data:', error);
    res.status(500).send('Error saving student data: ' + error.message);
  }
});

// Delete student
router.delete('/students/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await db.collection('students').doc(id).delete();
    res.send('Student deleted successfully.');
  } catch (error) {
    res.status(500).send('Error deleting student: ' + error.message);
  }
});

// Upload Excel file
router.post('/upload', async (req, res) => {
  if (!req.files || !req.files.file) {
    return res.status(400).send('No file uploaded.');
  }

  const file = req.files.file;
  const workbook = xlsx.read(file.data, { type: 'buffer' });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const data = xlsx.utils.sheet_to_json(sheet);

  

  try {
    const batch = db.batch();
    data.forEach(student => {
      const studentRef = db.collection('students').doc(student['Admission Number']);
      batch.set(studentRef, student);
    });
    await batch.commit();
    res.send('Data uploaded successfully.');
  } catch (error) {
    res.status(500).send('Error uploading data: ' + error.message);
  }
});

module.exports = router;
