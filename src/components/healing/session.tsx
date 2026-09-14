import HealingContainer from './healing_container';

const data = Array.from(Array(6).keys()).map((i) => ({
    title: 'Distant Healing ' + (i + 1),
    buttonLabel: 'See More',
    path: '/healing/session/details',
    imageUrl: `/images/temp/${i + 7}.png`,
    description:
        'Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr, Sed  Diam Nonumy Eirmod Consetetur Sadipscing Elitr, Sed  Diam Nonumy Eirmod'
}));

export default function HealingSession() {
    return <HealingContainer title="Yoga Session" data={data} />;
}
