import { ApprovalStatus } from 'src/graphql/generated';

const useGetApprovalStatusOptions = (): AppOptions[] => {
    return [
        {
            option: 'Approved',
            value: ApprovalStatus.Approved
        },
        {
            option: 'Pending',
            value: ApprovalStatus.Pending
        },
        {
            option: 'Rejected',
            value: ApprovalStatus.Rejected
        }
    ];
};

export default useGetApprovalStatusOptions;
