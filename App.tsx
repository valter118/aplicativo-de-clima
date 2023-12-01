import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';


const Gelo = "https://thumbs.dreamstime.com/b/cubo-de-gelo-41498846.jpg"
const Sol = "https://www.folhadelondrina.com.br/img/normal/2960000/O-sol-e-para-todos_0296574900201910030810.jpg?xid=5078662"
interface WeatherResponse {
  results: {
    temp: number;
    description: string
  };
}

const App: React.FC = () => {
  const [clima, setClima] = useState<WeatherResponse | null>(null);
  const apiKey = process.env.TOKEN as string;
  const url = "https://api.hgbrasil.com/weather?key=daf1df41&city_name=crato"

  const buscarClima = async () => {
    try {
      const response = await fetch(url);
      const data: WeatherResponse = await response.json();
      const temperatura = data?.results?.temp;
      if (temperatura !== undefined) {
        setClima({
          results: {
            temp: data.results.temp,
            description: data.results.description
          }
        });
      } else {
        setClima(data);
      }
      console.log(JSON.stringify(clima, null, 2))
    } catch (error) {
      alert(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.Text}>Sistema de Clima do Crato</Text>
      <View style={styles.button}>
        <Button title="Clima" color="green" onPress={buscarClima} />
      </View>
      <Text style={styles.clima}> Temperatura em Crato: {clima?.results.temp}ºC</Text>
      <Text style={styles.clima}>  {clima?.results.description}</Text>

      {clima && (<Image
        source={{ uri: clima.results.temp >= 29 ? Sol : Gelo }}  // Utilizando require para imagem local
        style={styles.icon}
        onError={(error) => console.error("Erro ao carregar a imagem:", error.nativeEvent.error)}
      />)}
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#120a8f',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Text: {
    color: 'white',
    fontSize: 22,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,

  },
  clima: { color: "white", fontSize: 25 },
  button: {
    marginTop: 100,
    width: 120,
    height: 200
  },
  icon: {
    width: 150,
    borderRadius: 80,
    height: 150,
    marginTop: 10,
  },
});


export default App
