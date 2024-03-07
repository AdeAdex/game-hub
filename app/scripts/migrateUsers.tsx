// // scripts/migrateUsers.js

// import User from "../models/user";
// import { connectToDb } from "../utils/database";


// async function migrateUsers() {
//   try {
//     await connectToDb();

//     // Find all users without profilePicture field
//     const usersWithoutProfilePicture = await User.find({ profilePicture: { $exists: false } });

//     // Update each user to include profilePicture field
//     for (const user of usersWithoutProfilePicture) {
//       // You can set a default value for profilePicture if needed
//       user.profilePicture = 'adex'; // Or set a default image URL
//       await user.save();
//     }

//     console.log("Users migration completed successfully.");
//     process.exit(0); // Exit script after migration is completed
//   } catch (error) {
//     console.error("Error occurred during users migration:", error);
//     process.exit(1); // Exit with error status code
//   }
// }

// // Call the migration function
// migrateUsers();
