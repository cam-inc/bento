import { style } from "@vanilla-extract/css";
import { themeVars } from "../theme/index.css";

export const styles = {
  root: style({
    height: themeVars.editable.height
  })
}
