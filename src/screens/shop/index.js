import React, { Component } from "react";
import _ from "lodash";
import {
  Image,
  FlatList,
  Text,
  TouchableOpacity,
  View,
  StyleSheet
} from "react-native";
import gql from "graphql-tag";
import { Query, graphql } from "react-apollo";
import { scale } from "../../scale";
const GET_ALL_DAYS = gql`
  {
    allDays {
      meals {
        id
        name
        kcal
        cookDuration
        description
        eatTime
        ingredients {
          id
          name
          amount
          logo{
            url
          }
        }
        photos {
          id
          url
        }
      }
    }
  }
`;

class Shop extends Component {
  state = {
    ing: undefined
  };
  checkIng = item => {
    console.log(item, "PRESSED");
    const newIngredients = item.map(ingredient => {
      console.log(ingredient,"ingredient")
      if (ingredient.id === item.id) {
        return { ...item, isChecked: !item.isChecked };
      }
      return ingredient;
    });

    this.setState({ ingredients: newIngredients });
  };
  renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.card} onPress={() => this.checkIng(item)}>
        <View style={styles.checkbox}>
          <Image
            style={styles.checkIcon}
            resizeMode="contain"
            source={
              item.isChecked
                ? require("../../assets/icons/checkActive.png")
                : require("../../assets/icons/check.png")
            }
          />
        </View>

        <View style={styles.main}>
          <Text style={styles.nameTxt}>{item.name}</Text>
          <Text style={styles.amountTxt}>{item.amount}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    let { dayIndex } = this.props;
    const { ing } = this.state;
    const isWeek = dayIndex === undefined;

    return (
      <Query query={GET_ALL_DAYS}>
        {({ loading, data, error, refetch }) => {
          if (loading) {
            return <View />;
          }

          if (ing === undefined) {
            this.setState({ ing: data.allDays });
          }
          const { allDays } = data;

          const modifiedData = allDays.map((day, index) => ({
            ...day,
            dayIndex: index
          }));

          let ingredients;
          if (!isWeek) {
            const currentDay = modifiedData[dayIndex];

            const allIngredients = currentDay.meals.map(
              meal => meal.ingredients
            );

            ingredients = _.flatten(allIngredients).map(item => ({
              ...item,
              isChecked: false
            }));
          }

          return (
            <View style={styles.container}>
              <FlatList
                data={ingredients}
                keyExtractor={(item, index) => index.toString()}
                renderItem={this.renderItem}
              />
            </View>
          );
        }}
      </Query>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FBFBFB"
  },
  card: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#FBFBFB"
  },
  checkbox: {
    flex: 1,
    backgroundColor: "#FBFBFB",
    alignItems: "center",
    justifyContent: "center"
  },

  main: {
    flex: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 3,
    borderColor: "#F8F9F8",
    borderWidth: 2
  },
  nameTxt: {
    color: "#101C1E",
    fontSize: scale(16)
  },
  amountTxt: {
    color: "#6E7B8D",
    fontSize: scale(14)
  },
  checkIcon: {
    width: 25,
    height: 25
  }
});
// export default Shop;
export default graphql(GET_ALL_DAYS, {
  options: ({ params: test }) => ({ variables: test })
})(Shop);
