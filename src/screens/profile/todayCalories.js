import React, { Component } from "react";

import {
  Platform,
  StyleSheet,
  View,
  Text,
  ProgressBarAndroid,
  ProgressViewIOS
} from "react-native";
import {scale} from '../../scale';
export default class TodayCalories extends Component {
  state = {
    progressValue: 0.0,
    data: [
      {
        name: "жиры",
        amount: 0.56,
        color: "#27BD2F"
      },
      {
        name: "углеводы",
        amount: 0.67,
        color: "#0353A4"
      },
      {
        name: "белки",
        amount: 0.4,
        color: "#E55812"
      }
    ]
  };
  //   componentDidMount() {
  //     this.startProgress();
  //   }
  //   startProgress = () => {
  //     this.value = setInterval(() => {
  //       if (this.state.progressValue <= 1) {
  //         this.setState({ progressValue: this.state.progressValue + 0.01 });
  //       }
  //     }, 10);
  //   };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Сегодня</Text>
        <View style={styles.content}>
          {this.state.data.map((item, index) => (
            <React.Fragment key={index}>
              {Platform.OS === "android" ? (
                <View  style={styles.subCard} key={index}>
                  <Text style={styles.title}>{item.name}:</Text>
                  <ProgressBarAndroid
                    color={item.color}
                    styleAttr="Horizontal"
                    progress={item.amount}
                    indeterminate={false}
                  />
                  ) :
                </View>
              ) : (
                <View  style={styles.subCard}>
                  <Text style={styles.title}>{item.name}:</Text>
                  <ProgressViewIOS
                    trackTintColor={"#ECECEC"}
                    progressTintColor={item.color}
                    progress={item.amount}
                    style={styles.progressBar}
                  />
                </View>
              )}
            </React.Fragment>
          ))}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20
  },
  header: {
    color: "#101E5C",
    fontSize: scale(16),
    fontWeight: "bold",
    fontFamily: "Avenir",
    paddingLeft: 20,
    marginVertical: 20
  },
  content: {
    height: "30%",
    backgroundColor: "#FDFEFF",
    borderRadius: 5,
    shadowColor: "#88B3E5",
    shadowRadius: 4,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 3
    },
    marginHorizontal: "5%"
  },
  subCard: {
    flex: 1,
    justifyContent: "center"
  },
  progressBar: {
    width: "90%",
    transform: [{ scaleX: 1.0 }, { scaleY: 2.5 }],
    marginHorizontal: "5%"
  },
  title: {
    color: "#101E5C",
    fontSize: scale(14),
    fontWeight: "bold",
    fontFamily: "Avenir",
    paddingLeft: 20,
    paddingBottom: 10
  }
});
