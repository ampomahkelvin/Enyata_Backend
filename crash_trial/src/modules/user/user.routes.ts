import express from 'express'
import { UserController } from './user.controller'
import { ValidationMiddleware } from '../../shared/validators/user-middleware'
import { createUserSchema, loginUserSchema } from './validation'
import { sessionMiddleware } from './middleware/session-middleware'
import passport from 'passport'

const router = express.Router()

router.get('/auth/google/',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

router.get('/auth/google/callback',
    passport.authenticate( 'google'));

    //Routes
router.get('/auth', passport.authenticate('google', { scope: ['profile', 'email'] }));
// router.get('/auth/error', (req, res) => res.send('Unknown Error'))
router.get('/api/account/google', passport.authenticate('google', { failureRedirect: '/auth/error' }),
  function(_, res) {
    res.redirect('/');
  }
);
// router.get('/', (req, res) => res.send(`Welcome ${req.user.displayName}!`))

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
router.get('/', sessionMiddleware, UserController.getAllUsers)
router.get('/:id', UserController.getUserById)
router.delete('/delete/:id', UserController.deleteUserById)
router.put('/update/:id', UserController.updateUserById)

export default router
