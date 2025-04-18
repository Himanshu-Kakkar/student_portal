const Student = require('../models/Student');

// Get all students
exports.getAllStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json({
            status: 'success',
            results: students.length,
            data: {
                students
            }
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message
        });
    }
};

// Get a single student
exports.getStudent = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({
                status: 'fail',
                message: 'No student found with that ID'
            });
        }
        res.status(200).json({
            status: 'success',
            data: {
                student
            }
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message
        });
    }
};

// Create a new student
exports.createStudent = async (req, res) => {
    try {
        const newStudent = await Student.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                student: newStudent
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

// Update a student
exports.updateStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );
        if (!student) {
            return res.status(404).json({
                status: 'fail',
                message: 'No student found with that ID'
            });
        }
        res.status(200).json({
            status: 'success',
            data: {
                student
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

// Delete a student
exports.deleteStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) {
            return res.status(404).json({
                status: 'fail',
                message: 'No student found with that ID'
            });
        }
        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message
        });
    }
};

// View student result
exports.viewResult = async (req, res) => {
    try {
        const { rollNo, dob } = req.query;

        if (!rollNo || !dob) {
            return res.status(400).json({
                status: 'error',
                message: 'Roll number and date of birth are required'
            });
        }

        const student = await Student.findOne({ rollNo });
        
        if (!student) {
            return res.status(404).json({
                status: 'error',
                message: 'Student not found'
            });
        }

        // Verify DOB
        const studentDOB = new Date(student.dob).toISOString().split('T')[0];
        const providedDOB = new Date(dob).toISOString().split('T')[0];

        if (studentDOB !== providedDOB) {
            return res.status(401).json({
                status: 'error',
                message: 'Invalid date of birth'
            });
        }

        // Calculate age from DOB
        const today = new Date();
        const birthDate = new Date(student.dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        // Return student result
        res.status(200).json({
            status: 'success',
            data: {
                name: student.name,
                rollNo: student.rollNo,
                email: student.email,
                age: age,
                marks: student.marks
            }
        });

    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message
        });
    }
}; 