import { MButton } from '@/components/base/MButton';
import { MText } from '@/components/base/MText';
import { Spacer } from '@/components/base/spacer';
import {
    extractPlanAndPrice,
    extractSubscriptionPLan,
    filterSubscriptionPlan,
    getInvalidateQuery
} from '@/utils/helper/providers';
import { extractDate } from '@/utils/regex/regex';
import styled from '@emotion/styled';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useState } from 'react';
import shortid from 'shortid';
import { PlanType, ProviderSubscribePlanType } from 'src/@types/setting';
import SubscriptionPlanAccountSubscriptionForm from './subscription.plan.account.subscription.form';
import SubscriptionPlanAdForm from './subscription.plan.ad.form';
import SubscriptionPlanVipForm from './subscription.plan.vip.form';

const SubscriptionPlanContainer = styled.div(({ theme }) => ({
    boxShadow: theme.shadows.light,
    backgroundColor: 'white',
    borderRadius: '10px',
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
}));

const ActionButton = styled(MButton)(({ theme, active }) => ({
    backgroundColor: active ? theme.palette.primary['main'] : 'white',
    color: active ? 'white' : theme.palette.primary['main'],
    fontWeight: 'bold',
    borderRadius: '5px',
    height: '30px',
    alignItems: 'center',
    padding: '0',
    width: '100%',
    border: `3px ${theme.palette.primary['main']} solid`
}));

const InnerSection = styled.div(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '80%',
    minWidth: '200px'
}));

const ButtonContainer = styled.div({
    display: 'grid',
    width: '80%',
    gridTemplateColumns: 'repeat(auto-fill, 30%)',
    justifyContent: 'space-between',
    gridGap: '10px'
});

const TableHead = styled.div({
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    padding: '0 10px 0 10px'
});

const TableRow = styled(TableHead)({
    boxShadow: '0px 0px 5px 2px #E6E6E6',
    borderRadius: '5px',
    padding: '3px'
});

const TableCell = styled(MText)(({ large }: { large?: boolean }) => ({
    width: large ? '120px' : '90px',
    alignItems: 'center',
    display: 'flex'
}));
const RowContainer = styled.div({
    width: '98%',
    margin: '0 1px'
    // backgroundColor: 'red'
});

const SubscriptionPlanForm = ({
    plan,
    providerId,
    expiredPlan
}: {
    plan: PlanType;
    providerId: number;
    expiredPlan: boolean;
}) => {
    const router = useRouter();
    const invalidateQuery = getInvalidateQuery(router.pathname);
    if (plan == 'FIX_PRICE' || plan == 'EACH_PATIENT')
        return (
            <SubscriptionPlanAccountSubscriptionForm
                invalidateQuery={invalidateQuery}
                expiredPlan={expiredPlan}
                providerId={providerId}
            />
        );
    if (plan == 'VIP')
        return (
            <SubscriptionPlanVipForm
                expiredPlan={expiredPlan}
                invalidateQuery={invalidateQuery}
                providerId={providerId}
            />
        );
    if (plan == 'AD')
        return (
            <SubscriptionPlanAdForm
                invalidateQuery={invalidateQuery}
                expiredPlan={expiredPlan}
                providerId={providerId}
            />
        );
};

const checkIfExpired = (filteredPlan: Array<ProviderSubscribePlanType>) => {
    try {
        const firstElement = filteredPlan[0];
        const endDate = dayjs(firstElement.createAt).add(
            firstElement.subscribePlan.mounth,
            'month'
        );
        if (endDate < dayjs()) return true;

        return false;
    } catch {
        return true;
    }
};
const SubscriptionSection = ({
    subscribePlans,
    providerId
}: {
    subscribePlans?: Array<ProviderSubscribePlanType>;
    providerId: number;
}) => {
    const [planType, setPlanType] = useState<PlanType>('FIX_PRICE');
    const filteredPlan = filterSubscriptionPlan({ subscribePlans, planType }).reverse();
    const expiredPlan = checkIfExpired(filteredPlan);
    return (
        <SubscriptionPlanContainer>
            <InnerSection>
                <Spacer vert={10} />
                <ButtonContainer>
                    <ActionButton
                        onClick={() => setPlanType('FIX_PRICE')}
                        active={planType == 'FIX_PRICE'}>
                        Account Subscription
                    </ActionButton>
                    <ActionButton onClick={() => setPlanType('VIP')} active={planType == 'VIP'}>
                        VIP
                    </ActionButton>
                    <ActionButton onClick={() => setPlanType('AD')} active={planType == 'AD'}>
                        AD
                    </ActionButton>
                </ButtonContainer>
                <Spacer space="5px" />
                <SubscriptionPlanForm
                    expiredPlan={expiredPlan}
                    providerId={providerId}
                    plan={planType}
                />
                <Spacer vert={10} />
                <RowContainer>
                    <TableHead>
                        <TableCell
                            large={planType == 'FIX_PRICE'}
                            color="gray"
                            variant="caption"
                            align="right">
                            account
                        </TableCell>
                        <TableCell color="gray" variant="caption" align="center">
                            Plan & Price
                        </TableCell>
                        <TableCell color="gray" variant="caption" align="center">
                            Start Date
                        </TableCell>
                        <TableCell color="gray" variant="caption" align="center">
                            End Date
                        </TableCell>
                    </TableHead>
                </RowContainer>
                <Spacer space="5px" />
                {filteredPlan.map((item) => (
                    <RowContainer key={shortid.generate()}>
                        <TableRow>
                            <TableCell
                                large={planType == 'FIX_PRICE' || planType == 'EACH_PATIENT'}
                                color="gray"
                                variant="caption"
                                align="center">
                                {extractSubscriptionPLan(item.subscribePlan.plan)}
                            </TableCell>
                            <TableCell
                                palette="primary"
                                degree="main"
                                variant="caption"
                                align="center">
                                {extractPlanAndPrice(item.subscribePlan)}
                            </TableCell>
                            <TableCell color="gray" variant="caption" align="center">
                                {extractDate(item.createAt)}
                            </TableCell>
                            <TableCell color="gray" variant="caption" align="center">
                                {extractDate(item.createAt, item.subscribePlan.mounth)}
                            </TableCell>
                        </TableRow>
                        <Spacer space="5px" />
                    </RowContainer>
                ))}
                <Spacer space="10px" />
            </InnerSection>
        </SubscriptionPlanContainer>
    );
};

export default SubscriptionSection;
