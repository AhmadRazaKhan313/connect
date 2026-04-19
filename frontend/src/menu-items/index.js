import jwt from 'jwtservice/jwtService';
import { STAFF_TYPES } from 'utils/Constants';
import dashboard from './dashboard';
import entries from './entries';
import expenses from './expenses';
import invoices from './invoices';
import isps from './isps';
import staff from './staff';
import users from './users';
import extraIncome from './extra-income';
import organizations from './organizations';

const PLATFORM_SUPER_ADMIN = [dashboard, organizations, isps, staff, users, expenses, entries, invoices, extraIncome];

const getFilteredMenu = (type, role, orgFeatures) => {
//    const isAdmin = type === STAFF_TYPES.orgAdmin || type === STAFF_TYPES.orgSuperAdmin;
const isAdmin = type === 'orgAdmin' || type === 'orgSuperAdmin' || role === 'orgSuperAdmin';
   console.log("check detail",jwt.getUser())
    const menu = [dashboard];

    // orgFeatures null ho (load nahi hui abhi) toh sab show karo
    if (!orgFeatures) {
        if (isAdmin) return [dashboard, isps, staff, users, expenses, entries, invoices, extraIncome];
        return [dashboard, isps, users, entries];
    }

    if (orgFeatures?.ispManagement) menu.push(isps);
    if (isAdmin && orgFeatures?.staffManagement) menu.push(staff);
    menu.push(users);
    if (isAdmin && orgFeatures?.expenses) menu.push(expenses);
    menu.push(entries);
    if (isAdmin && orgFeatures?.invoicing) menu.push(invoices);
    if (isAdmin && orgFeatures?.extraIncome) menu.push(extraIncome);

    return menu;
};


export const getMenuItems = (orgFeatures) => {
    const role = jwt.getUser()?.role;
    const type = jwt.getUser()?.type;

    if (role === 'platformSuperAdmin') {
        return PLATFORM_SUPER_ADMIN;
    }

   return getFilteredMenu(type, role, orgFeatures);
};

// default export — initial render ke liye (orgFeatures load hone se pehle)
const menuItems = {
    items: []
};

export default menuItems;