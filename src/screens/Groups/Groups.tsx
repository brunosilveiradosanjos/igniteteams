import React, { useState } from 'react'
import { FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { Header } from '@components/Header/Header'
import { Highlight } from '@components/Highlight/Highlight'
import { GroupCard } from '@components/GroupCard/GroupCard'
import { ListEmpty } from '@components/ListEmpty/ListEmpty'
import { Button } from '@components/Button/Button'

import { Container } from './styles'

export function Groups() {
  const [groups, setGroups] = useState<Array<string>>([])

  const navigation = useNavigation()

  function handleNewGroup() {
    navigation.navigate('new')
  }
  return (
    <Container>
      <Header />
      <Highlight title="Classes" subtitle="play with your class" />
      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <GroupCard title={item} />}
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
        ListEmptyComponent={() => (
          <ListEmpty message="How about registering a class?" />
        )}
      />
      <Button title="Register Class" onPress={handleNewGroup} />
    </Container>
  )
}
