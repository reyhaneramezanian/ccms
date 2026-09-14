export type SectionItem = {
    name: string;
    path?: string;
};

export type ItemProps = {
    name: string;
    tab: string;
    Icon: React.FC;
    activeTabName: string;
    activeSideBar: (param: boolean)=>void;
};
