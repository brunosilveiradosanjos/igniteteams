import { FlatList } from 'react-native'
import { useState } from 'react'

import { Header } from '@components/Header/Header'
import { Highlight } from '@components/Highlight/Highlight'
import { ButtonIcon } from '@components/ButtonIcon/ButtonIcon'
import { Input } from '@components/Input/Input'
import { Filter } from '@components/Filter/Filter'
import { PlayerCard } from '@components/PlayerCard/PlayerCard'
import { ListEmpty } from '@components/ListEmpty/ListEmpty'

import { Container, Form, HeaderList, NumbersOfPlayers } from './styles'
import { Button } from '@components/Button/Button'
import { useRoute, RouteProp } from '@react-navigation/native'

type RouteParams = {
  group: string
}

export function Players() {
  const [team, setTeam] = useState('Team A')
  const [players, setPlayers] = useState([])

  const route = useRoute()
  const { group } = route.params as RouteParams

  return (
    <Container>
      <Header showBackButton />
      <Highlight
        title={group}
        subtitle="Add your friends and divide into teams"
      />
      <Form>
        <Input placeholder="Name" autoCorrect={false} />
        <ButtonIcon icon="add" />
      </Form>
      <HeaderList>
        <FlatList
          data={['Team A', 'Team B', 'Team C']}
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
      <FlatList
        data={players}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <PlayerCard name={item} onRemove={() => {}} />
        )}
        ListEmptyComponent={() => (
          <ListEmpty message="There are no people in this team" />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          players.length === 0 ? { flex: 1 } : { paddingBottom: 50 }
        }
      />
      <Button title="Remove Class" type="SECONDARY" />
    </Container>
  )
}
