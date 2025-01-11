import { ActivityIndicator } from 'react-native'
import React from 'react'
import { ThemeProvider } from 'styled-components/native'
import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from '@expo-google-fonts/roboto'
import { Players } from '@screens/Players/Players'
import theme from './src/theme'

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold })

  return (
    <ThemeProvider theme={theme}>
      {fontsLoaded ? <Players /> : <ActivityIndicator />}
    </ThemeProvider>
  )
}
