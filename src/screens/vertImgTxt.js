import React from "react";
import { TouchableOpacity,Image, Text, StyleSheet } from "react-native";

export const VertImgTxt = ({ img, txt, imgStyle, txtStyle,edited,onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} disabled={!edited}>
      <Image
            style={imgStyle}
            resizeMode="contain"
            source={img}
          />
      <Text style={txtStyle}>{txt}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin:20,
  }
});
