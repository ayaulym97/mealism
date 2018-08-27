import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  Alert,
  KeyboardAvoidingView
} from "react-native";
import { LinearGradient } from "expo";
import { scale } from "../../scale";
export default class Register extends React.Component {
  state = {
    loginTitle: "",
    passwordTitle: "",
    repeatedPassword: ""
  };

  handleLoginInput = loginTitle => {
    this.setState({ loginTitle });
  };
  handlePasswordInput = passwordTitle => {
    this.setState({ passwordTitle });
  };
  handleRepeatedPasswordInput = repeatedPassword => {
    this.setState({ repeatedPassword });
  };

  handleOnPressed = () => {
    if (
      this.state.loginTitle === "" ||
      this.state.passwordTitle === "" ||
      this.state.repeatedPassword === "" ||
      this.state.passwordTitle !== this.state.repeatedPassword
    ) {
      Alert.alert("Ошибка");
    } else {
      this.props.navigation.navigate("userInform", {
        auth: [this.state.loginTitle, this.state.passwordTitle]
      });
    }
  };

  render() {
    return (
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
            value={this.state.passwordTitle}
            onChangeText={this.handlePasswordInput}
            secureTextEntry={true}
          />
          <TextInput
            opacity={0.78}
            style={styles.input}
            placeholder="Повторите пароль"
            placeholderTextColor="#9B9B9B"
            value={this.state.repeatedPassword}
            onChangeText={this.handleRepeatedPasswordInput}
            secureTextEntry={true}
          />
          <TouchableOpacity
            style={styles.saveButton}
            onPress={this.handleOnPressed}
          >
            <LinearGradient
              colors={["#4A90E2", "#3BB2B8"]}
              style={styles.linearGradient}
            >
              <Text style={styles.saveButtonText}>Зарегистрироваться</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => this.props.navigation.navigate("Login")}
          >
            <Text style={styles.saveButtonText}>Логин</Text>
          </TouchableOpacity>
        </ImageBackground>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  subContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  loginBtn: {
    marginTop: 10,
    width: "80%",
    marginHorizontal: "10%"
  },
  header: {
    width: "100%",
    textAlign: "center",
    marginVertical: 30,
    color: "white",
    fontSize: scale(36),
    fontFamily: "Avenir-Black"
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
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: "80%",
    marginHorizontal: "10%",
    borderRadius: 10
  },
  saveButtonText: {
    color: "white",
    fontSize: scale(16)
  }
});
