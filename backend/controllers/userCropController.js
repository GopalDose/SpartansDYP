const UserCrop = require("../models/crop");

exports.getAllUserCrops = async (req, res) => {
  try {
    
    const userCrops = await UserCrop.find();
    res.json(userCrops);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user crops", error });
  }
};

exports.getCropByUserId = async (req, res) => {
  try {
      const { userid } = req.query; 

      if (!userid) {
          return res.status(400).json({ message: "User ID is required" });
      }

      // Convert userid to ObjectId
      const objectId = new mongoose.Types.ObjectId(userid);

      const userCrops = await UserCrop.find({ userid: objectId });

      if (userCrops.length === 0) {
          return res.status(404).json({ message: "No crops found for this user" });
      }

      res.status(200).json(userCrops);
  } catch (error) {
      res.status(500).json({ message: "Error getting user crops", error });
  }
};



exports.createUserCrop = async(req,res) => {
    try {
       const {name,userid,acres} = req.body
       const userCrop = new UserCrop({name,userid,acres});
       userCrop.save()
       res.status(200).json(userCrop)
       
    } catch (error) {
        res.status(500).json({message : "Error creating user crop" ,userCrop})
    }
}

exports.deactivateUserCrop = async(req,res) =>{
  try {
    const {userid} = req.body
    const id = req.params.id
    const userCrop = await UserCrop.find({userid,id})
    if(!userCrop) return res.json({error : "crop not found"}).status(404)
    userCrop.updateOne({state:!userCrop.state})
    res.json(userCrop).status(200)
  } catch (error) {
    res.json({message : "Error occurred could not deactivate user crop",error}).status(500)
  }
}

exports.updateUserCrop = async(req,res) => {
  try {
  
    const userCrop = await UserCrop.findByIdAndUpdate(req.params.id,req.body,{
      new:true,
    })

    if(!userCrop) res.json({error : "crop not found"}).status(404)
    userCrop.updateOne()
    res.json(userCrop).status(200)
  } catch (error) {
    res.json({message : "Error occurred could not find the crop",error}).status(500)
  }
}

exports.deleteUserCrop = async(req,res) => {
  try {
    const deletedUserCrop = await UserCrop.findByIdAndDelete(req.params.id);
    if (!deletedUserCrop)
      return res.status(404).json({ message: "User Crop not found" });
    res.json(deletedUserCrop).status(200);

  } catch (error) {
    res.json({message: "Error Crop cannot be deleted",error}).status(500);
  }
}