const HttpError = require("../models/http-error");
const { v4: uuid_v4 } = require("uuid");

const USERS = [
  {
    id: "u1",
    name: "khaled",
    email: "khaledrakhisi@gmail.com",
    password: "123",
    imageUrl:
      "https://www.nj.com/resizer/zovGSasCaR41h_yUGYHXbVTQW2A=/1280x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/SJGKVE5UNVESVCW7BBOHKQCZVE.jpg",
    places: 3,
  },
  {
    id: "u2",
    name: "fabian",
    email: "fabian@mcmde.com",
    password: "123",
    imageUrl:
      "https://cdn2.vectorstock.com/i/1000x1000/49/86/man-character-face-avatar-in-glasses-vector-17074986.jpg",
    places: 15,
  },
];

const getAllUsers = (req, res, next) => {
  //console.log("GET request in places");
  res.json(USERS);
};

const getUserById = (req, res, next) => {
  const userId = req.params.userId; //{placeid:"the value"}
  const user = USERS.find((item) => item.id === userId);

  if (!user) {
    throw new HttpError("user not found.", 404);
  }

  res.status(200).json({ user });
};

const getUserByName = (req, res, next) => {
  const { email, password } = req.body;
  const user = USERS.find((item) => item.email === email);

  if (!user || user.password !== password) {
    // 401 === authentication is failed
    throw new HttpError(
      "user not found. looks like the credentials are wrong.",
      401
    );
  }

  res.status(200).json({ msg: "signed in succeccfully." });
};

const addUser = (req, res, next) => {
  const { name, email, password, imageUrl } = req.body;

  const user = USERS.find((item) => item.email === email);
  if (user) {
    // 422 : invalid user input
    throw new HttpError("the email provided isn't available.", 422);
  }

  USERS.push({
    id: uuid_v4(),
    name, // name : name
    email, // email : email
    password, // password : password
    imageUrl, // imageUrl : imageurl
    places: 0,
  });

  res.status(201).json({ msg: "signed up and signed in." });
};

exports.getAllUsers = getAllUsers;
exports.getUserById = getUserById;
exports.getUserByName = getUserByName;
exports.addUser = addUser;
