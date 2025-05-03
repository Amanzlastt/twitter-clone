import Notification from "../models/notification.model.js"

export const getNotifications=async (req, res)=>{
    try {
        const userId = req.user._id
        const notifications = await Notification.find({ to: userId}).populate({
            path: "from",
            select: "username profileImg"
        });

        await Notification.updateMany({to:userId}, {read:true})
        res.status(200).json(notifications);

    } catch (error) {
        console.log("Error in get notification function: ", error);
        res.status(500).json({error : "Internal server error"});
    }
} 
export const deleteNotification=async(req, res)=>{
    try {
        const userId = req.user._id;

        await Notification.deleteMany({to : userId});

        res.status(200).json({message: "Notificaion deleted"})
    } catch (error) {
        console.log("Error in delete notification function: ", error);
        res.status(500).json({error : "Internal server error"});
    }
} 