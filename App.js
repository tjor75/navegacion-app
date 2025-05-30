import * as React from 'react';
import { Button, TextInput, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import { Ionicons } from '@expo/vector-icons';


//
// Screens del Primer Stack
//
function ScreenA1() {
  const navigation = useNavigation();
  return (
    <View style={styles.homeScreen}>
      <Text style={styles.text}>HOME</Text>
    </View>
  );
}


function ScreenA2() {
  const navigation = useNavigation();
  return (
    <View style={styles.homeScreen}>
      <Text style={styles.text}>HOME 2</Text>
    </View>
  );
}


// Screens del Primer Stack
function ScreenB1() {
  const navigation = useNavigation();
  return (
    <View style={styles.homeScreen}>
      <Text style={styles.text}>HOME</Text>
    </View>
  );
}
function ScreenB2() {
  const navigation = useNavigation();
  return (
    <View style={styles.homeScreen}>
      <Text style={styles.text}>HOME</Text>
    </View>
  );
}


// Screens del Tercer Stack
function ScreenC1() {
  const navigation = useNavigation();
  return (
    <View style={styles.homeScreen}>
      <Text style={styles.text}>HOME</Text>
    </View>
  );
}
function ScreenC2() {
  const navigation = useNavigation();
  return (
    <View style={styles.homeScreen}>
      <Text style={styles.text}>HOME</Text>
    </View>
  );
}


//
// Creación de los stacks
//
const StackA = createNativeStackNavigator();
const StackB = createNativeStackNavigator();
const StackC = createNativeStackNavigator();

function StackANavigator() {
  return (
    <StackA.Navigator>
      <StackA.Screen name="ScreenA1" component={ScreenA1} />
      <StackA.Screen name="ScreenA2" component={ScreenA2} />
    </StackA.Navigator>
  );
}


function StackBNavigator() {
  return (
    <StackB.Navigator>
      <StackB.Screen name="ScreenB1" component={ScreenB1} />
      <StackB.Screen name="ScreenB2" component={ScreenB2} />
    </StackB.Navigator>
  );
}
function StackCNavigator() {
  return (
    <StackC.Navigator>
      <StackC.Screen name="ScreenC1" component={ScreenC1} />
      <StackC.Screen name="ScreenC2" component={ScreenC2} />
    </StackC.Navigator>
  );
}


//
// Creación del BottomTabNavigator
//
const Tab = createBottomTabNavigator();
function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home"     component={StackANavigator} />
      <Tab.Screen name="Buscador" component={StackBNavigator} />
      <Tab.Screen name="Perfil"   component={StackCNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" size={24} color={color} />
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
  homeScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#ff0000'
  }
});