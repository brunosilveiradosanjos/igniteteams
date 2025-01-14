import { Alert, FlatList, Keyboard, TextInput } from 'react-native'
import { useState, useEffect, useRef } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'

import { Header } from '@components/Header/Header'
import { Highlight } from '@components/Highlight/Highlight'
import { ButtonIcon } from '@components/ButtonIcon/ButtonIcon'
import { Input } from '@components/Input/Input'
import { Filter } from '@components/Filter/Filter'
import { PlayerCard } from '@components/PlayerCard/PlayerCard'
import { ListEmpty } from '@components/ListEmpty/ListEmpty'
import { Button } from '@components/Button/Button'

import { playerAddByGroup } from '@storage/player/playerAddByGroup'
import { playersGetByGroupAndTeam } from '@storage/player/playersGetByGroupAndTeam'
import { PlayerStorageDTO } from '@storage/player/playerStorageDTO'
import { playerRemoveByGroup } from '@storage/player/playerRemoveByGroup'
import { groupRemoveByName } from '@storage/group/groupRemoveByName'

import { Container, Form, HeaderList, NumbersOfPlayers } from './styles'
import { Loading } from '@components/Loading/Loading'
import { AppError } from '@utils/AppError'

type RouteParams = {
  group: string
}

export function Players() {
  const [isLoading, setIsLoading] = useState(true)
  const [newPlayerName, setNewPlayerName] = useState('')
  const [team, setTeam] = useState('Team A')
  const [players, setPlayers] = useState<Array<PlayerStorageDTO>>([])

  const navigation = useNavigation()
  const route = useRoute()
  const { group } = route.params as RouteParams

  const newPlayerNameInputRef = useRef<TextInput>(null)

  async function handleAddPlayer() {
    if (newPlayerName.trim().length === 0)
      return Alert.alert('New Player', 'Name is required')

    const newPlayer = {
      name: newPlayerName,
      team,
    }

    try {
      await playerAddByGroup(newPlayer, group)
      fetchPlayersByTeam()
      setNewPlayerName('')
      newPlayerNameInputRef.current?.blur()
      Keyboard.dismiss()
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('New Player Error', error.message)
      } else {
        console.log(error)
        Alert.alert('New Player Error', 'An error occurred')
      }
    }
  }

  async function fetchPlayersByTeam() {
    try {
      setIsLoading(true)
      const playersByTeam = await playersGetByGroupAndTeam(group, team)
      setPlayers(playersByTeam)
    } catch (error) {
      console.log(error)
      Alert.alert('Load Player Error', 'Could not load players')
    } finally {
      setIsLoading(false)
    }
  }

  async function handlePlayerRemove(playerName: string) {
    try {
      await playerRemoveByGroup(playerName, group)
      fetchPlayersByTeam()
    } catch (error) {
      Alert.alert('Remove Player Error', 'Could not remove player')
    }
  }

  async function groupRemove() {
    try {
      await groupRemoveByName(group)
      navigation.navigate('groups')
    } catch (error) {
      Alert.alert('Remove Group Error', 'Could not remove group')
    }
  }

  async function handleGroupRemove() {
    Alert.alert('Remove', 'Do you want to remove group?', [
      {
        text: 'No',
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => groupRemove(),
      },
    ])
  }

  useEffect(() => {
    fetchPlayersByTeam()
  }, [team])

  return (
    <Container>
      <Header showBackButton />
      <Highlight
        title={group}
        subtitle="Add your friends and divide into teams"
      />
      <Form>
        <Input
          placeholder="Name"
          autoCorrect={false}
          onChangeText={setNewPlayerName}
          value={newPlayerName}
          inputRef={newPlayerNameInputRef}
          onSubmitEditing={handleAddPlayer}
          returnKeyType="done"
        />
        <ButtonIcon icon="add" onPress={handleAddPlayer} />
      </Form>
      <HeaderList>
        <FlatList
          data={['Team A', 'Team B']}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal
        />
        <NumbersOfPlayers>{players.length}</NumbersOfPlayers>
      </HeaderList>
      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={players}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <PlayerCard
              name={item.name}
              onRemove={() => handlePlayerRemove(item.name)}
            />
          )}
          ListEmptyComponent={() => (
            <ListEmpty message="There are no people in this team" />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={
            players.length === 0 ? { flex: 1 } : { paddingBottom: 50 }
          }
        />
      )}
      <Button
        title="Remove Group"
        type="SECONDARY"
        onPress={handleGroupRemove}
      />
    </Container>
  )
}
