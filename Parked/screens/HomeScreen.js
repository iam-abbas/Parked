import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import * as firebase from "firebase";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { ProgressChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      region: null,
      dataSource: [],
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

  componentDidMount() {
    const { email, displayName } = firebase.auth().currentUser;

    this.setState({ email, displayName });
  }

  signOutUser = () => {
    firebase.auth().signOut();
  };

  render() {
    const data = {
      labels: ["Points"], // optional
      data: [0.828],
    };
    const chartConfig = {
      backgroundGradientFrom: "rgba(255, 255, 255, 0)",
      backgroundGradientFromOpacity: 0,
      backgroundGradientTo: "transparent",
      backgroundGradientToOpacity: 0,
      color: (opacity = 1) => `rgba(255, 160, 50, ${opacity + 0.15})`,
      style: {
        borderRadius: 0,
      },
      strokeWidth: 8, // optional, default 3
      barPercentage: 1,
      useShadowColorFromDataset: false, // optional
    };
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
              fontSize: 14,
              paddingTop: 10,
              color: "#fff",
            }}
          >
            Welcome Back{" "}
            <Text style={{ fontWeight: "700" }}>{this.state.displayName}</Text>
          </Text>
        </View>
        <View style={styles.card}>
          <View style={{ flexDirection: "row" }}>
            <ProgressChart
              data={data}
              style={{ marginLeft: 0 }}
              width={screenWidth - 255}
              height={120}
              strokeWidth={21}
              radius={36}
              chartConfig={chartConfig}
              hideLegend={true}
            />
            <View style={{ alignSelf: "center", flexWrap: "wrap" }}>
              <Text style={{ color: "#003F5A", fontWeight: "600" }}>
                Loyalty Balance
              </Text>
              <Text
                style={{ color: "#FEA02F", fontWeight: "800", fontSize: 26 }}
              >
                828 Points
              </Text>
              <Text
                style={{ color: "#003F5A", fontWeight: "500", fontSize: 12 }}
              >
                172 points until next reward.
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.plat}>
          <Text style={{ color: "#FFF", fontWeight: "600" }}>
            <MaterialCommunityIcons name={"trophy-award"} size={55} />
          </Text>
          <Text
            style={{
              color: "#FFF",
              fontWeight: "800",
              textTransform: "uppercase",
            }}
          >
            Platinum Member Benefits {"\n"}Unlocked
          </Text>
        </View>
        <View style={styles.resr}>
          <Text style={{ fontSize: 12, fontWeight: "700", color: "#003F5A" }}>
            UPCOMING EVENTS
          </Text>
          <View style={styles.event}>
            <View style={styles.date}>
              <Text
                style={{ color: "#FF7657", fontSize: 26, fontWeight: "700" }}
              >
                1
              </Text>
              <Text
                style={{
                  color: "#FF7657",
                  fontSize: 12,
                  fontWeight: "600",
                  opacity: 0.6,
                }}
              >
                May
              </Text>
            </View>
            <Text style={{ paddingLeft: 15, fontSize: 16, fontWeight: "500" }}>
              Skrillex Concert - Cal Stadium
            </Text>
          </View>
          <View style={styles.event}>
            <View style={styles.date}>
              <Text
                style={{ color: "#FF7657", fontSize: 26, fontWeight: "700" }}
              >
                5
              </Text>
              <Text
                style={{
                  color: "#FF7657",
                  fontSize: 12,
                  fontWeight: "600",
                  opacity: 0.6,
                }}
              >
                May
              </Text>
            </View>
            <Text style={{ paddingLeft: 15, fontSize: 16, fontWeight: "500" }}>
              Football - San Francisco
            </Text>
          </View>
          <View style={styles.event}>
            <View style={styles.date}>
              <Text
                style={{ color: "#FF7657", fontSize: 26, fontWeight: "700" }}
              >
                12
              </Text>
              <Text
                style={{
                  color: "#FF7657",
                  fontSize: 12,
                  fontWeight: "600",
                  opacity: 0.6,
                }}
              >
                May
              </Text>
            </View>
            <Text style={{ paddingLeft: 15, fontSize: 16, fontWeight: "500" }}>
              Cal Day - UC Berkeley
            </Text>
          </View>
          <View style={styles.event}>
            <View style={styles.date}>
              <Text
                style={{ color: "#FF7657", fontSize: 26, fontWeight: "700" }}
              >
                24
              </Text>
              <Text
                style={{
                  color: "#FF7657",
                  fontSize: 12,
                  fontWeight: "600",
                  opacity: 0.6,
                }}
              >
                May
              </Text>
            </View>
            <Text style={{ paddingLeft: 15, fontSize: 16, fontWeight: "500" }}>
              MLG Major - Oakland
            </Text>
          </View>
        </View>
      </ScrollView>
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
  resr: {
    width: "90%",
    alignSelf: "center",
    backgroundColor: "#fff",
    marginTop: 32,
    borderRadius: 10,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingTop: 20,
    marginBottom: 30,
    paddingRight: 20,
    shadowColor: "#1f1f1f",
    shadowRadius: 12,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
  },
  event: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 5,
    paddingVertical: 20,
    paddingHorizontal: 5,
  },
  date: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginHorizontal: 5,
  },
  plat: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#ff4747",
    marginTop: 32,
    borderRadius: 10,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingTop: 20,
    paddingRight: 20,
    shadowColor: "#ff4747",
    shadowRadius: 12,
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
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
    shadowOffset: { width: 0, height: 2 },
  },
});
