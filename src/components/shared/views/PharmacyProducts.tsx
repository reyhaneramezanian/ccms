import { Spacer } from '@/components/base/spacer';
import styled from '@emotion/styled';
import { MText } from 'src/components/base/MText';
import dynamic from 'next/dynamic';
import NotificationIcon from 'src/assets/table-container/notification.icon';
import { useState } from 'react';
import { MButton } from '@/components/base/MButton';
import { AppoinmentData } from './Patient/AppoinmentData'; 
import shortid from 'shortid';
import { MedicineData } from './Patient/MedicineData';
import { PharmacyProductInputType } from 'src/@types/product.type';
import { getFullImageUrl } from '@/utils/helper/ui';

const BottomSectionContainer = styled.div(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
}));
const ShoppingBagContent = styled.div(({ theme }) => ({
    height: '200px',
    width: '100%',
    minWidth: '350px'
}));

const ShoppingBagContainer = styled.div(({ theme }) => ({
    padding: '10px',
    width: '100%',
    backgroundColor: 'white',
    borderRadius: theme.shape.borderRadius.common,
    boxShadow: theme.shadows.light,
}));

const ShoppingBAgCardContainer = styled.div({
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, 18%)',
    justifyContent: 'space-around',
    gridGap: '10px',
    paddingTop: '10px',
    overflowY: 'clip',
    overflowX: 'visible',
    '@media(max-width:1050px)': {
        gridTemplateColumns: 'repeat(auto-fill, 46%)'
    }
});

function PharmacyProducts({products}: {products?: PharmacyProductInputType[]}) {
    const [showMore, setShowMore] = useState(false)
    const handleShowMore = () => {

        setShowMore(!showMore)

    }
    return (
        <BottomSectionContainer>
            <ShoppingBagContent>
                <MText variant="body1" fontWeight="bold">Products</MText>
                <Spacer space="10px" />
                <ShoppingBagContainer>
                    <MText align="right">
                        <MButton style={{ marginLeft: 'auto' }} onClick={handleShowMore}>
                            <MText color="#4090D0" fontWeight="bold">
                                {showMore ? (<>Show Less</>) : (<>Show More</>)}
                            </MText>
                        </MButton>
                    </MText>
                    <ShoppingBAgCardContainer
                        style={{ maxHeight: showMore ? '' : '250px' }}
                    >

                        {products && products.map((item) => (
                            <ShoppingBagItem key={shortid.generate()} title={item.title} price={item.price} category={item.category} image={getFullImageUrl(item.photoUrl)}/>
                        ))}

                    </ShoppingBAgCardContainer>
                </ShoppingBagContainer>
            </ShoppingBagContent>
        </BottomSectionContainer>
    )
}

export default PharmacyProducts

const DocumentItem = styled.div(({ theme }) => ({
    height: '100%',
    display: 'flex',
    padding: '10px',
    justifyContent: 'space-around',
    boxShadow: theme.shadows.light,
}));

const DocumentCard = () => {
    return (
        <>
            <DocumentItem>
                <MText><NotificationIcon /></MText>
                <MText>Document</MText>
            </DocumentItem>
            <Spacer space="10px" />
        </>
    )
}

const ShoppingBagCard = styled.div(({ theme }) => ({
    boxShadow: theme.shadows.light,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    borderRadius: theme.shape.borderRadius.common

}));
interface ShoppingBagType {
    title: string;
    category: string;
    price: string;
    image: string;
}
const TopSection = styled.div(({ theme }) => ({
    padding: '10px',
    display: 'flex',
    flexDirection: 'column'
}));
const ShoppingBagBottomSection = styled.div(({ theme }) => ({
    padding: '10px',
    display: 'flex',
    flexDirection: 'column'
}));
const ShoppingBagImage = styled.img(({ theme }) => ({
    width: '100%',
    height: '150px',
    border: `${theme.shape.borderRadius.common} ${theme.shape.borderRadius.common} 0 0`
}));


const ShoppingBagItem = ({
    title,
    category,
    price,
    image, }: ShoppingBagType) => {
    return (
        <ShoppingBagCard>
            <TopSection>
                <ShoppingBagImage src={image}/>
                <MText variant="body3" fontWeight="bold">{title}</MText>
                <MText variant="caption2" color="gray">{category}</MText>
                <Spacer space="5px" />
                <MText variant="body3" fontWeight="bold">{price}</MText>
            </TopSection>
            
        </ShoppingBagCard>
    )
}