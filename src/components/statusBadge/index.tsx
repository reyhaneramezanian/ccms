import { FC } from 'react';
import { IStatusBadgeProps } from './types.statusBadge';
import * as S from './styles.statusBadge';

const StatusBadge: FC<IStatusBadgeProps> = ({ type }) => {
    switch (type) {
        case 'PENDDING':
        case 'PENDING':
            return <S.StatusBadgeWrapper type={type}>Pending</S.StatusBadgeWrapper>;

        case 'IN_PROGRESS':
            return <S.StatusBadgeWrapper type={type}>In progress</S.StatusBadgeWrapper>;
        case 'STAFF_ASIGNED':
            return <S.StatusBadgeWrapper type={type}>Staff asigned</S.StatusBadgeWrapper>;
        case 'MARKED_AS_DONE':
            return <S.StatusBadgeWrapper type={type}>Markrd as done</S.StatusBadgeWrapper>;

        case 'COMPLETED':
            return <S.StatusBadgeWrapper type={type}>Completed</S.StatusBadgeWrapper>;

        case 'PAID':
            return <S.StatusBadgeWrapper type={type}>Paid</S.StatusBadgeWrapper>;

        case 'UNPAID':
            return <S.StatusBadgeWrapper type={type}>Unpaid</S.StatusBadgeWrapper>;

        case 'APPROVED':
            return <S.StatusBadgeWrapper type={type}>Approved</S.StatusBadgeWrapper>;
        case 'DONE':
            return <S.StatusBadgeWrapper type={type}>Done</S.StatusBadgeWrapper>;
        case 'REJECTED':
            return <S.StatusBadgeWrapper type={type}>Rejected</S.StatusBadgeWrapper>;

        case 'EXPIRED':
            return <S.StatusBadgeWrapper type={type}>Expired</S.StatusBadgeWrapper>;

        case 'StaffAsigned':
            return <S.StatusBadgeWrapper type={type}>staff asigned</S.StatusBadgeWrapper>;

        case 'MarkedAsDone':
            return <S.StatusBadgeWrapper type={type}>Marked as done</S.StatusBadgeWrapper>;

        case 'Done':
            return <S.StatusBadgeWrapper type={type}>Done</S.StatusBadgeWrapper>;

        default:
            return null;
    }
};

export default StatusBadge;
