import React, { Component } from 'react';
import { StyleSheet, Text, View, Linking,Image,Dimensions } from 'react-native';
import {Icon} from 'react-native-elements';

class developer extends Component {
 
  render(){

    
    
  
  return (
    
    <View style={styles.container}>
    <View style={{backgroundColor:'#1e1e30',width:"95%",alignItems:"center",marginTop:10,borderRadius:5}}>
    <Image source={require('../assets/developer.jpg')} style={{height:Dimensions.get('window').height/5,width:Dimensions.get('window').height/5,borderRadius:Dimensions.get('window').width/2.5,marginTop:Dimensions.get('screen').height/30}}>
    </Image>
    <Text style={styles.footer}>Aman Goel</Text>
    <Text style={styles.footer1}>Mobile Developer | Student</Text>
    
    </View>
    <View style={{flex:1}}></View>
    <View style={{flex:3,alignSelf:'flex-start',paddingLeft:20}}>
    <Text style={{color:'#bbb',fontSize:20,marginBottom:10,fontFamily:'Righteous-Regular'}}>Credits:</Text>
    <Text style={{color:'#bbb',fontSize:16,marginLeft:20,fontFamily:'Righteous-Regular',marginTop:4}}>• "corona.lmao.ninja" for World API </Text>
    <Text style={{color:'#bbb',fontSize:16,marginLeft:20,fontFamily:'Righteous-Regular',marginTop:4}}>• "covid19india.org" for India API </Text>
    <Text style={{color:'#bbb',fontSize:16,marginLeft:20,fontFamily:'Righteous-Regular',marginTop:4}}>• App developed with React Native </Text>
    <Text style={{color:'#bbb',fontSize:16,marginLeft:20,fontFamily:'Righteous-Regular',marginTop:4}}>• FontAwesome for Icons </Text>
    <Text style={{color:'#bbb',fontSize:16,marginLeft:20,fontFamily:'Righteous-Regular',marginTop:4}}>• Google Fonts for 'Righteous-Regular' Font </Text>
    
    
    </View>
    <View style={{flex:1}}>
    <View style={{flexDirection:'row',justifyContent:'center'}}>
    <Icon name='github' type='font-awesome' size={30} color="#bbb" containerStyle={{margin:8}} onPress={()=>{Linking.openURL('https://github.com/amangoelfv/');}}></Icon>
    <Icon name='linkedin-square' type='font-awesome' size={30} color="#bbb" containerStyle={{margin:8}} onPress={()=>{Linking.openURL('https://linkedin.com/in/amangoelfv');}}></Icon>
    <Icon name='mail' type='entypo' size={30} color="#bbb" containerStyle={{margin:8}} onPress={()=>{Linking.openURL('mailto:amangoel300@gmail.com');}}></Icon>
    </View>
    <Text style={[styles.footer,{fontSize:15}]}>Made with ❤️ in India</Text>
    </View>
   </View>
  );
}}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161625',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  footer:{
    color:'#fff',
    marginTop:6,
    alignSelf:'center',
    fontSize:30,
    fontFamily:'Righteous-Regular'
},
  footer1:{
    color:'#bbb',
    textAlign:'left',
    marginTop:0,
    fontSize:12,
    
    fontFamily:'Righteous-Regular',
    marginBottom:15
  },
  
});
export default developer;