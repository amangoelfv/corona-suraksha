import React, { Component } from 'react';
import { StyleSheet, Text, View,ScrollView ,Modal, Dimensions,FlatList, SafeAreaView,Image, ActivityIndicator } from 'react-native';
import { ListItem ,SearchBar,Icon} from 'react-native-elements'

import {PieChart} from 'react-native-chart-kit'
import { TextInput,  TouchableOpacity } from 'react-native-gesture-handler';


class dataworld extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
       list:[],
       modalVisible:null,
       setModalVisible:null,
       states:'',
       cases:null,
       ncases:null,
       death:null,
       ndeath:null,
       rec:null,
       active:null,
       upd:'',
       activep:null,
       recp:null,
       dedp:null,
       search: '',
    }
    
  }
  
  componentDidMount(){
    
   
    fetch("https://corona.lmao.ninja/v2/countries?sort=cases", {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }})
        .then((response)=>response.json())
        
  
        .then((data)=>{data.status!='error'?this.setState({
        
         list:data
  
        
        
        }):undefined; 
        
        
        
        })
  
  
  }
  
  render(){
    const pieData = [
      {
        name: '% Active',
        population: Math.floor(this.state.activep),
        color: '#50A3A4',
        legendFontColor: 'white',
        legendFontSize: 15,
      },
      {
        name: '% Deceased',
        population: Math.floor(this.state.dedp),
        color: '#F95335',
        legendFontColor: 'white',
        legendFontSize: 15,
      },
      {
        name: '% Recovered',
        population: Math.ceil(this.state.recp),
        color: '#FCAF38',
        legendFontColor: 'white',
        legendFontSize: 15,
      },
    ];
    const { search } = this.state;
    
  return (

    <View style={{backgroundColor:"#161625",flex:1}}>
    <View style={{width:'90%',height:'6%',backgroundColor:'#1e1e30',alignSelf:'center',flexDirection:'row',alignItems:'center',paddingLeft:'5%'}}>

    <Icon name='search' color='#fff'/>
    <TextInput
    placeholder='Search Countries....'
    placeholderTextColor='#fff'
    onChangeText={(search)=>this.setState({search})}
    style={{fontFamily:'Righteous-Regular',color:'white',padding:0}}
    />
    </View>
    <ListItem
    
    
    title="Country"
    rightTitle="Confirmed"
    rightTitleStyle={{color:'white',fontFamily:'Righteous-Regular',color:'green'}}

    titleStyle={{color:'white',fontFamily:'Righteous-Regular',color:'orange'}}
    containerStyle={{backgroundColor:"#1e1e30",borderRadius:5,margin:5,height:10}}
    
  />

    
    
      <SafeAreaView>
      
    
  {
      <FlatList
            data={this.state.list.filter(item=>item.country.toLowerCase().includes(this.state.search.toLowerCase()))}
            renderItem={(item)=>{
              return(
                    <TouchableOpacity style={{backgroundColor:"#1e1e30",borderRadius:5,margin:4,flexDirection:'row',height:40,alignItems:'center',paddingHorizontal:5}} onPress={()=>{
                      
                        this.props.navigation.navigate('CountryData', {
                          data: {
                            country:item.item.country,
                            cases:item.item.cases,
                            ncases:item.item.todayCases,
                            death:item.item.deaths,
                            ndeath:item.item.todayDeaths,
                            rec:item.item.recovered,
                            active:item.item.active,
                            flags:item.item.countryInfo.flag,
                            activep:((item.item.active)/(item.item.cases)*100),
                            dedp:((item.item.deaths)/(item.item.cases)*100),
                            recp:((item.item.recovered)/(item.item.cases)*100),
              
                          },
                        })
                      
                    }}>
                    <View style={{flex:5,flexDirection:'row',alignItems:'center'}}>
                    <Image source={{ uri: item.item.countryInfo.flag }} style={{height:27,width:35,marginRight:10}}></Image>
                    <Text style={{color:'white',fontFamily:'Righteous-Regular'}}>{(item.item.country)}</Text>
                    </View>
                    <View style={{flex:2,justifyContent:'flex-end',flexDirection:'row'}}>
                    <Text style={{color:'#b88546',fontSize:10,justifyContent:'flex-end',fontFamily:'Righteous-Regular'}}>↑ {item.item.todayCases}  </Text>
                    <Text style={{color:'white',justifyContent:'flex-end',fontFamily:'Righteous-Regular'}}>{item.item.cases}  </Text>

                    </View>
                    
                    
                    </TouchableOpacity>
                    )
                    
                }}
                keyExtractor={(item)=>{return item.country} }
       />
   
        // rightTitleStyle={{color:'white',fontFamily:'Righteous-Regular'}}
        
        // titleStyle={{color:'white',fontWeight:'500',fontFamily:'Righteous-Regular'}}
        // containerStyle={{backgroundColor:"#1e1e30",borderRadius:5,margin:4,height:40}}
              }
     

  

   
    </SafeAreaView>
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
  title:{
    color:'white',
    fontFamily:'sans-serif',
    fontFamily:'Righteous-Regular',
    fontSize:32
  },
  titleView:{
    flex:1,
    marginTop:0,
    width:'100%',
    alignItems:"center"
    
  },
  
  cardView:{
    flex:2,
    padding:0,
    flexDirection:'row'
  },
  cardView1:{
    flex:4
  },
  cardView6:{
    flex:0.2,
  },
  cardView2:{
    flex:1,
    
  },
  stats:{
    flex:1,
    alignItems:'center',
    paddingVertical:"10%",
    backgroundColor:'#1e1e30',
    borderRadius:2,
    margin:2
    
    
  },
  statsx:{
    flex:1,
    alignItems:'center',
    paddingVertical:"5%",
    backgroundColor:'#1e1e30',
    borderRadius:2,
    margin:2
    
    
  },
  Cardsc:{
    color:'#b88546',
    fontSize:15,
    fontFamily:'Righteous-Regular'  },
  Cardsa:{
    color:'#379ab5',
    fontSize:15,
    fontFamily:'Righteous-Regular'
  },
  Cardsr:{
    color:'#4ab369',
    fontSize:15,
    fontFamily:'Righteous-Regular'
  },
  Cardsd:{
    color:'#b04f4a',
    fontSize:15,
    fontFamily:'Righteous-Regular'
  },
  Cards:{
    color:'white',
    fontSize:30,
    fontFamily:'Righteous-Regular',
    marginVertical:6,
    textAlign:'center'
  },
  footer:{
    color:'white',
    fontFamily:'Righteous-Regular',
    textAlignVertical:'center',
    marginTop:1
  }
});
export default dataworld;