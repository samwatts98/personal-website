import Typography from 'typography'
import fairyGateTheme from 'typography-theme-fairy-gates'

fairyGateTheme.overrideThemeStyles = ({ rhythm }, options) => ({
  a: {
    textShadow: rhythm(0),
  },
})

const typography = new Typography(fairyGateTheme)

export const { scale, rhythm, options } = typography
export default typography
