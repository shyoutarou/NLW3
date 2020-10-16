import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import OrphanagesMap from './pages/OrphanagesMap'
import OrphanageDetails from './pages/OrphanageDetails'
import SelectMapPosition from './pages/CreateOrphanage/SelectMapPosition'
import OrphanageData from './pages/CreateOrphanage/OrphanageData'
import Header from './components/Header'

const AppStack = createStackNavigator()

const Routes = () => {
    return (
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{ headerShown: false, cardStyle: { backgroundColor: '#f2f3f5' } }}>
                <AppStack.Screen name='map' component={OrphanagesMap} />
                <AppStack.Screen name='details' component={OrphanageDetails} options={{
                    headerShown: true,
                    header: () => <Header showCancel={false} title="Detalhes" />
                }} />
                <AppStack.Screen name='selectposition' component={SelectMapPosition} options={{
                    headerShown: true,
                    header: () => <Header title="Selecione no mapa" />
                }} />
                <AppStack.Screen name='data' component={OrphanageData} options={{
                    headerShown: true,
                    header: () => <Header title="Informe os detalhes" />
                }} />
            </AppStack.Navigator>
        </NavigationContainer>
    )
}

export default Routes