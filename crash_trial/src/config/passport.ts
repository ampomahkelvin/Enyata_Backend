// import passport from 'passport'
// import Env from '../shared/utils/env'
// import {
//   Strategy as GoogleStrategy,
//   VerifyCallback,
// } from 'passport-google-oauth2'
// import { Request } from 'express'

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: Env.get('GOOGLE_CLIENT_ID'),
//       clientSecret: Env.get('GOOGLE_CLIENT_SECRET'),
//       callbackURL: 'http://localhost:4000/api/v1/user/auth/google/callback',
//       passReqToCallback: true,
//     },
//     function (
//       _request: Request,
//       _accessToken: string,
//       _refreshToken: string,
//       profile: passport.Profile,
//       done: VerifyCallback,
//     ) {
//       return done(null, profile)
//     },
//   ),
// )
// passport.serializeUser(function (user, done) {
//   done(null, user)
// })

// // passport.deserializeUser(function (id, done) {})

// // import passport from 'passport'
// // import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
// // import Env from '../shared/utils/env'
// // import { sqlQuest } from './database'
// // import { federatedCredQueries } from 'src/modules/user/queries/google-auth-queries'
// // import { userQueries } from 'src/modules/user/queries'

// // passport.use(
// //   new GoogleStrategy(
// //     {
// //       clientID: Env.get('GOOGLE_CLIENT_ID'),
// //       clientSecret: Env.get('GOOGLE_CLIENT_SECRET'),
// //       callbackURL: '/oauth2/redirect/google',
// //       scope: ['email', 'profile'],
// //       passReqToCallback: true,
// //     },
// //     async (request, accessToken, refreshToken, profile, done) => {
// //       try {
// //         // Check if the user already exists in your federated credentials table
// //         const federatedCredUser = await sqlQuest.oneOrNone(
// //           federatedCredQueries.getUser,
// //           [profile.id],
// //         )

// //         if (!federatedCredUser) {
// //           // If user doesn't exist, create a new user in the 'users' table
// //           const newUserResult = await sqlQuest.one(userQueries.createUser, [
// //             profile.displayName,
// //             profile.emails?.[0].value,
// //           ])

// //           const newUserId = newUserResult.id

// //           // Insert federated credentials (linking the new user to Google OAuth)
// //           await sqlQuest.one(federatedCredQueries.createFederatedCred, [
// //             newUserId,
// //             profile.id, // Google ID
// //           ])

// //           const newUser = {
// //             id: newUserId,
// //             name: profile.displayName,
// //             email: profile.emails?.[0].value,
// //           }

// //           return done(null, newUser)
// //         }

// //         // Existing user - fetch user details
// //         const user = await sqlQuest.one(userQueries.getUserById, [
// //           federatedCredUser.user_id,
// //         ])

// //         if (!user) {
// //           return done(null, false)
// //         }

// //         return done(null, user)
// //       } catch (err) {
// //         console.log(err)
// //         return done(err)
// //       }
// //     },
// //   ),
// // )

// // passport.serializeUser((user, done) => {
// //   console.log(`Serialize User:`)
// //   console.log(user)

// //   // Here we store the user ID in the session. You can choose to store more information.
// //   done(null, user)
// // })

// // passport.deserializeUser(async (userId, done) => {
// //   console.log('Deserialized User:')
// //   console.log(userId)

// //   try {
// //     // Fetch the full user object from the database using the stored user ID
// //     const user = await sqlQuest.one(userQueries.getUserById, [userId])

// //     if (!user) {
// //       return done(null, false) // If no user is found, return false
// //     }

// //     return done(null, user)
// //   } catch (err) {
// //     done(err)
// //   }
// // })
