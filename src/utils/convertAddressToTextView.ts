const convertAddressToTextView = (text?: string, isEnd?: boolean): string | undefined => {
    if (typeof text !== 'string') return;

    const customText = `${text}${isEnd ? '' : ','}`;

    return isEnd ? customText.trim().replace(/,$/, '') : customText;
};

export default convertAddressToTextView;
