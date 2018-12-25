import React, { Component } from "react";
import {AppRegistry, Image, StatusBar, StyleSheet, ImageBackground} from "react-native";
import {
    Separator,
    Title,
    Subtitle,
    Thumbnail,
    Container,
    Header,
    Button,
    Icon,
    Left,
    Right,
    Body,
    Content,
    List,
    ListItem,
    Text,
    Footer,
    FooterTab} from "native-base";
/*const posts = [
    {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
    {id: 2, title: 'Installation', content: 'You can install React from npm.'}
];*/

export default class HeaderSpan extends Component {
    render() {
        return (
            <Container style={{ backgroundColor: '#222d32'}}>
                <ImageBackground
                    source={{
                        uri:
                            "https://raw.githubusercontent.com/GeekyAnts/NativeBase-KitchenSink/master/assets/drawer-cover.png"
                    }}
                    style={{
                        width: "100%",
                        height: 200
                    }}
                >
                    <Header span style={{
                        backgroundColor: 'transparent',
                        borderBottomWidth: 0,
                        shadowOffset: {height: 0, width: 0},
                        shadowOpacity: 0,
                        elevation: 0
                    }}>
                        <StatusBar
                            backgroundColor="#dd4b38"
                            barStyle="light-content"
                        />
                        <Left>
                            <Button transparent onPress = {() => this.props.closeDrawer()}>
                                <Icon name="arrow-back" />
                            </Button>
                        </Left>
                        <Left>
                            <Thumbnail
                                square
                                style={{
                                    height: 80,
                                    width: 80,
                                    /*position: "absolute",
                                    alignSelf: "center",*/
                                    top: 20
                                }}
                                source={{
                                    uri:
                                        ""+this.props.vImg_profile+""
                                }}
                            />
                        </Left>
                        <Body style={{
                            top: 0,
                            left: 50
                        }}>
                        <Title>{this.props.vName}</Title>
                        <Subtitle>{this.props.vRule}</Subtitle>
                        </Body>
                        <Right />
                    </Header>
                </ImageBackground>

                <Content >
                    <Separator style={styles.list_seperator_bg}>
                        <Text style={styles.text_list_seperator_bg}>Main</Text>
                    </Separator>
                    <ListItem noBorder icon>
                        <Left>
                            <Button small >
                                <Icon name="laptop" />
                            </Button>
                        </Left>
                        <Body>
                            <Text style={styles.text_color_white}>Attended</Text>
                        </Body>
                    </ListItem>
                </Content>
            </Container>
        );
    }
}
const styles = StyleSheet.create({
    text_color_white: {
        color: '#FFF',
        fontSize: 15
    },
    list_seperator_bg:{
        backgroundColor: '#1a2226',
        color: "#4b646f",
    },
    text_list_seperator_bg:{
        color: "#4b646f",
    },
    logout_bt:{

    }



});