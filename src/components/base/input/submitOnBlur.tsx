import { forwardRef, useRef, useCallback } from 'react';
import { MInput } from '.';
import { MInputProps } from './type.input';

export function useSubmitOnBlur(submitOnBlur?: (_: any) => void) {
    const isNameChanged = useRef(false);
    const onChange = () => {
        isNameChanged.current = true;
    };

    const onBlur = (e: any) => {
        if (isNameChanged.current) {
            isNameChanged.current = false;
            submitOnBlur && submitOnBlur(e.target.value);
        }
    };

    return {
        onChange,
        onBlur
    };
}

const MInputSubmitOnblur = forwardRef(
    (
        { submitOnBlur, ...props }: MInputProps & { submitOnBlur?: (_: any) => void },
        ref: any
    ) => {
        const { onBlur, onChange } = useSubmitOnBlur(submitOnBlur);
        return <MInput ref={ref} onBlur={onBlur} onChange={onChange} {...props} />;
    }
);

export default MInputSubmitOnblur;

MInputSubmitOnblur.displayName = 'MInputSubmitOnblur';
