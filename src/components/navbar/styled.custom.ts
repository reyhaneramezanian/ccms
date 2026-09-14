import { styled,Box,Typography } from '@mui/material';


export const CustomDiv = styled('div')({
    display:'flex',
    alignItems:'center',
    justifyContent:'space-between',
    minWidth:'120px'
})


export const ContainerBox = styled('div')({
    position:'absolute',
    top:'60px',
    left:'80px',
    backgroundColor:'#fff',
    width:'220px',
    height:'180px',
    borderRadius:'16px',
    boxShadow:'0 0 0 #ccc'
});


export const CustomBox = styled(Box)<{checkborder?:String}>(({ theme, checkborder = "true" }) => ({
    height:'60px',
    borderBottom:checkborder === "true" ? '1px solid #E4E1F0' : null,
    display:'flex',
    alignItems:'center'
}));

export const CustomTypography = styled(Typography)({
    marginLeft:'16px'
})

export const CustomParent = styled('div')({
    backgroundColor: '#A587C2', display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'flex-start',marginTop:'30px'
})

export const ShareDiv = styled('div')({
    display:'flex',
    alignItems:'center',
    justifyContent:'flex-start'
})

export const CustomTypo = styled(Typography)({
    marginLeft:'-35px'
});

export const CustomGrid = styled(Box)({
    height: '60px',
    display:'grid',
    gridTemplateColumns:'1fr 1fr'
})

export const CustomGridContainer = styled(Box)({
    backgroundColor: '#fff',
    position: 'absolute',
    right:10, 
    top: 69, 
    width: '210px',
    height: '120px',
    border:'none',
    zIndex:3
})

export const ParentGridContainer = styled(Box)({
    backgroundColor:'#9F9F9F',
    top:70,
    left:0,
    right:0,
    bottom:0,
    height:'100vh',
    position:'fixed',
    opacity:'0.3',
    zIndex:0,
    backdropFilter: 'blur(9px)',
})