import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { Button } from 'react-native-paper';
// import { DataTable } from 'react-native-paper';


const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([])
  

  const getAlarmTriggers = async () => {
    try {
      const response = await fetch("https://blooming-oasis-84139.herokuapp.com/")
      const alarms = await response.json()
      setData(alarms)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    getAlarmTriggers()
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titleText}>
          AlarmTracker⏰
        </Text>
      </View>
      <View style={styles.alarmSection}>
        <FlatList
          contentContainerStyle={styles.list}
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => 
            <View style={styles.alarm}>
              <Text style={styles.alarmText}>{item.name}</Text>
              <Text style={styles.alarmText}>{item.created_at}</Text>
            </View>
          }
        />
        <Button onPress={getAlarmTriggers} style={styles.button}><Text style={styles.buttonText}>Atualizar</Text></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "aliceblue",
  },
  header: {
    // flex: 1,
    marginVertical: 35,
    justifyContent: "center",
    alignItems: "center"
  },
  titleText: {
    color: "#3498db",
    fontSize: 25,
    fontWeight: "bold",
  },
  alarmSection: {
    // borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: "#3498db",
    flex: 1
  },
  list: {
    marginTop: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 'auto'
  },
  alarm: {
    display: 'flex',
    marginVertical: 10,
    flexDirection: 'row',
    gap: 50
  },
  alarmText: {
    color: 'white',
    marginRight: 10,
    fontSize: 15,
    fontWeight: '600'
  },
  button: {
    borderColor: 'white',
    backgroundColor: 'white',
    borderWidth: 1,
    width: '100%'
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold'
  }
})

export default App;
