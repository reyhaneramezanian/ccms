import React,{useState} from 'react';
import { ParentImage, UpButton, ParentImageSlider, DownButton, ParentImageSliderRow, CustomOpacity,PrentRelative } from '@/components/healers/profile/styled.profile';
import { Grid, Hidden } from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export function useImageComponent({  arrSlider }) {


    const ImageComponent = ()=>{
        const [y, setY] = useState(0);

        const GoUp = () => {
            setY(y + 20)
        }
    
        const GoDown = () => {
            setY(y - 20)
        }
        return (
            <>
                <Grid container flexDirection="row-reverse">
                    <Hidden mdDown={true}>
                        <Grid item md={4}>{arrSlider[0] && <img src={arrSlider[0]} alt="image" style={{ width: '100%', height: '100%' }} />}</Grid>
                        <Grid item md={7}>
                            <PrentRelative>
                            {arrSlider?.length > 4 ? y === 20 ? null : <><UpButton onClick={GoUp}><CustomOpacity></CustomOpacity><ExpandLessIcon sx={{ fontSize: '40px' }} /></UpButton></> : null}
                            <ParentImageSlider>
                                {
                                    arrSlider?.slice(1, 5).map((item, index) => {
                                        return (
                                            <ParentImage key={index} style={{ transform: `translateY(${y}%)` }} firstitem={index === 0 ? "true" : "false"} lastitem={arrSlider?.length === index + 1 ? "true" : "false"}>
                                                <img src={item} alt="image" style={{ width: '100%', height: '100%',objectFit:'cover' }} />
                                            </ParentImage>
                                        )
                                    })
                                }
                                {arrSlider?.length === 5 ? y === 0 ? null : <><DownButton onClick={GoDown}><CustomOpacity></CustomOpacity><ExpandMoreIcon sx={{ fontSize: '40px' }} /></DownButton></> : null}
                            </ParentImageSlider>
                            </PrentRelative>
                        </Grid>
                    </Hidden>
                </Grid>
                <Grid container>
                    <Hidden mdUp={true}>
                        <Grid item xs={12} sx={{ overflow: 'auto', overflowY: 'hidden' }}>
                            <ParentImageSliderRow>
                                {
                                    arrSlider?.slice(0, 5).map((item, index) => {
                                        return (
                                            <ParentImage key={index}>
                                                <img src={arrSlider[0]} alt="image" style={{ width: '100%', height: '100%' }} />
                                            </ParentImage>
                                        )
                                    })
                                }
                            </ParentImageSliderRow>
                        </Grid>
                    </Hidden>
                </Grid >
            </>
        )
    }
    
    return {
        ImageComponent
    };
}
