import React, { Component } from 'react';
import { Grid, Col, Form, Item, Input, Label, Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import { Drawer } from 'native-base';
import SideBarUser from '../../sidebar/index';
import {PermissionsAndroid, TouchableOpacity, Alert, StyleSheet, ToastAndroid, StatusBar} from 'react-native';
import { NetworkInfo } from 'react-native-network-info';
import {createAppContainer, createStackNavigator} from "react-navigation";

//const in_request = "http://192.168.43.121:8000/min/";
//const out_request = "http://192.168.43.121:8000/mout/";
const in_request = "http://raditsan.info/min/";
const out_request = "http://raditsan.info/mout/";
export default class HomeUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            latitude: null,
            longitude: null,
            error: null,
            ip_value : null,
            showToast: false,
            location: null,
            result_attended: false,
            want_result:false,
            result_message: null
        };

        NetworkInfo.getIPAddress(ipv4  => {
            //Alert.alert(ipv4 );
            this.setState({ ip_value: ipv4 });
            console.log(ipv4 );
        });
        this.requestLocationPermission();

    }

    async requestLocationPermission() {
        const chckLocationPermission = PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
        if (chckLocationPermission === PermissionsAndroid.RESULTS.GRANTED) {
            //alert("You've access for the location");
        } else {
            try {
                const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        'title': 'Location App required Location permission',
                        'message': 'We required Location permission in order to get device location ' +
                            'Please grant us.'
                    }
                )
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    ToastAndroid.show('Location access granted', ToastAndroid.SHORT);
                    this.findCoordinates();
                } else {
                    ToastAndroid.show('Location access denied', ToastAndroid.SHORT);
                }
            } catch (err) {
                alert(err)
            }
        }
    };
    static navigationOptions = {
        header: null,
    };
    closeDrawer = () => {
        this.drawer._root.close()
    };
    openDrawer = () =>{
        this.drawer._root.open()
    };

    /*componentDidMount() {

        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    error: null,
                });
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
    }*/
    findCoordinates = () => {
        //this.setState({ latitude: "please wait" });
        //this.setState({ longitude: "please wait" });
        navigator.geolocation.getCurrentPosition(
            position => {
                const location = JSON.stringify(position);
                //this.setState({ location });
                const currentLongitude = JSON.stringify(position.coords.longitude);
                const currentLatitude = JSON.stringify(position.coords.latitude);
                this.setState({ longitude: currentLongitude });
                this.setState({ latitude: currentLatitude });
            },
            //error => Alert.alert("Get error : " + error.message),
            error => this.zeroLocation( error.message),
            {
                enableHighAccuracy: false,
                timeout: 10000,
                maximumAge: 3000
            }
        );
    };

    zeroLocation = (error_message) =>{
        Alert.alert("Get error : " + error_message);
        this.setState({ longitude: "0" });
        this.setState({ latitude: "0" });
    }

    mInrequest = () =>{
        const { latitude }  = this.state ;
        const { longitude }  = this.state ;
        fetch(in_request + '' + this.props.navigation.state.params.Id +  '/' + latitude + '/' + longitude)
            .then((response) => response.json())
            .then((responseJson) => {
                //ToastAndroid.show('status : ' + responseJson.status, ToastAndroid.SHORT);
                if(responseJson.status === "success"){
                    this.setState({result_attended: true});
                    this.setState({want_result: true});
                    this.setState({result_message: responseJson.message});
                }else{
                    ToastAndroid.show('status : ' + responseJson.message, ToastAndroid.SHORT);
                    this.setState({result_message: responseJson.message});
                    this.setState({result_attended: false});
                    this.setState({want_result: true});
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    mOutrequest = () =>{
        const { latitude }  = this.state ;
        const { longitude }  = this.state ;
        fetch(out_request + '' + this.props.navigation.state.params.Id +  '/' + latitude + '/' + longitude)
            .then((response) => response.json())
            .then((responseJson) => {
                //ToastAndroid.show('status : ' + responseJson.status, ToastAndroid.SHORT);
                if(responseJson.status === "success"){
                    this.setState({result_attended: true});
                    this.setState({want_result: true});
                    this.setState({result_message: responseJson.message});
                }else{
                    ToastAndroid.show('status : ' + responseJson.message, ToastAndroid.SHORT);
                    this.setState({result_message: responseJson.message});
                    this.setState({result_attended: false});
                    this.setState({want_result: true});
                }
            })
            .catch((error) => {
                Alert.alert("error");
                console.error(error);
            });
    };

    render() {
        const result_attended = this.state.result_attended;
        const want_result = this.state.want_result;
        const result_message = this.state.result_message;
        let button;
        if(want_result){
            if (result_attended) {
                button = <Button bordered success full style={{margin: 10}}><Text>{result_message}</Text></Button>;
            } else {
                button = <Button bordered danger full style={{margin: 10}}><Text>{result_message}</Text></Button>;
            }
        }

        return (
            <Drawer
                ref={(ref) => { this.drawer = ref; }}
                content={<SideBarUser navigator={this._navigator}
                closeDrawer={()=>this.closeDrawer()}
                                      vId={this.props.navigation.state.params.Id}
                                      vName={this.props.navigation.state.params.Name}
                                      vEmail={this.props.navigation.state.params.Email}
                                      vRule={this.props.navigation.state.params.Rule}
                                      vImg_profile={this.props.navigation.state.params.Img_profile}
                                      vCreate_at={this.props.navigation.state.params.Create_at}
                />}
                onClose={() => this.closeDrawer()} >

            <Container style={{ backgroundColor: '#ecf0f5' }}>
                <Header style={{ backgroundColor: '#dd4b39' }}>
                    <StatusBar
                        backgroundColor="#dd4b38"
                        barStyle="light-content"
                    />
                    <Left>
                        <Button transparent onPress={()=> this.openDrawer()}>
                            <Icon name='menu' />
                        </Button>
                    </Left>
                    <Body>
                    <Title>Attended</Title>
                    </Body>
                    <Right />
                </Header>
                <Content style={styles.content}>
                    <Content style={styles.card}>
                        <Text style={styles.header_text_attendance}>
                            Attendance
                        </Text>

                        <Form>
                            <Text style={{color:'#60615e'}}>
                                Coordinate:
                            </Text>
                            <Grid>
                                <Col>
                                    <Item inlineLabel>
                                        <Input disabled placeholder="Lat"   defaultValue = {this.state.latitude}
                                               onChangeText={(latitude) => {this.setState({latitude}); }}/>
                                    </Item>
                                </Col>
                                <Col>
                                    <Item inlineLabel>
                                        <Input disabled placeholder="Long"  defaultValue = {this.state.longitude}
                                               onChangeText={(longitude) => {this.setState({longitude}); }}/>
                                    </Item>
                                </Col>
                            </Grid>
                            <Item inlineLabel>
                                <Input disabled  placeholder="Ip" defaultValue = {this.state.ip_value} />
                            </Item>
                            <Grid>
                                <Col>
                                    <Button full style={styles.button}
                                            onPress={() => this.mInrequest() }
                                    >
                                        <Text>IN</Text>
                                    </Button>
                                </Col>
                                <Col>
                                    <Button full style={styles.button}
                                            onPress={() => this.mOutrequest() }>
                                        <Text>OUT</Text>
                                    </Button>
                                </Col>
                            </Grid>
                            {button}
                        </Form>

                    </Content>
                </Content>

            </Container>
            </Drawer>
        );
    }
}



const styles = StyleSheet.create({
    content: {
        flex: 1,
        margin: 20,
    },
    card :{
        borderRadius: 4,
        borderTopWidth: 3,
        borderTopColor: '#d2d6de',
        backgroundColor: '#FFF',
        padding: 20,
    },
    button :{
        backgroundColor: '#3c8dbc',
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,

    },
    header_text_attendance :{
        fontSize: 26,
        textAlign: 'center',
        alignItems: "center",
        fontWeight: "bold"
    }

});