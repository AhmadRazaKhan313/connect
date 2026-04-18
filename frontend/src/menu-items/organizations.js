// assets
import { IconBuildingSkyscraper } from '@tabler/icons';
 
// ==============================|| ORGANIZATIONS MENU ITEMS ||============================== //
 
const organizations = {
    id: 'organizations',
    title: 'Organizations',
    type: 'group',
    children: [
        {
            id: 'all-organizations',
            title: 'All Organizations',
            type: 'item',
            url: '/dashboard/all-organizations',
            icon: IconBuildingSkyscraper,
            breadcrumbs: false
        }
    ]
};
 
export default organizations;
 