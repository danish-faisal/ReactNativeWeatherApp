import axios from "axios";
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
  const [weatherData, setWeatherData] = useState([]);

  const api = {
    key: "798e822946ee9f2bc7311d1b28ccbb8c",
    baseUrl: "https://api.openweathermap.org/data/2.5/weather",
  };

  const fetchDataHandler = useCallback(() => {
    setLoading(true);
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
            <Button title="Search" color="#df8e00" onPress={fetchDataHandler} />
          </View>
        </View>
        {loading && (
          <View style={styles.loadingIndicator}>
            <ActivityIndicator size={100} color={"#000"} />
          </View>
        )}
      </ImageBackground>
    </View>
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
});
