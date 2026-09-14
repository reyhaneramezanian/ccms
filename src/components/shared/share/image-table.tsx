import { MImage } from '@/components/base/image/MImage'
import React from 'react'

const ImageTable = ({value}) => {
    return (
        <MImage
            key="0"
            resources={{ src: value }}
            style={{ borderRadius: '50%', width: '30px', height: '30px', }}
        />
    )
}

export default ImageTable