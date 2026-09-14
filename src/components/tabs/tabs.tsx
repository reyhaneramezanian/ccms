import { useEffect, useState, useRef, FC } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Typography } from '@mui/material';
import { ITabsProps } from './types.tabs';
import COLORS from '@/utils/theme/colors';
import { useRouter } from 'next/router';
type DataType = {
    overlayPosition?: {
        left: number;
        width: number;
    };
};

const Tabs: FC<ITabsProps> = ({
    navbarTab = false,
    tabs,
    activeTab,
    onTabChange,
    style = {},
    overlay = false,
    ...props
}) => {
    const [data, setData] = useState<DataType>({});
    const theme = useTheme();
    const isMedium = useMediaQuery(theme.breakpoints.down('md'));
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
    const ref = useRef<any>();
    const router = useRouter();

    useEffect(() => {
        handleOverlayPosition(ref, setData);
    }, [activeTab]);

    useEffect(() => {
        if (typeof activeTab === 'undefined') return;

        const findActiveTab = tabs.find((tab) => tab.label === activeTab.label);

        if (typeof findActiveTab !== 'undefined') return;

        handleOverlayPosition(ref, setData);
    }, [activeTab, tabs]);

    useEffect(() => {
        function handleOverlayWidth() {
            handleOverlayPosition(ref, setData);
        }

        window.addEventListener('resize', handleOverlayWidth);

        return () => window.removeEventListener('resize', handleOverlayWidth);
    }, []);

    return (
        <div
            ref={ref}
            style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                marginLeft: isSmall ? 0 : 0,
                justifyContent: navbarTab ? 'space-between' : undefined,
                maxWidth: '100%',
                overflowX: 'auto',
                ...style
            }}
            {...props}>
            {tabs?.map(({ id, label }, index) => (
                <Typography
                    // fontWeight="bold"
                    data-id={id}
                    key={index}
                    variant="subtitle2"
                    style={{
                        cursor: 'pointer',
                        marginRight: isMedium ? '10px' : navbarTab ? 0 : '30px',
                        marginBottom: 11,
                        color: `${id == activeTab?.id ? COLORS.info : COLORS.grey4}`,
                        whiteSpace: 'pre'
                    }}
                    data-active={String(id == activeTab?.id)}
                    onClick={() => onTabChange?.({ id, label })}>
                    {label}
                </Typography>
            ))}
            <div
                style={{
                    color: COLORS.info,
                    borderBottom: tabs?.length ? `3px solid ${COLORS.info}` : null,
                    position: 'absolute',
                    left: data?.overlayPosition?.left + ref?.current?.scrollLeft + 'px',
                    width: data?.overlayPosition?.width + 'px',
                    bottom: overlay ? 3 : 0,
                    transition: '0.4s',
                    zIndex: 1,
                    borderRadius: '25px'
                }}
            />
        </div>
    );
};

export default Tabs;

function handleOverlayPosition(ref, setData) {
    let tab = ref.current.querySelector("[data-active='true']");

    if (!tab) return;

    const { width, left } = tab?.getBoundingClientRect();
    const { left: parentLeft } = tab?.parentNode.getBoundingClientRect();
    const overlayPosition = { left: left - parentLeft, width };

    setData((data) => ({ ...data, overlayPosition }));
}
