import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
      <Tabs.Screen
        name="compra"
        options={{
          title: 'Compra',
          tabBarIcon: ({ color }) => <Feather name="shopping-cart" size={24} color="black" />
        }}
      />
      <Tabs.Screen
        name="lista"
        options={{
          title: 'Lista',
          tabBarIcon: ({ color }) => <Entypo name="list" size={24} color="black" />,
        }}
      />
      <Tabs.Screen
        name="dispensa"
        options={{
        title: 'Dispensa',
        tabBarIcon: ({ color }) => <MaterialIcons name="kitchen" size={24} color="black" />
      }}
      />
    </Tabs>
  );
}
