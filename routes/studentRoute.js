const router = require("express").Router();

//import schema/model
let Student = require("../models/schema");

//add db
router.route("/add").post((req, res) => {
  const name = req.body.name;
  const age = Number(req.body.age);
  const gender = req.body.gender;

  //get schema template and insert name,age,gender
  const newStudent = new Student({
    name: name,
    age: age,
    gender: gender,
  });

  //insert this to db
  newStudent
    .save()
    .then(() => {
      res.json("Student added");
    })
    .catch((err) => {
      console.log(err);
    });
});

//read db

router.route("/").get((res, req) => {
  Student.find()
    .then((students) => {
      req.json(students);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/update/:id").put(async (req, res) => {
  let userId = req.params.id;
  const { name, age, gender } = req.body;

  //create new object to update doucument
  const updateStudent = {
    name: name,
    age: age,
    gender: gender,
  };

  //update
  const update = await Student.findByIdAndUpdate(userId, updateStudent)
    .then(() => {
      res.status(200).send({ status: "User Update" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ status: "error", error: err.message });
    });
});

router.route("/delete/:id").delete(async (req, res) => {
  let userId = req.params.id;
  await Student.findByIdAndDelete(userId)
    .then(() => {
      res.status(200).send({ status: "User Deleted" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ status: "error", error: err.message });
    });
});

module.exports = router;
