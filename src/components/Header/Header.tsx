import React from 'react'
import { CaretLeft } from 'phosphor-react-native'
import { Container, Logo, BackButton, BackIconWrapper } from './styles'
import logoImg from '@assets/logo.png'
import { useTheme } from 'styled-components/native'

type Props = {
  showBackButton?: boolean
}

export function Header({ showBackButton = false }: Props) {
  const theme = useTheme()

  return (
    <Container>
      {showBackButton && (
        <BackButton>
          <BackIconWrapper>
            <CaretLeft size={24} color={theme.COLORS.WHITE} />
          </BackIconWrapper>
        </BackButton>
      )}
      <Logo source={logoImg} />
    </Container>
  )
}
