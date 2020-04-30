import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
  LayoutAnimation,
} from "react-native";
import * as firebase from "firebase";
import { Ionicons } from "@expo/vector-icons";


export default class LoginScreen extends React.Component {
  state = {
    email: "",
    password: "",
    errorMessage: null,
  };

  handleLogin = () => {
    const { email, password } = this.state;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => this.setState({ errorMessage: error.message }));
  };

  render() {
    LayoutAnimation.easeInEaseOut();

    return (
      <ScrollView contentContainerStyle={{ backgroundColor: "#ff", flexGrow: 1 }}>
        <View style={styles.container}>
          <Text style={styles.headerTitle}><Ionicons name="ios-pin" color={"#FEA02F"} size={42} style={{paddingRight: 10}}/> Parked</Text>
          {/* <Text style={styles.greetingTop}>{`Entering Loginscreen,`}</Text> */}
          {/* <Text style={styles.greeting}>{`Sign in to continue.`}</Text> */}
          <View style={styles.errorMessage}>
            {this.state.errorMessage && (
              <Text style={styles.error}>{this.state.errorMessage}</Text>
            )}
          </View>

          <View style={styles.form}>
            <View>
              <Text style={styles.inputTitle}>Email Address</Text>
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                onChangeText={(email) => this.setState({ email })}
                value={this.state.email}
              ></TextInput>
            </View>

            <View style={{ marginTop: 32 }}>
              <Text style={styles.inputTitle}>Password</Text>
              <TextInput
                style={styles.input}
                secureTextEntry
                autoCapitalize="none"
                onChangeText={(password) => this.setState({ password })}
                value={this.state.password}
              ></TextInput>
            </View>
          </View>

          <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
            <Text style={{ color: "#FFF", fontWeight: "500" }}>Sign in</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ alignSelf: "center", marginTop: 32 }}
            onPress={() => this.props.navigation.navigate("Register")}
          >
            <Text style={{ color: "#414959", marginBottom: 50, fontSize: 13 }}>
              Don't have an account?{" "}
              <Text style={{ fontWeight: "500", color: "#FEA02F" }}>
                Sign up
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center"
  },
  headerTitle: {
    marginTop: 70,
    justifyContent: "center",
    fontSize: 46,
    fontWeight: "600",
    textAlign: "center",
    alignContent: "center",
    color: "#003F5A",
    zIndex: 999,
  },
  greetingTop: {
    marginTop: 32,
    fontSize: 24,
    fontWeight: "600",
    paddingLeft: 30,
  },
  greeting: {
    marginTop: 12,
    fontSize: 24,
    color: "#FEA02F",
    fontWeight: "600",
    paddingLeft: 30,
  },
  errorMessage: {
    height: 72,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 30,
  },
  error: {
    color: "#E9446A",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
  },
  form: {
    marginBottom: 48,
    marginHorizontal: 30,
  },
  inputTitle: {
    color: "#8A8F9E",
    fontSize: 10,
    textTransform: "uppercase",
  },
  input: {
    borderBottomColor: "#8A8F9E",
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 15,
    color: "#161F3D",
  },
  button: {
    marginHorizontal: 30,
    backgroundColor: "#FEA02F",
    borderRadius: 4,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
  },
});
