import { FC } from 'react';
import { IDetailsListGroupProps } from './detailsListGroup.type';
import * as S from './detailsListGroup.style';
import { Typography } from '@mui/material';

const DetailsListGroup: FC<IDetailsListGroupProps> = ({ items }) => {
    return (
        <S.detailsListGroupWrapper>
            {items.map((item, index) => (
                <S.detailsListGroupItem key={index}>
                    <S.detailsListGroupItemTitle variant="body1">
                        {item.title}
                    </S.detailsListGroupItemTitle>

                    <S.textdetail>{item.value}</S.textdetail>
                </S.detailsListGroupItem>
            ))}
        </S.detailsListGroupWrapper>
    );
};

export default DetailsListGroup;
