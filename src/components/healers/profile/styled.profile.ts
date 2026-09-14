
import { styled,Typography,TextField, Box,Grid } from '@mui/material';

export const CustomDiv = styled('div')({
    height:'100vh',
    zIndex: 4, 
    backgroundColor: '#A587C2',
    marginTop: 100,
    overflowY: 'hidden',
})

export const CustomInputSearch = styled(TextField)({
    width:'100%',
    marginTop:'25px',
    "& .MuiOutlinedInput-root":{
        borderRadius:'25px',
    backgroundColor:'#D5C2E7',
    "& .MuiInputBase-input":{
    marginTop:'5px',
    color:'#A587C2',
    },
    "& fieldset": { 
        borderColor: "#D5C2E7",
    },
    "&.Mui-focused fieldset": {
        borderColor: "#D5C2E7",
    }
}
});


export const CustomParentfringe = styled('div')({
    padding:'0 10px'
})

export const CenterDiv = styled('div')({
    display:'flex',
    alignItems:'center',
    justifyContent:'center'
})

export const TitleHeader = styled(Typography)({
    color: '#213950', 
    fontSize: '24px'
})

export const CustomPayment = styled('div')({
    border:'1px solid #4374A4',
    backgroundColor:'#F4F8FC',
    color:'#230833',
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:'4px',
    padding:'0 10px',
    cursor: 'pointer'
});


export const ParentMainItem = styled('div')<{mobilesize?:String}>(({mobilesize})=>({
    padding:mobilesize === "true" ? 0 : '0 40px 0 30px',
}))

export const ParentMain = styled('div')<{mobilesize?:String}>(({mobilesize})=>({
    margin:mobilesize === "true" ? '25px' :'0 50px 0 40px'
}))

export const ParentSwitcher =  styled('div')<{showSwitch?:String}>(({showSwitch})=>({
    display: 'flex', 
    marginBottom: '20px',
    alignItems:'center',
    opacity : showSwitch === "true" ? 1 : 0,
}))

export const CustomFlex = styled('div')({
    display:'flex',
    justifyContent:'space-between',
    alignItems:'center'
})

export const CustomBoxShadow = styled('div')({
    borderRadius: '3px',
    boxShadow: "1px 3px 8px 0px #A8A8A8",
    width: 86,
    height: 33,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
})

export const ParentGrid = styled('div')<{mobilesize?:String}>(({mobilesize})=>({
    display:"grid",
    gridTemplateColumns: mobilesize === "true" ? null :"repeat(5, 1fr)",
    gridTemplateRows:mobilesize === "true" ? "repeat(3, 1fr)":"repeat(3, 0.5fr)",
    gridColumnGap:mobilesize === "true" ? '8px' :"15px",
    gridRowGap:"14px",
    height:'100%',
    direction:mobilesize === "true" ? 'rtl' :'ltr'
}))


export const ParentFlexColumn = styled('div')({
    display:'flex',
})


export const CustomBtnPlus = styled('div')<{mobilesize?:String}>(({mobilesize,theme})=>({
    marginTop:'5px',
    backgroundColor:'#CDE5FC',
    padding:'10px',
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    cursor:'pointer',
    position:'absolute',
    left:'40%',
    [theme.breakpoints.down("sm")]:{
        marginTop:'45px',
        left:'90%',
    }
}));

export const ParentImage = styled('div')<{lastitem?:string,firstitem?:string}>(({lastitem,firstitem,theme})=>({
    width:'165px',
    height:'110px',
    margin:'5px 15px',
    zIndex:1,
    marginBottom:lastitem==="true" && 0,
    marginTop:firstitem==="true" && -40,
    [theme.breakpoints.down("sm")]:{
        marginTop:0,
        width:'170px',
         margin:'5px 5px',
    }
}))

export const CustomImage = styled('img')<{style:any}>(({style})=>({
    width: '100%', 
    height: '100%',
     display: 'block',
     ...style
}))

export const AddButtonImg = styled('div')<{style:any}>(({style})=>({
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    width: '165px', 
    height: '110px',
    backgroundColor: '#CDE5FC',
    border: '1px solid #000',
    borderRadius:'10px',
    margin:'10px 15px',
    marginBottom:0,
     ...style
}))

export const CustomTable = styled('div')({
    border:'1px solid #0A0A0A',
    borderRadius:'10px',
    padding:'20px'
})

export const WorkDayItem = styled(Box)({
    border: '2px solid #CECCCC',
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
    maxHeight:'37px',
    margin :'10px 10px',
});

export const DayContainer = styled(Box)<{ holidays: boolean; selected: boolean }>(
    ({ theme, holidays, selected }) => ({
        width: 41,
        height: 53,
        borderRadius: 3,
        boxShadow: holidays || selected ? undefined : '0px 0px 21px -3px rgba(0,0,0,0.15)',
        border: selected ?  undefined : '1px solid black',
        background: selected
            ? "#A587C2"
            : 'transparent',
        color: selected ? 'black' : 'black',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        cursor: 'pointer',
    })
);

export const UpButton = styled('div')(({theme})=>({
    position: 'absolute',
    zIndex: 2,
    right:'40%',
    display:'flex',
    marginTop:'5px'
}));

export const ParentImageSlider = styled('div')({
    minHeight:'450px',
     direction: 'rtl',
     maxHeight:'450px',
      position: 'relative',
      overflow:'hidden',
      display:'flex',
      flexDirection:'column',
      justifyContent:'flex-end',
      transition:"0.2s all ease",
})

export const ParentImageSliderRow = styled('div')({
     direction: 'rtl',
      position: 'relative',
      overflowY:'hidden',
      display:'inline-flex',
      flexDirection:'row-reverse',
      transition:"0.2s all ease"
})

export const DownButton =styled('div')<{style?:any}>(({style,theme})=>({
    position: 'absolute',
    bottom:"-2%",
    zIndex: 2,
    right:'40%',
    marginBottom:'15px',
    display:'flex',
    ...style
}));

export const CustomOpacity = styled('div')(({theme})=>({
    height: "100%",
    width:'100%',
    background: "#fff",
    zIndex:-1,
    opacity:0.5,
    position: "absolute",
    right: 0,
    left: 0,
    top:0,
    borderRadius:'50%'
}));

export const PrentRelative = styled('div')({
    width:'165px',
    height:'100%',
    marginLeft:'auto',
    position: 'relative'
})

export const PrentRelativeSession = styled('div')({
    width:'180px',
    height:'100%',
    marginLeft:'auto',
    position: 'relative',
})

export const CustomGrid = styled(Grid)(({theme})=>({
    [theme.breakpoints.down("xl")]:{
        marginLeft:"25px"
    },
}));