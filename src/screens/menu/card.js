import React from "react";
import { Image, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import {scale} from '../../scale';
const Card = props => {
  state = {
    cardImg: props.cardImg
  };

  return (
    <TouchableOpacity style={styles.card} onPress={() => props.onPress()}>
      <View style={styles.cardContent}>
        <View style={styles.textPart}>
          <Text style={styles.cardHeader}>{props.header}</Text>
          <Text style={styles.cardDecription}>{props.description}</Text>
        </View>

        <View style={styles.cardBottom}>
          <View style={styles.infoBox}>
            <Image
              source={require("../../assets/icons/kkal.png")}
              style={styles.icon}
              resizeMode="contain"
            />
            <Text style={styles.contentTitle}>{props.kcal}</Text>
          </View>
          <View style={styles.infoBox}>
            <Image
              source={require("../../assets/icons/time.png")}
              style={styles.icon}
              resizeMode="contain"
            />
            <Text style={styles.contentTitle}>{props.time}</Text>
          </View>
          <View style={styles.duration}>
            <Text style={styles.durationTitle}>{props.duration}</Text>
          </View>
        </View>
      </View>

      <View style={styles.cardImage}>
        <Image source={{ uri: this.state.cardImg }} style={styles.image} />
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  card: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 20,
    marginVertical: 20,
    backgroundColor: "#E4EAF3",
    borderRadius: 10,

    shadowColor: "#707070",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 2,
    shadowOpacity: 1.0
  },
  cardContent: {
    flex: 1,
    borderBottomColor: "#E8E7E7",
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginHorizontal: 20
  },
  textPart: {
    flex: 2,
    justifyContent: "flex-end"
  },
  cardBottom: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  infoBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  duration: {
    backgroundColor: "#254246",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 7
  },
  durationTitle: {
    color: "white",
    fontSize: scale(12)
  },
  cardImage: {
    flex: 1.8,
    justifyContent: "flex-end"
  },
  image: {
    width: "100%",
    height: "80%"
  },
  cardHeader: {
    color: "#101C1E",
    fontSize: scale(26),
    fontFamily: "Times New Roman"
  },
  cardDecription: {
    color: "#1A2F32",
    fontSize:scale(16),
    fontFamily: "Times New Roman"
  },
  contentTitle: {
    color: "#1A2F32",
    fontSize: scale(12),
    paddingLeft: 5
  },
  icon: {
    width: 20,
    height: 20
  }
});
export default Card;
