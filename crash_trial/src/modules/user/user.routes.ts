import express from 'express'
import { UserController } from './user.controller'
import { ValidationMiddleware } from '../../shared/validators/user-middleware'
import { createUserSchema, loginUserSchema } from './validation'
// import { sessionMiddleware } from './middleware/session-middleware'
import passport from 'passport'

const router = express.Router()

router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] }),
)

router.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    // successRedirect: '/auth/google/success',
    failureRedirect: '/auth/google/failure',
  }),
  (req, res) => {
    res.send(req.user)
  }
)

router.post('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

router.post(
  '/register',
  ValidationMiddleware.validateRequest(createUserSchema),
  UserController.createUser,
)
router.post(
  '/login',
  ValidationMiddleware.validateRequest(loginUserSchema),
  UserController.loginUser,
)
// router.get('/', sessionMiddleware, UserController.getAllUsers)
router.get('/', UserController.getAllUsers)

router.get('/:id', UserController.getUserById)
router.delete('/delete/:id', UserController.deleteUserById)
router.put('/update/:id', UserController.updateUserById)

export default router
