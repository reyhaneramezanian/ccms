import { default as MUICard } from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, Button, CardActionArea, CardActions, styled, useTheme } from '@mui/material';
import Link from 'next/link';
import { Spacer } from '../base/spacer';

const Price = styled(Typography)({
    padding: '0 10px',
    background: 'white',
    borderRadius: 3,
    fontSize: 20,
    boxShadow: '0px 0px 9px -2px rgba(0,0,0,0.26)'
});

const RecordIcon = styled('div')(({ record }: { record: boolean }) => ({
    width: 18,
    height: 18,
    borderRadius: '50%',
    background: record ? '#349B48' : '#D84444'
}));

export default function Card({
    title = 'Card title',
    description = 'Card description',
    imageUrl = '/images/temp/1.png',
    buttonLabel = 'See Sessions',
    healingType = '',
    price = 0,
    path = '#',
    duration = 0,
    record = false,
    style = {}
}) {
    const theme = useTheme();

    return (
        <MUICard
            sx={{
                maxWidth: 345,
                minWidth: 300,
                minHeight: 450,
                flexBasis: '30%',
                margin: '5px',
                marginBottom: 3,
                backgroundColor: '#F5F8FC',
                borderRadius: '15px',
                '@media(max-width:1000px)': {
                    flexBasis: '45%'
                },
                '@media(max-width:600px)': {
                    flexBasis: '100%'
                },
                ...style
            }}>
            <CardMedia
                component="img"
                height="140"
                image={imageUrl}
                alt="card image"
                sx={{ height: 200 }}
            />
            <CardContent sx={{ minHeight: 190, cursor: 'default', overflow: 'auto' }}>
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    mt={2}
                    mb={2}>
                    <Box display="flex" alignItems="baseline">
                        <Typography
                            gutterBottom
                            variant="h5"
                            color={theme.palette.secondary.darker}
                            component="div">
                            {title}
                        </Typography>
                        {healingType !== '' && (
                            <Typography style={{ fontSize: 18, color: '#58636E' }}>
                                {' '}
                                / {healingType}
                            </Typography>
                        )}
                    </Box>
                    {price !== 0 && <Price>${price}</Price>}
                </Box>
                {duration !== 0 && (
                    <>
                        <Box display="flex" justifyContent="space-between" width="100%">
                            <Box display="flex" alignItems="baseline">
                                <Typography variant="h6" color={theme.palette.secondary.darker}>
                                    Duration:
                                </Typography>
                                <Typography variant="body2" ml={1} color="text.secondary">
                                    {duration}
                                </Typography>
                            </Box>
                            <Box>
                                <Box display="flex" alignItems="center">
                                    <Typography
                                        variant="body1"
                                        color={theme.palette.secondary.darker}>
                                        Record:
                                    </Typography>
                                    <Spacer space={13} />
                                    <RecordIcon record={record} />
                                </Box>
                            </Box>
                        </Box>
                        <Spacer space={10} />
                    </>
                )}
                <Box display="flex">
                    <Typography variant="body2" color="text.secondary">
                        <span
                            style={{
                                color: theme.palette.secondary.darker,
                                fontSize: 24,
                                fontFamily: 'Helvetica'
                            }}>
                            Description:{' '}
                        </span>
                        {description}
                    </Typography>
                </Box>
            </CardContent>
            <CardActions style={{ paddingBottom: 20 }}>
                <Link href={path}>
                    <a
                        style={{
                            margin: 'auto',
                            marginTop: '5px',
                            color: 'inherit',
                            textDecoration: 'none',
                            fontFamily: 'yeseva-reg'
                        }}>
                        <Button
                            size="small"
                            variant="outlined"
                            style={{
                                width: '200px',
                                borderRadius: '20px',
                                borderColor: theme.palette.primary.dark,
                                color: theme.palette.primary.dark
                            }}>
                            {buttonLabel}
                        </Button>
                    </a>
                </Link>
            </CardActions>
        </MUICard>
    );
}
