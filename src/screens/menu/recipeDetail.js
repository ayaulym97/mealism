import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  FlatList,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { scale } from "../../scale";
class RecipeDetail extends Component {
  state = {
    modalVisible: false,
    instructions: [
      {
        id: 1,
        instruction:
          "Промойте 1 стакан зерен, удалите сор и шелуху.Овсянку замочите в холодной кипяченой воде на 30-60 минут."
      },
      {
        id: 2,
        instruction:
          "Промойте 1 стакан зерен, удалите сор и шелуху. Овсянку замочите в холодной кипяченой воде на 30-60 минут."
      },
      {
        id: 3,
        instruction:
          "Промойте 1 стакан зерен, удалите сор и шелуху. Овсянку замочите в холодной кипяченой воде на 30-60 минут."
      },
      {
        id: 4,
        instruction:
          "Промойте 1 стакан зерен, удалите сор и шелуху. Овсянку замочите в холодной кипяченой воде на 30-60 минут."
      },
      {
        id: 5,
        instruction:
          "Промойте 1 стакан зерен, удалите сор и шелуху. Овсянку замочите в холодной кипяченой воде на 30-60 минут."
      },
      {
        id: 6,
        instruction:
          "Промойте 1 стакан зерен, удалите сор и шелуху. Овсянку замочите в холодной кипяченой воде на 30-60 минут."
      }
    ]
  };
  recipe = this.props.navigation.getParam("recipe", "default");

  render() {
    const { goBack } = this.props.navigation;
    return (
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <View
          style={{
            width: "100%",
            height: "30%"
          }}
        >
          <Image
            source={{
              uri: this.recipe.photos[0].url
            }}
            style={styles.recipeImage}
          />
        </View>

        <TouchableOpacity
          style={{ margin: 20, width: 20, height: 20, position: "absolute" }}
          onPress={() => goBack()}
        >
          <Image
            source={require("../../assets/icons/back.png")}
            style={styles.icon}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <View style={styles.infoView}>
          <Text style={styles.recipeName}>{this.recipe.name}</Text>
          <View style={styles.subView}>
            <Text style={styles.subTitle}>{this.recipe.cookDuration}</Text>
            <Text style={styles.subTitle}>
              {this.recipe.kcal}
              гр
            </Text>
          </View>

          <View style={styles.rowContainer}>
            <View style={styles.subCalView}>
              <Text style={styles.title}>белки</Text>
              <Text style={styles.subTitleAmmount}>35г</Text>
            </View>
            <View opacity={0.5} style={styles.verticalSeparator} />
            <View style={styles.subCalView}>
              <Text style={styles.title}>жиры</Text>
              <Text style={styles.subTitleAmmount}>35г</Text>
            </View>
            <View opacity={0.5} style={styles.verticalSeparator} />
            <View style={styles.subCalView}>
              <Text style={styles.title}>углеводы</Text>
              <Text style={styles.subTitleAmmount}>35г</Text>
            </View>
          </View>
        </View>
        <View opacity={0.5} style={styles.horizontalSeparator} />

        <View style={styles.ingredientView}>
          <View style={styles.headerView}>
            <Text style={styles.headerTitle}>ингредиенты</Text>
          </View>
          <View style={styles.ingredientContent}>
            <FlatList
              horizontal={true}
              data={this.recipe.ingredients}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={styles.product}>
                  <Image
                    style={styles.productImage}
                    resizeMode="contain"
                    source={{ uri: item.logo.url }}
                  />
                  <Text style={styles.nameTxt}>{item.name}</Text>
                  <Text style={styles.amountTxt}>{item.amount}</Text>
                </View>
              )}
            />
          </View>
        </View>

        <View style={styles.ingredientView}>
          <Text style={styles.headerTitle}>инструкция</Text>
          <View style={styles.ingredientContent}>
            <FlatList
              data={this.state.instructions}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={styles.instructionView}>
                  <Text style={styles.instrcutionId}>{item.id}</Text>
                  <Text style={styles.instrcutionTitle}>
                    {item.instruction}
                  </Text>
                </View>
              )}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  recipeImage: {
    flex: 1
  },
  infoView: {
    flex: 1,
    marginHorizontal: 15,
    marginTop: 15
  },
  recipeName: {
    color: "#354760",
    fontSize: scale(24),
    fontWeight: "bold",
    fontFamily: "Times New Roman"
  },
  rowContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  subView: {
    flexDirection: "row",
    marginTop: 5,
    marginBottom: 10
  },
  subTitle: {
    color: "#8B95A4",
    fontSize: scale(16),
    fontFamily: "Times New Roman",
    marginRight: 10
  },
  subTitleAmmount: {
    color: "#354760",
    fontSize: scale(14),
    fontWeight: "bold",
    fontFamily: "Avenir"
  },
  subCalView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10
  },
  ingredientView: {
    flex: 1
  },

  headerView: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 5
  },
  headerTitle: {
    flex: 2,
    padding: 10,
    color: "#354760",
    fontSize: scale(17),
    fontWeight: "bold",
    fontFamily: "Times New Roman"
  },
  productImage: {
    width: 40,
    height: 40
  },
  product: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: 10
  },
  nameTxt: {
    color: "#101C1E",
    fontSize: scale(12)
  },
  amountTxt: {
    color: "#6E7B8D",
    fontSize: scale(10)
  },
  ingredientContent: {
    flex: 2,
    backgroundColor: "#F8FCFE"
  },
  icon: {
    width: 15,
    height: 15
  },
  instrcutionId: {
    flex: 1,
    color: "#354760",
    fontSize: scale(14),
    fontWeight: "bold",
    fontFamily: "Avenir",
    padding: 10,
    textAlign: "center"
  },
  instrcutionTitle: {
    flex: 10,
    color: "#6E7B8D",
    fontSize: scale(12),
    fontWeight: "bold",
    fontFamily: "Avenir",
    padding: 10
  },
  title: {
    color: "#8B95A4",
    fontSize: scale(14),
    fontFamily: "Times New Roman"
  },
  verticalSeparator: {
    height: "50%",
    borderLeftWidth: 1,
    borderLeftColor: "#E8E7E7"
  },
  horizontalSeparator: {
    width: "94%",
    marginHorizontal: "3%",
    borderBottomWidth: 1,
    borderBottomColor: "#E8E7E7"
  },
  instructionView: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0"
  }
});
export default RecipeDetail;
