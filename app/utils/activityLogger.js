import Activity from "../models/activity";

const logActivity = async (userId, type, description, device, location) => {
  const activity = new Activity({
    userId,
    type,
    description,
    device,
    location,
  });
  await activity.save();
};

export default logActivity;
