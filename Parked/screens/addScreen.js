import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  TextInput,
  TouchableOpacity,
} from "react-native";
import * as firebase from "firebase";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { ProgressChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import Dropdown from "react-native-modal-dropdown";

const screenWidth = Dimensions.get("window").width;

export default class addScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      region: null,
      rating: 4.5,
      duration: 2,
      price: 5,
      time: "Now",
      pts: 100,
      addr: null,
      lat: null,
      lng: null,
      desc: "Protected Parking lot with CCTV coverage.",
    };
  }

  state = {
    email: "",
    displayName: "",
  };

  addParking = (data) => {
    const myFirebaseRef = firebase.database().ref("parkinglots");
    myFirebaseRef
      .push({
        name: data.name,
        rating: data.rating,
        duration: data.duration,
        price: data.price,
        time: data.time,
        pts: data.pts,
        addr: data.addr,
        lat: data.lat,
        lng: data.lng,
        desc: data.desc,
      })
      .then(() => {
        console.log("Success");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.045,
          longitudeDelta: 0.045,
        };
        this.setState({ lat: region.latitude}, () => {
            console.log(this.state.lat);
          });
        this.setState({ lng: region.longitude}, () => {
            console.log(this.state.lng);
          });
      },
      (error) => console.log(error),
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 }
    );
  };

  handleSubmission = () => {
      let data = {
        name: this.state.displayName,
        rating: this.state.rating,
        duration: this.state.duration,
        price: this.state.price,
        time: this.state.time,
        pts: this.state.pts,
        addr: this.state.addr,
        lat: this.state.lat,
        lng: this.state.lng,
        desc: this.state.desc,
      }
      this.addParking(data);

  }
  componentDidMount() {
    const { email, displayName } = firebase.auth().currentUser;
    this.getLocation();
    this.setState({ email, displayName });
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>
            <Ionicons
              name="ios-pin"
              color={"#FEA02F"}
              size={26}
              style={{ paddingRight: 10 }}
            />{" "}
            Parked
          </Text>
          <Text
            style={{
              alignSelf: "center",
              fontSize: 12,
              paddingTop: 10,
              fontWeight: "700",
              color: "#fff",
            }}
          >
            LIST YOUR PARKING LOT
          </Text>
        </View>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.card}>
            <Text
              style={{
                alignSelf: "center",
                padding: 20,
                fontStyle: "italic",
                fontSize: 13,
                fontWeight: "400",
                marginBottom: 30,
                textAlign: "center",
                opacity: 0.7,
              }}
            >
              “I never thought I would be making more money using my parking lot
              than my full-time job.”
            </Text>
            <View>
              <Text style={styles.inputTitle}>Enter Address</Text>
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                onChangeText={(address) => this.setState({ addr: address })}
                value={this.state.addr}
              ></TextInput>
            </View>

            <View style={{ marginTop: 32 }}>
              <Text style={styles.inputTitle}>Enter Price</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                autoCapitalize="none"
                onChangeText={(price) => this.setState({ price })}
                value={this.state.price}
              ></TextInput>
            </View>

            <View style={{ marginTop: 32 }}>
              <Text style={styles.inputTitle}>For How Long?</Text>
              <Dropdown
                defaultIndex={1}
                options={[1, 2, 3, 4, 5, 6]}
                style={styles.hoursDropdown}
                defaultValue={
                  <Text style={styles.dropdownBtn}>
                    {this.state.duration + " Hours"}
                  </Text>
                }
                dropdownStyle={styles.hoursDropdownStyle}
                onSelect={(index, value) => this.setState({ duration: value })}
                renderRow={(option) => (
                  <Text
                    style={styles.hoursDropdownOption}
                  >{`${option} Hours`}</Text>
                )}
                renderButtonText={(option) => (
                  <Text style={styles.dropdownBtn}>{`${option} Hours`}</Text>
                )}
              />
            </View>

            <View style={{ marginTop: 32 }}>
              <Text style={styles.inputTitle}>For How Long?</Text>
              <Dropdown
                defaultIndex={1}
                options={["Now", "In 1h", "In 2h", "In 3h", "In 4h", "In 5h"]}
                style={styles.hoursDropdown}
                defaultValue={
                  <Text style={styles.dropdownBtn}>{this.state.time}</Text>
                }
                dropdownStyle={styles.hoursDropdownStyle}
                onSelect={(index, value) => this.setState({ time: value })}
                renderRow={(option) => (
                  <Text style={styles.hoursDropdownOption}>{`${option}`}</Text>
                )}
                renderButtonText={(option) => (
                  <Text style={styles.dropdownBtn}>{`${option}`}</Text>
                )}
              />
            </View>
            <TouchableOpacity style={styles.button} onPress={this.handleSubmission}>
              <Text style={{ color: "#FFF", fontWeight: "500" }}>Start Earning</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    // alignItems: "center",
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
    marginTop: 140,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingTop: 20,
    paddingRight: 20,
    shadowColor: "#1f1f1f",
    shadowRadius: 12,
    shadowOpacity: 0.2,
    marginBottom: 30,
    shadowOffset: { width: 0, height: 2 },
  },
  inputTitle: {
    color: "#8A8F9E",
    fontSize: 10,
    textTransform: "uppercase",
  },
  hoursDropdown: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: "600",
    borderRadius: 5,
    borderBottomColor: "#8A8F9E",
    borderBottomWidth: StyleSheet.hairlineWidth,
    padding: 20,
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  hoursDropdownOption: {
    padding: 15,
    fontSize: 14,
  },
  hoursDropdownStyle: {
    marginTop: 20,
    width: "40%",
    marginLeft: -45,
    // paddingHorizontal: 10,
    // marginVertical: 10,
  },
  dropdownBtn: {
    fontSize: 14,
    //   fontWeight: "600",
  },
  input: {
    borderBottomColor: "#8A8F9E",
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 14,
    color: "#161F3D",
  },
  button: {
    marginHorizontal: 30,
    marginTop: 32,
    backgroundColor: "#FEA02F",
    borderRadius: 4,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
  },
});
