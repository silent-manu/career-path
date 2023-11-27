const path = require("path");
const data = {
  employees: require(path.join(__dirname, "..", "model", "employees.json")),
  setEmployees: function (data) { this.employees = data }
};

const getAllEmployees = (req, res) => {
  res.json(data.employees);
};

const createNewEmployee = (req, res) => {
  const newEmployee = {
    id: data.employees?.length
      ? data.employees[data.employees.length - 1].id + 1
      : 1,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  };

  if (!newEmployee.firstname || !newEmployee.lastname) {
    return res
      .status(400)
      .json({ message: "First and last names are required" });
  }

  console.log(newEmployee);
  console.log([...data.employees, newEmployee]);
  console.log(data.employees);
  data.setEmployees([...data.employees, newEmployee]);
  res.status(201).json(data.employees);
};

const updateEmployee = (req, res) => {
  const employee = data.employees.find(
    (employee) => employee.id === parseInt(req.body.id)
  );

  if (!employee) {
    return res.status(400).json({ message: "Employee not found" });
  }

  if (req.body.firstname) employee.firstname = req.body.firstname;
  if (req.body.lastname) employee.lastname = req.body.lastname;

  const filteredArray = data.employees.filter(
    (employee) => employee.id !== parseInt(req.body.id)
  );

  const unsortedArray = [...filteredArray, employee];
  data.setEmployees(unsortedArray.sort((a, b) => (a.id > b.id ? 1 : -1)));

  data.setEmployees(
    unsortedArray.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
  );
  res.status(201).json(data.employees);
};

const deleteEmployee = (req, res) => {
  const employee = data.employees.find(
    (employee) => employee.id === parseInt(req.body.id)
  );

  if (!employee) {
    return res.status(400).json({ message: "Employee not found" });
  }

  const filteredArray = data.employees.filter(
    (employee) => employee.id !== parseInt(req.body.id)
  );

  data.setEmployees([...filteredArray]);
  res.status(201).json(data.employees);
};

const getEmployee = (req, res) => {
  const employee = data.employees.find(
    (employee) => employee.id === parseInt(req.params.id)
  );

  if (!employee) {
    return res.status(400).json({ message: "Employee not found" });
  }
  
  res.status(201).json(employee);
};

module.exports = {
  getAllEmployees,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
};
