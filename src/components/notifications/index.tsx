import COLORS from '@/utils/theme/colors';
import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import {
    useNotificationsGetQuery,
    UserType,
    useNotification_ReadNotificationMutation,
    NotificationType,
    SortEnumType,
    useUser_GetCurrentStaffQuery
} from 'src/graphql/generated';
import CardPage from '../cardPage';
import { notificationTypeData } from './data';
import moment from 'moment';
import * as S from './notifications.style';
import Utils from '@/utils/utils';
import { useGetUser } from 'src/auth/UserProvider';
import useMutationErrorHandler from 'src/hooks/useMutationErrorHandler';
import { useRouter } from 'next/router';
const Notification = () => {
    const notificationQuery = useNotificationsGetQuery({
        take: 1000,
        where: { isSeen: { eq: false } },
        order: { id: SortEnumType.Desc }
    });
    const { mutate, isLoading } = useNotification_ReadNotificationMutation();
    const mutationErrorHandler = useMutationErrorHandler();
    const router = useRouter();
    const user = useGetUser();
    const hasUser = typeof user === 'object' && user !== null;
    const datauser = useUser_GetCurrentStaffQuery(undefined, {
        enabled: hasUser && user.userType === UserType.Staff
    });

    const alerturl =
        user.userType === UserType.SuperAdmin || user.userType === UserType.ComplexManager
            ? '/admin/alert-system/'
            : user.userType === UserType.Security
            ? '/security/alert-system/'
            : '#';
    const RequestStatusurl =
        user.userType === UserType.Staff &&
        datauser?.data?.user_getCurrentStaff?.result?.departmentManagers?.length > 0
            ? '/resident/requestmanager/'
            : user.userType === UserType.Staff
            ? '/staff/request/'
            : '#';
    const Announcementsurl =
        user.userType === UserType.SuperAdmin || user.userType === UserType.ComplexManager
            ? '/admin/announcements/'
            : user.userType === UserType.Security
            ? '/security/announcements/'
            : user.userType === UserType.AuthorizedUser || user.userType === UserType.Resident
            ? '/resident/'
            : '#';
    const Announcementtab =
        user.userType === UserType.SuperAdmin || user.userType === UserType.ComplexManager
            ? 'AnnouncementsBoard'
            : user.userType === UserType.Security
            ? ''
            : user.userType === UserType.AuthorizedUser || user.userType === UserType.Resident
            ? ''
            : '';
    const complainturl =
        user.userType === UserType.SuperAdmin || user.userType === UserType.ComplexManager
            ? '/admin/complaint/'
            : user.userType === UserType.AuthorizedUser || user.userType === UserType.Resident
            ? '/resident/complaint/'
            : '#';
    const paymenturl =
        user.userType === UserType.Resident || user.userType === UserType.AuthorizedUser
            ? '/resident/payment-management/'
            : '/admin/payment-management/';
    const complainttab =
        user.userType === UserType.SuperAdmin || user.userType === UserType.ComplexManager
            ? 'Complaint'
            : user.userType === UserType.AuthorizedUser || user.userType === UserType.Resident
            ? ''
            : '';
    const readtext = (id, notificationType) => {
        mutate(
            {
                id: Number(id)
            },
            {
                onSuccess: (result) => {
                    router.push({
                        pathname:
                            notificationType === NotificationType.NewAlert
                                ? alerturl
                                : notificationType === NotificationType.NewAnnouncement
                                ? Announcementsurl
                                : notificationType === NotificationType.NewComplaint
                                ? complainturl
                                : notificationType === NotificationType.NewPayment ||
                                  notificationType === NotificationType.DueInTheNextThreeDays ||
                                  notificationType === NotificationType.DueInToday
                                ? paymenturl
                                : notificationType === NotificationType.NewServiceRequest
                                ? RequestStatusurl
                                : notificationTypeData?.[notificationType].link,
                        query: {
                            tab:
                                notificationType === NotificationType.NewAlert
                                    ? ''
                                    : notificationType === NotificationType.NewAnnouncement
                                    ? Announcementtab
                                    : notificationType === NotificationType.NewComplaint
                                    ? complainttab
                                    : notificationTypeData?.[notificationType].tab
                        }
                    });
                },
                onError: (err) => {
                    mutationErrorHandler(err, 'notification_readNotification');
                }
            }
        );
    };
    return (
        <CardPage>
            <S.NotificationTitle>Notification</S.NotificationTitle>

            <Box>
                {!notificationQuery.isLoading &&
                    notificationQuery.data.notification_getNotifications.result.items.map(
                        (item, index) => (
                            <div
                                onClick={() => {
                                    readtext(item.id, item.notificationType);
                                }}
                                key={index}>
                                <S.NotificationItem>
                                    <Box
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="space-between">
                                        <Typography variant="h6" color={COLORS.black1}>
                                            {item.notificationType !== 'NEW_RESIDENT_FLAT'
                                                ? notificationTypeData?.[item.notificationType]
                                                      .title
                                                : item.residentFlat.resident.firstName +
                                                  ' ' +
                                                  item.residentFlat.resident.lastName +
                                                  notificationTypeData?.[item.notificationType]
                                                      .title}
                                        </Typography>

                                        <Typography variant="subtitle2" color="#C3C3C3">
                                            {item.createdDate.slice(0, 10).replaceAll('-', '/')}
                                        </Typography>
                                    </Box>

                                    <Box
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="space-between"
                                        marginTop="15px">
                                        <Typography variant="body1" color={COLORS.grey3}>
                                            {
                                                notificationTypeData?.[item.notificationType]
                                                    .description
                                            }
                                        </Typography>

                                        <Typography variant="subtitle2" color={COLORS.info}>
                                            {'See more >'}
                                        </Typography>
                                    </Box>
                                </S.NotificationItem>
                            </div>
                        )
                    )}
            </Box>
        </CardPage>
    );
};

export default Notification;
