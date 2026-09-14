import HealingContainer from '../healing/healing_container';

const data = Array.from(Array(6).keys()).map((i) => ({
    title: 'Distant Healing ' + (i + 1),
    buttonLabel: 'See More',
    path: '/healers/healer',
    imageUrl: `/images/temp/${i + 3}.png`,
    description:
        'Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr, Sed  Diam Nonumy Eirmod Consetetur Sadipscing Elitr, Sed  Diam Nonumy Eirmod'
}));

export default function Healers() {
    return <HealingContainer title="Healing Type" data={data} />;
}
