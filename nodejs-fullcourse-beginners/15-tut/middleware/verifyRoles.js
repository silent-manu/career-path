const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.roles) {
      return res.sendStatus(401); //Unauthorized
    }

    const rolesArray = [...allowedRoles];
    const isRoleIncluded = req.roles.map((role) => rolesArray.includes(role));
    const result = isRoleIncluded.find((val) => val === true);

    if (!result) {
      return res.sendStatus(401); //Unauthorized
    }

    next();
  };
};

module.exports = verifyRoles;
