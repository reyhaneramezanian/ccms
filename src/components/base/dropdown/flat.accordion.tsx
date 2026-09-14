import styled from "@emotion/styled";
import { useState } from "react";
import { getPaletteColor } from "src/utils/theme/helper";
import { MText } from "../MText";
import { StyledColumn } from "../view-container/Column";
import { StyledRow } from "../view-container/Row";

export const StyledFlatAccordion = styled(StyledColumn)<
  AppBaseColorType & { open?: boolean }
>(({ palette, degree, open, theme }) => ({
  "& > div:nth-of-type(1)": {
    minWidth: 300,
    position: "relative",
    width: "100%",
    cursor: "pointer",
    backgroundColor: getPaletteColor({ palette, degree }),
    padding: "24px 36px",
    alignItems: "center",

    borderRadius: theme.shape.borderRadius.medium,
    "& > p": {
      flex: 1,
    },
    "&:after": {
      content: open ? "'-'" : "'+'",
      width: 24,
      height: 24,
      fontSize: theme.typography.h5.fontSize,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: getPaletteColor({ palette, degree }),
      backgroundColor: "#FFF",
      borderRadius: theme.shape.borderRadius.tiny,
    },
  },
  "& > div:nth-of-type(2)": {
    maxHeight: open ? 1200 : 0,
    overflow: 'hidden',
    transition:'all 0.3s'
  },
}));

type Props = {
  text: string;
  WrapperComponent?:  AppStyledComponent<any>;
};

export const FlatAccordion = ({
  children,
  text,
  WrapperComponent = StyledFlatAccordion,
}: AppCommonChild & Props) => {
  const [open, setOpen] = useState(false);
  return (
    <WrapperComponent open={open}>
      <StyledRow onClick={() => setOpen((p) => !p)}>
        <MText color="#FFF">{text}</MText>
      </StyledRow>
      <div>{children}</div>
    </WrapperComponent>
  );
};
