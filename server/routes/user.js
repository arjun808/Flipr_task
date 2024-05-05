


const express= require("express")
const router = express.Router();
const {signup,login, changePassword, getAllUsers, deleteUser}=require("../controllers/Auth");
const { auth } = require("../middleware/auth");
router.post("/signup",signup)
router.post("/login",login)
router.post("/changePassword",auth,changePassword)
router.get("/allusers",getAllUsers);
router.delete("/deleteuser/:user_id",deleteUser);
module.exports=router;