import React from "react";
import { View, Text, StyleSheet } from "react-native";
import * as firebase from "firebase";
import { Ionicons } from "@expo/vector-icons";

export default class HomeScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            region: null,
            dataSource: [],
        }
    }


    state = {
        email: "",
        displayName: "",

    };


    componentDidMount() {
        const { email, displayName } = firebase.auth().currentUser;

        this.setState({ email, displayName });
    }


    signOutUser = () => {
        firebase.auth().signOut();
    }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.headerTitle}><Ionicons name="ios-pin" color={"#FEA02F"} size={26} style={{paddingRight: 10}}/> Parked</Text>
            <Text style={{alignSelf: "center",  fontSize: 14,paddingTop: 10, color: "#fff"}}>Welcome Back <Text style={{fontWeight: "700"}}>{this.state.displayName}</Text></Text>
        </View>
        <View style={styles.card}>
          <Text>Hello</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  header: {
    backgroundColor: "#003F5A",
    position: "absolute",
    height: 170,
    width: "100%",
    justifyContent: "center",
  },
  headerTitle: {
    justifyContent: "center",
    fontSize: 28,
    fontWeight: "500",
    textAlign: "center",
    alignContent: "center",
    color: "#fff",
    zIndex: 999,
  },
  card: {
    width: "90%",
    alignSelf: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    top: 140,
    paddingBottom: 40,
    paddingLeft: 20,
    paddingTop: 40,
    paddingRight: 20,
    shadowColor: "#1f1f1f",
    shadowRadius: 12,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
  },
});
