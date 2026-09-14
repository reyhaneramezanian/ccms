import styled from "@emotion/styled";

export const PageLoader = styled.div(({ theme }) => ({
  width: "100%",
  height: "100%",
  zIndex: 10,
  top: 0,
  left: 0,
  backgroundColor: "#33333322",
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: theme.shape.borderRadius.small,
}));
