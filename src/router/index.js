import React from "react";
import { Image } from "react-native";

import {
  createStackNavigator,
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
  createSwitchNavigator
} from "react-navigation";
import moment from "moment";
import { Menu, WeekMenu, Shop, Profile } from "../screens/index";
import RecipeDetail from "../screens/menu/recipeDetail";
import { Login, Register, UserInform } from "../screens/auth/index";
import AuthLoadingScreen from "./AuthLoadingScreen";
import LaunchScreen from "./launchScreen";
import { scale } from "../scale";
let momentday = moment().isoWeekday() - 1;

const topMenuTabBar = createMaterialTopTabNavigator(
  {
    Today: {
      screen: props => <Menu {...props} dayIndex={momentday} />,
      navigationOptions: {
        tabBarLabel: "Сегодня"
      }
    },
    Tomorrow: {
      screen: props => <Menu {...props} dayIndex={momentday + 1} />,
      navigationOptions: {
        tabBarLabel: "Завтра"
      }
    },
    Week: {
      screen: WeekMenu,
      navigationOptions: {
        tabBarLabel: "Неделя"
      }
    }
  },
  {
    swipeEnabled: true,
    tabBarOptions: {
      activeTintColor: "#101C1E",
      inactiveTintColor: "#101C1E",
      inactiveBackgroundColor: "#ffffff",
      activeBackgroundColor: "#ffffff",
      showIcon: false,
      indicatorStyle: {
        borderBottomColor: "#101C1E",
        borderBottomWidth: 2
      },
      labelStyle: {
        fontSize: scale(9),
        marginTop: 20
      },
      style: {
        backgroundColor: "#ffffff"
      },
      tabStyle: {
        justifyContent: "center",
        alignItems: "center"
      }
    }
  }
);
const topShopTabBar = createMaterialTopTabNavigator(
  {
    Today: {
      screen: props => <Shop {...props} dayIndex={momentday} />,
      navigationOptions: {
        tabBarLabel: "Сегодня"
      }
    },
    Tomorrow: {
      screen: props => <Shop {...props} dayIndex={momentday + 1} />,
      navigationOptions: {
        tabBarLabel: "Завтра"
      }
    },
    Week: {
      screen: props => <Shop {...props} />,
      navigationOptions: {
        tabBarLabel: "Неделя"
      }
    }
  },
  {
    swipeEnabled: true,
    tabBarOptions: {
      activeTintColor: "#101C1E",
      inactiveTintColor: "#101C1E",
      inactiveBackgroundColor: "#ffffff",
      activeBackgroundColor: "#ffffff",
      showIcon: false,
      indicatorStyle: {
        borderBottomColor: "#101C1E",
        borderBottomWidth: 2
      },
      labelStyle: {
        fontSize: scale(9),
        marginTop: 20
      },
      style: {
        backgroundColor: "#ffffff"
      },
      tabStyle: {
        justifyContent: "center",
        alignItems: "center"
      }
    }
  }
);

const RootStack = createBottomTabNavigator(
  {
    Menu: {
      screen: topMenuTabBar,
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused }) => (
          <Image
            source={
              focused
                ? require("../assets/icons/menu1.png")
                : require("../assets/icons/menu.png")
            }
            style={{ width: 32, height: 32 }}
            resizeMode="contain"
          />
        )
      })
    },
    Shops: {
      screen: topShopTabBar,
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused }) => (
          <Image
            source={
              focused
                ? require("../assets/icons/shopActive.png")
                : require("../assets/icons/shop.png")
            }
            style={{ width: 32, height: 32 }}
            resizeMode="contain"
          />
        )
      })
    },
    Profiles: {
      screen: Profile,
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused }) => (
          <Image
            source={
              focused
                ? require("../assets/icons/profileActive.png")
                : require("../assets/icons/profile.png")
            }
            style={{ width: 32, height: 32 }}
            resizeMode="contain"
          />
        )
      })
    }
  },
  {
    tabBarOptions: {
      showLabel: false
    }
  }
);
const root = createStackNavigator({
  rootStack: {
    screen: RootStack,
    navigationOptions: {
      header: null
    }
  },
  RecipeDetail: {
    screen: RecipeDetail,
    navigationOptions: {
      header: null
    }
  },
  WeekMenu: {
    screen: WeekMenu,
    navigationOptions: {
      header: null
    }
  }
});
const auth = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      header: null
    }
  },
  Register: {
    screen: Register,
    navigationOptions: {
      header: null
    }
  },
  userInform: {
    screen: UserInform,
    navigationOptions: {
      header: null
    }
  }
});
const switchNav = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    LaunchScreen: LaunchScreen,
    Auth: auth,
    App: root
  },
  {
    initialRouteName: "AuthLoading"
  }
);

export default switchNav;
