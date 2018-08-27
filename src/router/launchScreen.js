import React from "react";
import { ImageBackground, StyleSheet } from "react-native";

export default class LaunchScreen extends React.Component {

  render() {
    const { datas } = this.props;
    return (
      <ImageBackground
        source={require("../assets/img/authBg.png")}
        style={{ width: "100%", height: "100%" }}
      />
    );
  }
}

const styles = StyleSheet.create({});
