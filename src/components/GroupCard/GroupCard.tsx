import { TouchableOpacityProps } from 'react-native'
import { Container, Icon, Title } from './styles'

// This type combines TouchableOpacityProps with our custom props
// It means our component will accept all props of TouchableOpacity
// plus an additional 'title' prop which is a string
type Props = TouchableOpacityProps & {
  title: string
}

// The GroupCard component takes Props as its parameter type
// We destructure 'title' from the props and use ...rest for the remaining props
export function GroupCard({ title, ...rest }: Props) {
  return (
    <Container {...rest}>
      <Icon />
      <Title>{title}</Title>
    </Container>
  )
}
