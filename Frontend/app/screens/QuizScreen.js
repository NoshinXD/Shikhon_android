import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect, useCallback } from "react";
import { ScrollView, View, Text, TextInput, Button, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import fetchAddress from "../IP_File";
import { MaterialIcons } from "@expo/vector-icons";

export default function QuizScreen({ route, navigation }) {
  const { userID, userType, _id, chapterNo, trackID, trackName } = route.params;
  // console.log("in screen1"+trackName);
  //   console.log(userType);

  const [topicName, setTopicName] = useState("");
  const [quizName, setQuizName] = useState("");

  const [quizes, setQuizes] = useState("");

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  // const [seconds, setSeconds] = React.useState(10);
  // const [chosenText, setChosenText] = useState([]);

  const param = { courseID: _id, chapterNo: chapterNo };

  const tempFetchaddr = fetchAddress + "quiz/all";
  // console.log(tempFetchaddr);
  const addr = `${tempFetchaddr}?courseID=${encodeURIComponent(param.courseID)}&chapterNo=${encodeURIComponent(
    param.chapterNo
  )}`;
  // const addr = 'http://192.168.0.104:5000/note/all?courseID=60ad0cedb60e311790fef7c6&chapterNo=2'
  fetch(addr)
    .then((res) => res.json())
    // .then((res) => res.text())
    .then(async (data) => {
      try {
        // await AsyncStorage.getItem("token", data._id);
      } catch (e) {
        console.log("The error is: ", e);
      }

      setQuizes(data.quizArr);
    });

  const showQuizes_console = () => {
    console.log(quizes[0].questions[1].description);
  };

  const changeTopicNameHandler = (val) => {
    setTopicName(val);
  };

  const changeQuizNameHandler = (val) => {
    setQuizName(val);
  };

  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const sendCred_quiz_dlt = async (item_id) => {
    console.log("here in sendCred_note_dlt");
    const tempFetchaddr2 = fetchAddress + "quiz";
    const addr2 = `${tempFetchaddr2}?_id=${encodeURIComponent(item_id)}`;

    fetch(addr2, {
      method: "DELETE",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
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
  };

  return (
    <View style={styles.fullhomescreen}>
      <View style={styles.addFrom}>
        {userType != "Teacher" ? null : (
          <View>
            <TextInput
              style={styles.input}
              placeholder="New Quiz Name"
              onChangeText={changeQuizNameHandler}
              value={quizName}
            />
            <View>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("AddQuiz", {
                    userID: userID,
                    userType: userType,
                    _id: _id,
                    chapterNo: chapterNo,
                    trackID: trackID,
                    trackName: trackName,
                    quizName: quizName,
                    questions: [],
                  });
                  setQuizName("");
                }}
                style={styles.addButton}
              >
                <View style={styles.addViewButton}>
                  <Text style={styles.addButtonText}>Add Quiz</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
      {/* <Text>THis is Quiz Screen page!</Text> */}
      <View style={styles.content}>
        <View>
          <View>
            <Text style = {styles.headerText}> বহুনির্বাচনি অভীক্ষা </Text>
            <FlatList
              data={quizes}
              renderItem={({ item }) => (
                <View style={styles.item}>
                  <View style={styles.viewButton}>
                    <TouchableOpacity
                      style={styles.opacityButton}
                      onPress={() => {
                        navigation.navigate("QuizDetails", {
                          userID: userID,
                          userType: userType,
                          _id: item._id,
                          topicName: item.topicName,
                          trackID: trackID,
                          trackName: trackName,
                        });
                      }}
                    >
                      <Text style={styles.buttonText}>{item.quizName}</Text>
                    </TouchableOpacity>
                  </View>
                  <View>
                    {userType == "Teacher" ? (
                      <View>
                        <TouchableOpacity onPress={() => sendCred_quiz_dlt(item._id)}>
                          <View style={styles.deleteicon}>
                            <MaterialIcons name="delete" size={20} color="#0000A0" />
                          </View>
                        </TouchableOpacity>
                      </View>
                    ) : null}
                  </View>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
            <Text style = {styles.headerText}>Written Exam</Text>
          </View>
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
    borderRadius: 20,
    marginRight: 110,
    marginLeft: 110,
    marginBottom: 20,
    marginTop: 20,
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
    margin: 10,
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
  addButton: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#add8e6",
    borderRadius: 20,
    marginRight: 110,
    marginLeft: 110,
    marginBottom: 20,
    marginTop: 20,
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
    margin: 10,
    padding: 10,
  },
  viewButton: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    marginTop: 15,
    marginBottom: 15,
    paddingLeft: 10,
    paddingRight: 10,
  },
  opacityButton: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: "#add8e6",
    borderRadius: 20,
    padding: 10,
    paddingLeft: 10,
    paddingRight: 40,
    marginLeft: 20,
    marginRight: 20,
  },
  buttonText: {
    fontSize: 18,
    color: "#0000A0",
    textAlign: "left",
    fontWeight: "bold",
    paddingLeft: 30,
  },
  questionText: {
    fontSize: 18,
    color: "black",
    textAlign: "left",
    fontWeight: "bold",
    paddingLeft: 30,
  },
  answerButton: {
    // flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: "#add8e6",
    borderRadius: 20,
    paddingRight: 80,
    marginRight: 140,
    marginLeft: 50,
    marginBottom: 10,
  },
  answerText: {
    fontSize: 18,
    color: "black",
    textAlign: "left",
    // fontWeight: "bold",
    paddingLeft: 20,
    // marginBottom: 10,
  },
  item: {
    paddingLeft: 10,
    justifyContent: "space-between",
    borderRadius: 1,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  deleteicon: {
    paddingRight: 25,
    // paddingBottom: 10,
    // paddingRight: 10,
    // marginRight: 20,
    // paddingLeft: 10,
  },
});
