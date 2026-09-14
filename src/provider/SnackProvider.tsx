import React from 'react';
import { SnackbarProvider } from 'notistack';
import { makeStyles } from '@material-ui/core';
import SnackbarClose from '@/components/base/snack/SnackbarClose';
import themeObj from './theme/themeObject';

interface Props {
    children: React.ReactNode;
}
const useStyles = makeStyles({
    root: {
        zIndex: (themeObj.zIndex.modal as number) + 9999,
        maxWidth: 300
    }
});

const SnackProvider = ({ children }: Props) => {
    const classes = useStyles();
    return (
        <SnackbarProvider
            //   maxSnack={1}

            action={(key) => <SnackbarClose snackKey={key} />}
            classes={{
                containerRoot: classes.root
                // variantSuccess: classes.successSnack,
                // variantError: classes.errorSnack,
                // variantWarning: classes.warningSnack,
                // variantInfo: classes.infoSnack
                // containerAnchorOriginBottomLeft:
                //   classes.containerAnchorOriginBottomLeft,
            }}>
            {children}
        </SnackbarProvider>
    );
};

export default SnackProvider;
