import styled from "@emotion/styled";

export const SimpleDarkCard = styled.div(({ theme }) => ({
  borderRadius: theme.shape.borderRadius.medium,
  padding: 24,
  backgroundColor: theme.palette.secondary["700"],
  boxShadow: "0px 9px 27px #272D3B29",
  minWidth: 250,
}));
