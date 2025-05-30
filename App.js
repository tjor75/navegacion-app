import * as React from 'react';
import { Button, TextInput, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer, useNavigation, useRoute, usePreventRemove } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';


import { Ionicons } from '@expo/vector-icons';


//
// Screens del Primer Stack
//
function HomeScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.homeStackScreens}>
      <Text style={styles.text}>HOME</Text>
      <Button title="Ver algo" onPress={() => navigation.navigate('Cool')} />
    </View>
  );
}
function CoolScreen() {
  return (
    <View style={styles.homeStackScreens}>
      <Text style={styles.text}>Esta pantalla es <Text style={styles.cool}>cool</Text></Text>
    </View>
  );
}


// Screens del Segundo Stack
function SearchScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.searchStackScreens}>
      <Text>Shh... No me molestes, estoy buscando algo</Text>
      <Button title="Molestar igual" onPress={() => navigation.navigate('SearchQuery')} />
    </View>
  );
}
function SearchQueryScreen() {
  usePreventRemove();
  return (
    <View style={styles.searchStackScreens}>
      <Text style={styles.text}>( ｡ •`ᴖ´• ｡)</Text>
    </View>
  );
}


// Screens del Tercer Stack
function LoginScreen() {
  const navigation = useNavigation();
  const [username, setUsername] = React.useState();
  const [contrasenia, setContrasenia] = React.useState();
  return (
    <View style={styles.profileStackScreens}>
      <TextInput value={username} onChangeText={setUsername} placeholder="Username" />
      <TextInput value={contrasenia} onChangeText={setContrasenia} placeholder="Contraseña" />
      <Button title="Login" onPress={() => navigation.navigate('Profile', {username: username})} />
    </View>
  );
}
function ProfileScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  return (
    <View style={styles.profileStackScreens}>
      <Text style={styles.text}>{route.params.username}</Text>
      <Button title="Volver" onPress={() => navigation.goBack()} />
    </View>
  );
}


// Screens del Cuarto Stack
function SettingsScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.settingsStackScreens}>
      <Text style={styles.text}>Settings</Text>
      <Button title="ROCK BUTTON!" onPress={() => navigation.navigate('RockScreen')} />
    </View>
  );
}
function RockScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.settingsStackScreens}>
      <Text style={styles.text}>HOME 2</Text>
    </View>
  );
}


//
// Creación de los stacks
//
const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const SettingsStack = createStackNavigator();
const SearchStack = createStackNavigator();

function HomeNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Cool" component={CoolScreen} />
    </HomeStack.Navigator>
  );
}

function SearchNavigator() {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen name="Search" component={SearchScreen} />
      <SearchStack.Screen name="SearchQuery" component={SearchQueryScreen} />
    </SearchStack.Navigator>
  );
}

function ProfileNavigator() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="Login" component={LoginScreen} />
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
    </ProfileStack.Navigator>
  );
}

function SettingsNavigator() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="Settings" component={SettingsScreen} />
      <SettingsStack.Screen name="Rock" component={RockScreen} />
    </SettingsStack.Navigator>
  );
}


//
// Creación del BottomTabNavigator
//
const Tab = createBottomTabNavigator();
function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home"     component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={24} color={color} />
           ),
        }} />
        <Tab.Screen name="Search"   component={SearchNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="search" size={24} color={color} />
           ),
        }}
      />
      <Tab.Screen name="Perfil"   component={ProfileNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" size={24} color={color} />
           ),
        }}
      />
      <Tab.Screen name="Settings"   component={SettingsNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="settings" size={24} color={color} />
           ),
        }}
      />
    </Tab.Navigator>
  );
}


// Envolviendo la aplicación en el NavigationContainer
export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black', 
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
  homeStackScreens: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#ff0000'
  },
  cool: {
    fontStyle: 'italic',
    fontWeight: 'bold'
  },
  searchStackScreens: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue'
  },
  profileStackScreens: {
    flex: 1,
    backgroundColor: 'green'
  },
  settingsStackScreens: {
    flex: 1,
  }
});