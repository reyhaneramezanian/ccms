import HealingContainer from './healing_container';

const data = Array.from(Array(6).keys()).map((i) => ({
    title: 'Distant Healing ' + (i + 1),
    buttonLabel: 'See Sessions',
    path: '/healing/session',
    imageUrl: `/images/temp/${i + 1}.png`,
    description:
        'Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr, Sed  Diam Nonumy Eirmod Consetetur Sadipscing Elitr, Sed  Diam Nonumy Eirmod'
}));

export default function Healing() {
    return <HealingContainer title="Healing Type" data={data} />;
}
