import { getFullImageUrl } from "@/utils/helper/ui";
import { styled } from "@mui/material";
import { useEffect, useState } from "react";
import UserProfile from "src/assets/user-profile";

const UserImage = styled('img')({
    width: 30,
    height: 30,
    objectFit: 'cover',
    borderRadius: '50%'
});

export function ImageOrPlaceHolder({ src = '' }) {
    const [url, setUrl] = useState(src);

    useEffect(() => setUrl(src), [src]);

    return url ? (
        <UserImage
            alt="user-image"
            sx={{ marginRight: 1 }}
            src={getFullImageUrl(url)}
            onError={() => setUrl('')}
        />
    ) : (
        <UserProfile width={30} height={30} style={{marginLeft:'10px'}} />
    );
}
