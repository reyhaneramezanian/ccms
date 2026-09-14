import React from 'react'
import Linear from './linear-progress';
import Mail from 'src/assets/icons/Mail';
import Google from 'src/assets/icons/Google';
import Facebook from 'src/assets/icons/Facebook';
import { useSettings_GetSettingsQuery } from 'src/graphql/generated';


const Statistics = () => {
  const { data, isLoading } = useSettings_GetSettingsQuery();

  return (
    <>
      <p style={{ color: '#213950', fontSize: '24px', fontWeight: 'normal', marginBottom: 80, marginTop: 10 }}>Sign In Statistics</p>
      <Linear percent={data?.settings_getSettings?.result?.totalLoginCount} Icon={<Mail />} />
      <Linear percent={data?.settings_getSettings?.result?.googleLoginCount} Icon={<Google />} />
      <Linear percent={data?.settings_getSettings?.result?.facebookLoginCount} Icon={<Facebook />} />
    </>
  )
}

export default Statistics