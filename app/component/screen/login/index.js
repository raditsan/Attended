import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Image,
    Dimensions,
    TextInput,
    Button,
    TouchableOpacity,
    Alert
} from 'react-native';

const { width, height } = Dimensions.get("window");

const background = require("./1.jpg");
const mark = require("./login1_mark.png");
const lockIcon = require("./login1_lock.png");
const personIcon = require("./login1_person.png");

export default class LoginScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            UserEmail: '',
            UserPassword: ''
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={background} style={styles.background} resizeMode="cover">
                    <View style={styles.markWrap}>
                        <Text style={styles.headerCont}>
                            <Text style={styles.headerText}>Attended</Text> Login Form
                        </Text>
                        <Text style={styles.headerDesc}>Make sure you are attended today. </Text>

                    </View>
                    <View style={styles.wrapper}>
                        <View style={styles.inputWrap}>
                            <View style={styles.iconWrap}>
                                <Image source={personIcon} style={styles.icon} resizeMode="contain" />
                            </View>
                            <TextInput
                                placeholder="Username"
                                placeholderTextColor="#c6c6c6"
                                style={styles.input}
                                onChangeText={UserEmail => this.setState({UserEmail})}
                            />
                        </View>
                        <View style={styles.inputWrap}>
                            <View style={styles.iconWrap}>
                                <Image source={lockIcon} style={styles.icon} resizeMode="contain" />
                            </View>
                            <TextInput
                                placeholderTextColor="#c6c6c6"
                                placeholder="Password"
                                style={styles.input}
                                secureTextEntry
                                onChangeText={UserPassword => this.setState({UserPassword})}
                            />
                        </View>
                        <TouchableOpacity activeOpacity={.5} onPress={this.UserLoginFunction} >
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>Sign In!</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.container}>

                    </View>
                </ImageBackground>
            </View>
        );
    }

    UserLoginFunction = () =>{

        const { UserEmail }  = this.state ;
        const { UserPassword }  = this.state ;

        if(UserEmail === "" || UserPassword === ""){
            Alert.alert("Field can't be null");
            return;
        }

        fetch('http://192.168.43.121:8000/mlogin/' + UserEmail + '/' + UserPassword )
            .then((response) => response.json())
            .then((responseJson) => {
                Alert.alert(responseJson.status);
                this.props.navigation.navigate('Details');

            })
            .catch((error) => {
                console.error(error);
            });
        /*fetch('http://192.168.43.121:8000/mlogin', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: UserEmail,
                password: UserPassword
            })
        }).then(response => response.json())
            .then(data => {
                const user = data.data;
                Alert.alert("sukes");
                if (user !== null) {
                    //dispatch(setUser(user));
                    //localStorage.setItem("user", JSON.stringify(user));
                }
                //dispatch(setFetching(false));
            })
            .catch(err => {
                //dispatch(setFetching(false));
                Alert.alert(err.toString());
            });*/
    };
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    markWrap: {
        flex: 1,
        //paddingVertical: 30
    },
    mark: {
        width: null,
        height: null,
        flex: 1,
    },
    background: {
        width,
        height,
    },
    wrapper: {
        paddingVertical: 30,
    },
    inputWrap: {
        flexDirection: "row",
        marginVertical: 10,
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: "#CCC"
    },
    iconWrap: {
        paddingHorizontal: 7,
        alignItems: "center",
        justifyContent: "center",
    },
    icon: {
        height: 20,
        width: 20,
    },
    input: {
        flex: 1,
        paddingHorizontal: 10,
        color : "white"

    },
    button: {
        backgroundColor: "#de615e",
        paddingVertical: 20,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
    },
    buttonText: {
        color: "#FFF",
        fontSize: 18,
    },
    forgotPasswordText: {
        color: "#D8D8D8",
        backgroundColor: "transparent",
        textAlign: "right",
        paddingRight: 15,
    },
    signupWrap: {
        backgroundColor: "transparent",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    accountText: {
        color: "#D8D8D8"
    },
    signupLinkText: {
        color: "#FFF",
        marginLeft: 5,
    },
    headerCont:{
        color: "#FFF",
        fontSize: 30,
        alignItems: "center",
        textAlign: 'center',
    },
    headerText: {

        fontWeight: "bold"
    },
    subHeaderText:{

    },
    headerDesc : {
        color: "#FFF",
        fontSize: 20,
        textAlign: 'center'
    }
});