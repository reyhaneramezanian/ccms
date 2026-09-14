export type StatusBadgeType =
    | 'PENDING'
    | 'IN_PROGRESS'
    | 'COMPLETED'
    | 'PAID'
    | 'UNPAID'
    | 'APPROVED'
    | 'EXPIRED'
    | 'REJECTED'
    | 'Done'
    | 'MarkedAsDone'
    | 'PENDDING'
    | 'StaffAsigned'
    | 'MARKED_AS_DONE'
    | 'STAFF_ASIGNED'
    | 'DONE';

export interface IStatusBadgeProps {
    type: StatusBadgeType;
}
