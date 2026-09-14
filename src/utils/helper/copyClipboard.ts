export const copyTextToClipboard = (text: string, cbCopy?: () => void) => {
    if (typeof navigator?.clipboard?.writeText === 'function') {
        try {
            navigator.clipboard.writeText(text);
            cbCopy && cbCopy();
        } catch (err) {}
    } else {
        const el = document.createElement('textarea');
        el.value = text;

        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        cbCopy && cbCopy();
        document.body.removeChild(el);
    }
};
