import * as React from "react";
import { useState } from "react";

import { View, Text, KeyboardAvoidingView } from "react-native";
import { Button, Card, HelperText, TextInput } from "react-native-paper";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slices/authSlice";
import { users } from "../../users";

const LoginScreen = () => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [userNameHasError, setUserNameHasError] = useState(false);
  const [passwordHasError, setPasswordHasError] = useState(false);
  const dispatch = useDispatch();

  const userData = users;

  const checkUserName = () => {
    var bool = false;
    userData.forEach((item, index) => {
      if (item.username == username) {
        bool = true;
      }
    });
    return bool;
  };
  const checkUserPassword = () => {
    var bool = false;
    userData.forEach((item, index) => {
      if (item.username === username) {
        if (password === item.password) {
          bool = true;
        }
      }
    });

    return bool;
  };

  const handleLogin = () => {
    if (checkUserName()) {
      setUserNameHasError(false);
      if (checkUserPassword()) {
        setPasswordHasError(false);
        dispatch(
          login({
            username: username,
            password: password,
            isLoggedIn: true,
          })
        );
      } else {
        setPasswordHasError(true);
      }
    } else {
      setUserNameHasError(true);
    }
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#008b8b",
      }}
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontSize: 30,
            fontWeight: "bold",
            letterSpacing: 3,
            color: "#ffa500",
          }}
        >
          Favorite Image App
        </Text>
      </View>

      <KeyboardAvoidingView
        behavior="height"
        style={{
          flex: 2.5,
        }}
      >
        <View
          style={{
            backgroundColor: "#9acd32",
            marginVertical: 5,
            marginHorizontal: 30,
            borderRadius: 10,
            borderColor: "black",
            borderWidth: 0.5,
            flex: 1,
          }}
        >
          <View
            style={{
              flex: 2,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 25,
                color: "#0000cd",
                fontWeight: "bold",
                alignSelf: "center",
                marginHorizontal: 20,
                letterSpacing: 3,
              }}
            >
              WELCOME!
            </Text>
          </View>
          <View
            style={{
              flex: 3,
            }}
          >
            <TextInput
              placeholder="Username"
              mode="outlined"
              style={{ margin: 10 }}
              value={username}
              onChangeText={(text) => {
                setUserName(text);
              }}
            />
            <HelperText
              type="error"
              style={{ color: "red", fontWeight: "bold" }}
              visible={userNameHasError}
            >
              Email address is invalid!
            </HelperText>
            <TextInput
              placeholder="Password"
              textContentType="password"
              secureTextEntry={secureTextEntry}
              value={password}
              onChangeText={(text) => {
                setPassword(text);
              }}
              mode="outlined"
              right={
                <TextInput.Icon
                  icon="eye"
                  onPress={() => {
                    setSecureTextEntry(!secureTextEntry);
                    return false;
                  }}
                />
              }
              style={{ margin: 10 }}
            />
            <HelperText
              type="error"
              style={{ color: "red", fontWeight: "bold" }}
              visible={passwordHasError}
            >
              Password is incorrect!
            </HelperText>
            <Text
              style={{
                fontSize: 15,
                color: "black",
                fontWeight: "bold",
                alignSelf: "flex-end",
                marginHorizontal: 20,
              }}
            >
              Forgot Password?
            </Text>
          </View>

          <View
            style={{
              flex: 4,
              justifyContent: "center",
            }}
          >
            <Button
              onPress={handleLogin}
              mode="contained-tonal"
              style={{
                borderRadius: 10,
                margin: 10,
                padding: 5,
                backgroundColor: "#0000cd",
              }}
              labelStyle={{
                fontSize: 20,
                letterSpacing: 5,
                fontWeight: "bold",
                color: "#ffa500",
              }}
            >
              Login
            </Button>
          </View>
        </View>
      </KeyboardAvoidingView>
      <View
        style={{
          flex: 1,
        }}
      ></View>
    </View>
  );
};

export default LoginScreen;
