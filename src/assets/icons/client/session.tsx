import { useTheme } from "@mui/material";

const SessionIcon = ({activeTab}) => {
    const theme = useTheme();
    
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="33.076"
            height="28.147"
            viewBox="0 0 33.076 28.147">
            <g id="Group_23782" data-name="Group 23782" transform="translate(-81.208 -135.25)">
                <path
                    id="Path_42663"
                    data-name="Path 42663"
                    d="M113.492,146c-.331,8.081-7.26,14.535-15.746,14.535S82.331,154.08,82,146"
                    transform="translate(0 2.112)"
                    fill="none"
                    stroke={activeTab === 'sessions' ? theme.palette.primary.dark : theme.palette.secondary.darker}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                />
                <path
                    id="Path_42664"
                    data-name="Path 42664"
                    d="M82,146a20.624,20.624,0,0,1,9.763,2.117"
                    transform="translate(0 2.108)"
                    fill="none"
                    stroke={activeTab === 'sessions' ? theme.palette.primary.dark : theme.palette.secondary.darker}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                />
                <path
                    id="Path_42665"
                    data-name="Path 42665"
                    d="M109.69,146a20.59,20.59,0,0,0-9.69,2.083"
                    transform="translate(3.802 2.108)"
                    fill="none"
                    stroke={activeTab === 'sessions' ? theme.palette.primary.dark : theme.palette.secondary.darker}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                />
                <path
                    id="Path_42666"
                    data-name="Path 42666"
                    d="M82,146a20.624,20.624,0,0,1,9.763,2.117"
                    transform="translate(0 2.108)"
                    fill="none"
                    stroke={activeTab === 'sessions' ? theme.palette.primary.dark : theme.palette.secondary.darker}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                />
                <path
                    id="Path_42667"
                    data-name="Path 42667"
                    d="M109.69,146a20.59,20.59,0,0,0-9.69,2.083"
                    transform="translate(3.802 2.108)"
                    fill="none"
                    stroke={activeTab === 'sessions' ? theme.palette.primary.dark : theme.palette.secondary.darker}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                />
                <path
                    id="Path_42668"
                    data-name="Path 42668"
                    d="M91.613,143.732c-1.139-1.561-3.888-3.026-6.059-3.732a12.145,12.145,0,0,0,.164,7.624"
                    transform="translate(0.636 0.845)"
                    fill="none"
                    stroke={activeTab === 'sessions' ? theme.palette.primary.dark : theme.palette.secondary.darker}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                />
                <path
                    id="Path_42669"
                    data-name="Path 42669"
                    d="M99.539,143.732c1.139-1.561,3.888-3.026,6.059-3.732a12.145,12.145,0,0,1-.164,7.624"
                    transform="translate(3.705 0.845)"
                    fill="none"
                    stroke={activeTab === 'sessions' ? theme.palette.primary.dark : theme.palette.secondary.darker}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                />
                <path
                    id="Path_42670"
                    data-name="Path 42670"
                    d="M102.112,148.718c0,7.693-6.056,13.929-6.056,13.929S90,156.411,90,148.718,96.056,136,96.056,136,102.112,141.025,102.112,148.718Z"
                    transform="translate(1.69)"
                    fill="none"
                    stroke={activeTab === 'sessions' ? theme.palette.primary.dark : theme.palette.secondary.darker}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                />
            </g>
        </svg>
    );
};

export default SessionIcon;
