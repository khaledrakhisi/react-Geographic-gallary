const USERS = [
  {
    id: "u1",
    name: "khaled",
    imageUrl:
      "https://www.nj.com/resizer/zovGSasCaR41h_yUGYHXbVTQW2A=/1280x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/SJGKVE5UNVESVCW7BBOHKQCZVE.jpg",
    places: 3,
  },
  {
    id: "u2",
    name: "fabian",
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
  //console.log("GET request in places");
  const user = USERS.find((u) => u.id === userId);
  res.json({ user });
};

exports.getAllUsers = getAllUsers;
exports.getUserById = getUserById;
