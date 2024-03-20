const userNames = [
  "Aaran",
  "Aaren",
  "Aarez",
  "Aarman",
  "Aaron",
  "Aaron-James",
  "Aarron",
  "Aaryan",
  "Aaryn",
  "Aayan",
  "Aazaan",
  "Abaan",
  "Abbas",
  "Abdallah",
  "Abdalroof",
  "Abdihakim",
  "Abdirahman",
  "Abdisalam",
  "Abdul",
  "Abdul-Aziz",
  "Abdulbasir",
  "Abdulkadir",
  "Abdulkarem",
  "Smith",
  "Jones",
  "Coollastname",
  "enter_name_here",
  "Ze",
  "Zechariah",
  "Zeek",
  "Zeeshan",
  "Zeid",
  "Zein",
  "Zen",
  "Zendel",
  "Zenith",
  "Zennon",
  "Zeph",
  "Zerah",
  "Zhen",
  "Zhi",
  "Zhong",
  "Zhuo",
  "Zi",
  "Zidane",
  "Zijie",
  "Zinedine",
  "Zion",
  "Zishan",
  "Ziya",
  "Ziyaan",
  "Zohaib",
  "Zohair",
  "Zoubaeir",
  "Zubair",
  "Zubayr",
  "Zuriel",
  "Xander",
  "Jared",
  "Courtney",
  "Gillian",
  "Clark",
  "Jared",
  "Grace",
  "Kelsey",
  "Tamar",
  "Alex",
  "Mark",
  "Tamar",
  "Farish",
  "Sarah",
  "Nathaniel",
  "Parker",
];

const thoughtText = [
  "Love rock music",
  "Bouncy bouncy!",
  "Where did I put my keys?",
  "My clock is broke",
  "It's almost dinner time",
  "It's really windy",
  "My chair is comfy",
  "Metric system!",
  "Anyone want a gym buddy",
  "jogging is great",
  "Ice Ice Baby",
  "Hammertime",
  "I need a break",
  "Newspapers are outdated",
  "Water is the best",
  "I'm almost done my homework",
  "Need. Coffee.",
  "New shoes!",
  "Mmmmm candy",
  "Listening to music",
  "Watching movies",
  "I'm reading",
  "Rain Rain Go Away",
  "The sun is shining",
  "It's hot outside",
  "Cool beans",
  "I want juice",
  "I am thirsty",
  "My dad took my jacket",
  "Where is my jacket?",
  "I want to play video games",
  "My carpet needs cleaning",
  "ZeinI have too many cables",
  "There is a lot of snow",
  "My desk is messy",
  "My hand is cold",
  "My keyboard is black",
  "the curtains are dirty",
  "My socks aren't matching",
  "My hat is red",
  "Yellow socks rule",
  "Red socks rule",
  "Blue socks rule",
  "Now I'm home",
  "Boys can do that too",
  "Girls can do that too",
  "My dog is barking",
  "My cat is super cute",
  "My brother is annoying",
  "Why doesn't this work?",
  "No one wants to go outside",
  "My hair is tangled",
  "My project is due soon",
  "My kid is crazy",
  "I already ate my lunch",
  "Where'd my pen go?",
  "I'm going bald!",
  "You need to add more names",
  "Random thoughts",
  "Force of Nature",
  "Hey there",
  "Dad went to the store",
  "Where is my car?",
  "Why did my mom say that",
  "How come this is here?",
  "My car is broken",
  "I'm hungry",
  "How could he say that!?",
  "Today is beautiful",
  "My favourite thought",
  "Another boring day",
  "Ewww, weather",
  "I like sunshine",
];

const friends = [
  "Aaran2",
  "Aaren2",
  "Aarez2",
  "Aarman2",
  "Aaron2",
  "Aaron-James2",
  "Aarron2",
  "Aaryan2",
  "Aaryn2",
  "Aayan2",
  "Aazaan2",
  "Abaan2",
  "Abbas2",
  "Abdallah2",
  "Abdalroof2",
  "Abdihakim2",
  "Abdirahman2",
  "Abdisalam2",
  "Abdul2",
  "Abdul-Aziz2",
  "Abdulbasir2",
  "Abdulkadir2",
  "Abdulkarem2",
  "Smith2",
  "Jones2",
  "Coollastname2",
  "enter_name_here2",
  "Ze2",
  "Zechariah2",
  "Zeek2",
  "Zeeshan2",
  "Zeid2",
  "Zein2",
  "Zen2",
  "Zendel2",
  "Zenith2",
  "Zennon2",
  "Zeph2",
  "Zerah2",
  "Zhen2",
  "Zhi2",
  "Zhong2",
  "Zhuo2",
  "Zi2",
  "Zidane2",
  "Zijie2",
  "Zinedine2",
  "Zion2",
  "Zishan2",
  "Ziya2",
  "Ziyaan2",
  "Zohaib2",
  "Zohair2",
  "Zoubaeir2",
  "Zubair2",
  "Zubayr2",
  "Zuriel2",
  "Xander2",
  "Jared2",
  "Courtney2",
  "Gillian2",
  "Clark2",
  "Jared2",
  "Grace2",
  "Kelsey2",
  "Tamar2",
  "Alex2",
  "Mark2",
  "Tamar2",
  "Farish2",
  "Sarah2",
  "Nathaniel2",
  "Parker2",
];

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random username
const getRandomName = () => `${getRandomArrItem(userNames)}`;

// Gets a random thoughttext
const getRandomThoughtText = () => `${getRandomArrItem(thoughtText)}`;

// Function to generate random friends that we can add to user object.

//populates the friends array with random names in the User model
const getRandomFriends = (int) => {
  const results = [];
  for (let i = 0; i < int; i++) {
    results.push(getRandomName()); // Push a random username into the results array
  }
  return results;
};
// Populates random thoughts to thought table in User model
const getRandomThoughts = (int) => {
  const results = [];
  for (let i = 0; i < int; i++) {
    results.push(getRandomThoughtText()); // Push a random thought into the results array
  }
  return results;
};
/* const getRandomFriends = (int) => {
  const results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      userNames: getRandomArrItem(friends),
 
    });
  }
  return results;
}; */

// Export the functions for use in seed.js
module.exports = {
  getRandomName,
  getRandomFriends,
  getRandomThoughts,
  getRandomThoughtText,
};
