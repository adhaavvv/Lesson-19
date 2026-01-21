import React,{useState} from 'react';
import { StatusBar, View, Button, Text, TextInput, Alert } from 'react-native';

const Edit = ({navigation, route}) => {
    const[name,setName] = useState(route.params.name);
    const[pic,setPic] = useState(route.params.pic);
    return (
        <View>
            <StatusBar/>
            <Text>Card Name:</Text>
            <TextInput style={{borderWidth:1}} value={name} onChangeText={(text)=>setName(text)}/>
            <Text>Card Pic URL:</Text>
            <TextInput style={{borderWidth:1}} value={pic} onChangeText={(text)=>setPic(text)}/>
            <Text> </Text>
            <Button title='Update'

                    onPress={()=>{
                        let item = {card_name: name, card_pic: pic};

                        fetch("https://onlinecardwebappservice1.onrender.com/updatecard/"+route.params.id,
                            {
                                method: "PUT",
                                headers:{"Content-type":"application/json"},
                                body:JSON.stringify(item)
                            }
                        )
                            .then((response)=>{
                                navigation.navigate("Home");
                            })
                    }
                    }
            />
            <Text> </Text>
            <Button title='Delete'
                    onPress={()=> {
                        Alert.alert(
                            "Delete card",
                            "Are you sure?",
                            [
                                {
                                    text: "Cancel",
                                    style: "cancel"
                                },
                                {
                                    text: "Delete",
                                    onPress: () => {
                                        fetch("https://onlinecardwebappservice1.onrender.com/deletecard/" + route.params.id,
                                            {
                                                method: "DELETE",
                                            })
                                            .then((response) => {
                                                navigation.navigate("Home");
                                            })
                                    },
                                    style: "destructive"
                                }
                            ]
                        );
                    }}
            />
        </View>
    );
};

export default Edit;