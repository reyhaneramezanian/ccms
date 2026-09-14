import { Typography } from '@mui/material'
import React, { Fragment } from 'react'

const WalletItem = ({ columns = ['Client Name', 'SESSION NAME', 'Price'], rows = [{}] }) => {
    return (
        <div style={{ width: '97%', minHeight: '250px' }}>
            <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', margin: '24px 6px 10px 5px' }}>
                {
                    columns?.map((item, index) => (<Typography sx={{ fontSize: '14px', color: '#230833' }} key={index}>{item}</Typography>))
                }
            </div>
            <div style={{ display: 'flex', width: '100%', flexDirection:'column', margin: '10px 6px 10px 5px' }}>
                    {
                        rows?.map((item, indexRows) => <div key={indexRows} style={{display: 'flex', width: '100%', justifyContent: 'space-between', margin: '24px 0 10px 0'}}>{Object.keys(item).map((key, index) =><Typography sx={{ fontSize: '14px', color: '#707070' }} key={indexRows}>{item[key]}</Typography>)}</div>)

                    }
            </div>
        </div>
    )
}

export default WalletItem

                            
