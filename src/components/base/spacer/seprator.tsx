import styled from "@emotion/styled";
import { getPaletteColor } from "src/utils/theme/helper";

export const FullWidthAbsSeprator = styled.div<
  AppBaseColorType & { color?: string }
>(({ theme, palette, degree, color }) => ({
  width: "100vw",
  height: 1,
  backgroundColor: color
    ? color
    : palette
    ? getPaletteColor({ palette, degree })
    : theme.palette.secondary["100"],
}));

export const FullWidthSeprator = styled.div<
  AppBaseColorType & { color?: string }
>(({ theme, palette='text', degree, color }) => ({
  width: "100%",
  height: 1,
  backgroundColor: color
    ? color
    : palette
    ? getPaletteColor({ palette, degree })
    : theme.palette.secondary["100"],
  margin: "8px 0",
}));
