const User=require("../models/userModel")
const bcrypt=require("bcrypt");

const register = async(req, res) => {
    const {username,email,password}=req.body;
    const usernameCheck= await User.findOne({username}).lean().exec();
    if(usernameCheck){
        return res.json({msg:"username already in use",status: false})
    }
    const emailCheck = await User.findOne({ email }).lean().exec();
    if (emailCheck) {
        return res.json({ msg: "email already use", status: false })
    }

    const hashedPass=await bcrypt.hash(password,8);
    const user=await User.create({
        username,
        email,
        password:hashedPass
    });
    delete user.password;
    return res.json({status:true,user})
};


const login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username }).lean().exec();
    if (!user) {
        return res.json({ msg: "user does not exists", status: false })
    }
    const passwordIsValid=await bcrypt.compare(password,user.password);
    if(!passwordIsValid){
        return res.json({msg:"xxxx-password is not valid",status:false});
    }
    return res.json({ status: true, user })
};

const setAvatar = async (req, res) => {
    const userid=req.params.id;
    const avatarImage=req.body.image;
    const user=await User.findByIdAndUpdate(userid,{
        isAvatarImageSet:true,
        avatarImage:avatarImage
    },
        { new: true });
    return res.json({isSet:user.isAvatarImageSet,image:user.avatarImage})
}

const getAllUsers = async (req, res) => {
    const userId=req.params.id;
    const users=await User.find({_id:{$ne:userId}}).select([
        "email","username","avatarImage","_id"
    ]).lean().exec();
    return res.json(users);

}



module.exports = {register,login,setAvatar,getAllUsers};