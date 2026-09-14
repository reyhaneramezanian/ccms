import { useSnackbar } from "notistack";
import { CloseIcon } from "src/assets/common/CloseIcon";
import { MButton } from "../MButton";

interface Props {
  snackKey: React.ReactText;
}

const SnackbarClose = ({ snackKey }: Props) => {
  const { closeSnackbar } = useSnackbar();
  return (
    <MButton
      aria-label="Close"
      color="inherit"
      onClick={() => {
        closeSnackbar(snackKey);
      }}
    >
      <CloseIcon />
    </MButton>
  );
};

export default SnackbarClose;
