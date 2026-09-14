import { INavbarListItemData } from './@types';
import { UserType } from 'src/graphql/generated';
import HomeMenuIcon from './../../../../../assets/icons/homeMenu';
import SettingMenuIcon from 'src/assets/icons/settingMenu';
import PeopleMenuIcon from 'src/assets/icons/peopleMenu';
import PaymentMenuIcon from 'src/assets/icons/paymentMenu';
import ComplaintMenuIcon from 'src/assets/icons/complaintMenu';
import AnnouncementMenuIcon from 'src/assets/icons/announcementMenu';
import AlertSystemMenuIcon from 'src/assets/icons/alertSystemMenu';
import GateManagementIcon from 'src/assets/icons/gateManagement';
import ServicesMenuIcon from 'src/assets/icons/servicesMenuIcon';
import CheckinIcon from 'src/assets/icons/checkin';
import RequestmenuIcon from 'src/assets/icons/requestmenu';
import Taskmenu from 'src/assets/icons/taskmenu';
import Mystaffmenu from 'src/assets/icons/mystaffmenu';

const DATA: { [key: string]: INavbarListItemData[] } = {
    [UserType.SuperAdmin]: [
        {
            title: 'Dashboard',
            Icon: HomeMenuIcon,
            link: '/admin'
        },
        {
            title: 'Configuration',
            Icon: SettingMenuIcon,
            subItems: [
                {
                    title: 'Building configuration',
                    link: '/admin/configuration/building'
                },
                {
                    title: 'Department configuration',
                    link: '/admin/configuration/department'
                },
                {
                    title: 'Frequent visitor',
                    link: '/admin/configuration/visitors'
                }
            ]
        },
        {
            title: 'People management',
            Icon: PeopleMenuIcon,
            subItems: [
                {
                    title: 'Admin',
                    link: '/admin/people/admin'
                },
                {
                    title: 'Users',
                    link: '/admin/people/users'
                }
            ]
        },
        {
            title: 'Check-in/out',
            Icon: CheckinIcon,
            link: '/admin/checkin'
        },
        {
            title: 'Payment management',
            Icon: PaymentMenuIcon,
            link: '/admin/payment-management'
        },
        {
            title: 'Complaint',
            Icon: ComplaintMenuIcon,
            link: '/admin/complaint'
        },
        {
            title: 'Announcements',
            Icon: AnnouncementMenuIcon,
            link: '/admin/announcements'
        },
        {
            title: 'Alert system',
            Icon: AlertSystemMenuIcon,
            link: '/admin/alert-system'
        },
        {
            title: 'Services',
            Icon: ServicesMenuIcon,
            link: '/admin/services'
        }
    ],
    [UserType.ComplexManager]: [
        {
            title: 'Dashboard',
            Icon: HomeMenuIcon,
            link: '/admin'
        },
        {
            title: 'Configuration',
            Icon: SettingMenuIcon,
            subItems: [
                {
                    title: 'Department configuration',
                    link: '/admin/configuration/department'
                },
                {
                    title: 'Frequent visitor',
                    link: '/admin/configuration/visitors'
                }
            ]
        },
        {
            title: 'People management',
            Icon: PeopleMenuIcon,
            subItems: [
                {
                    title: 'Users',
                    link: '/admin/people/users'
                }
            ]
        },
        {
            title: 'Check-in/out',
            Icon: CheckinIcon,
            link: '/admin/checkin'
        },
        {
            title: 'Payment management',
            Icon: PaymentMenuIcon,
            link: '/admin/payment-management'
        },
        {
            title: 'Complaint',
            Icon: ComplaintMenuIcon,
            link: '/admin/complaint'
        },
        {
            title: 'Announcements',
            Icon: AnnouncementMenuIcon,
            link: '/admin/announcements'
        },
        {
            title: 'Alert system',
            Icon: AlertSystemMenuIcon,
            link: '/admin/alert-system'
        }
    ],
    [UserType.Resident]: [
        {
            title: 'Dashboard',
            Icon: HomeMenuIcon,
            link: '/resident'
        },
        {
            title: 'Gate management',
            Icon: GateManagementIcon,
            subItems: [
                {
                    title: 'Delivery',
                    link: '/resident/gate-management/delivery'
                },
                {
                    title: 'Visitor',
                    link: '/resident/gate-management/visitor'
                },
                {
                    title: 'Cab',
                    link: '/resident/gate-management/cab'
                }
            ]
        },
        {
            title: 'Payments',
            Icon: PaymentMenuIcon,
            link: '/resident/payment-management'
        },
        {
            title: 'Complaint',
            Icon: ComplaintMenuIcon,
            link: '/resident/complaint'
        },
        {
            title: 'Services',
            Icon: ServicesMenuIcon,
            link: '/resident/services'
        }
    ],
    [UserType.AuthorizedUser]: [
        {
            title: 'Dashboard',
            Icon: HomeMenuIcon,
            link: '/resident'
        },
        {
            title: 'Gate management',
            Icon: GateManagementIcon,
            subItems: [
                {
                    title: 'Delivery',
                    link: '/resident/gate-management/delivery'
                },
                {
                    title: 'Visitor',
                    link: '/resident/gate-management/visitor'
                },
                {
                    title: 'Cab',
                    link: '/resident/gate-management/cab'
                }
            ]
        },
        {
            title: 'Payments',
            Icon: PaymentMenuIcon,
            link: '/resident/payment-management'
        },
        {
            title: 'Complaint',
            Icon: ComplaintMenuIcon,
            link: '/resident/complaint'
        },
        {
            title: 'Services',
            Icon: ServicesMenuIcon,
            link: '/resident/services'
        }
    ],
    [UserType.Security]: [
        {
            title: 'Gate management',
            Icon: GateManagementIcon,
            link: '/security/gate-management'
        },
        {
            title: 'Check-in/out',
            Icon: CheckinIcon,
            link: '/security/staff'
        },
        {
            title: 'Announcements',
            Icon: AnnouncementMenuIcon,
            link: '/security/announcements'
        },
        {
            title: 'Alert system',
            Icon: AlertSystemMenuIcon,
            link: '/security/alert-system'
        }
    ],
    ['staffmanager']: [
        {
            title: 'Check-in/out',
            Icon: CheckinIcon,
            link: '/staff/checkin'
        },
        {
            title: 'Requests',
            Icon: RequestmenuIcon,
            link: '/staff/requestmanager'
        },

        {
            title: 'Tasks',
            Icon: Taskmenu,
            link: '/staff/tasks'
        },
        {
            title: 'My staff',
            Icon: Mystaffmenu,
            link: '/staff/mystaff'
        }
    ],
    [UserType.Staff]: [
        {
            title: 'Check-in/out',
            Icon: CheckinIcon,
            link: '/staff/checkin'
        },
        {
            title: 'Requests',
            Icon: RequestmenuIcon,
            link: '/staff/request'
        },

        {
            title: 'Tasks',
            Icon: Taskmenu,
            link: '/staff/tasks'
        }
    ],
    ['BlockManager']: [
        {
            title: 'Dashboard',
            Icon: HomeMenuIcon,
            link: '/admin'
        },

        {
            title: 'People management',
            Icon: PeopleMenuIcon,
            subItems: [
                {
                    title: 'Users',
                    link: '/admin/people/users'
                }
            ]
        },

        {
            title: 'Payment management',
            Icon: PaymentMenuIcon,
            link: '/admin/payment-management'
        },
        {
            title: 'Complaint',
            Icon: ComplaintMenuIcon,
            link: '/admin/complaint'
        },
        {
            title: 'Announcements',
            Icon: AnnouncementMenuIcon,
            link: '/admin/announcements'
        },
        {
            title: 'Alert system',
            Icon: AlertSystemMenuIcon,
            link: '/admin/alert-system'
        }
    ]
};

export default DATA;
