import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  Constants
} from "react-native";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { LinearGradient } from "expo";
import LineGauge from "../LineGauge";
import { VertImgTxt } from "../vertImgTxt";
import { scale } from "../../scale";
const CREATE_USER = gql`
  mutation addUser(
    $gender: Boolean!
    $age: Int!
    $height: Int!
    $weight: Int!
    $mode: String!
    $authProvider: AuthProviderSignupData = {
      email: { email: "", password: "" }
    }
  ) {
    createUser(
      gender: $gender
      age: $age
      height: $height
      weight: $weight
      mode: $mode
      authProvider: $authProvider
    ) {
      email
      password
      gender
      age
      height
      weight
      mode
    }
  }
`;

export default class UserInform extends React.Component {
  state = {
    gender: false,
    age: 0,
    height: 0,
    weight: 0,
    selectedBtn: null
  };

  auth = this.props.navigation.getParam("auth", "default");
  selectionOnPress(userType) {
    this.setState({ selectedBtn: userType });
  }
  handleAge = item => {
    this.setState({ age: item });
  };
  handleHeight = item => {
    this.setState({ height: item });
  };
  handleWeight = item => {
    this.setState({ weight: item });
  };
  handleFemaleGender = () => {
    this.setState({ gender: true });
  };
  handleMaleGender = () => {
    this.setState({ gender: false });
  };
  storeData = async () => {
    try {
      await AsyncStorage.clear();
      await AsyncStorage.setItem("isLogged", "1");
    } catch (error) {
      console.log(error);
    }
  };
  handleLogin = async createUser => {
    try {
      const response = await createUser({
        variables: {
          gender: this.state.gender,
          age: this.state.age,
          height: this.state.height,
          weight: this.state.weight,
          mode: this.state.selectedBtn,
          authProvider: {
            email: {
              email: this.auth[0],
              password: this.auth[1]
            }
          }
        }
      });
      this.storeData();
      this.props.navigation.navigate("rootStack", {
        user: response.data.createUser.user
      });
    } catch (error) {
      console.log("error", error);
    }
  };
  render() {
    return (
      <Mutation mutation={CREATE_USER}>
        {(createUser, { error }) => (
          <View style={styles.container}>
            <View style={styles.txtBox}>
              <Text style={styles.title}>
                Прежде чем начать,нам нужны ваши данные
              </Text>
              <Text style={styles.title}>для того чтобы подобрать меню</Text>
              <Text style={styles.title}>специально для вас!</Text>
            </View>

            <View style={styles.viewBox}>
              <View style={styles.subViewBox}>
                <Text style={styles.headerTxt}>Рост</Text>
                <View style={styles.subViewBox}>
                  <Text style={styles.headerTxt}>{this.state.height}</Text>
                  <Text style={styles.valueTxt}>cм</Text>
                </View>
              </View>
              <LineGauge
                min={50}
                max={250}
                largeInterval={5}
                value={70}
                onChange={item => this.handleHeight(item)}
                styles={{ container: styles.gauge }}
              />
            </View>
            <View style={styles.viewBox}>
              <View style={styles.subViewBox}>
                <Text style={styles.headerTxt}>Вес</Text>
                <View style={styles.subViewBox}>
                  <Text style={styles.headerTxt}>{this.state.weight}</Text>
                  <Text style={styles.valueTxt}>кг</Text>
                </View>
              </View>
              <LineGauge
                min={20}
                max={200}
                largeInterval={5}
                value={70}
                styles={{ container: styles.gauge }}
                onChange={item => this.handleWeight(item)}
              />
            </View>
            <View style={styles.viewBox}>
              <View style={styles.subViewBox}>
                <Text style={styles.headerTxt}>Ваш возраст</Text>
                <View style={styles.subViewBox}>
                  <Text style={styles.headerTxt}>{this.state.age}</Text>
                  <Text style={styles.valueTxt}>лет</Text>
                </View>
              </View>
              <LineGauge
                min={0}
                max={90}
                largeInterval={5}
                value={70}
                styles={{ container: styles.gauge }}
                onChange={item => this.handleAge(item)}
              />
            </View>
            <View style={styles.viewBox}>
              <Text style={styles.headerTxt}>Ваша цель</Text>

              <View style={styles.btnContainer}>
                <VertImgTxt
                  img={
                    this.state.selectedBtn === "lose"
                      ? require("../../assets/icons/downActive.png")
                      : require("../../assets/icons/down.png")
                  }
                  onPress={() => this.selectionOnPress("lose")}
                  txt={"похудение"}
                  imgStyle={styles.imgStyle}
                  txtStyle={styles.txtStyle}
                  edited={true}
                />

                <VertImgTxt
                  img={
                    this.state.selectedBtn === "normal"
                      ? require("../../assets/icons/equalActive.png")
                      : require("../../assets/icons/equal.png")
                  }
                  txt={"подержание"}
                  imgStyle={styles.imgStyle}
                  txtStyle={styles.txtStyle}
                  edited={true}
                  onPress={() => this.selectionOnPress("normal")}
                />

                <VertImgTxt
                  img={
                    this.state.selectedBtn === "gain"
                      ? require("../../assets/icons/upActive.png")
                      : require("../../assets/icons/up.png")
                  }
                  txt={"набор веса"}
                  imgStyle={styles.imgStyle}
                  txtStyle={styles.txtStyle}
                  edited={true}
                  onPress={() => this.selectionOnPress("gain")}
                />
              </View>
            </View>
            <View style={styles.viewBox}>
              <Text style={styles.headerTxt}>Ваш пол</Text>
              <View style={styles.subViewBox}>
                <View style={styles.genderBox}>
                  <TouchableOpacity
                    style={
                      this.state.gender ? styles.femaleIcon : styles.genderIcon
                    }
                    onPress={() => this.handleFemaleGender()}
                  >
                    <Image
                      style={styles.imgStyle}
                      resizeMode="contain"
                      source={require("../../assets/icons/femaleActive.png")}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={
                      this.state.gender ? styles.genderIcon : styles.maleIcon
                    }
                    onPress={() => this.handleMaleGender()}
                  >
                    <Image
                      style={styles.imgStyle}
                      resizeMode="contain"
                      source={require("../../assets/icons/maleActive.png")}
                    />
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={() => this.handleLogin(createUser)}
                >
                  <LinearGradient
                    colors={["#4A90E2", "#3BB2B8"]}
                    style={styles.linearGradient}
                  >
                    <Text style={styles.saveButtonText}>Начать</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </Mutation>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:"white"
  },
  viewBox: {
    width: "90%",
    marginBottom: 10,
    marginHorizontal: "5%"
  },
  gauge: {
    width: "100%"
  },
  subViewBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  txtBox: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: Platform.OS === "ios" ? 10 : Constants.statusBarHeight
  },
  genderBox: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  headerTxt: {
    color: "#101E5C",
    fontSize: scale(14)
  },
  valueTxt: {
    color: "#9B9B9B",
    fontSize: scale(16)
  },
  title: {
    width: "100%",
    color: "#1A2F32",
    fontSize: scale(14),
    textAlign: "center"
  },
  genderIcon: {
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#F080B3",
    width: 45,
    height: 45,
    backgroundColor: "#ECECEC"
  },
  femaleIcon: {
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#F080B3",
    width: 50,
    height: 50,
    backgroundColor: "#EF96BF"
  },
  maleIcon: {
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#006DAA",
    width: 50,
    height: 50,
    backgroundColor: "#006DAA"
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%"
  },
  imgStyle: {
    width: 32,
    height: 32
  },
  txtStyle: {
    color: "#B2B0B2",
    fontSize: scale(10),
    fontFamily: "Avenir"
  },
  linearGradient: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10
  },
  saveButton: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: "50%",
    marginTop: 10,
    borderRadius: 10
  },
  saveButtonText: {
    color: "white",
    fontSize: scale(16)
  }
});
