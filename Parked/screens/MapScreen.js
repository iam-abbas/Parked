import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from "react-native";
import * as firebase from "firebase";
import MapView, { Marker } from "react-native-maps";

import { Ionicons } from "@expo/vector-icons";

function Item({ rating, duration, price, time }) {
  return (
    <View style={styles.item}>
      <View style={styles.info}>
        <Text style={styles.time}>{time}</Text>
        <Text style={styles.duration}>UP TO {duration}HRS</Text>
        <Text style={{ fontWeight: "600", color: "#fff" }}><Ionicons name="ios-heart" /> {rating}</Text>
        <View style={styles.price}>
          <Text
            style={{ alignSelf: "center", fontWeight: "600", color: "#6ebcf0" }}
          >
            ${price}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default class MapScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      region: null,
      dataSource: [
        {
          id: 1,
          name: "John Doe",
          rating: 4.8,
          duration: 5,
          price: 7,
          time: "Now",
          pts: 240,
          addr: "Here",
        },
        {
          id: 2,
          name: "Jenny",
          rating: 3.8,
          duration: 2,
          price: 12,
          time: "In 2h",
          pts: 240,
          addr: "Here",
        },
      ],
    };
  }

  state = {
    email: "",
    displayName: "",
  };

  componentDidMount() {
    const { email, displayName } = firebase.auth().currentUser;

    this.setState({ email, displayName });

    navigator.geolocation.getCurrentPosition(
      (position) => {
        let region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.045,
          longitudeDelta: 0.045,
        };
        this.setState({ region: region });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 }
    );
  }

  signOutUser = () => {
    firebase.auth().signOut();
  };

  render() {
    // let markers = this.state.dataSource.map((dealer, index) => (
    //   <MapView.Marker
    //     key={index}
    //     coordinate={{
    //       latitude: dealer.latitude,
    //       longitude: dealer.longitude,
    //     }}
    //     title={dealer.name}
    //   />
    // ));

    return (
      <View style={styles.container}>
        <MapView
          initialRegion={this.state.region}
          showsUserLocation={true}
          annotations={this.state.annot}
          showsCompass={true}
          rotateEnabled={false}
          style={styles.mapStyle}
        >
          {/* {markers} */}
        </MapView>

        <View style={styles.horizontalMenu}>
          <FlatList
            horizontal
            data={this.state.dataSource}
            renderItem={({ item }) => (
              <Item
                time={item.time}
                duration={item.duration}
                rating={item.rating}
                price={item.price}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  horizontalMenu: {
    position: "absolute",
    height: 230,
    justifyContent: "center",
    flex: 1,
    bottom: 0,
    alignContent: "center",
    zIndex: 999,
    overflow: "hidden",
  },
  item: {
    flex: 1,
    top: 30,
    shadowColor: "#1f1f1f",
    shadowRadius: 12,
    // justifyContent: "center",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    borderRadius: 10,
    padding: 25,
    backgroundColor: "#9398d9",
    // paddingLeft: 30,
    // paddingRight: 30,
    margin: 15,
    height: 170,
    width: 170,
  },
  rating: {},
  time: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  duration: {
    color: "#fff",
    opacity: 0.7,
    fontWeight: "600",
    fontSize: 10,
    paddingTop: 5,
  },
  price: {
    bottom: 0,
    backgroundColor: "#fff",
    textAlign: "center",
    justifyContent: "center",
    margin: "auto",
    paddingTop: 10,
    paddingBottom: 10,
    color: "#0000ff",
    marginTop: 25,
    alignSelf: "center",
    // paddingLeft: 30,
    // paddingRight: 30,
    width: 100,
    shadowColor: "#fff",
    shadowRadius: 12,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    borderRadius: 50,
  },
  ico: {
    backgroundColor: "#ff8566",
    padding: 17,
    alignSelf: "center",
    borderRadius: 30,
    color: "#ffffff",
  },
  info: {
    // marginLeft: 20,
    // alignSelf: "center",
  },
});
