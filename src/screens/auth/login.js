import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  ImageBackground,
  TextInput,
  Platform,
  AsyncStorage
} from "react-native";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { LinearGradient } from "expo";
import { scale } from "../../scale";
const SIGN_IN_USER = gql`
  mutation SigninUserMutation($email: AUTH_PROVIDER_EMAIL) {
    signinUser(email: $email) {
      token
      user {
        age
        weight
        height
        gender
        mode
      }
    }
  }
`;

export default class Login extends React.Component {
  state = {
    loginTitle: "",
    passwordTitle: "",
    isLogged: false
  };
  handleLoginInput = loginTitle => {
    this.setState({ loginTitle });
  };
  handlePasswordInput = passwordTitle => {
    this.setState({ passwordTitle });
  };

  storeData = async item => {
    try {
      await AsyncStorage.clear();
      await AsyncStorage.setItem("isLogged", JSON.stringify(item));
    } catch (error) {
      console.log(error.message);
    }
  };

  handleLogin = async signinUser => {
    try {
      const response = await signinUser({
        variables: {
          email: {
            email: this.state.loginTitle,
            password: this.state.passwordTitle
          }
        }
      });
      this.storeData(response.data.signinUser.user);

      this.props.navigation.navigate("rootStack");
    } catch (error) {
      console.log("error", error);
    }
  };
  render() {
    return (
      <Mutation mutation={SIGN_IN_USER}>
        {(signinUser, { data, loading, error }) => (
          <KeyboardAvoidingView style={styles.container} behavior="padding">
            <ImageBackground
              source={require("../../assets/img/authBg.png")}
              style={styles.subContainer}
            >
              <Text style={styles.header}>MEALISM</Text>
              <TextInput
                opacity={0.78}
                style={styles.input}
                placeholder="Логин"
                placeholderTextColor="#9B9B9B"
                value={this.state.loginTitle}
                onChangeText={this.handleLoginInput}
              />

              <TextInput
                opacity={0.78}
                style={styles.input}
                placeholder="Пароль"
                placeholderTextColor="#9B9B9B"
                secureTextEntry={true}
                value={this.state.passwordTitle}
                onChangeText={this.handlePasswordInput}
              />

              <TouchableOpacity
                style={styles.saveButton}
                onPress={() => this.handleLogin(signinUser)}
              >
                <LinearGradient
                  colors={["#4A90E2", "#3BB2B8"]}
                  style={styles.linearGradient}
                >
                  <Text style={styles.saveButtonText}>ВХОД</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Register")}
              >
                <Text style={styles.registerTxt}>Зарегистрироваться</Text>
              </TouchableOpacity>
            </ImageBackground>
          </KeyboardAvoidingView>
        )}
      </Mutation>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  subContainer: {
    flex: 1,
    justifyContent: "center"
  },
  header: {
    width: "100%",
    textAlign: "center",
    marginBottom: 40,
    color: "white",
    fontSize: scale(36),
    fontFamily: Platform.OS === "ios" ? "Avenir-Black" : "Roboto"
  },
  input: {
    height: 45,
    width: "80%",
    marginHorizontal: "10%",
    backgroundColor: "white",
    borderRadius: 10,
    paddingLeft: 10,
    fontSize: scale(14),
    marginBottom: 20
  },
  linearGradient: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10
  },
  saveButton: {
    height: 50,
    width: "80%",
    marginHorizontal: "10%",
    borderRadius: 10
  },
  saveButtonText: {
    color: "white",
    fontSize: scale(16)
  },
  registerTxt: {
    marginTop: 10,
    color: "white",
    fontSize: scale(14),
    width: "80%",
    marginHorizontal: "10%"
  }
});
