import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Alert } from 'react-native'

import { Header } from '@components/Header/Header'
import { Highlight } from '@components/Highlight/Highlight'
import { Button } from '@components/Button/Button'
import { Input } from '@components/Input/Input'

import { groupCreate } from '@storage/group/groupCreate'
import { AppError } from '@utils/AppError'

import { Container, Content, Icon } from './styles'

export function NewGroup() {
  const [group, setGroup] = useState('')
  const navigation = useNavigation()

  async function handleNew() {
    try {
      if (group.trim().length === 0)
        return Alert.alert('New Group Error', 'Group name is required')

      await groupCreate(group)
      navigation.navigate('players', { group })
    } catch (error) {
      if (error instanceof AppError)
        Alert.alert('New Group Erro', error.message)

      console.error(error)
      Alert.alert('New Group Error', 'Cannot create group')
    }
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
