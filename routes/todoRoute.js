const express = require("express");
const {createTodoController}=require('../controllers/todoController.js')
const {getTodoController}=require('../controllers/todoController.js')
const {deleteTodoController}=require('../controllers/todoController.js')
const {updateTodoController}=require('../controllers/todoController.js')
const authMiddleware=require('../middlewares/authMiddleware.js')
const router=express.Router();
router.post('/create',authMiddleware,createTodoController)
router.post('/getAll/:userId',authMiddleware,getTodoController)
router.delete('/delete/:id',authMiddleware,deleteTodoController)
router.patch('/update/:id',authMiddleware,updateTodoController)
module.exports=router;
