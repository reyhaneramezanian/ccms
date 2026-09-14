import styled from '@emotion/styled';
import shortid from 'shortid';
import { MText } from '@/components/base/MText';
import { Spacer } from '@/components/base/spacer';
import { useState } from 'react';
import { MButton } from '@/components/base/MButton';
import { AppoinmentData } from './AppoinmentData';
import { extractAppointmentDate, extractAppointmentProvider, extractAppointmentTime } from '@/utils/dateTime/format';
import { toTitleCase } from '@/utils/regex/regex';
const AppointmentsContainer = styled.div({
    width: '100%'
});

const BaseCard = styled.div(({ theme }) => ({
    boxShadow: theme.shadows.light,
    width: '100%',
    borderRadius: '10px',
    padding: '20px',
    backgroundColor: 'white',

}));
const RowContainer = styled.div(({ theme }) => ({
    display: 'flex',
    width: '100%'
}));

const AppointmentsBaseCard = styled.div({
    boxShadow: '0px 0px 5px 2px #E6E6E6',
    padding: '30px',
    width: '100%',
    borderRadius: '5px',
    display: 'grid',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    gridGap: '20px',
    gridTemplateColumns: 'repeat(auto-fill, 18%)',
    '@media(max-width:1000px)': {
        gridTemplateColumns: 'repeat(auto-fill, 30%)'
    },
    '@media(max-width:800px)': {
        gridTemplateColumns: 'repeat(auto-fill, 45%)'
    }
});

const AppointmentsCard = styled.div({
    boxShadow: '0px 0px 5px 2px #E6E6E6',
    padding: '15px 0 15px 0',
    width: '100%',
    display: 'flex',
    height: '80px',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    flexDirection: 'column',
    borderRadius: '5px'
});

const AppointmentsContent = styled(MText)({
    flex: '1'
});

const AppointmentCardContainer = styled.div({
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, 17%)',
    justifyContent: 'space-around',
    gridGap: '10px',
    paddingTop: '10px',
    overflowY: 'clip',
    overflowX: 'visible',
    '@media(max-width:1050px)': {
        gridTemplateColumns: 'repeat(auto-fill, 46%)'
    }
});

const NavButton = styled(MButton)(({ theme, active }) => ({
    color: active ? theme.palette.primary['100'] : 'black',
    fontWeight: 'bold'

}));
function Appointments(
    { appointments }: { appointments: Array<AppoinmentType> }
) {
    if (appointments?.length === 0) return null;
    const [showMore, setShowMore] = useState(false)
    const [closed, setClosed] = useState(false)

    const handleShowMore = () => {

        setShowMore(!showMore)

    }

    let openAppointments, closedAppointments
    if (appointments && appointments.length > 0) {
        openAppointments = appointments.filter(item => item.appointmentStatus != 'CLOSED')
        closedAppointments = appointments.filter(item => item.appointmentStatus == 'CLOSED')
    }
    const data = closed ? closedAppointments : openAppointments;
    return (
        <AppointmentsContainer>
            <MText fontWeight="bold" variant="h6">Apointments</MText>
            <Spacer space="12px" />

            <BaseCard>
                <RowContainer>
                    <NavButton active={closed} onClick={() => setClosed(true)} fontWeight='bold'>
                        Closed
                    </NavButton>

                    <NavButton active={!closed} fontWeight='bold' onClick={() => setClosed(false)}>
                        Active
                    </NavButton>
                    <MButton style={{ marginLeft: 'auto' }} onClick={handleShowMore}>
                        <MText color="#4090D0" fontWeight="bold">
                            {showMore ? (<>Show Less</>) : (<>Show More</>)}
                        </MText>
                    </MButton>

                </RowContainer>
                <Spacer space="12px" />
                <AppointmentCardContainer
                    style={{ maxHeight: showMore ? '' : '200px' }}
                >

                    {data && data.map((item) => (
                        <AppointmentItem key={shortid.generate()}
                            appointmentTime={item.appointmentTime}
                            appointmentEndTime={item.appointmentEndTime}
                            type={item.provider?.providerName}
                            city={item.city}
                            doctor={extractAppointmentProvider(item.provider)}
                            specialty={item.specialty}
                        />
                    ))}

                </AppointmentCardContainer>
            </BaseCard>
        </AppointmentsContainer>
    );
}

export default Appointments;

const AppointmentCard = styled.div(({ theme }) => ({
    boxShadow: theme.shadows.light,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    borderRadius: theme.shape.borderRadius.common

}));
interface AppoinmentType {
    type: string;
    city: string;
    doctor: any;
    specialty: string;
    appointmentTime: string;
    time: string;
    appointmentStatus?: string;
    doctorType?: string,
    appointmentEndTime: string
}
const TopSection = styled.div(({ theme }) => ({
    padding: '10px',
    borderBottom: '1px solid #E6E6E6',
    display: 'flex',
    flexDirection: 'column'
}));
const BottomSection = styled.div(({ theme }) => ({
    padding: '10px',
    display: 'flex',
    flexDirection: 'column'
}));
const AppointmentItem = ({
    type,
    city,
    doctor,
    specialty,
    appointmentTime,
    appointmentEndTime,
    time }: Partial<AppoinmentType>) => {
    return (
        <AppointmentCard>
            <TopSection>
                <MText variant="body3" fontWeight="bold">{doctor.providerName}</MText>
                <MText variant="caption2" color="gray">{city}</MText>
                <MText variant="caption2" color="gray">{specialty}</MText>
            </TopSection>
            <BottomSection>
                <MText variant="body3" fontWeight="bold">{doctor.fullName}</MText>
                <MText variant="caption2" color="gray">{doctor.specialty}</MText>
                <Spacer space="5px" />
                <MText variant="caption" color="gray">Date: </MText>
                <MText variant="caption2" color="gray">{extractAppointmentDate(appointmentTime)}</MText>
                <Spacer space="5px" />
                <MText variant="caption" color="gray">Time:</MText>
                <MText variant="caption2" color="gray">{`from: ${extractAppointmentTime(appointmentTime)} to: ${extractAppointmentTime(appointmentEndTime)}`}</MText>
            </BottomSection>
        </AppointmentCard>
    )
}