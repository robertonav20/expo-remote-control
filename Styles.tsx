import { StyleSheet } from "react-native";

export const commonStyles = StyleSheet.create({
  pickerContainer: {
    color: "#517fa4",
    backgroundColor: "white",
    borderColor: "white",
    borderRadius: 50,
    borderStyle: undefined,
    margin: 10,
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  picker: {
    width: 300,
    height: 40,
    color: "#517fa4",
    fontSize: 20,
    fontFamily: "LucidaGrande",
    fontWeight: "bold",
    borderColor: "white",
    borderRadius: 50,
    borderStyle: undefined
  },
  pickerItem: {
    padding: 5,
    color: "#517fa4",
    backgroundColor: "white",
    borderStyle: undefined,
    fontWeight: "bold"
  },
  fixToTextCenter: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    margin: 5,
    fontSize: 24,
    fontFamily: "LucidaGrande",
  },
  fixToText: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    color: "#517fa4",
    fontSize: 20,
    fontFamily: "LucidaGrande",
  },
  textBold: {
    color: "#517fa4",
    fontSize: 20,
    fontFamily: "LucidaGrande",
    fontWeight: "bold",
  },
});

export const volumeScreenStyles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    padding: 25,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: 10,
    margin: 15,
    height: "70%",
    backgroundColor: "#fefefe"
  },
  header: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "center",
    backgroundColor: "#517fa4",
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  middle: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    alignContent: "center",
    padding: 20,
    borderRadius: 10
  },
  bottom: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 20,
    borderRadius: 10
  },
  configuration: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  slider: {
    flexDirection: "row",
    justifyContent: "center",
    marginHorizontal: 15,
  },
  middleConfiguration: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
  },
  textInputStyle: {
    width: "auto",
    textAlign: "center",
    height: 40,
    borderBottomWidth: 2,
    borderBottomColor: "#517fa4",
    marginBottom: 10,
    fontSize: 20,
    fontFamily: "LucidaGrande",
  },
  volumeTitle: {
    color: "white",
    fontSize: 25,
    fontFamily: "LucidaGrande"
  },
  volumeValueTitle: {
    color: "white",
    fontSize: 40,
    fontFamily: "LucidaGrande"
  },
  iconVolumeButton: {
    display: "flex",
    justifyContent: "center",
    color: "white",
    backgroundColor: "#517fa4",
    borderRadius: 5,
    width: "auto",
    margin: 0,
    padding: 10
  },
});

export const mouseScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export const keyboardScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  },
  inputContainer: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  iconButton: {
    display: "flex",
    justifyContent: "center",
    color: "white",
    backgroundColor: "#517fa4",
    width: "auto",
    borderRadius: 5,
    padding: 8
  },
});

export const multimediaScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
  },
  shortcutsContainer: {
    flex: 1,
    flexGrow: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  shutdownContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  multimediaButtonContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  volumeButtonContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  mainContainer: {
    flex: 1,
    flexGrow: 3,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    alignItems: "center",
    borderColor: "#517fa4",
    backgroundColor: "#517fa4",
    borderRadius: 5,
    padding: 10,
    margin: 5,
    width: "auto",
    height: "auto",
  },
  buttonText: {
    color: "white",
    fontFamily: "LucidaGrande",
  },
  icon: {
    display: "flex",
    justifyContent: "center",
    borderColor: "#517fa4",
    borderRadius: 5,
    backgroundColor: "orange",
    color: "white",
    width: 40,
    height: 40,
  },
  powerButton: {
    display: "flex",
    justifyContent: "center",
    borderColor: "#517fa4",
    borderRadius: 5,
    color: "white",
    backgroundColor: "tomato",
    width: 40,
    height: 40,
  },
  logoutButton: {
    display: "flex",
    justifyContent: "center",
    borderColor: "#517fa4",
    borderRadius: 5,
    backgroundColor: "green",
    width: 40,
    height: 40,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  centerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  footerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

export const configurationScreenStyle = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    padding: 25,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  configurationContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: 10,
    margin: 15,
    height: "50%",
    backgroundColor: "#fefefe"
  },
  outputConfigurationContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: 10,
    margin: 15,
    width: "100%",
    backgroundColor: "#fefefe"
  },
  header: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "center",
    backgroundColor: "#517fa4",
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  configuration: {
    alignItems: "flex-start",
    backgroundColor: "white",
    borderRadius: 5,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    margin: 15,
    padding: 10,
    width: "100%",
    height: "auto"
  },
  content: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 2,
    margin: 20,
  },
  titleStyle: {
    color: "white",
    fontSize: 25,
    fontFamily: "LucidaGrandeBold"
  },
  button: {
    alignItems: "center",
    borderColor: "#517fa4",
    backgroundColor: "#517fa4",
    borderRadius: 5,
    margin: 5,
    width: "auto",
    height: "auto",
  },
  buttonText: {
    color: "white",
    fontFamily: "LucidaGrande",
  },
  icon: {
    display: "flex",
    justifyContent: "center",
    color: "white",
    borderColor: "#517fa4",
    backgroundColor: "orange",
    width: 40,
    height: 40,
  },
  protocolTextStyle: {
    fontSize: 25,
    color: "#517fa4",
    fontFamily: "LucidaGrandeBold",
  }
});

export const httpScreenStyle = StyleSheet.create({
  mainContainer: {
    alignItems: "center",
    flex: 1,
    flexGrow: 3,
    flexDirection: "column",
    justifyContent: "space-around",
    paddingTop: 50,
  },
  buttonContainer: {
    position: "relative",
    borderRadius: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "auto",
  },
  deleteButton: {
    backgroundColor: "#f91b20",
    padding: 10,
    borderRadius: 5,
    width: "auto"
  },
  infoButton: {
    backgroundColor: "#517fa4",
    padding: 10,
    borderRadius: 5,
    width: "auto"
  },
  list: {
    width: "100%",
  },
  item: {
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 20,
    color: "#517fa4",
    fontFamily: "LucidaGrande",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalInfo: {
    alignItems: "flex-start",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 10,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#517fa4",
    borderRadius: 5,
    padding: 10,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    fontFamily: "LucidaGrande",
    textAlign: "center",
  },
  modalText: {
    fontSize: 20,
    color: "#517fa4",
    fontFamily: "LucidaGrande",
  },
});

export const appScreenStyles = StyleSheet.create({
  navigation: {
    fontFamily: "LucidaGrande",
  },
});
