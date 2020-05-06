import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import * as firebase from "firebase";
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import { ProgressChart, BarChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

export default class revenueScreen extends React.Component {
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
      labels: ["March", "April", "May"],
      datasets: [
        {
          data: [533, 701, 1003],
        },
      ],
    };
    const chartConfig = {
      backgroundGradientFrom: "#1E2923",
      backgroundGradientFromOpacity: 0,
      backgroundGradientTo: "#08130D",
      backgroundGradientToOpacity: 0,
      color: (opacity = 1) => `rgba(255, 71, 71, ${opacity + 2})`,
      strokeWidth: 2, // optional, default 3
      barPercentage: 0.5,
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
              fontSize: 12,
              paddingTop: 10,
              fontWeight: "700",
              color: "#fff",
            }}
          >
            YOU ARE DOING GREAT
          </Text>
        </View>
        <View style={styles.card}>
          <View style={{ flexDirection: "column" }}>
            <BarChart
              style={styles.graphStyle}
              data={data}
              width={screenWidth - 60}
              height={220}
              yAxisLabel=" $"
              fromZero={true}
              withInnerLines={false}
              chartConfig={chartConfig}
              verticalLabelRotation={0}
              showBarTops={true}
            />
            <View
              style={{
                alignSelf: "center",
                marginTop: 30,
                textAlign: "center",
                flexWrap: "wrap",
              }}
            >
              <Text
                style={{
                  color: "#003F5A",
                  textAlign: "center",
                  fontWeight: "600",
                }}
              >
                YOU MADE
              </Text>
              <Text
                style={{
                  color: "#FEA02F",
                  fontWeight: "800",
                  textAlign: "center",
                  fontSize: 30,
                }}
              >
                $1003.45
              </Text>
              <Text
                style={{
                  color: "#003F5A",
                  fontWeight: "500",
                  textAlign: "center",
                  fontSize: 12,
                }}
              >
                THIS MONTH
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.plat}>
          <Text style={{ color: "#FFF", fontWeight: "600", margin: 5 }}>
            <FontAwesome5 name={"money-check-alt"} size={45} />
          </Text>
          <Text
            style={{
              color: "#FFF",
              fontWeight: "600",
              textTransform: "uppercase",
              textAlign: "center",
            }}
          >
            WELCOME TO <Text style={{ fontWeight: "800" }}>ONE GRAND CLUB</Text>
          </Text>
        </View>
        <View style={styles.resr}>
          <Text style={{ fontSize: 12, fontWeight: "700", color: "#003F5A" }}>
            RECENT EARNINGS
          </Text>
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
              $12 - 1277 Hearst Ave
            </Text>
          </View>
          <View style={styles.event}>
            <View style={styles.date}>
              <Text
                style={{ color: "#FF7657", fontSize: 26, fontWeight: "700" }}
              >
                3
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
            $22 - 1278 Hearst Ave
            </Text>
          </View>
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
            $32 - University Ave
            </Text>
          </View>
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
            $12 - Bancroft Ave
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
  graphStyle: {
    paddingLeft: 10,
    borderBottomColor: "#d8d8d8",
    borderBottomWidth: 1,
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
    flexDirection: "column",
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
