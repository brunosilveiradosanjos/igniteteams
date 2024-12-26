import { ActivityIndicator } from 'react-native'
import React from 'react'
import { ThemeProvider } from 'styled-components'
import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from '@expo-google-fonts/roboto'
import { Groups } from '@screens/Groups/Groups'
import { StatusBar } from 'expo-status-bar'
import theme from './src/theme'

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold })

  return (
    <ThemeProvider theme={theme}>
      <StatusBar />
      {fontsLoaded ? <Groups /> : <ActivityIndicator />}
    </ThemeProvider>
  )
}
