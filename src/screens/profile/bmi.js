import React, { Component } from "react";

import {
  Platform,
  StyleSheet,
  View,
  Text,
  ProgressBarAndroid,
  ProgressViewIOS
} from "react-native";
import { scale } from "../../scale";
export const BMI = ({ bmiNum, bmiMean }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>BMI</Text>
      <View style={styles.content}>
        <View style={styles.upView}>
          <Text style={styles.bmiIndexTitle}>{bmiNum}</Text>
          <Text style={styles.bmiTitle}>{bmiMean}</Text>
        </View>
        <Text style={styles.yourBMI}>ваш текущий ИМТ</Text>
        {Platform.OS === "android" ? (
          <View style={styles.progressBarView}>
            <ProgressBarAndroid
              color={"#14B3FF"}
              styleAttr="Horizontal"
              progress={item.amount}
              indeterminate={false}
            />
            <ProgressBarAndroid
              color={"#00CE9F"}
              styleAttr="Horizontal"
              progress={item.amount}
              indeterminate={false}
            />
            <ProgressBarAndroid
              color={"#FFC600"}
              styleAttr="Horizontal"
              progress={item.amount}
              indeterminate={false}
            />
            <ProgressBarAndroid
              color={"#ED334A"}
              styleAttr="Horizontal"
              progress={item.amount}
              indeterminate={false}
            />
          </View>
        ) : (
          <View style={styles.progressBarView}>
            <ProgressViewIOS
              progressTintColor={"#14B3FF"}
              progress={1}
              style={[styles.progressBar, { width: "20%" }]}
            />

            <ProgressViewIOS
              progressTintColor={"#00CE9F"}
              progress={1}
              style={[styles.progressBar, { width: "20%" }]}
            />

            <ProgressViewIOS
              progressTintColor={"#FFC600"}
              progress={1}
              style={[styles.progressBar, { width: "20%" }]}
            />

            <ProgressViewIOS
              progressTintColor={"#ED334A"}
              progress={1}
              style={[styles.progressBar, { width: "35%" }]}
            />
          </View>
        )}
        <View style={styles.downView}>
          <Text style={[styles.bmiNum, { width: "20%" }]}>0</Text>
          <Text style={[styles.bmiNum, { width: "20%" }]}>18.5</Text>
          <Text style={[styles.bmiNum, { width: "20%" }]}>25</Text>
          <Text style={[styles.bmiNum, { width: "35%" }]}>30</Text>
          <Text style={styles.bmiNum}>40</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
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
  upView: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    marginHorizontal: "5%"
  },
  downView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 3,
    marginHorizontal: "5%"
  },
  progressBarView: {
    flexDirection: "row",
    marginHorizontal: "5%"
  },
  progressBar: {
    transform: [{ scaleX: 1.0 }, { scaleY: 2.5 }],
    borderRadius: 30,
    marginLeft: 3
  },
  bmiIndexTitle: {
    color: "#101E5C",
    fontSize: scale(20),
    fontWeight: "bold",
    fontFamily: "Avenir"
  },
  bmiTitle: {
    color: "#68CCFF",
    fontSize: scale(18),
    fontWeight: "bold",
    fontFamily: "Avenir",
    paddingLeft: 10
  },
  yourBMI: {
    color: "#D4D6E0",
    fontSize: scale(14),
    fontWeight: "bold",
    fontFamily: "Avenir",
    marginHorizontal: "5%",
    marginTop: 10,
    marginBottom: 20
  },
  bmiNum: {
    color: "#D4D6E0",
    fontSize: scale(14),
    fontWeight: "bold",
    fontFamily: "Avenir"
  }
});
