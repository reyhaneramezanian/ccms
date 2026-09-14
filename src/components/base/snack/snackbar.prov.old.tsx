import {
 MButton
} from "@/components/base/MButton";
import { MText } from "@/components/base/MText";
import { StyledColumn } from "@/components/base/view-container/Column";
import { StyledRow } from "@/components/base/view-container/Row";
import useTranslation from "@/i18n/hooks/useTranslation";
import styled from "@emotion/styled";
import { Snackbar } from "@material-ui/core";
import { createContext, useContext } from "react";
import { CloseIcon } from "src/assets/common/CloseIcon";
import {
  modalContextChecker,
  useModalState,
  useModalStateWithState,
} from "../../shared/modal/useModal";

const ItemTypography = styled(MText)({
  width: "19ch",
});
const Row = styled(StyledRow)({
  marginBottom: 8,
});

const SnackBarContext = createContext({} as any);

export const SnackBarProvider = ({ children }: AppCommonChild) => {
  const { state, handleShowModal, handleCloseModal } = useModalStateWithState();
  return (
    <SnackBarContext.Provider value={handleShowModal}>
      {children}
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={state.show}
        autoHideDuration={6000}
        onClose={handleCloseModal}
        message={state.data}
        action={
          <>
            <MButton onClick={handleCloseModal}>
              <CloseIcon color="#FFF" />
            </MButton>
          </>
        }
      />
    </SnackBarContext.Provider>
  );
};

export function useSnackbarOpen() {
  const handleShowSnack = useContext(SnackBarContext);
  modalContextChecker(handleShowSnack);

  return handleShowSnack;
}
