import React, { useCallback, useState } from 'react'
import { FlatList } from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'

import { Header } from '@components/Header/Header'
import { Highlight } from '@components/Highlight/Highlight'
import { GroupCard } from '@components/GroupCard/GroupCard'
import { ListEmpty } from '@components/ListEmpty/ListEmpty'
import { Button } from '@components/Button/Button'

import { groupsGetAll } from '@storage/group/groupsGetAll'

import { Container } from './styles'
import { Loading } from '@components/Loading/Loading'

export function Groups() {
  const [isLoading, setIsLoading] = useState(true)
  const [groups, setGroups] = useState<Array<string>>([])
  const navigation = useNavigation()

  function handleNewGroup() {
    navigation.navigate('new')
  }

  async function fetchGroups() {
    try {
      setIsLoading(true)
      const data = await groupsGetAll()
      setGroups(data)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  function handleOpenGroup(group: string) {
    navigation.navigate('players', { group })
  }

  useFocusEffect(
    useCallback(() => {
      fetchGroups()
    }, [])
  )

  return (
    <Container>
      <Header />
      <Highlight title="Groups" subtitle="play with your group" />
      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={groups}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <GroupCard title={item} onPress={() => handleOpenGroup(item)} />
          )}
          contentContainerStyle={groups.length === 0 && { flex: 1 }}
          ListEmptyComponent={() => (
            <ListEmpty message="How about registering a group?" />
          )}
        />
      )}
      <Button title="Register Group" onPress={handleNewGroup} />
    </Container>
  )
}
