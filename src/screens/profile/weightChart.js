import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Grid, AreaChart, XAxis, YAxis } from "react-native-svg-charts";
import * as shape from "d3-shape";
const data = [30,40,50];
const datas=[21,22,23]
const axesSvg = { fontSize: 10, fill: "grey" };
const verticalContentInset = { top: 10, bottom: 10 };
const xAxisHeight = 30;
import {scale} from '../../scale';
export default class WeightChart extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Ваш вес</Text>
        <View style={styles.content}>
          <YAxis
            data={data}
            style={{ marginBottom: xAxisHeight }}
            contentInset={verticalContentInset}
            svg={axesSvg}
          />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <AreaChart
              style={{ flex: 1 }}
              data={datas}
              contentInset={verticalContentInset}
              curve={shape.curveNatural}
              svg={{ fill: "rgba(134, 65, 244, 0.2)" }}
            >
              <Grid />
            </AreaChart>
            <XAxis
              style={{ marginHorizontal: -10, height: xAxisHeight }}
              data={datas}
              
              contentInset={{ left: 10, right: 10 }}
              svg={axesSvg}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    height: "30%",
    flexDirection: "row",
    padding: 20,
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
  header: {
    color: "#101E5C",
    fontSize: scale(16),
    fontWeight: "bold",
    fontFamily: "Avenir",
    paddingLeft: 20,
    marginVertical: 20
  }
});
