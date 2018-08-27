import React from "react";
import { View,StyleSheet } from "react-native";
import HeaderItem from "./headerItem";
const Header = props => {
  return (
    <View style={styles.headerView}>
      <HeaderItem
        title="завтрак"
        image={
          props.currentIndex === 0
            ? require("../../assets/icons/breakfastActive.png")
            : require("../../assets/icons/breakfast.png")
        }
        onPress={() => props.handleCard(0)}
      />
      <HeaderItem
        title="перекус"
        image={
          props.currentIndex === 1
            ? require("../../assets/icons/snackActive.png")
            : require("../../assets/icons/snack.png")
        }
        onPress={() => props.handleCard(1)}
      />
      <HeaderItem
        title="обед"
        image={
          props.currentIndex === 2
            ? require("../../assets/icons/lunchActive.png")
            : require("../../assets/icons/lunch.png")
        }
        onPress={() => props.handleCard(2)}
      />
      <HeaderItem
        title="полдник"
        image={
          props.currentIndex === 3
            ? require("../../assets/icons/afternoonSnackActive.png")
            : require("../../assets/icons/afternoonSnack.png")
        }
        onPress={() => props.handleCard(3)}
      />
      <HeaderItem
        title="ужин"
        image={
          props.currentIndex === 4
            ? require("../../assets/icons/dinnerActive.png")
            : require("../../assets/icons/dinner.png")
        }
        onPress={() => props.handleCard(4)}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  headerView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    shadowColor: "#707070",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0
  }
});
export default Header;
