import React from "react";
import { AsyncStorage, ImageBackground, View } from "react-native";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import LaunchScreen from "./launchScreen";
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
          logo {
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
export default class AuthLoadingScreen extends React.Component {
  componentDidMount() {
    this.startProgress();
  }
  startProgress = () => {
    this.value = setInterval(() => {
      this._bootstrapAsync();
    }, 1000);
  };

  _bootstrapAsync = async () => {
    try {
      const retrievedItem = await AsyncStorage.getItem("isLogged");
      const item = JSON.parse(retrievedItem);
      this.props.navigation.navigate(item ? "App" : "Auth");
    } catch (error) {
      console.log(error.message);
    }
  };

  render() {
    return (
      <Query query={GET_ALL_DAYS}>
        {({ loading, data, error, refetch }) => {
          if (loading) {
            return <LaunchScreen/>;
          }
          return <LaunchScreen datas={data} />;
        }}
      </Query>
    );
  }
}
