import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Welcome from '../pages/Welcome';
import UserIdentification from '../pages/UserIdentification';
import UserImageIdentification from '../pages/UserImageIdentification';
import Confirmation from '../pages/Confirmation';
import PlantSave from '../pages/PlantSave';
import { Preload } from '../pages/Preload';

import colors from '../styles/colors'
import AuthRoutes from './tab.routes';

const stackRoutes = createStackNavigator()

const AppRoutes: React.FC = () => (
  <stackRoutes.Navigator
    initialRouteName="Welcome"
    headerMode="none"
    screenOptions={{
      cardStyle: {
        backgroundColor: colors.white
      }
    }}
  >
    <stackRoutes.Screen name="Welcome" component={Welcome} />
    <stackRoutes.Screen name="UserIdentification" component={UserIdentification} />
    <stackRoutes.Screen name="UserImageIdentification" component={UserImageIdentification} />
    <stackRoutes.Screen name="Confirmation" component={Confirmation} />
    <stackRoutes.Screen name="PlantSave" component={PlantSave} />
    <stackRoutes.Screen name="Preload" component={Preload} />
    <stackRoutes.Screen name="AuthRoutes" component={AuthRoutes} />

  </stackRoutes.Navigator>
)

export default AppRoutes