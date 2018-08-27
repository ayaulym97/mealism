import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  AsyncStorage
} from "react-native";
import Swiper from "react-native-swiper";
import {scale} from '../../scale';
import { BMI } from "./bmi";
import { Settings } from "./settings";
import { ControlItem } from "./ControlItem";
import TodayCalories from "./todayCalories";
import WeightChart from "./weightChart";

const SCREEN_WIDTH = Dimensions.get("window").width;
const BORDER_RADIUS = SCREEN_WIDTH * 0.4;

export default class Profile extends Component {
  state = {
    userData: [],
    currentIndex: 0,
    edited: false,
    gender: false,
    age: 0,
    height: 0,
    weight: 0,
    calories: 0,
    bmi: 0,
    bmiMean: null,
    selectedBtn: null
  };
  componentDidMount() {
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    try {
      const retrievedItem = await AsyncStorage.getItem("isLogged");
      const item = JSON.parse(retrievedItem);
      this.setState({
        userData: item
      });
    } catch (error) {
      console.log(error.message);
    }
    this.countCalories();
  };

  _exit = async () => {
    try {
      await AsyncStorage.removeItem("isLogged");
      this.props.navigation.navigate("Auth");
    } catch (error) {
      console.log(error);
    }
  };
  countCalories = () => {
    let weight = this.state.userData["weight"];
    let height = this.state.userData["height"];
    let age = this.state.userData["age"];
    if (this.state.userData["gender"]) {
      bazeCal = 88.36 + 13.4 * weight + 4.8 * height - 5.7 * age;
    } else {
      bazeCal = 447.6 + 9.2 * weight + 3.1 * height - 4.3 * age;
    }
    if (this.state.userData["mode"] === "lose") {
      mode = 0.85;
    } else if (this.state.userData["mode"] === "normal") {
      mode = 1;
    } else {
      mode = 1.2;
    }
    bmi = (weight / Math.pow(height, 2)) * 10000;
    bmiNums = bmi.toFixed(1);
    if (bmi < 18.5) {
      bmiMean = "Недовес";
    } else if (18.6 < bmi < 25) {
      bmiMean = "Нормальная масса";
    } else if (25.1 < bmi < 30) {
      bmiMean = "Предожирение";
    } else if (30.1 < bmi < 40) {
      bmiMean = "Ожирение";
    }

    this.setState({
      calories: Math.round(bazeCal * mode * 1.2),
      bmi: bmiNums,
      bmiMean: bmiMean
    });
  };
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

  handleCard = nextSlideIndex => {
    if (this.state.currentIndex < nextSlideIndex) {
      this.swiper.scrollBy(-1 * (this.state.currentIndex - nextSlideIndex));
    } else if (this.state.currentIndex === nextSlideIndex) {
      this.swiper.scrollBy(0);
    } else {
      this.swiper.scrollBy(nextSlideIndex - this.state.currentIndex);
    }
  };
  handleSettingEdit = () => {
    this.setState({ edited: !this.state.edited });
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        {/* controlCircleButton */}
        <View style={{ flex: 1 }}>
          <View style={styles.upControlView}>
            <ControlItem
              handleCard={() => this.handleCard(0)}
              currentIndex="0"
              title="калории"
              style={{ borderTopLeftRadius: BORDER_RADIUS }}
              gradientColor={
                this.state.currentIndex === 0 ? ["#1ED2A9", "#0DCF4E"] : []
              }
              icon={require("../../assets/icons/fire.png")}
              iconActive={require("../../assets/icons/fireActive.png")}
            />
            <View style={styles.verticalSeparator} />
            <ControlItem
              handleCard={() => this.handleCard(1)}
              currentIndex="1"
              title="BMI"
              style={{ borderTopRightRadius: BORDER_RADIUS }}
              gradientColor={
                this.state.currentIndex === 1 ? ["#EF8C27", "#F76B1C"] : []
              }
              icon={require("../../assets/icons/bmi.png")}
              iconActive={require("../../assets/icons/bmiActive.png")}
            />
          </View>
          <View style={styles.horizontalSeparator} />
          <View style={styles.downControlView}>
            <ControlItem
              handleCard={() => this.handleCard(3)}
              currentIndex="3"
              title="настройки"
              style={{ borderBottomLeftRadius: BORDER_RADIUS }}
              gradientColor={
                this.state.currentIndex === 3 ? ["#3023AE", "#C86DD7"] : []
              }
              icon={require("../../assets/icons/settings.png")}
              iconActive={require("../../assets/icons/settingsActive.png")}
            />
            <View style={styles.verticalSeparator} />
            <ControlItem
              handleCard={() => this.handleCard(2)}
              currentIndex="2"
              title="ваш вес"
              style={{ borderBottomRightRadius: BORDER_RADIUS }}
              gradientColor={
                this.state.currentIndex === 2 ? ["#078BD1", "#0353A4"] : []
              }
              icon={require("../../assets/icons/weight.png")}
              iconActive={require("../../assets/icons/weightActive.png")}
            />
          </View>
          <View style={styles.centerCircle}>
            <Text style={styles.centerCircleHeader}>дневная норма</Text>
            <Text style={styles.centerCircleTitle}>{this.state.calories}</Text>
            <Text style={styles.centerCircleSubTitle}>ккал</Text>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <Swiper
            ref={ref => (this.swiper = ref)}
            showsPagination={false}
            onIndexChanged={index => this.setState({ currentIndex: index })}
          >
            <TodayCalories />
            <BMI bmiNum={this.state.bmi} bmiMean={this.state.bmiMean} />
            <WeightChart />
            <Settings
              exit={() => this._exit()}
              userData={this.state.userData}
              onPressAge={this.handleAge}
              edited={this.state.edited}
              onPress={() => this.handleSettingEdit()}
              selectedBtn={this.state.userData["mode"]}
              selectionOnPress={() => this.selectionOnPress}
            />
          </Swiper>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: "white"
  },
  upControlView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end"
  },
  downControlView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center"
  },
  centerCircle: {
    width: "30%",
    aspectRatio: 1,
    position: "absolute",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Dimensions.get("window").width * 0.3,
    marginLeft: Dimensions.get("window").width * 0.35,
    marginTop: Dimensions.get("window").height * 0.15,
    shadowColor: "#707070",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 2,
    shadowOpacity: 0.9
  },
  centerCircleHeader: {
    color: "#003559",
    fontSize: scale(10),
    fontWeight: "bold",
    fontFamily: "Times New Roman"
  },
  centerCircleTitle: {
    color: "#006DAA",
    fontSize: scale(24),
    fontFamily: "Avenir"
  },
  centerCircleSubTitle: {
    color: "#003559",
    fontSize: scale(14),
    fontWeight: "bold",
    fontFamily: "Times New Roman"
  },
  verticalSeparator: {
    height: "100%",
    borderLeftWidth: 1,
    borderLeftColor: "#E8E7E7"
  },
  horizontalSeparator: {
    width: "80%",
    marginHorizontal: "10%",
    borderTopWidth: 1,
    borderTopColor: "#E8E7E7"
  }
});
