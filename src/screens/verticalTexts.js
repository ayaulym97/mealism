import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const VerticalTexts = ({ upText, downText, upStyle, downStyle }) => {
  return (
    <View style={styles.container}>
      <Text style={upStyle}>{upText}</Text>
      <Text style={downStyle}>{downText}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal:20,
    marginVertical:10


  }
});
