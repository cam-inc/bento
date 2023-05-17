import { style } from "@vanilla-extract/css";
import { themeVars } from "../theme/index.css";

export const styles = {
  root: style({
    minHeight: themeVars.editable.minHeight
  })
}
