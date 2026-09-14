import React from 'react';

const RadioButtonIcon = ({ selected }) => {
    console.log(selected, 'selected');
    
    return (
        <>
            {selected ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 33 33">
                    <g
                        id="Component_37_1"
                        data-name="Component 37 – 1"
                        transform="translate(0.5 0.5)">
                        <circle
                            id="Ellipse_157"
                            data-name="Ellipse 157"
                            cx="16"
                            cy="16"
                            r="16"
                            fill="none"
                            stroke="#213950"
                            strokeWidth="1"
                        />
                        <circle
                            id="Ellipse_158"
                            data-name="Ellipse 158"
                            cx="13.962"
                            cy="13.962"
                            r="13.962"
                            transform="translate(2.039 2.039)"
                            fill="#213950"
                        />
                    </g>
                </svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 33 33">
                    <g
                        id="Component_38_1"
                        data-name="Component 38 – 1"
                        transform="translate(0.5 0.5)">
                        <circle
                            id="Ellipse_159"
                            data-name="Ellipse 159"
                            cx="16"
                            cy="16"
                            r="16"
                            fill="none"
                            stroke="#707070"
                            strokeWidth="1"
                        />
                    </g>
                </svg>
            )}
        </>
    );
};

export default RadioButtonIcon;
