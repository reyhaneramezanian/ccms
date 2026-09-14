import { useState } from 'react';
import Card from '../cards/card';
import Tabs from '../tabs/tabs';
import { Typography, Rating } from '@mui/material';
import {
    Flex,
    Flex1,
    HealerImage,
    PriceContainer,
    SessionDetailsContainer,
    SessionInfoContainer,
    SessionRow,
    SessionTimeContainer,
    SignButton,
    DateWrapper,
    SessionsContainer,
    SessionTimes,
    SessionTimeItem
} from './session_details.style';

const tabs = [
    { label: 'Similar sessions', id: 'similar' },
    { label: 'Healer sessions', id: 'healer' }
];

const dates = [
    { name: 'Sunday', day: '15', month: 'Nov' },
    { name: 'Monday', day: '16', month: 'Nov' },
    { name: 'Tuesday', day: '17', month: 'Nov' },
    { name: 'Wednesday', day: '18', month: 'Nov' },
    { name: 'Thurds', day: '19', month: 'Nov' }
];

const times = ['11:00-12:00', '11:00-12:00', '11:00-12:00', '11:00-12:00', '11:00-12:00'];

const data = Array.from(Array(6).keys()).map((i) => ({
    title: 'Distant Healing ' + (i + 1),
    buttonLabel: 'See More',
    path: '/healing/session/details',
    imageUrl: `/images/temp/${i + 1}.png`,
    description:
        'Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr, Sed  Diam Nonumy Eirmod Consetetur Sadipscing Elitr, Sed  Diam Nonumy Eirmod'
}));

export default function SessionDetails() {
    const [activeTab, setActiveTab] = useState(tabs[0]);

    return (
        <SessionDetailsContainer>
            <SessionRow>
                <SessionInfo />
                <SessionTime />
            </SessionRow>
            <SessionRow>
                <HealerImage src="/images/temp/9.png" alt="healer image" />
                <SessionInfoContainer>
                    <NameRate name="Healer Name" rate={4} />
                    <Item description label="Bio" labelSize={22}>
                        Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr, Sed Diam Nonumy
                        Eirmod
                    </Item>
                </SessionInfoContainer>
            </SessionRow>
            <div style={{ padding: '30px 0' }}>
                <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
            </div>
            <Sessions data={data} />
        </SessionDetailsContainer>
    );
}

function SessionInfo() {
    return (
        <SessionInfoContainer>
            <NameRate name="Session Name" rate={4} price={300} />
            <Flex>
                <Item label="Duration">20 Days</Item>
                <Item label="Healing Type">Yoga</Item>
            </Flex>
            <Flex>
                <Item label="Capacity">22</Item>
                <Typography variant="body1" style={{ flex: 1 }}>
                    Record
                </Typography>
            </Flex>
            <Item description label="Describtion">
                Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr, Sed Diam Nonumy Eirmod
            </Item>
        </SessionInfoContainer>
    );
}

export function NameRate({ name, rate, price = undefined }) {
    return (
        <Flex style={{ alignItems: 'center' }}>
            <Typography variant="h4" fontWeight="bold">
                {name}
            </Typography>
            <Rating value={rate} />
            <Flex1 />
            {price && <Price value={price} />}
        </Flex>
    );
}

function Price({ value = '' }) {
    return (
        <PriceContainer>
            <Typography variant="body1" fontSize={25}>
                ${value}
            </Typography>
        </PriceContainer>
    );
}

function Item({ label, children, description = false, labelSize = 18 }) {
    const style = description
        ? { minHeight: '150px', width: '390px' }
        : { flex: 1, alignItems: 'center' };

    return (
        <Flex style={style} gap={5}>
            <Typography variant="body1">
                <Typography variant="caption" fontSize={labelSize}>
                    {label}:
                </Typography>
                {children}
            </Typography>
        </Flex>
    );
}

function SessionTime() {
    return (
        <SessionTimeContainer>
            <Typography variant="h5" fontWeight="bold" mb={3}>
                Online
            </Typography>
            <Flex style={{ marginTop: '10px' }}>
                {dates.map((item, index) => (
                    <DateConponent key={index} {...item} />
                ))}
            </Flex>
            <SessionTimes>
                {times.map((time, index) => (
                    <Time key={index} time={time} />
                ))}
            </SessionTimes>
            <SignButton variant="contained" color="secondary">
                Sign In To Book
            </SignButton>
        </SessionTimeContainer>
    );
}

function Sessions({ data = [] }) {
    return (
        <SessionsContainer>
            {data.map((item, index) => (
                <Card key={index} {...item} style={{ minWidth: '300px' }} />
            ))}
        </SessionsContainer>
    );
}

function DateConponent({ name, day, month }) {
    return (
        <DateWrapper>
            <Typography variant="body2">{name}</Typography>
            <Typography variant="h5" fontWeight="bold">
                {day}
            </Typography>
            <Typography variant="body2">{month}</Typography>
        </DateWrapper>
    );
}

function Time({ time }) {
    return <SessionTimeItem>{time}</SessionTimeItem>;
}
