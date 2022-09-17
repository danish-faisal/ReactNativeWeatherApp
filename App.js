import axios from "axios";
import { StatusBar } from "expo-status-bar";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Button,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function App() {
  const [cityName, setCityName] = useState("");
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);

  const api = {
    key: "798e822946ee9f2bc7311d1b28ccbb8c",
    baseUrl: "https://api.openweathermap.org/data/2.5/weather",
  };

  const fetchDataHandler = useCallback(() => {
    setLoading(true);
    setWeatherData(null);
    setCityName("");
    axios({
      method: "GET",
      url: `${api.baseUrl}?q=${cityName}&units=metric&appid=${api.key}`,
    })
      .then((res) => {
        setWeatherData(res.data);
      })
      .catch((err) => console.dir(err))
      .finally(() => setLoading(false));
  }, [cityName, api.key]);

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.container}>
        <ImageBackground
          source={require("./assets/images/bg3.jpeg")}
          resizeMode="cover"
          style={styles.bgImage}
        >
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Enter a city"
              style={styles.textInput}
              placeholderTextColor="#000"
              value={cityName}
              onChangeText={(text) => setCityName(text)}
            />
            <View style={styles.button}>
              <Button
                title="Search"
                color="#df8e00"
                onPress={fetchDataHandler}
              />
            </View>
          </View>
          {loading && (
            <View style={styles.loadingIndicator}>
              <ActivityIndicator size={100} color={"#fff"} />
            </View>
          )}
          {weatherData && (
            <View style={styles.infoView}>
              <Text
                style={styles.cityCountryText}
              >{`${weatherData?.name}, ${weatherData?.sys?.country}`}</Text>
              <Text style={styles.dateText}>{new Date().toLocaleString()}</Text>
              <Text style={styles.tempText}>{`${Math.round(
                weatherData?.main?.temp
              )} °C`}</Text>
              <Text style={styles.minMaxText}>{`Min ${Math.round(
                weatherData?.main?.temp_min
              )} °C / Max ${Math.round(weatherData?.main?.temp_max)} °C`}</Text>
            </View>
          )}
        </ImageBackground>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImage: {
    flex: 1,
    paddingTop: 75,
    paddingHorizontal: 10,
  },
  inputContainer: {
    flexDirection: "row",
  },
  textInput: {
    width: "75%",
    paddingHorizontal: 5,
    paddingVertical: 15,
    borderBottomWidth: 3,
    borderBottomColor: "#df8e00",
    fontSize: 19,
    borderRadius: 16,
    backgroundColor: "#fff",
  },
  button: {
    marginVertical: 16,
    marginHorizontal: 8,
  },
  loadingIndicator: {
    marginVertical: 32,
  },
  infoView: {
    alignItems: "center",
    marginTop: 64,
  },
  cityCountryText: {
    color: "#fff",
    fontSize: 40,
    fontWeight: "bold",
  },
  dateText: {
    color: "#fff",
    fontSize: 22,
    marginVertical: 10,
  },
  tempText: {
    fontSize: 45,
    color: "#fff",
    marginVertical: 10,
  },
  minMaxText: {
    fontSize: 22,
    color: "#fff",
    marginVertical: 10,
    fontWeight: "500",
  },
});
