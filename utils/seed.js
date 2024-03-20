const connection = require("../config/connection");
const { User, Thought, Friend } = require("../models");
const {
  getRandomName,
  getRandomFriends,
  getRandomThoughts,
  getRandomThoughtText,
} = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");
  // Delete the collections if they exist
  let thoughtCheck = await connection.db
    .listCollections({ name: "thoughts" })
    .toArray();
  if (thoughtCheck.length) {
    await connection.dropCollection("thoughts");
  }

  let usersCheck = await connection.db
    .listCollections({ name: "users" })
    .toArray();
  if (usersCheck.length) {
    await connection.dropCollection("users");
  }

  // Create empty array to hold the users
  const users = [];
  const thoughtsArray = [];
  const friendsArray = [];

  // Loop 20 times -- add friends to the users array
  for (let i = 0; i < 20; i++) {
    // Get some random friend objects using a helper function that we imported from ./data
    const friends = getRandomFriends(20);
    const friendId = i;
    const friendUsername = getRandomName();
    /*    const  = fullName.split(" ")[0];
         const github = `${first}${Math.floor(Math.random() * (99 - 18 + 1) + 18)}`;
     */
    users.push({
      friendId,
      friendUsername,
      friends,
    });
  }

  // Loop 20 times -- add thoughttext to the thoughtsArray
  for (let i = 0; i < 20; i++) {
    // Get some random friend objects using a helper function that we imported from ./data
    const thoughts = getRandomThoughts(20);
    const thoughtId = i;
    const thoughtText = getRandomThoughtText();
    const postDate = new Date();
    /*    const  = fullName.split(" ")[0];
         const github = `${first}${Math.floor(Math.random() * (99 - 18 + 1) + 18)}`;
     */
    thoughtsArray.push({
      thoughtId,
      thoughtText,
      postDate,
    });
  }

  // Add users to the collection and await the results
  await User.collection.insertMany(users);

  // Add thoughts to the collection and await the results
  await Thought.collection.insertOne({
    thoughtName: "I'm going to college!",
    users: [...users],
  });

  // Log out the seed data to indicate what should appear in the database
  console.log("Users:");
  console.table(users);
  console.log("Thoughts:");
  console.table(thoughtsArray);
  /* console.log("Friends:");
  console.table(friends); */
  console.info("Seeding complete! 🌱");
  process.exit(0);
});
