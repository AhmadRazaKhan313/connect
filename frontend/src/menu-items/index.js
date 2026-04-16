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

// ==============================|| MENU ITEMS ||============================== //

const ADMIN = [dashboard, isps, staff, users, expenses, entries, invoices, extraIncome];
const STAFF = [dashboard, isps, users, expenses, entries, invoices, extraIncome];

const menuItems = {
    // items: [dashboard, pages, utilities, other]
    items: jwt.getUser().type === STAFF_TYPES.admin ? ADMIN : STAFF
};

export default menuItems;
