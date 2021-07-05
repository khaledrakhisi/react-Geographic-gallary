const { v4: uuid_v4 } = require("uuid");
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const User = require("../models/User");

// const USERS = [
//   {
//     id: "u1",
//     name: "khaled",
//     email: "khaledrakhisi@gmail.com",
//     password: "123",
//     imageUrl:
//       "https://www.nj.com/resizer/zovGSasCaR41h_yUGYHXbVTQW2A=/1280x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/SJGKVE5UNVESVCW7BBOHKQCZVE.jpg",
//     places: 3,
//   },
//   {
//     id: "u2",
//     name: "fabian",
//     email: "fabian@mcmde.com",
//     password: "123",
//     imageUrl:
//       "https://cdn2.vectorstock.com/i/1000x1000/49/86/man-character-face-avatar-in-glasses-vector-17074986.jpg",
//     places: 15,
//   },
// ];

const getAllUsers = async (req, res, next) => {
  //console.log("GET request in places");

  let users = null;
  try {
    users = await User.find();
  } catch (err) {
    console.log(err);
    return next(new HttpError("users: something's wrong with the database!", 500));
  }

  if(!users || users.length === 0){
    return next(new HttpError("no user found.", 500));
  }

  res.status(200).json(users);
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
  const result = validationResult(req).formatWith(
    ({ location, msg, param, value, nestedErrors }) => {
      // Build your resulting errors however you want! String, object, whatever - it works!
      return `${param} has ${msg} >>> ${value}`;
    }
  );
  if (!result.isEmpty()) {
    // Response will contain something like
    // { errors: [ "body[password]: must be at least 10 chars long" ] }
    // return res.json({ errors: result.array() });
    let errorMessage = "";
    result.array().forEach((element) => {
      errorMessage += element + "\n";
    });
    throw new HttpError(errorMessage, 422);
  }

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

const addUser = async (req, res, next) => {
  const result = validationResult(req).formatWith(
    ({ location, msg, param, value, nestedErrors }) => {
      // Build your resulting errors however you want! String, object, whatever - it works!
      return `${param} has ${msg} >>> ${value}`;
    }
  );
  if (!result.isEmpty()) {
    // Response will contain something like
    // { errors: [ "body[password]: must be at least 10 chars long" ] }
    // return res.json({ errors: result.array() });
    let errorMessage = "";
    result.array().forEach((element) => {
      errorMessage += element + "\n";
    });
    return next(new HttpError(errorMessage, 422));
  }

  const { name, email, password, imageUrl } = req.body;
  // const user = USERS.find((item) => item.email === email);
  let user = null;
  try{
    user = await User.find({email:email});
    console.log(user);
  }catch(err){
    console.log(err);
    return next(new HttpError("something's wront with the database.", 500));
  }
  if (user && user.length > 0) {
    // 422 : invalid user input
    return next(new HttpError("the email provided isn't available.", 422));
  }
  user = new User({
    name,
    email,
    password,
    imageUrl,
    places: 0,
  });

  try{
    user = await user.save();
  }catch(err){
    console.log(err);
    return next(new HttpError("something's wront with the database.", 500));
  }
  // USERS.push({
  //   id: uuid_v4(),
  //   name, // name : name
  //   email, // email : email
  //   password, // password : password
  //   imageUrl, // imageUrl : imageurl
  //   places: 0,
  // });

  res.status(201).json({ user: user.toObject({getters:true}) });
};

exports.getAllUsers = getAllUsers;
exports.getUserById = getUserById;
exports.getUserByName = getUserByName;
exports.addUser = addUser;
