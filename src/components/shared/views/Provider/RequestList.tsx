import styled from '@emotion/styled';

import { Spacer } from 'src/components/base/spacer';


import { useState } from 'react';

import Title from './Title';
import { Container } from '@material-ui/core';
import { MButton } from '@/components/base/MButton';
import { MText } from '@/components/base/MText';

import shortid from 'shortid';
import { useGetPatientOfProvider } from 'src/graphql/patient/list/usePatientList';
import { providers } from 'src/data/providers';
import { useGetAppointmentFilterData } from '@/components/table_container/useTableProps';
import { useGetAppointments } from 'src/graphql/appointment/list/useAppointmentList';
import { getFullImageUrl } from '@/utils/helper/ui';
import { extractDate, toTitleCase } from '@/utils/regex/regex';


//TODO: this shadow should be read from theam
const RequestCardContainer = styled.div({
    boxShadow: '0px 0px 5px 2px #E6E6E6',
    width: '100%',
    borderRadius: '10px',
    padding: '0 10px 0 10px',
    backgroundColor: 'white',
    overflow: 'auto',
});
const TableContainer = styled.div({
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '400px',
    // overflowY: 'auto',
    overflowX: 'visible',
});

const ActionButton = styled(MButton)(({ theme,active }) => ({
    backgroundColor: active ? theme.palette.primary['main']: 'white',
    color: active ? 'white': theme.palette.primary['main'],
    borderRadius: '5px',
    height: '30px',
    alignItems: 'center',
    padding: '0',
    width: '49%',
    // padding: 4,
    border: `3px ${theme.palette.primary['main']} solid`
}));
const ActionButtonText = styled(MText)(({ theme, active }) => ({
    color: active ? 'white': theme.palette.primary['main'],
}));

const ButtonContainer = styled.div({
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%'
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
});

const TableCell = styled(MText)({
    width: '90px',
    alignItems: 'center',
    display: 'flex'
});
const IndexCell = styled(TableCell)({
    width: '150px'
});

const Item = styled.div({
    margin: '5px',
    padding: '5px',
    paddingRight: '20px',
    display: 'flex',
    width: '150px',
    height: '50px',
    alignItems: 'center'
});
const AvatarContainer = styled.div({
    flex: '1',
    height: '100%'
});
const Avatar = styled.img({
    borderRadius: '50%',
    height: '40px',
    width: '40px'
});






function RequestList(providerId: { providerId: number }) {
    const [collapse, setCollapse] = useState(true)
    const [closed, setClosed] = useState(false)

    // console.log('providerId',providerId.providerId)
    const { data, isLoading } = useGetAppointments(
        {
            where:
            {
                providerId: { eq: Number(providerId.providerId) }
            },
            appointmentRequest: {},
            take: 50,
        }
    );

    const appointments = data?.patient_getAppointments?.result?.items || []

    const handleCollapse = () => {

        setCollapse(!collapse)

    }
    let openAppointments, closedAppointments
    if (appointments && appointments.length > 0) {
        openAppointments = appointments.filter(item => item.appointmentStatus != 'CLOSED')
        closedAppointments = appointments.filter(item => item.appointmentStatus == 'CLOSED')
    }
    const appointmentsData = closed ? closedAppointments : openAppointments;
    return (
        <>
            <Title title="Request list" handleClick={handleCollapse} collapse={collapse} />

            <Spacer space="12px" />
            {collapse &&
                <RequestCardContainer>
                    <Container maxWidth="sm">
                        <Spacer space="12px" />
                        <TableContainer>
                            <ButtonContainer>
                                <ActionButton active={!closed} onClick={() => setClosed(false)}><ActionButtonText active={!closed} align="center"  variant="caption2" color="white">Active</ActionButtonText></ActionButton>
                                <ActionButton active={closed} onClick={() => setClosed(true)}><ActionButtonText active={closed} align="center" variant="caption2" palette="primary" fontWeight="bold" degree="main">Closed</ActionButtonText></ActionButton>
                            </ButtonContainer>
                            <Spacer space="12px" />
                            <TableHead>
                                <IndexCell color="gray" variant="caption2" align="right" >Patient Name</IndexCell>
                                <TableCell color="gray" variant="caption2" align="center" >Booked Code/ID</TableCell>
                                <TableCell color="gray" variant="caption2" align="center" >Pay option</TableCell>
                                <TableCell color="gray" variant="caption2" align="center" >Date</TableCell>
                            </TableHead>
                            <Spacer space="5px" />
                            {appointmentsData && appointmentsData.map((item) => (
                                <div key={shortid.generate()}>
                                    <TableRow>
                                        <RowItem

                                            avatar={item?.user?.photoUrl ? getFullImageUrl(item?.user?.photoUrl) : '/images/empty_profile.png'}
                                            name={`${item?.user?.firstName || ''} ${item?.user?.lastName || ''}`}
                                        />
                                        <TableCell color="gray" variant="caption2" align="center" >{item.bookedCode}</TableCell>
                                        <TableCell palette="primary" degree="main" variant="caption2" align="center" >{toTitleCase(item.paymentType)}</TableCell>
                                        <TableCell color="gray" variant="caption2" align="center" >{extractDate(item.createdAt)}</TableCell>
                                    </TableRow>
                                    <Spacer space="5px" />
                                </div>
                            ))}
                        </TableContainer>
                    </Container>
                </RequestCardContainer>}
        </>
    );
}

export default RequestList;

function RowItem({ avatar, name }: { avatar: string; name: string }) {
    return (
        <Item key={shortid.generate()}>
            <AvatarContainer>
                <Avatar
                    width="60px"
                    height="60px"
                    src={avatar}
                />
            </AvatarContainer>
            <Spacer space="5px" />
            <MText variant="caption">{name}</MText>
        </Item>
    );
}