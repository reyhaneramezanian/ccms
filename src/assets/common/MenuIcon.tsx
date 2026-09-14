import StyledSvgIcon from "../icons/SvgIcon";

export const MenuIcon = (props: CommonIconProps) => {
  return (
    <StyledSvgIcon
      id="mdi-dots-vertical"
      viewBox="0 0 30 30"
      width="30"
      height="30"
      {...props}
    >
      <g
        id="Icon_feather-menu"
        data-name="Icon feather-menu"
        transform="translate(-3 -7.5)"
      >
        <path
          id="Path_94033"
          data-name="Path 94033"
          d="M4.5,18h27"
          fill="none"
          stroke="inherit"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3"
        />
        <path
          id="Path_94034"
          data-name="Path 94034"
          d="M4.5,9h27"
          fill="none"
          stroke="inherit"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3"
        />
        <path
          id="Path_94035"
          data-name="Path 94035"
          d="M4.5,27h27"
          fill="none"
          stroke="inherit"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3"
        />
      </g>
    </StyledSvgIcon>
  );
};
export const HambergurMenuIcon = (props: CommonIconProps) => {
  return (
    <StyledSvgIcon
      id="mdi-dots-vertical"
      viewBox="0 0 30 30"
      width="30"
      height="30"
      {...props}
    >
      <path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
    </StyledSvgIcon>
  );
};
