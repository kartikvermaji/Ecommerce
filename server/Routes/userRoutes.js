import express  from "express";
import { deleteUser, getAllUsers, getCurrentUser, getUser, updateCurrentUser, updateUser } from "../Controllers/userController.js";
import {verifyToken,verifyAdmin} from "../Middlewares/verifyToken.js"
const router=express.Router()

router.get('/',verifyToken,verifyAdmin,getAllUsers);

router.get('/profile',verifyToken,getCurrentUser);
router.post('/profile',verifyToken,updateCurrentUser);

router.get('/:id',verifyToken,verifyAdmin,getUser);
router.put('/:id',verifyToken,verifyAdmin,updateUser);
router.delete('/:id',verifyToken,verifyAdmin,deleteUser);


export default router 