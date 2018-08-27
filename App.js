import React from "react";
import RootStack from "./src/router";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import { View } from "react-native";
const client = new ApolloClient({
  uri: "https://api.graph.cool/simple/v1/cjki1uyp1115h0136b9ez63gz"
});

export default class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <View style={{ flex: 1 }}>
          <RootStack />
        </View>
      </ApolloProvider>
    );
  }
}
