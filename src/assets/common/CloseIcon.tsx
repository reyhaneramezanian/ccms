import StyledSvgIcon from "../icons/SvgIcon";

export const CloseBulkIcon = (props: CommonIconProps) => {
  return (
    <StyledSvgIcon viewBox="0 0 24 24" id="close-icon" {...props}>
      <path
        data-name="Fill 1"
        d="M14.34,0H5.67C2.28,0,0,2.38,0,5.92v8.17C0,17.62,2.28,20,5.67,20h8.67C17.73,20,20,17.62,20,14.09V5.92C20,2.38,17.73,0,14.34,0"
        transform="translate(2 2)"
        fill="#CED0D9"
      />
      <path
        data-name="Fill 4"
        d="M6.29,5.052,4.511,3.274,6.289,1.5A.875.875,0,0,0,5.052.258L3.273,2.036,1.494.256A.875.875,0,1,0,.256,1.494l1.78,1.78L.26,5.049A.875.875,0,0,0,1.5,6.287L3.273,4.511,5.053,6.29A.875.875,0,0,0,6.29,5.052"
        transform="translate(8.726 8.719)"
        fill="#858A9F"
      />
    </StyledSvgIcon>
  );
};
export const CloseIcon = (props: CommonIconProps) => {
  return (
    <StyledSvgIcon viewBox="0 0 24 24" id="close-icon" {...props}>
      <path d="M13.46,12L19,17.54V19H17.54L12,13.46L6.46,19H5V17.54L10.54,12L5,6.46V5H6.46L12,10.54L17.54,5H19V6.46L13.46,12Z" />
    </StyledSvgIcon>
  );
};

export const CloseCircleIcon = (props: CommonIconProps) => {
  return (
    <StyledSvgIcon viewBox="0 0 30 30" id="close-icon" {...props}>
      <path
        id="Icon_material-cancel"
        data-name="Icon material-cancel"
        d="M18,3A15,15,0,1,0,33,18,14.986,14.986,0,0,0,18,3Zm7.5,20.385L23.385,25.5,18,20.115,12.615,25.5,10.5,23.385,15.885,18,10.5,12.615,12.615,10.5,18,15.885,23.385,10.5,25.5,12.615,20.115,18Z"
        transform="translate(-3 -3)"
        fill="currentColor"
      />
    </StyledSvgIcon>
  );
};
