import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import moment from "moment";
import Menu from "./index";


const days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
class WeekMenu extends Component {
  state = {
    currentIndex: moment().isoWeekday() - 1
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.weekView}>
          {days.map((day, index) => (
            <Text
              key={index}
              style={
                this.state.currentIndex === index
                  ? styles.weekDayTxtSelected
                  : styles.weekDayTxt
              }
              onPress={() => this.setState({ currentIndex: index })}
            >
              {day}
            </Text>
          ))}
        </View>
        {this.state.currentIndex !== 99 && (
          <Menu
            dayIndex={(() => {
              return this.state.currentIndex;
            })()}
          />
        )}
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  weekView: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "white"
  },
  weekDayTxt: {
    margin: 10,
    color: "#101C1E"
  },
  weekDayTxtSelected: {
    margin: 10,
    color: "#006DAA"
  }
});
export default WeekMenu;
