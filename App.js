
import { Fragment, useCallback, useEffect, useState } from 'react';
import { StatusBar, StyleSheet, Pressable, Text, View, ScrollView, Button, TextInput, TouchableOpacity, TouchableWithoutFeedback, Alert, FlatList, Keyboard } from 'react-native';
import {MaterialIcons } from '@expo/vector-icons'
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen'

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState('')
  const [appIsReady, setAppIsReady] = useState(false)

  const addToList = () => {
    setTodos(oldTodos => [...oldTodos, {key: Math.random() * 173646.4747, text: todo}])
    setTodo('')
  }

  const removeItem = (key) => {
    setTodos(todos.filter(todo => todo.key != key))
  }

  const getFont = async () => {
    setTimeout(async () => {
      await Font.loadAsync({
        'nunito-regular': require('./assets/fonts/Nunito-Regular.ttf'),
        'nunito-bold': require('./assets/fonts/Nunito-Bold.ttf')
      })
  
      setAppIsReady(true)
    }, 10000)
  }


  useEffect(() => {
    getFont()
  }, [])

  const hideSplashScreen = useCallback(() => {
    if (appIsReady) {
      SplashScreen.hideAsync()
    }
  }, [appIsReady])

  
 if (!appIsReady) return null;

  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss()
    }}>
      <Fragment>
      <StatusBar barStyle= "dark-content" hidden= {false} backgroundColor= "#00BCD4" translucent= {true}/>
        <View style={style.container} onLayout={hideSplashScreen}>
          <View style={{flex: 1, paddingHorizontal: 20}}>
            <TextInput 
              style={style.input} 
              onChangeText={(text) => setTodo(text)}
              value={todo}
            />

            <TouchableOpacity onPress={addToList} style={style.addTodo}>
              <Text style={{color: '#efefef'}}>Add Todo</Text>
            </TouchableOpacity>

            <View style={{marginTop: 20, flex: 1}}>
                <FlatList 
                  data={todos}
                  renderItem={({item}) => (
                    <TouchableOpacity>
                    <Text style={{backgroundColor: 'pink', paddingVertical: 10, paddingHorizontal: 15, marginBottom: 10, fontFamily: 'nunito-bold'}}>{item.text}</Text>
              </TouchableOpacity>
                  )}
                /> 
            </View>
          </View>
        </View>
      </Fragment>
    </TouchableWithoutFeedback>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20
  },
  input: {
    paddingHorizontal: 17,
    paddingVertical: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#333'
  },
  addTodo: {
    backgroundColor: 'dodgerblue',
    paddingVertical: 10,
    paddingHorizontal: 15,
    justifyContent: 'center',
    flexDirection: 'row'
  }

  
});
