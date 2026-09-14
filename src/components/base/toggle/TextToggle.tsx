import styled from "@emotion/styled";
import { BSLabel } from "../input/styled";
import { MText } from "../MText";

const PADDING = 16;

const StyledTextToggleWrapper = styled.div<{ active?: boolean }>(
  ({ theme, active }) => ({
    "& > div:nth-of-type(1)": {
      backgroundColor: theme.palette.grey["200"],
      borderRadius: theme.shape.borderRadius.medium,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      position: "relative",
      padding: PADDING,
     
      "&:after": {
        content: '""',
        position: "absolute",
        width: `calc(50% - ${PADDING / 2}px)`,
        height: `calc(100% - ${PADDING}px)`,
        backgroundColor: theme.palette.grey["300"],
        borderRadius: theme.shape.borderRadius.medium,
        left: PADDING / 2,
        transform: `translateX(${active ? 100 : 0}%)`,
        transition:"transform 0.3s",
        
      },
      "& > p": {
        position: "relative",
        zIndex: 10,
        flex: 1,
        textAlign: "center",
        transition:"color 0.3s",
      },
      "& > p:nth-of-type(1)": {
        color: !active ? "#FFF" : theme.palette.grey["300"],
      },
      "& > p:nth-of-type(2)": {
        color: active ? "#FFF" : theme.palette.grey["300"],
      },
    },
  })
);

interface Props {
  label?: string;
  t1: string;
  t2: string;
  value: boolean;
  onChange: (_: boolean) => void;
}

export const TextToggle = ({
  label,
  t1,
  t2,
  onChange,
  value = true,
}: Props) => {
  return (
    <StyledTextToggleWrapper active={value}>
      {label && <BSLabel>{label}</BSLabel>}
      <div>
        <MText
          onClick={() => {
            onChange(false);
          }}
        >
          {t1}
        </MText>
        <MText
          onClick={() => {
            onChange(true);
          }}
        >
          {t2}
        </MText>
      </div>
    </StyledTextToggleWrapper>
  );
};
