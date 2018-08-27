import React from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo";
import {scale} from '../../scale';
export const ControlItem = ({
  handleCard,
  currentIndex,
  title,
  style = null,
  gradientColor,
  icon,
  iconActive
}) => {
  return (
    <TouchableOpacity onPress={handleCard} style={[styles.todayBtn, style]}>
      <LinearGradient
        colors={gradientColor}
        style={[styles.todayBtn, { width: "100%" }]}
      >
        {gradientColor.length === 0 ? (
          <View style={styles.content}>
            <Image source={icon} style={styles.icon} resizeMode="contain" />
            <Text style={styles.centerCircleHeader}>{title}</Text>
          </View>
        ) : (
          <Image
            source={iconActive}
            style={styles.iconActive}
            resizeMode="contain"
          />
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  todayBtn: {
    width: "40%",
    aspectRatio: 1,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "white"
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  centerCircleHeader: {
    color: "#101C1E",
    fontSize: scale(10),
    fontWeight: "bold",
    fontFamily: "Times New Roman"
  },
  icon: {
    width: 25,
    height: 25,
    marginBottom: 5
  },
  iconActive: {
    width: 32,
    height: 32
  }
});
