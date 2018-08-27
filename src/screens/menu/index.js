import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import Swiper from "react-native-swiper";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Header from "./header";
import Card from "./card";
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

class DayMenu extends Component {
  state = {
    currentIndex: 0
  };
 // mealData = this.props.navigation.getParam("data", "default");
  handleCard = nextSlideIndex => {
    if (this.state.currentIndex < nextSlideIndex) {
      this.swiper.scrollBy(-1 * (this.state.currentIndex - nextSlideIndex));
    } else {
      this.swiper.scrollBy(nextSlideIndex - this.state.currentIndex);
    }
  };
  handleCardOnPressed = item => {
    this.props.navigation.navigate("RecipeDetail", {
      recipe: item
    });
  };

  render() {
    const { dayIndex } = this.props;
    return (
      <Query query={GET_ALL_DAYS}>
        {({ loading, data, error, refetch }) => {
          if (loading) {
            return <View />;
          }
          const { allDays } = data;

          const modifiedData = allDays.map((day, index) => ({
            ...day,
            dayIndex: index
          }));
          const currentDay = modifiedData[dayIndex];
          return (
            <View style={styles.container}>
              <Header
                currentIndex={this.state.currentIndex}
                handleCard={this.handleCard}
              />
              <View style={styles.content}>
                <Swiper
                  ref={ref => (this.swiper = ref)}
                  showsPagination={false}
                  onIndexChanged={index =>
                    this.setState({ currentIndex: index })
                  }
                >
                  {currentDay.meals.map((item, index) => (
                    <Card
                      key={index}
                      header={item.name}
                      description={item.description}
                      kcal={item.kcal}
                      time={item.cookDuration}
                      duration={item.eatTime}
                      onPress={() => this.handleCardOnPressed(item)}
                      cardImg={item.photos[0].url}
                    />
                  ))}
                </Swiper>
              </View>
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white"
  },
  content: {
    flex: 8
  }
});
export default DayMenu;
