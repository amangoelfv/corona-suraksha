import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity,Image, Dimensions, StatusBar,Animated,SafeAreaView } from 'react-native';
import Fontisto  from 'react-native-vector-icons/Fontisto';
import { Button } from 'react-native-elements';
import { Icon } from 'react-native-elements'
import {
  PieChart,
} from 'react-native-chart-kit'
import { ScrollView } from 'react-native-gesture-handler';

const {width,height}=Dimensions.get('screen')

class Home extends Component {
  
 
  constructor(props) {
    super(props);
    this.state = {
      Anim: new Animated.Value(0),
      opacity: new Animated.Value(0),
      cnf:null,
      inccnf:null,
      active:null,
      district:[],
      rcv:null,
      incrcv:null,
      ded:null,
      incded:null,
      date:'',
      latitude: null,
      longitude: null,
      activep:null,
      recp:null,
      dedp:null,

    }
    
  }

  componentDidMount(){
    

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
   
    
    
      
    fetch("https://api.covid19india.org/data.json", {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'content-Type': 'application/json',
      }})
      .then((response)=>response.json())
      

      .then((data)=>{data.status!='error'?this.setState({
        cnf:data.statewise[0].confirmed,
        inccnf:data.statewise[0].deltaconfirmed,
        ded:data.statewise[0].deaths,
        incded:data.statewise[0].deltadeaths,
        rcv:data.statewise[0].recovered,
        incrcv:data.statewise[0].deltarecovered,
        active:data.statewise[0].active,
        date:data.statewise[0].lastupdatedtime,
        activep:((data.statewise[0].active)/(data.statewise[0].confirmed)*100),
        dedp:((data.statewise[0].deaths)/(data.statewise[0].confirmed)*100),
        recp:((data.statewise[0].recovered)/(data.statewise[0].confirmed)*100),
        
        

      
      
      }):alert("Internet Not Available"); 
      
      
      
      })

     
      
       
    
       
     
     
  }
  render(){
    const pieData = [
      {
        name: 'Active',
        population: Math.floor(this.state.activep),
        color: '#50A3A4',
        legendFontColor: '#eee',
        legendFontSize: 12,
      },
      {
        name: 'Deceased',
        population: Math.floor(this.state.dedp),
        color: '#F95335',
        legendFontColor: '#eee',
        legendFontSize: 13,
      },
      {
        name: 'Recovered',
        population: Math.ceil(this.state.recp),
        color: '#FCAF38',
        legendFontColor: '#eee',
        legendFontSize: 14,
        legendFontFamily:'Righteous-Regular'
        
      },
    ];
  
    const { navigation } = this.props;
   
  
  return (
    <SafeAreaView style={styles.container}>
    
    <StatusBar hidden={true}/>
    <View style={styles.cardView5}>
    <View style={{flex:3}}></View>
    <View style={{flex:6.5}}><Text style={styles.footer3}>CoronaSuraksha</Text></View>
    <View style={{flex:1,margin:10}}><Icon
    name='user-circle'
    type='font-awesome'
    color='#bbb'
   
    onPress={() => navigation.navigate('developer')}  /></View>
    </View>
    <View style={styles.cardView1}>
    <Animated.View style={{flex:1,transform:[{scale:this.state.Anim}]}}>
    <PieChart
      data={pieData}
      hasLegend={false}
      width={width}
      height={height/5}
      chartConfig={{
        
        color: (opacity = 1) => `rgba(255, 255, 255, ${0.3})`,
        
      }}      
      accessor="population"
      fontFamily='Righteous-Regular'
    
      
     
    />
    </Animated.View>
    <View style={{flex:1,justifyContent:'center',alignItems:'flex-end',paddingRight:30}}>
    <Text style={[styles.legend,{color:'#50A3A4'}]}>{Math.floor(this.state.activep)}% Active</Text>
    <Text style={[styles.legend,{color:'#FCAF38'}]}>{Math.ceil(this.state.recp)}% Recovered</Text>
    <Text style={[styles.legend,{color:'#b04f4a'}]}>{Math.floor(this.state.dedp)}% Deceased</Text>
    </View>
    

    </View>

    <View style={styles.cardView6}>
    <View style={{flex:1}}>
    <Button
    icon={
      <Icon
        name="history"
        size={15}
        color="white"
      />
    }
    title="Take a deep look  "
    containerStyle={{
      backgroundColor:'#1e1e30',
      marginRight:5
    }}
    titleStyle={{
      fontFamily:'Righteous-Regular',
      color:'#eee'}}
    type='clear'
    raised
    iconRight
    onPress={() => 
      {console.log('hello')
      navigation.navigate('dataCity')}
  }/>
    </View>
    <View style={{flex:1}}>
    
    <Button
  icon={
    <Icon
      name="newspaper-o"
      size={15}
      color="white"
      type="font-awesome"
    />
  }
  title="Latest News "
  containerStyle={{
    backgroundColor:'#1e1e30',
    
  }}
  titleStyle={{
    fontFamily:'Righteous-Regular',
    color:'#eee'}}
  type='clear'
  raised
  iconRight
  onPress={() => navigation.navigate('News')}
/></View>
    
    
    </View>


    <View style={styles.cardView}>
    <Animated.View style={[styles.stats,{opacity:this.state.opacity}]}>
     <Text style={styles.Cardsc}>Confirmed</Text>
     <Text  style={styles.Cards}>{this.state.cnf}</Text>
     <Text  style={styles.Cardsc}>↑ {this.state.inccnf}</Text>

     
    </Animated.View>
    <Animated.View style={[styles.stats,{opacity:this.state.opacity}]}>
    <Text style={styles.Cardsa}>Active</Text>
    <Text style={styles.Cards}>{this.state.active}</Text>
    </Animated.View>
    </View>
    <View style={styles.cardView}>
    <Animated.View style={[styles.stats,{opacity:this.state.opacity}]}>
    <Text style={styles.Cardsd}>Deaths</Text>
    <Text  style={styles.Cards}>{this.state.ded}</Text>
    <Text  style={styles.Cardsd}>↑ {this.state.incded}</Text>

    
   </Animated.View>
   <Animated.View style={[styles.stats,{opacity:this.state.opacity}]}>
   <Text style={styles.Cardsr}>Recovered</Text>
   <Text  style={styles.Cards}>{this.state.rcv}</Text>
   <Text  style={styles.Cardsr}>↑ {this.state.incrcv}</Text>
   </Animated.View>
    </View>


    <View style={styles.cardView3}>
    <TouchableOpacity style={[styles.stats]}  onPress={() => navigation.navigate('DataWorld')}>
    <Fontisto name="world" size={35} color="white" style={{marginBottom:10}} /><Text style={{fontSize:20
      ,fontFamily:'Righteous-Regular',color:'white',marginTop:0}}>World Data</Text>
    </TouchableOpacity>
    <TouchableOpacity style={[styles.stats]}
        onPress={() => navigation.navigate('DataIndia')}>
    <Image
        source={require('../assets/india.png')}
        style={{width:50,height:50}}>
    </Image><Text style={{fontSize:20,
      fontFamily:'Righteous-Regular',color:'white'}}>India Data</Text>
    </TouchableOpacity>
    </View>

    <View style={styles.cardView4}>
  
    <Text style={styles.footer}>Last updated on : {this.state.date}</Text>
    </View>
    </SafeAreaView>

  )
}}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161625',
    alignItems: 'center',
    justifyContent: 'center',
    height:height
  },
  title:{
    color:'white',
    fontFamily:'sans-serif',
    fontWeight:'bold',
    fontSize:32
  },
  titleView:{
    flex:1,
    marginTop:10,
    width:'100%',
    alignItems:"center"
    
  },
  cardView:{
    flex:3,
    padding:0,
    flexDirection:'row',
    height:height/6
  },
  cardView1:{
    flex:4,
    flexDirection:'row',
    alignItems:'center'
  },
  cardView6:{
    flex:0.7,
    justifyContent:'center',
    marginBottom:10,
    flexDirection:'row',
  },
  cardView3:{
    flex:2,
    flexDirection:'row'
  },
  cardView4:{
    flex:0.5,
    
  },
  cardView5:{
    flex:1,
    flexDirection:'row',
    padding:4,
    marginTop:5
  },
  stats:{
    flex:1,
    alignItems:'center',
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
    margin:2,
    justifyContent:'center'
    
    
  },
  Cardsc:{
    color:'#b88546',
    fontSize:15,
    fontFamily:'Righteous-Regular'
  },
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
    color:'#bbb',
    fontSize:30,
    fontFamily:'Righteous-Regular',
    marginVertical:6
  },
  footer:{
    color:'white',
    textAlignVertical:'center',
    marginTop:1,
    fontFamily:'Righteous-Regular',
  },
  footer3:{
    color:'white',
    textAlignVertical:'center',
    marginTop:10,
    fontFamily:'Righteous-Regular',
    fontSize:25
  },
  legend:{
      fontFamily:'Righteous-Regular',
      color:'white',
      fontSize:20,
      marginVertical:10

  }
});
export default Home;