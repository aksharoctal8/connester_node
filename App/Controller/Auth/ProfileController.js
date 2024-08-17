import User from "../../Model/User.js";
import {getUserLoginId  } from '../../Helper/Helper.js'
const profile = async(req,res)=>{
    try {       
        const userId = await getUserLoginId(req);
        console.log("User ID:", userId);
        
        const userProfile = await User.findById(userId).select('_id name email');
        console.log("User Profile:", userProfile);
        if (!userProfile) {
          return res.status(404).json({ message: "User not found" });
        }
        res.json({ profie: userProfile });
    } catch (error) {
        console.log(error); 
    }
}
export default {
    profile
}