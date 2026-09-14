import Space from 'src/components/shared/share/space';
import Sesssion from "src/assets/icons/sesssion";
import Settings from "src/assets/icons/settings";
import Chats from "src/assets/icons/chats";
import MainIcon from "src/assets/icons/main-icon";
import { styled } from '@mui/material';
import ImageTable from '@/components/shared/share/image-table';
import  TickClose  from 'src/components/shared/share/tick-close';
import ImageClose from '@/components/shared/share/image-close';

export const Column = [
    { id: 'sessionname', label: 'Session Name', Component: Space },
    { id: 'healername', label: 'Healer Name', Component: Space },
    { id: 'duration', label: 'Duration', Component: Space },
    { id: 'record', label: 'Record', Component: RecordComponent },
    { id: 'capacity', label: 'Capacity', Component: Space },
    { id: 'price', label: 'Price', Component: Space },
];

export const ColumnClientCurrent = [
    { id: 'image', label: '', Component: ImageClose },
    { id: 'clientname', label: 'Client Name', Component: Space },
    { id: 'healertype', label: 'Service Type', Component: Space },
    { id: 'gender', label: 'Gender', Component: Space },
    { id: 'phonenumber', label: 'Phone Number', Component: Space},
    { id: 'options', label: '',Component:TickClose },
];

export const ColumnClientClose = [
    { id: 'image', label: '', Component: ImageClose },
    { id: 'clientname', label: 'Client Name', Component: Space },
    { id: 'healertype', label: 'Service Type', Component: Space },
    { id: 'gender', label: 'Gender', Component: Space },
    { id: 'phonenumber', label: 'Phone Number', Component: Space },
    { id: 'options', label: '' },
];

export const ColumnWallet = [
    { id: 'clientname', label: 'Client Name' },
    { id: 'sessionname', label: 'SESSION NAME' },
    { id: 'price', label: 'Price' },
];

export const ColumnClientRequest = [
    { id: 'image', label: '',Component:ImageTable },
    { id: 'clientname', label: '' },
    { id: 'healertype', label: '' },
    { id: 'sessionname', label: '' },
    { id: 'phonenumber', label: '' },
    { id: 'edit', label: '',Component:TickClose },
];

export const RowClientCurrent = [
    {
        image: '/images/100.jpg',
        clientname: 'Client Name',
        healertype: 'Service Type',
        gender: 'Womwn',
        phonenumber: '+1 646 980 4741',
        options: ''
    },
    {
        image: '/images/100.jpg',
        clientname: 'Client Name',
        healertype: 'Service Type',
        gender: 'Womwn',
        phonenumber: '+1 646 980 4741',
        options: ''
    },
    {
        image: '/images/100.jpg',
        clientname: 'Client Name',
        healertype: 'Service Type',
        gender: 'Womwn',
        phonenumber: '+1 646 980 4741',
        options: ''
    },
    {
        image: '/images/100.jpg',
        clientname: 'Client Name',
        healertype: 'Service Type',
        gender: 'Womwn',
        phonenumber: '+1 646 980 4741',
        options: ''
    }
];

export const RowClientClose = [
    {
        image: '/images/100.jpg',
        clientname: 'Client Name',
        healertype: 'Service Type',
        gender: 'Womwn',
        phonenumber: '+1 646 980 4741',
    }
];

export const RowClientRequest = [
    {
        image: '/images/100.jpg',
        clientname: 'Client Name',
        healertype: 'Service Type',
        sessionname: 'SESSION NAME',
        phonenumber: '+1 646 980 4741',
        edit: '$300'
    },
    {
        image: '/images/100.jpg',
        clientname: 'Client Name',
        healertype: 'Service Type',
        sessionname: 'SESSION NAME',
        phonenumber: '+1 646 980 4741',
        edit: '$300'
    },
    {
        image: '/images/100.jpg',
        clientname: 'Client Name',
        healertype: 'Service Type',
        sessionname: 'SESSION NAME',
        phonenumber: '+1 646 980 4741',
        edit: '$300'
    },
    {
        image: '/images/100.jpg',
        clientname: 'Client Name',
        healertype: 'Service Type',
        sessionname: 'SESSION NAME',
        phonenumber: '+1 646 980 4741',
        edit: '$300'
    },
    {
        image: '/images/100.jpg',
        clientname: 'Client Name',
        healertype: 'Service Type',
        sessionname: 'SESSION NAME',
        phonenumber: '+1 646 980 4741',
        edit: '$300'
    },
  
];

export const RowWallet = [
    {
        clientname: 'Client Name',
        sessionname: 'Session Name',
        price: '$300'
    },
    {
        clientname: 'Client Name',
        sessionname: 'Session Name',
        price: '$300'
    },
    {
        clientname: 'Client Name',
        sessionname: 'Session Name',
        price: '$300'
    },
    {
        clientname: 'Client Name',
        sessionname: 'Session Name',
        price: '$300'
    },
    {
        clientname: 'Client Name',
        sessionname: 'Session Name',
        price: '$300'
    }
];


export const RowCurrent = [
    {
        sessionname: 'Session Name',
        healername: 'Healer Name',
        duration: '22 Day',
        record: true,
        capacity: 10,
        price: '$300',
        tabCurrent:'true'
    },
];

export const RowClose = [
    {
        sessionname: 'Session Name',
        healername: 'Healer Name',
        duration: '22 Day',
        record: false,
        capacity: 10,
        price: '$300',
        tabCurrent:'false'
    },
];


export const tabs = [
    { label: 'Current Session', id: 'current' },
    { label: 'Close Session', id: 'close' },
];

export const tabsParent = [
    { label: 'Dashboard', id: 'dashboard', Icon: MainIcon },
    { label: 'Sessions', id: 'sessions', Icon: Sesssion },
    { label: 'Setting', id: 'setting', Icon: Settings },
    { label: 'Chat', id: 'Chat', Icon: Chats }
];


const CustomDiv = styled('div')(({ theme }) => ({
    minWidth: '10vw',
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
        justifyContent: 'flex-end',

    },
}))


function RecordComponent({ value }) {
    return (
        value ? <CustomDiv><div style={{ backgroundColor: '#349B48', width: '18px', height: '18px', borderRadius: '50%' }}></div></CustomDiv> : <CustomDiv><div style={{ backgroundColor: '#D84444', width: '18px', height: '18px', borderRadius: '50%' }}></div></CustomDiv>
    )
}