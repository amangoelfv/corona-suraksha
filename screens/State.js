import React, { Component } from 'react';
import { StyleSheet, Text, View,ScrollView ,Modal, Dimensions,FlatList, SafeAreaView,Animated } from 'react-native';
import { ListItem ,SearchBar,Icon, Header} from 'react-native-elements'

import {PieChart} from 'react-native-chart-kit'
import { TextInput,  TouchableOpacity } from 'react-native-gesture-handler';


class State extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      Anim: new Animated.Value(0),
      opacity: new Animated.Value(0),
      data:{
        activep:1,
        dedp:1,
        recp:1,
        
      },
      stateData:{},
      newData:[]
    }
    
  }
  
  componentDidMount(){

   
    this.setState({data:this.props.route.params.data})

    Animated.timing(this.state.Anim, {
      toValue: 1,
      duration: 500,
      useNativeDriver:true
    }).start();
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver:true
    }).start();
   
    fetch("https://api.covid19india.org/state_district_wise.json", {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }})
        .then((response)=>response.json())
        
  
        .then((data)=>{
        
          this.state.data.states?this.setState({stateData:data[this.state.data.states].districtData}):null
          var newData=[]
          let objKeys = Object.keys(this.state.stateData);
          objKeys.forEach(key => { 
            let value = this.state.stateData[key]; 
              newData.push({key,value})
          })
        this.setState({newData})
        
        
        })
  
  
  }
  
  render(){
    const pieData = [
      {
        name: '% Active',
        population: Math.floor(this.state.data.activep),
        color: '#50A3A4',
        legendFontColor: 'white',
        legendFontSize: 15,
      },
      {
        name: '% Deceased',
        population: Math.floor(this.state.data.dedp),
        color: '#F95335',
        legendFontColor: 'white',
        legendFontSize: 15,
      },
      {
        name: '% Recovered',
        population: Math.ceil(this.state.data.recp),
        color: '#FCAF38',
        legendFontColor: 'white',
        legendFontSize: 15,
        
      },
    ];
    
  return (

   
        <View style={{backgroundColor:"#161625",flex:1}}>
        <Header
        containerStyle={{
          backgroundColor: '#161625',
          borderBottomColor:'#161625'
         
        }}
        leftComponent={<Icon name='arrow-back' color='white' onPress={()=>this.props.navigation.goBack()}/>}
        centerComponent={ <Text style={styles.Cards}>{this.state.data.states}</Text> } />
        <ScrollView>
        <View style={{flexDirection:'row',flex:4}}>
        <Animated.View style={[styles.cardView1,{transform: [{ scale: this.state.Anim }]}]}>
   
          
          <PieChart
          data={pieData}
          width={Dimensions.get('window').width}
          height={250}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#000000',
            backgroundGradientTo: '#ffffff',
            color: (opacity = 1) => `rgba(255, 255, 255, ${0.3})`,
            
          }}      
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          hasLegend={false}
        />
        </Animated.View>
        <View style={{flex:4,justifyContent:'center',alignItems:'flex-end',paddingRight:10,paddingBottom:10}}>
        <Text style={[styles.legend,{color:'#50A3A4'}]}>{Math.floor(this.state.data.activep)}% Active</Text>
    <Text style={[styles.legend,{color:'#FCAF38'}]}>{Math.ceil(this.state.data.recp)}% Recovered</Text>
    <Text style={[styles.legend,{color:'#b04f4a'}]}>{Math.floor(this.state.data.dedp)}% Deceased</Text>
        </View>
        </View>
       
    
    
        <View style={styles.cardView}>
        <Animated.View style={[styles.stats,{opacity:this.state.opacity}]}>
         <Text style={styles.Cardsc}>Confirmed</Text>
         <Text  style={styles.Cards}>{this.state.data.cases}</Text>
         <Text  style={styles.Cardsc}>↑ {this.state.data.ncases}</Text>
    
         
        </Animated.View>
        <Animated.View style={[styles.stats,{opacity:this.state.opacity}]}>
        <Text style={styles.Cardsa}>Active</Text>
        <Text style={styles.Cards}>{this.state.data.active}</Text>
        </Animated.View>
        </View>
        <View style={styles.cardView}>
        <Animated.View style={[styles.stats,{opacity:this.state.opacity}]}>
        <Text style={styles.Cardsd}>Deaths</Text>
        <Text  style={styles.Cards}>{this.state.data.death}</Text>
        <Text  style={styles.Cardsd}>↑ {this.state.data.ndeath}</Text>
    
        
       </Animated.View>
       <Animated.View style={[styles.stats,{opacity:this.state.opacity}]}>
       <Text style={styles.Cardsr}>Recovered</Text>
       <Text  style={styles.Cards}>{this.state.data.rec}</Text>
      
       </Animated.View>
        </View>
        <View style={styles.cardView6}>
          <Text style={{color:'white',textAlign:"center",fontFamily:'Righteous-Regular'}}>Last Updated on: {this.state.data.upd}</Text>
        
          </View>
           <Text style={{color:'white',textAlign:"center",fontFamily:'Righteous-Regular',margin:20,fontSize:20,}}>Scroll Down to See District Data</Text>
          <Icon name='keyboard-arrow-down' color="white"/>
       {<FlatList
            data={this.state.newData}
            keyExtractor={item=>{return item.key}}
            renderItem={(item)=>{
              return(
                  <View style={{marginTop:20}}>
                  <Text style={[styles.legend,{marginLeft:20}]}>{item.item.key}</Text>
                  <View style={{flexDirection:'row',flex:1,marginBottom:5}}>
                  <View style={{alignItems:'center',flex:1}}>
                  <Text style={[styles.Cardsc,{fontSize:12,marginLeft:10}]}>Confirmed: {item.item.value.confirmed} </Text>
                  <Text style={[styles.Cardsc,{fontSize:10}]}>↑ {item.item.value.delta.confirmed} </Text>

                  </View>
                  <View style={{alignItems:'center',flex:1}}>
                  <Text style={[styles.Cardsa,{fontSize:12}]}>Active: {item.item.value.active} </Text>

                  </View>
                  
                  </View>
                  <View style={{flexDirection:'row',flex:1}}>

                  <View style={{alignItems:'center',flex:1}}>
                  <Text style={[styles.Cardsr,{fontSize:12}]}>Recovered: {item.item.value.recovered} </Text>
                  <Text style={[styles.Cardsr,{fontSize:10}]}>↑ {item.item.value.delta.recovered} </Text>

                  </View>
                  <View style={{alignItems:'center',flex:1}}>
                  <Text style={[styles.Cardsd,{fontSize:12}]}>Deceased: {item.item.value.deceased}</Text>
                  <Text style={[styles.Cardsd,{fontSize:10}]}>↑ {item.item.value.delta.deceased}</Text>

                  </View>
                  </View>

                  </View>
              )
            }}
        />}
        </ScrollView>
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
    flexDirection:'row',
    justifyContent:'center'
    
  },
  stats:{
    flex:1,
    alignItems:'center',
    paddingVertical:"5%",
    backgroundColor:'#1e1e30',
    borderRadius:2,
    margin:2,
    justifyContent:'center'
    
    
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
  },
  legend:{
    fontFamily:'Righteous-Regular',
    color:'white',
    fontSize:20,
    marginVertical:10

}
});
export default State;