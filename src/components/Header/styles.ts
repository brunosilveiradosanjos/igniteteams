import styled from 'styled-components/native'
import { DefaultTheme } from 'styled-components/native'
import { CaretLeft } from 'phosphor-react-native'

export const Container = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`
export const Logo = styled.Image`
  width: 46px;
  height: 55px;
`

export const BackButton = styled.TouchableOpacity`
  flex: 1;
`
// Instead of styling CaretLeft, we'll create a wrapper component
export const BackIconWrapper = styled.View`
  justify-content: center;
  align-items: flex-start;
`
