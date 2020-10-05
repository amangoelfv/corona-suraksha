import React, { Component } from 'react';
import { StyleSheet, Text, View,ScrollView ,Modal, Dimensions,FlatList, SafeAreaView,Animated ,Image} from 'react-native';
import { ListItem ,SearchBar,Icon, Header} from 'react-native-elements'

import {PieChart} from 'react-native-chart-kit'
import { TextInput,  TouchableOpacity } from 'react-native-gesture-handler';


class Country extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      opacity: new Animated.Value(0),
      Anim: new Animated.Value(0),
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
         
        }}
        leftComponent={<Icon name='arrow-back' color='white' onPress={()=>this.props.navigation.goBack()}/>}
        centerComponent={  <View style={styles.cardView1}>
        <Text style={styles.Cards}>{this.state.data.country}   </Text>
       
        <Image
            style={{height:20,width:20,marginTop:15}}
              source={{uri: ""+this.state.data.flags}}
            />
        </View> } />
        
        <View style={{flexDirection:'row',flex:4,alignItems:'center'}}>
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
        <View style={{flex:1,justifyContent:'center',alignItems:'flex-end',paddingRight:10,paddingBottom:10}}>
        <Text style={[styles.legend,{color:'#50A3A4'}]}>{Math.floor(this.state.data.activep)}% Active</Text>
        <Text style={[styles.legend,{color:'#FCAF38'}]}>{Math.ceil(this.state.data.recp)}% Recovered</Text>
        <Text style={[styles.legend,{color:'#b04f4a'}]}>{Math.floor(this.state.data.dedp)}% Deceased</Text>
        </View>
        </View>
       
    
    
        <View style={styles.cardView}>
        <Animated.View style={[styles.stats,{ opacity:this.state.opacity}]}>
         <Text style={styles.Cardsc}>Confirmed</Text>
         <Text  style={styles.Cards}>{this.state.data.cases}</Text>
         <Text  style={styles.Cardsc}>↑ {this.state.data.ncases}</Text>
    
         
        </Animated.View>
        <Animated.View style={[styles.stats,{ opacity:this.state.opacity}]}>
        <Text style={styles.Cardsa}>Active</Text>
        <Text style={styles.Cards}>{this.state.data.active}</Text>
        </Animated.View>
        </View>
        <View style={styles.cardView}>
        <Animated.View style={[styles.stats,{ opacity:this.state.opacity}]}>
        <Text style={styles.Cardsd}>Deaths</Text>
        <Text  style={styles.Cards}>{this.state.data.death}</Text>
        <Text  style={styles.Cardsd}>↑ {this.state.data.ndeath}</Text>
    
        
       </Animated.View>
       <Animated.View style={[styles.stats,{ opacity:this.state.opacity}]}>
       <Text style={styles.Cardsr}>Recovered</Text>
       <Text  style={styles.Cards}>{this.state.data.rec}</Text>
      
       </Animated.View>
        </View>
        <View style={styles.cardView6}>
          
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
    flexDirection:'row',
    flex:1
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
    justifyContent:'center',
   
    
    
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
export default Country;