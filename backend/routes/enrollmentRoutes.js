const express = require('express');
const {
  getEnrollments,
  createEnrollment,
  deleteEnrollment,
} = require('../controllers/enrollmentController');
const { protect, admin } = require('../middlewares/authMiddleware');
const router = express.Router();

router.route('/').get(protect, admin, getEnrollments).post(protect, admin, createEnrollment);
router.route('/:id').delete(protect, admin, deleteEnrollment);

module.exports = router;
