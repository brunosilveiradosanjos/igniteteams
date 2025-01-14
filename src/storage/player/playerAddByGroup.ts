import AsyncStorage from '@react-native-async-storage/async-storage'
import { PLAYERS_COLLECTION } from '@storage/storageConfig'
import { PlayerStorageDTO } from '@storage/player/playerStorageDTO'
import { playersGetByGroup } from '@storage/player/playersGetByGroup'
import { AppError } from '@utils/AppError'

export async function playerAddByGroup(
  newPlayer: PlayerStorageDTO,
  group: string
) {
  try {
    const storedPlayers = await playersGetByGroup(group)

    const playerAlreadyExists = storedPlayers.filter(
      (player) => player.name === newPlayer.name
    )

    if (playerAlreadyExists.length > 0) {
      throw new AppError('Player has already been added to a team.')
    }

    const storage = JSON.stringify([...storedPlayers, newPlayer])

    await AsyncStorage.setItem(`${PLAYERS_COLLECTION}-${group}`, storage)
  } catch (error) {
    throw error
  }
}
