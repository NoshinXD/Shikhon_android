import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import fetchAddress from "../IP_File";

export default function CoursesScreen({ route, navigation }) {
  const { userID } = route.params;
  const { userType } = route.params;
  const {trackID} = route.params;
  const {trackName} = route.params;

  const [courses, setCourses] = useState("");
  const [courseName, setCourseName] = useState("");

  const changeCourseNameHandler = (val) => {
    setCourseName(val);
  };

  const addr = fetchAddress + "course/all";
  fetch(addr)
    .then((res) => res.json())
    // .then((res) => res.text())
    .then(async (data) => {
      try {
        setCourses(data.courses);
        // console.log(data);
        // await AsyncStorage.getItem("token", data.token);
      } catch (e) {
        console.log("The error is: ", e);
      }
    });

  sendCred = async () => {
    console.log("in sendCred");
    const addr = fetchAddress + "course/add";
    fetch(addr, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: courseName,
      }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        try {
          if (data.error) {
            console.log("The customized error is:" + data.error);
          }
          await AsyncStorage.setItem("token", data.token);
        } catch (e) {
          console.log("The error is: ", e);
        }
        console.log(data);
      });
      setCourseName("");
  };

  return (
    <View style={styles.fullhomescreen}>

      {/*form of add chapter*/}
      <View style={styles.addFrom}>
        {userType != "Admin" ? null : (
          <View>
            <TextInput
              style={styles.input}
              placeholder="Course Name"
              onChangeText={changeCourseNameHandler}
              value={courseName}
            />
            <View>
              <TouchableOpacity  onPress={() => sendCred()} style={styles.addButton}>
                {/* <View style={styles.addViewButton}> */}
                  <Text style={styles.addButtonText}>Add Course</Text>
                {/* </View> */}
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>

      {/* content */}
      <View style={styles.content}>
        <View>
          <FlatList
            data={courses}
            renderItem={({ item, key }) => (
              <View style={styles.viewButton}>
                <TouchableOpacity
                  style={styles.opacityButton}
                  onPress={() => {
                    // console.log("details page button tapped");
                    navigation.navigate("CourseDetails", {
                      userID: userID,
                      userType: userType,
                      courseName: item.name,
                      _id: item._id,
                      trackID: trackID,
                      trackName: trackName,
                    });
                  }}
                >
                  <Text style={styles.buttonText}>{item.name}</Text>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fullhomescreen: {
    flex: 1,
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  header: {
    backgroundColor: "#add8e6",
    //marginBottom: 15,
    padding: 30,
  },
  headerText: {
    fontSize: 25,
    textAlign: "center",
    fontWeight: "bold",
    color: "#0000A0",
  },
  addFrom: {
    backgroundColor: "#E0FFFF",
  },
  addButton: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#add8e6",
    paddingBottom: -5,
    paddingTop:-5,
    borderRadius: 20,
    marginRight: 135,
    marginLeft: 135,
    marginBottom: 50,
    marginTop: 10,
  },
  addViewButton: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  addButtonText: {
    fontSize: 18,
    color: "#0000A0",
    textAlign: "center",
    justifyContent: "center",
    fontWeight: "bold",
    margin: 5,
    padding: 10,
  },
  input: {
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  content: {
    backgroundColor: "white",
    flex: 1,
    flexDirection: "column",
    //alignItems: "center",
    //justifyContent: "center",
    //margin: 15,
  },
  winContainer: {
    backgroundColor: "white",
  },
  winText: {
    //flex: 1,
    fontSize: 20,
    textAlign: "center",
    justifyContent: "center",
    marginBottom: 15,
    padding: 30,
    fontWeight: "bold",
    color: "#0000A0",
  },
  viewButton: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    marginTop: 5,
    //marginBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  opacityButton: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: "#add8e6",
    borderRadius: 8,
    padding: 20,
    margin: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    elevation: 10,
  },
  buttonText: {
    fontSize: 18,
    color: "rgb(100,100,100)",
    textAlign: "left",
    fontWeight: "bold",
    paddingLeft: 10,
  },
  addcourseButton: {
    // flex: 1,
    // alignItems: "flex-start",
    // justifyContent: "center",
    // backgroundColor: "#add8e6",
    // borderRadius: 20,
    // padding: 10,
    // paddingLeft: 10,
    // paddingRight: 40,
    // marginLeft: 10,
    // marginRight: 20,
    // marginBottom: 10,
    // borderRadius: 20,
  }, 
});
