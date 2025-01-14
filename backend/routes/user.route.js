import express from "express"
import { editProfile, followOrUnfollow, getProfile, getSuggestedUsers, login, logout, register } from "../controllers/user.controller.js"
import isAuthenticated from "../middlewares/isAuthenticated.js"
import upload from "../middlewares/multer.js"

const router=express.Router()

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/logout').get(logout)
router.route('/:id/profile').get(isAuthenticated,getProfile)
router.route('/profile/edit').get(isAuthenticated,upload.single('profilePicture'),editProfile)
router.route('/suggestedUser').get(isAuthenticated,getSuggestedUsers)
router.route('/followOrUnfollow/:id').get(isAuthenticated,followOrUnfollow)

export default router