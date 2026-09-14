import HealingContainer from '../healing/healing_container';

const data = Array.from(Array(6).keys()).map((i) => ({
    title: 'Distant Healing ' + (i + 1),
    buttonLabel: 'See More',
    path: '/healers/healer',
    imageUrl: `/images/temp/${i + 3}.png`,
    description:
        'Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr, Sed  Diam Nonumy Eirmod Consetetur Sadipscing Elitr, Sed  Diam Nonumy Eirmod'
}));

export default function Healer() {
    return (
        <HealingContainer
            title="Healer Session"
            data={data}
            mt="70px"
            ml="50px"
            sortOptions={[['default', '0']]}
            buttons={[
                { label: 'Build Session' },
                {
                    label: 'Chat',
                    onClick: () => {
                        console.log('clicked');
                    }
                }
            ]}
        />
    );
}
