const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// Student result viewing (must be before the /:id route)
router.get('/result', studentController.viewResult);

// Student routes
router
    .route('/')
    .get(studentController.getAllStudents)
    .post(studentController.createStudent);

router
    .route('/:id')
    .get(studentController.getStudent)
    .patch(studentController.updateStudent)
    .delete(studentController.deleteStudent);

module.exports = router; 