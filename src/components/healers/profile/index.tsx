import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContentProfile from './content-profile';
import DrawerItems from './component/drawer-items';
import { CustomDiv } from './styled.profile';

const Index = () => {
  const dispatch = useDispatch()
  const pageData = useSelector(({ pageData }: any) => pageData);
  return (
    pageData?.showProfile ? <CustomDiv><DrawerItems /></CustomDiv> : <div style={{ height: '100%',minHeight:'100vh', zIndex: 4, backgroundColor: '#F8FBFD' }}><ContentProfile /></div>

  )
}

export default Index