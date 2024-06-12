const asyncHandler = require('express-async-handler');
const Enrollment = require('../models/Enrollment');

// @desc    Fetch all enrollments
// @route   GET /api/enrollments
// @access  Private/Admin
const getEnrollments = asyncHandler(async (req, res) => {
  const enrollments = await Enrollment.find({}).populate('user').populate('course');
  res.json(enrollments);
});

// @desc    Create an enrollment
// @route   POST /api/enrollments
// @access  Private/Admin
const createEnrollment = asyncHandler(async (req, res) => {
  const { user, course } = req.body;

  const enrollment = new Enrollment({
    user,
    course,
  });

  const createdEnrollment = await enrollment.save();
  res.status(201).json(createdEnrollment);
});

// @desc    Delete an enrollment
// @route   DELETE /api/enrollments/:id
// @access  Private/Admin
const deleteEnrollment = asyncHandler(async (req, res) => {
  const enrollment = await Enrollment.findById(req.params.id);

  if (enrollment) {
    await enrollment.remove();
    res.json({ message: 'Enrollment removed' });
  } else {
    res.status(404);
    throw new Error('Enrollment not found');
  }
});

module.exports = { getEnrollments, createEnrollment, deleteEnrollment };
