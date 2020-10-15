import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import OrphanagesMap from './pages/OrphanagesMap'
import OrphanageDetails from './pages/OrphanageDetails'

const AppStack = createStackNavigator()

const Routes = () => {
    return (
        <NavigationContainer>
            <AppStack.Navigator headerMode='none'>
                <AppStack.Screen name='map' component={OrphanagesMap} />
                <AppStack.Screen name='details' component={OrphanageDetails} />
            </AppStack.Navigator>
        </NavigationContainer>
    )
}

export default Routes