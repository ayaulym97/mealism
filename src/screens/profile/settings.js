import React from "react";
import { View, Image, TouchableOpacity, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo";
import { VerticalTexts } from "../verticalTexts";
import { VertImgTxt } from "../vertImgTxt";
import LineGauge from "../LineGauge";
import {scale} from '../../scale';
export const Settings = ({
  edited,
  onPress,
  onPressAge,
  selectedBtn,
  selectionOnPress,
  userData,
  exit
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerView}>
        <Text style={styles.header}>Настройки</Text>
        <TouchableOpacity onPress={exit}>
          <Image
            style={styles.editIcon}
            resizeMode="contain"
            source={require("../../assets/icons/logout.png")}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <TouchableOpacity style={styles.editBtn} onPress={onPress}>
          {edited ? null : (
            <Image
              style={styles.editIcon}
              resizeMode="contain"
              source={require("../../assets/icons/edit.png")}
            />
          )}
        </TouchableOpacity>
        <View style={styles.rowContainer}>
          {edited ? (
            <View style={styles.flexCenterContainer}>
              <Text style={styles.upTextStyle}>возраст</Text>
              <LineGauge
                min={20}
                max={100}
                largeInterval={5}
                value={40}
                styles={{ container: styles.gauge }}
                onChange={item => onPressAge(item)}
              />
            </View>
          ) : (
            <VerticalTexts
              upText={"возраст"}
              downText={userData["age"] + "лет"}
              upStyle={styles.upTextStyle}
              downStyle={styles.downTextStyle}
              styles={{ backgroundColor: "red" }}
            />
          )}

          <View style={styles.verticalSeparator} />
          {edited ? (
            <View style={styles.flexCenterContainer}>
              <Text style={styles.upTextStyle}>вес</Text>
              <LineGauge
                min={20}
                max={170}
                largeInterval={5}
                value={40}
                styles={{ container: styles.gauge }}
                onChange={this._handleGaugeChange}
              />
            </View>
          ) : (
            <VerticalTexts
              upText={"вес"}
              downText={userData["weight"] + "кг"}
              upStyle={styles.upTextStyle}
              downStyle={styles.downTextStyle}
            />
          )}
        </View>
        <View style={styles.rowContainer}>
          <View style={styles.horizontalSeparator} />
          <View style={styles.horizontalSeparator} />
        </View>

        <View style={styles.downRowContainer}>
          {edited ? (
            <View style={styles.flexCenterContainer}>
              <Text style={styles.upTextStyle}>рост</Text>
              <LineGauge
                min={20}
                max={170}
                largeInterval={5}
                value={40}
                styles={{ container: styles.gauge }}
                onChange={this._handleGaugeChange}
                style={styles.linearGradient}
              />
            </View>
          ) : (
            <VerticalTexts
              upText={"рост"}
              downText={userData["height"] + "см"}
              upStyle={styles.upTextStyle}
              downStyle={styles.downTextStyle}
            />
          )}
          <View style={styles.verticalSeparator} />
          <View
            style={[
              styles.genderIcon,
              userData["gender"]
                ? {
                    borderColor: "#F080B3",
                    backgroundColor: "#EF96BF"
                  }
                : { backgroundColor: "#006DAA", borderColor: "#006DAA" }
            ]}
          >
            <Image
              style={{ width: 32, height: 32 }}
              resizeMode="contain"
              source={
                userData["gender"]
                  ? require("../../assets/icons/femaleActive.png")
                  : require("../../assets/icons/maleActive.png")
              }
            />
          </View>
        </View>
        <View style={styles.btnContainer}>
          <VertImgTxt
            img={
              selectedBtn === "lose"
                ? require("../../assets/icons/downActive.png")
                : require("../../assets/icons/down.png")
            }
            onPress={() => selectionOnPress("lose")}
            txt={"похудение"}
            imgStyle={styles.imgStyle}
            txtStyle={styles.txtStyle}
            edited={edited}
          />

          <VertImgTxt
            img={
              selectedBtn === "normal"
                ? require("../../assets/icons/equalActive.png")
                : require("../../assets/icons/equal.png")
            }
            onPress={() => selectionOnPress("normal")}
            txt={"подержание"}
            imgStyle={styles.imgStyle}
            txtStyle={styles.txtStyle}
            edited={edited}
          />

          <VertImgTxt
            img={
              selectedBtn === "gain"
                ? require("../../assets/icons/upActive.png")
                : require("../../assets/icons/up.png")
            }
            onPress={() => selectionOnPress("gain")}
            txt={"набор веса"}
            imgStyle={styles.imgStyle}
            txtStyle={styles.txtStyle}
            edited={edited}
          />
        </View>
        {edited ? (
          <TouchableOpacity style={styles.saveBtn} onPress={onPress}>
            <LinearGradient
              start={[0, 1]}
              end={[1, 0]}
              colors={["#5b247a", "#1bcedf"]}
              style={styles.linearGradient}
            >
              <Text style={styles.saveTxt}>сохранить</Text>
            </LinearGradient>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
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
  rowContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  downRowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  btnContainer: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: "5%"
  },
  headerView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: "5%"
  },
  header: {
    color: "#101E5C",
    fontSize: scale(16),
    fontWeight: "bold",
    fontFamily: "Avenir",
    marginVertical: 10
  },
  upTextStyle: {
    color: "#B2B0B2",
    fontSize: scale(16),
    marginBottom: 10,
    fontFamily: "Avenir"
  },
  downTextStyle: {
    color: "#101E5C",
    fontSize: scale(20),
    fontWeight: "bold",
    fontFamily: "Avenir"
  },
  verticalSeparator: {
    height: "50%",
    borderLeftWidth: 1,
    borderLeftColor: "#E8E7E7"
  },
  horizontalSeparator: {
    width: "30%",
    borderTopWidth: 1,
    borderTopColor: "#E8E7E7",
    marginHorizontal: "10%"
  },
  imgStyle: {
    width: 25,
    height: 25
  },
  txtStyle: {
    color: "#B2B0B2",
    fontSize: scale(10),
    marginBottom: 10,
    fontFamily: "Avenir"
  },
  saveBtn: {
    overflow: "hidden",
    marginHorizontal: "10%",
    marginVertical: 10,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10
  },
  saveTxt: {
    color: "white",
    fontSize: scale(16),
    fontFamily: "Avenir"
  },
  linearGradient: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  genderIcon: {
    marginHorizontal: "17.9%",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    width: 45,
    height: 45

  },
  flexCenterContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  editBtn: {
    marginLeft: "85%",
    marginTop: 20
  },
  editIcon: {
    width: 20,
    height: 20
  },
  gauge: {
    width: "50%"
  }
});
