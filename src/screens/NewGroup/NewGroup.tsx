import { Container, Content, Icon } from './styles'
import { Header } from '@components/Header/Header'
import { Highlight } from '@components/Highlight/Highlight'
import { Button } from '@components/Button/Button'
import { Input } from '@components/Input/Input'

export function NewGroup() {
  return (
    <Container>
      <Header showBackButton />

      <Content>
        <Icon />

        <Highlight title="New Group" subtitle="Create a group to add people" />

        <Input placeholder="Group name" />
        <Button title="Create" style={{ marginTop: 20 }} />
      </Content>
    </Container>
  )
}
