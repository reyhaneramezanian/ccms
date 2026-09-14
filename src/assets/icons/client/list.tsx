const ListIcon = ({view}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="37.56"
            height="26.02"
            viewBox="0 0 37.56 26.02">
            <g id="Group_23112" data-name="Group 23112" transform="translate(-1152 -324.971)">
                <line
                    id="Line_186"
                    data-name="Line 186"
                    x2="28.672"
                    transform="translate(1159.888 327.5)"
                    fill="none"
                    stroke={view === 'calendar' ? '#707070' : '#213950'}
                    strokeLinecap="round"
                    strokeWidth="2"
                />
                <line
                    id="Line_187"
                    data-name="Line 187"
                    x2="28.672"
                    transform="translate(1159.888 337.98)"
                    fill="none"
                    stroke={view === 'calendar' ? '#707070' : '#213950'}
                    strokeLinecap="round"
                    strokeWidth="2"
                />
                <line
                    id="Line_188"
                    data-name="Line 188"
                    x2="28.672"
                    transform="translate(1159.888 348.461)"
                    fill="none"
                    stroke={view === 'calendar' ? '#707070' : '#213950'}
                    strokeLinecap="round"
                    strokeWidth="2"
                />
                <g
                    id="Ellipse_335"
                    data-name="Ellipse 335"
                    transform="translate(1152 324.971)"
                    fill={view === 'calendar' ? '#707070' : '#213950'}
                    stroke={view === 'calendar' ? '#707070' : '#213950'}
                    strokeWidth="1">
                    <circle cx="2" cy="2" r="2" stroke="none" />
                    <circle cx="2" cy="2" r="1.5" fill="none" />
                </g>
                <g
                    id="Ellipse_336"
                    data-name="Ellipse 336"
                    transform="translate(1152 335.84)"
                    fill={view === 'calendar' ? '#707070' : '#213950'}
                    stroke={view === 'calendar' ? '#707070' : '#213950'}
                    strokeWidth="1">
                    <circle cx="2" cy="2" r="2" stroke="none" />
                    <circle cx="2" cy="2" r="1.5" fill="none" />
                </g>
                <g
                    id="Ellipse_337"
                    data-name="Ellipse 337"
                    transform="translate(1152 346.643)"
                    fill={view === 'calendar' ? '#707070' : '#213950'}
                    stroke={view === 'calendar' ? '#707070' : '#213950'}
                    strokeWidth="1">
                    <circle cx="2.174" cy="2.174" r="2.174" stroke="none" />
                    <circle cx="2.174" cy="2.174" r="1.674" fill="none" />
                </g>
            </g>
        </svg>
    );
};

export default ListIcon;
