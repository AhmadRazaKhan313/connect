const allRoles = {
  platformSuperAdmin: [],
  orgSuperAdmin: [],
  orgAdmin: [],
  orgStaff: [],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};