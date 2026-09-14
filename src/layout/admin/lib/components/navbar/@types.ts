import { FC } from 'react';
import { IIcon } from 'src/assets/icons/type';

export interface INavbarListItemData {
    title: string;
    Icon: FC<IIcon>;
    link?: string;
    subItems?: {
        title: string;
        link: string;
    }[];
}
