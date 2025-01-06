import 'styled-components'
// import theme from '../theme'
import theme from '@theme'

declare module 'styled-components' {
  type ThemeType = typeof theme

  export interface DefaultTheme extends ThemeType {}
}
