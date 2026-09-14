import Error from 'src/assets/icons/error';
import Grid from '@mui/material/Grid';
import * as s from './style';
import { Button } from '@mui/material';
import Link from 'next/link';

export default function errorapp() {
    return (
        <Grid alignItems="center" justifyContent="center" container direction="row">
            <Grid item xs={12} sm={12} md={3} lg={3}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Error />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <s.texterror>oops like there was a problem in </s.texterror>
                    <s.texterror>connecting to your Stripe account. </s.texterror>
                    <s.texterror>Please sign in to your Stripe </s.texterror>
                    <s.texterror>account or set up an account if you</s.texterror>
                    <s.texterror>like.</s.texterror>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Link href="ccms://ccms/">
                        <div
                            style={{
                                width: '100%',
                                height: '40px',
                                borderRadius: '8px',
                                color: '#0342FE',
                                margin: '30px 0 0 0',
                                fontWeight: 'bold',
                                fontSize: '15px',
                                fontFamily: 'Helvetica Neue !important',
                                border: '1px solid #0342FE',
                                backgroundColor: '#fff',
                                textAlign: 'center',
                                padding: '8px 0 0 0'
                            }}>
                            Go to app
                        </div>
                    </Link>
                </Grid>
            </Grid>
        </Grid>
    );
}
