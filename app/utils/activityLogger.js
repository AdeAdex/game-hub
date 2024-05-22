import Activity from "../models/activity";

const logActivity = async (userId, device, location) => {
  const activity = new Activity({
    userId,
    type: "login",
    description: "You logged in",
    device,
    location,
  });
  await activity.save();
};

export default logActivity;
