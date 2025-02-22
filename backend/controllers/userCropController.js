const UserCrop = require("../models/crop");

exports.getAllUserCrops = async (req, res) => {
  try {
    const userCrops = await UserCrop.find();
    res.json(userCrops);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user crops", error });
  }
};

exports.getCropByUserId =  async(req,res) => {
    try{
        const userCrop = await UserCrop.find(req.params.id)
        if (!userCrop) return res.status(404).json({ message: "User Crop not found" });
        res.json(userCrop);

    }catch(error){
        res.status(500).json({message : "Error getting user crop ", error})
    }
}


exports.createUserCrop = async(req,res) => {
    try {
       const {name,userid,acres} = req.body
       const userCrop = new UserCrop({name,userid,acres});
       userCrop.save()
       res.status(201).json(userCrop)
       
    } catch (error) {
        res.status(500).json({message : "Error creating user crop" ,userCrop})
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