const router = require("express").Router()
const bcrypt = require('bcryptjs')
const User = require("../models/User.model")
const { isLoggedOut, isLoggedIn } = require("../middleware/route-guard")
const saltRounds = 10

// Signup
router.get('/signup', isLoggedOut, (req, res, next) => res.render('auth/signup'))
router.post('/signup', isLoggedOut, (req, res, next) => {

    const { email, userPwd, username, profileImg, description } = req.body

    bcrypt
        .genSalt(saltRounds)
        .then(salt => bcrypt.hash(userPwd, salt))
        .then(hashedPassword => User.create({ email, username, profileImg, description, password: hashedPassword }))
        .then(createdUser => res.redirect('/'))
        .catch(error => next(error))
})



// Login
router.get('/logIn', isLoggedOut, (req, res, next) => res.render('auth/login'))
router.post('/logIn', isLoggedOut, (req, res, next) => {

    const { email, userPwd } = req.body

    User
        .findOne({ email })
        .then(user => {
            if (!user) {
                res.render('auth/login', { errorMessage: 'Email no registrado en la Base de Datos' })
                return
            } else if (bcrypt.compareSync(userPwd, user.password) === false) {
                res.render('auth/login', { errorMessage: 'La contraseña es incorrecta' })
                return
            } else {
                req.session.currentUser = user
                res.redirect('/')
            }
        })
        .catch(error => next(error))
})


// Logout
router.post('/logOut', isLoggedIn, (req, res, next) => {
    req.session.destroy(() => res.redirect('/'))
})

module.exports = router
