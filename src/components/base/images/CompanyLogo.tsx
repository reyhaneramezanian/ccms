import styled from "@emotion/styled";

export const StyledCompanyLogo = styled.div(({ theme }) => ({
  width: 64,
  height: 64,
  borderRadius: theme.shape.borderRadius.small,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  "& > img": {
    height: "100%",
  },
  "& > svg": {
    width: 64,
    height: 64,
  },
}));

export const StyledAdminPageLogo = styled(StyledCompanyLogo)({
  backgroundColor: "#FFF",
  padding: 8,
});
