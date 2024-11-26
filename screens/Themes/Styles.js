import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  containerSecondPage: {
    backgroundColor: "#bfe5ff",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    height: "100%",
    flex: 1,
  },
  tituloSecondPage: {
    paddingTop: 10,
    fontSize: 30,
    color: "black",
    fontFamily: "serif",
    fontWeight: "bold",
    textAlign: "left",
    marginVertical: 20,
  },
  subTituloSecondPage: {
    fontSize: 18,
    color: "black",
    fontFamily: "serif",
    textAlign: "center",
    marginVertical: 10,
  },
  line: {
    color: "black",
    marginVertical: 10,
    fontSize: 18,
    textAlign: "center",
  },
  labelSecond: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    padding: 10,
    fontSize: 18,
    color: "black",
    width: "80%",
    marginVertical: 10,
    textAlign: "center",
  },
  buttonInsertDataInicial: {
    backgroundColor: "black",
    borderRadius: 10,
    width: 140,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  labelSecondButton: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
    fontFamily: "serif",
    textAlign: "center",
  },
  viewBottom: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    justifyContent: "flex-start",
  },
  themeItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 1,
    width: "95%",
    alignSelf: "center"
  },
  themeText: {
    fontSize: 18,
    color: "black",
    fontFamily: "serif",
  },
  themeButton: {
    fontSize: 16,
    color: "black",
    marginHorizontal: 10,
    fontWeight: "bold",
    fontFamily: "serif",
  },
  centerButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
    marginTop: 20,
    marginBottom: 20,
  },
});

export default styles;