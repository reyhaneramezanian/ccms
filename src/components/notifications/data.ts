import { NotificationType } from 'src/graphql/generated';

export const notificationTypeData = {
    [NotificationType.DueInTheNextThreeDays]: {
        title: 'The bills are due in 3 days',
        title2: 'The service bill is due in 3 days',
        link: '/payments',
        tab: ''
    },
    [NotificationType.DueInToday]: {
        title: 'The bills are due today',
        title2: 'The service bill is due today',
        link: '/payments',
        tab: ''
    },
    [NotificationType.GateApprovalApproved]: {
        title: 'Your delivery person has made it inside the complex',
        title2: 'GateApprovalApproved desc',
        link: '#',
        tab: ''
    },
    [NotificationType.GateApprovalRejected]: {
        title: 'GateApprovalRejected title',
        title2: 'GateApprovalRejected desc',
        link: '/payments',
        tab: ''
    },
    [NotificationType.NewAlert]: {
        title: 'A new alert has been raised',
        title2: 'NewAlert desc',
        link: '/payments',
        tab: ''
    },
    [NotificationType.NewAnnouncement]: {
        title: 'A new announcement has been posted',
        title2: 'NewAnnouncement desc',
        link: '/payments',
        tab: ''
    },
    [NotificationType.NewComplaint]: {
        title: 'A new complaint has been received',
        title2: 'NewComplaint desc',
        link: '/payments',
        tab: ''
    },
    [NotificationType.NewGateApproval]: {
        title: 'A delivery person is at the gate',
        title2: 'A delivery person is at the gate',
        link: '/security/gate-management/',
        tab: ''
    },
    [NotificationType.NewPayment]: {
        title: 'NewPayment title',
        title2: 'NewPayment desc',
        link: '/admin/payment-management',
        tab: ''
    },
    [NotificationType.NewResidentFlat]: {
        title: 'has added a new flat',
        title2: 'NewResidentFlat desc',
        link: '/admin/people/users/',
        tab: 'Peroperty+approval'
    },
    [NotificationType.RequestStatusChanged]: {
        title: 'The staff accepted your service request',
        title2: 'RequestStatusChanged desc',
        link: '/resident/services/',
        tab: 'Service+approval'
    },
    [NotificationType.UserSignup]: {
        title: 'A new user has been added',
        title2: 'UserSignup desc',
        link: '/admin/people/users/',
        tab: 'User+approval'
    },
    [NotificationType.NewServiceRequest]: {
        title: 'A new Service Request',
        title2: 'UserSignup desc',
        link: '/admin/people/users/',
        tab: 'User+approval'
    }
};
