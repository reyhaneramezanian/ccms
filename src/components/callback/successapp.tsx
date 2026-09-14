import Success from 'src/assets/icons/success';
import Grid from '@mui/material/Grid';
import * as s from './style';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function successapp() {
    return (
        <Grid alignItems="center" justifyContent="center" container direction="row">
            <Grid item xs={12} sm={12} md={3} lg={3}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Success />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <s.textsuccsess>Congratulations, you're all set!</s.textsuccsess>
                    <s.textsuccsess>You now have a better way to make money!</s.textsuccsess>
                    <s.textsuccsess>
                        Speaking of, get started bidding on projects and let's make some!
                    </s.textsuccsess>
                    <s.textsuccsess>
                        Together we're changing the way the world works!
                    </s.textsuccsess>
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
