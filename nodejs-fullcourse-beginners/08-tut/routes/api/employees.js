const express = require("express");
const router = express.Router();
const path = require("path");
const data = {};
//data.employees = require("../../data/employees.json");
data.employees = require(path.join(
  __dirname,
  "..",
  "..",
  "data",
  "employees.json"
));

router
  .route("/")
  .get((req, res) => {
    res.json(data.employees);
  })
  .post((req, res) => {
    const newEmployee = {
      id: data.employees[data.employees.length - 1].id + 1 || 1,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    };
    data.employees.push(newEmployee);
    res.status(201).json(newEmployee);
  })
  .put((req, res) => {
    res.status(201).json({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    });
  })
  .delete((req, res) => {
    res.status(501).json({ message: "Not implemented" });
  });

router.route("/:id")
  .get((req, res) => {
    const employee = data.employees.find(
      (employee) => employee.id === parseInt(req.params.id)
    );
    res.json(employee || { message: "Employee not found" });
  })
  .put((req, res) => {
    const employee = data.employees.find(
      (employee) => employee.id === parseInt(req.params.id)
    );
    employee.firstname = req.body.firstname;
    employee.lastname = req.body.lastname;
    res.json(employee) || { message: "Employee not found" };
  })
  .delete((req, res) => {
    const employee = data.employees.find(
      (employee) => employee.id === parseInt(req.params.id)
    );
    res.json(employee || { message: "Employee not found" });
  });

module.exports = router;
