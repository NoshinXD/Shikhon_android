import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect, useCallback } from "react";
import { ScrollView, View, Text, TextInput, Button, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import fetchAddress from "../IP_File";

export default function SetQuizTimeScreen({ route, navigation }) {
    const { userID, userType, _id, chapterNo, trackID, trackName, quizName, questions } = route.params;

    const [quizTime, setQuizTime] = useState("");

    const changeQuizTimeHandler = (val) => {
        setQuizTime(val);
      };

    return (
        <View style={styles.fullhomescreen}>
            {/* header */}
            <View style={styles.header}>
                <Text style={styles.headerText}>{quizName}</Text>
            </View>

            {/**content */}
            <View style={styles.addFrom}>
            {userType != "Teacher" ? null : (
                <View>
                    <TextInput
                    style={styles.input}
                    placeholder="Quiz Time"
                    onChangeText={changeQuizTimeHandler}
                    value={quizTime}
                    />
                <View>
                <TouchableOpacity
                    onPress={() => {
                    navigation.navigate("AllQuizes", {
                        userID: userID,
                        userType: userType,
                        _id: _id,
                        chapterNo: chapterNo,
                        trackID: trackID,
                        trackName: trackName,
                    });

                    }}
                    style={styles.addButton}
                >
                    <View style={styles.addViewButton}>
                        <Text style={styles.addButtonText}>Done</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
        )}
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
        // marginBottom: 20,
    },
    headerText: {
        fontSize: 25,
        textAlign: "center",
        fontWeight: "bold",
        color: "#0000A0",
    },
    addFrom: {
        flex: 1,
        backgroundColor: "white", //#E0FFFF
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
    seeAnswerButton: {
        flex: 1,
        backgroundColor: "#add8e6",
        justifyContent: "center",
        borderRadius: 20,
        // marginTop: 20,
        // marginBottom: 20,
        // paddingLeft: 10,
        // paddingRight: 10,
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
        marginRight: 80,
        marginLeft: 80,
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
        marginTop: 35,
        marginBottom: 20,
        paddingLeft: 10,
        paddingRight: 10,
    },
    addQuizButton: {
        flex: 1,
        backgroundColor: "#0000A0",
        justifyContent: "center",
        marginTop: 20,
        marginBottom: 20,
        paddingLeft: 10,
        paddingRight: 10,
    },
    opacityButton: {
        flex: 1,
        alignItems: "flex-start",
        justifyContent: "center",
        backgroundColor: "#add8e6",
        borderRadius: 20,
        //padding: 10,
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
    buttonStyleContainer: {
        flexDirection: "row",
    },
    buttonStyle: {
        marginHorizontal: 60,
        marginTop: 40,
        justifyContent: "center",
        backgroundColor: "#add8e6",
        borderRadius: 10,
        paddingLeft: 20,
        paddingRight: 20,
    },
    navigationText: {
        fontSize: 18,
        color: "black",
        textAlign: "center",
        fontWeight: "bold",
        // paddingLeft: 20,
    },
    footer: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 20,
    },
    });