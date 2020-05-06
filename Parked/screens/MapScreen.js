import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  FlatList,
  ScrollView,
  Picker,
} from "react-native";
import Modal from "react-native-modal";
import * as firebase from "firebase";
import Dropdown from "react-native-modal-dropdown";
import MapView, { Marker } from "react-native-maps";

import { FontAwesome5, Ionicons } from "@expo/vector-icons";
console.disableYellowBox = true;
export default class MapScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      region: null,
      activeModal: null,
      activeHrs: false,
      carOption: "small",
      hours: 2,
      dataSource: [],
    };
  }
  handleTab = (tabKey) => {
    this.setState({ carOption: tabKey });
  };

  getParkings = () => {
    const myFirebaseRef = firebase.database().ref("parkinglots");
    myFirebaseRef.on("value", (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const mydata = [];
        Object.keys(data).forEach((row, i) => {
          mydata.push(data[row]);
          mydata[i].id = i + 1;
        });
        this.setState({ dataSource: mydata });
      }
    });
  };
  state = {
    email: "",
    displayName: "",
  };

  componentDidMount() {
    const { email, displayName } = firebase.auth().currentUser;

    this.setState({ email, displayName });
    this.getParkings();

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

  calcPrice = (price) => {
    var hrs = this.state.hours;
    var mdl = 1;
    if (this.state.carOption == "medium") {
      mdl = 2;
    } else if (this.state.carOption == "large") {
      mdl = 3;
    }

    let prc = ((mdl*1.2) * (hrs * 0.8 ) + parseInt(price))*1.2;
    var finalPrice = (Math.round((prc + Number.EPSILON) * 100) / 100);
    return finalPrice;
  };

  renderHours(id) {
    const { hours } = this.state.hours;
    const availableHours = [1, 2, 3, 4, 5, 6];

    return (
      <Dropdown
        defaultIndex={0}
        options={availableHours}
        style={styles.hoursDropdown}
        defaultValue={this.state.hours + " Hours"}
        dropdownStyle={styles.hoursDropdownStyle}
        onSelect={(index, value) => this.setState({ hours: value })}
        renderRow={(option) => (
          <Text style={styles.hoursDropdownOption}>{`${option} Hours`}</Text>
        )}
        renderButtonText={(option) => `${option} Hours`}
      />
    );
  }

  renderParking = (item) => {
    const rating = item.rating;
    const duration = item.duration;
    const price = item.price;
    const time = item.time;
    return (
      <TouchableOpacity onPress={() => this.setState({ activeModal: item })}>
        <View style={styles.item}>
          <View style={styles.info}>
            <Text style={styles.time}>{time}</Text>
            <Text style={styles.duration}>UP TO {duration}HRS</Text>
            <Text style={{ fontWeight: "600", color: "#fff" }}>
              <Ionicons name="ios-heart" /> {rating}
            </Text>
            <View style={styles.price}>
              <Text
                style={{
                  alignSelf: "center",
                  fontWeight: "600",
                  color: "#6ebcf0",
                }}
              >
                {this.calcPrice(price)}
              </Text>
            </View>
            <Text style={styles.pts}>+{item.pts} POINTS</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  renderTabs() {
    return (
      <View style={styles.tabs}>
        <View
          style={[
            styles.tab,
            this.state.carOption === "small" ? styles.activeTab : null,
          ]}
        >
          <Text
            style={[
              styles.tabTitle,
              this.state.carOption === "small" ? styles.activeTabTitle : null,
            ]}
            onPress={() => this.handleTab("small")}
          >
            <FontAwesome5 name={"car"} size={22} />
            {"\n"}
            COMPACT
          </Text>
        </View>
        <View
          style={[
            styles.tab,
            this.state.carOption === "medium" ? styles.activeTab : null,
          ]}
        >
          <Text
            style={[
              styles.tabTitle,
              this.state.carOption === "medium" ? styles.activeTabTitle : null,
            ]}
            onPress={() => this.handleTab("medium")}
          >
            <FontAwesome5 name={"car-side"} size={22} />
            {"\n"}
            SEDAN
          </Text>
        </View>
        <View
          style={[
            styles.tab,
            this.state.carOption === "large" ? styles.activeTab : null,
          ]}
        >
          <Text
            style={[
              styles.tabTitle,
              this.state.carOption === "large" ? styles.activeTabTitle : null,
            ]}
            onPress={() => this.handleTab("large")}
          >
            <FontAwesome5 name={"truck-monster"} size={22} />
            {"\n"}
            SUV
          </Text>
        </View>
      </View>
    );
  }
  renderModal() {
    const activeModal = this.state.activeModal;

    if (!activeModal) return null;
    return (
      <Modal
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          justifyContent: "center",
          flex: 1,
        }}
        isVisible
        onValueChange={() => this.setState({ activeModal: null })}
        onBackButtonPress={() => this.setState({ activeModal: null })}
        onBackdropPress={() => this.setState({ activeModal: null })}
        onSwipeComplete={() => this.setState({ activeModal: null })}
      >
        <View style={styles.parkModal}>
          <Text style={{ fontSize: 20, fontWeight: "500" }}>
            {activeModal.addr}
          </Text>
          <Text style={{ fontWeight: "300", fontSize: 12 }}>
            By {activeModal.name}
          </Text>
          <View style={styles.modalInfo}>
            <Text style={styles.infotext}>
              <Ionicons name={"ios-heart"} size={14} /> {activeModal.rating}
            </Text>
            <Text style={styles.infotext}>
              <FontAwesome5 name={"dollar-sign"} size={14} />{" "}
              {this.calcPrice(activeModal.price)}
            </Text>
            <Text style={styles.infotext}>
              <FontAwesome5 name={"car"} size={14} /> 1KM
            </Text>
          </View>
          <Text style={styles.inputTitle}>Select Vehicle Model: </Text>
          {this.renderTabs()}
          <Text style={styles.inputTitle}>SELECT PERIOD: </Text>
          {this.renderHours()}
          <TouchableOpacity
            style={{
              width: "80%",
              padding: 20,
              backgroundColor: "#FF7657",
              borderRadius: 10,
              color: "#FFF",
              alignSelf: "center",
              marginTop: 20,
              textAlign: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                alignSelf: "center",
                color: "#FFF",
                fontSize: 18,
                fontWeight: "600",
              }}
            >
              PAY ${this.calcPrice(activeModal.price)}
            </Text>
          </TouchableOpacity>
          <Text
              style={{
                alignSelf: "center",
                padding: 20,
                fontSize: 13,
                fontStyle: "italic",
                fontWeight: "400",
                marginBottom: 30,
                textAlign: "center",
              }}
            >
              <Text style={{fontWeight: "700"}}>2</Text> more people are viewing this parking lot right now.
            </Text>
        </View>
      </Modal>
    );
  }

  render() {
    let markers = this.state.dataSource.map((dealer, index) => (
      <MapView.Marker
        key={index}
        coordinate={{
          latitude: dealer.lat,
          longitude: dealer.lng,
        }}
        title={dealer.name + " - $" + dealer.price}
      />
    ));

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
          {markers}
        </MapView>
        {this.renderModal()}

        <View style={styles.horizontalMenu}>
          <FlatList
            horizontal
            data={this.state.dataSource}
            extraData={this.state}
            renderItem={({ item }) => this.renderParking(item)}
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
    backgroundColor: "#9B94FF",
    // paddingLeft: 30,
    // paddingRight: 30,
    margin: 15,
    height: 170,
    maxHeight: 170,
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
  inputTitle: {
    color: "#8A8F9E",
    fontSize: 12,
    fontWeight: "500",
    marginBottom: 5,
    textTransform: "uppercase",
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
  pts: {
    fontSize: 8,
    marginVertical: 4,
    color: "#FFF",
    opacity: 0.8,
    alignSelf: "center",
  },
  info: {
    // marginLeft: 20,
    // alignSelf: "center",
  },
  modalInfo: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingVertical: 10,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: "#FF7657",
    marginVertical: 18,
  },
  parkModal: {
    backgroundColor: "#fff",
    padding: 30,
    width: "90%",
    height: "80%",
    bottom: 30,
    borderRadius: 20,
    shadowColor: "#1f1f1f",
    shadowRadius: 12,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
  },

  tabs: {
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "#F2F2F2",
    borderRadius: 10,
    marginBottom: 30,
    width: 300,
  },
  tab: {
    minWidth: 100,
    maxWidth: 100,
    alignItems: "center",
    textAlign: "center",
    padding: 15,
    borderBottomWidth: 3,
    borderBottomColor: "transparent",
  },
  tabTitle: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 12,
    color: "#464646",
  },
  activeTab: {
    backgroundColor: "#FF7657",
    borderBottomColor: "#FF7657",
  },
  activeTabTitle: {
    color: "#FFF",
  },
  hours: {
    padding: 10,
    fontWeight: "700",
  },
  hoursTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  hoursDropdown: {
    fontSize: 18,
    fontWeight: "600",
    borderRadius: 5,
    borderColor: "#f2f2f2",
    borderWidth: 1,
    padding: 20,
    width: "100%",
  },
  hoursDropdownOption: {
    padding: 10,
    fontSize: 14,
  },
  hoursDropdownStyle: {
    marginTop: 20,
    width: "30%",
    marginLeft: -20,
    // paddingHorizontal: 10,
    // marginVertical: 10,
  },
  infotext: {
    fontWeight: "600",
    fontSize: 14,
    color: "#FF7657",
  },
});
