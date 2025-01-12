import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'

import { Header } from '@components/Header/Header'
import { Highlight } from '@components/Highlight/Highlight'
import { Button } from '@components/Button/Button'
import { Input } from '@components/Input/Input'

import { Container, Content, Icon } from './styles'

export function NewGroup() {
  const [group, setGroup] = useState('')
  const navigation = useNavigation()

  function handleNew() {
    navigation.navigate('players', { group })
  }

  return (
    <Container>
      <Header showBackButton />

      <Content>
        <Icon />

        <Highlight title="New Group" subtitle="Create a group to add people" />

        <Input placeholder="Group name" onChangeText={setGroup} />
        <Button title="Create" style={{ marginTop: 20 }} onPress={handleNew} />
      </Content>
    </Container>
  )
}
