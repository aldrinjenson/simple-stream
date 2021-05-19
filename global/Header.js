import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";

const Header = ({ navigation, title }) => {
  return (
    <View style={styles.headerBg}>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerBg: {
    width: Dimensions.get("screen").width - 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontWeight: "bold",
    fontSize: 25,
    color: "#333",
    letterSpacing: 1,
    alignSelf: "center",
  },
});
