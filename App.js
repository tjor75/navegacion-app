import * as React from 'react';
import { Button, TextInput, Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { NavigationContainer, useNavigation, useRoute, usePreventRemove } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import { Ionicons } from '@expo/vector-icons';
import TheRock from './assets/images/the-rock.png';


//
// Screens del Primer Stack
//
function HomeScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.homeStackScreens}>
      <Text style={styles.titleText}>HOME</Text>
      <Button title="Ver algo" color="#ff8000" onPress={() => navigation.navigate('Cool')} />
    </View>
  );
}
function CoolScreen() {
  return (
    <View style={styles.homeStackScreens}>
      <Text style={styles.titleText}>Esta pantalla es <Text style={styles.cool}>cool</Text></Text>
    </View>
  );
}


// Screens del Segundo Stack
function SearchScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.searchStackScreens}>
      <Text style={styles.titleText}>SHHHHH...</Text>
      <Text style={styles.text}>No me molestes, estoy buscando algo</Text>
      <Button title="Molestar igual" onPress={() => navigation.navigate('SearchQuery')} />
    </View>
  );
}
function SearchQueryScreen() {
  usePreventRemove();
  return (
    <View style={styles.searchStackScreens}>
      <Text style={styles.titleText}>( ｡ •`ᴖ´• ｡)</Text>
    </View>
  );
}


// Screens del Tercer Stack
function LoginScreen() {
  const navigation = useNavigation();
  const [username, setUsername] = React.useState("");
  const [telefono, setTelefono] = React.useState("");
  const [estanCampos, setEstanCampos] = React.useState(true);
  
  const loguearse = async () => {
    if (username.trim() !== "" && telefono.trim() !== "") {
      setEstanCampos(true);
      navigation.navigate('Profile', {username: username, telefono: telefono});
    } else {
      setEstanCampos(false);
    }
  };

  return (
    <View style={styles.profileStackScreens}>
      <Text style={styles.titleText}>LOG IN</Text>
      <TextInput style={styles.textInput} value={username} onChangeText={setUsername} placeholder="Username" />
      <TextInput style={styles.textInput} value={telefono} onChangeText={setTelefono} placeholder="Teléfono" keyboardType="phone-pad" />
      {estanCampos || <Text style={styles.errorText}>Completa los campos</Text>}
      <Button title="Login" onPress={loguearse} />
    </View>
  );
}
function ProfileScreen() {
  const route = useRoute();
  const navigation = useNavigation();

  return (
    <View style={styles.profileStackScreens}>
      <View>
        <Text style={styles.titleText}>Username: {route.params.username}</Text>
        <Text style={styles.titleText}>Teléfono: {route.params.telefono}</Text>
      </View>
      <Button title="Volver" onPress={() => navigation.goBack()} />
    </View>
  );
}


// Screens del Cuarto Stack
function SettingsScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.settingsStackScreens}>
      <Text style={styles.titleText}>Settings</Text>
      <Button title="ROCK BUTTON!" color="grey" onPress={() => navigation.navigate('Rock')} />
    </View>
  );
}
function RockScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.settingsStackScreens}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={TheRock} resizeMode="center" style={{ width: 200, height: 200 }} />
      </TouchableOpacity>
    </View>
  );
}


//
// Creación de los stacks
//
const HomeStack = createStackNavigator();
const SearchStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const SettingsStack = createStackNavigator();

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
      <Tab.Screen name="HomeTab" component={HomeNavigator}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={24} color={color} />
           ),
        }}
      />
      <Tab.Screen name="SearchTab" component={SearchNavigator}
        options={{
          tabBarLabel: "Search",
          tabBarIcon: ({ color }) => (
            <Ionicons name="search" size={24} color={color} />
           ),
        }}
      />
      <Tab.Screen name="ProfileTab" component={ProfileNavigator}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" size={24} color={color} />
           ),
        }}
      />
      <Tab.Screen name="SettingsTab" component={SettingsNavigator}
        options={{
          tabBarLabel: "Settings",
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
  titleText: {
    color: 'white',
    fontSize: 20,
  },
  text: {
    color: 'white',
    fontSize: 18,
  },
  errorText: {
    color: '#ff9999',
    fontSize: 18
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#009933'
  },
  textInput: {
    color: '#000',
    backgroundColor: '#ffffffcc',
    width: '80%',
    marginTop: 5,
    marginBottom: 5,
    padding: 10,
    borderRadius: 5
  },
  settingsStackScreens: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#bf009c'
  }
});