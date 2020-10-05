import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity,Image,Dimensions } from 'react-native';
import {LineChart,BarChart} from 'react-native-chart-kit'
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native';

const {height,width} = Dimensions.get('screen')

class datacity extends Component {

    
  constructor(props) {
    super(props);
    this.state = {
      cnf1:null,
      cnf2:null,
      cnf3:null,
      cnf4:null,
      cnf5:null,
      cnf6:null,
      cnf7:null,
      cnf8:null,
      cnf9:null,
      date9:'',
      date1:'',
      date2:'',
      date3:'',
      date4:'',
      date5:'',
      date6:'',
      date7:'',
      date8:'',
      state1:'',
      state2:'',
      state3:'',
      state4:'',
      state5:'',
      ds1:null,
      ds2:null,
      ds3:null,
      ds4:null,
      ds5:null

     

    }
    
  }
  componentDidMount(){
    console.log('compon')
  
    fetch("https://api.covid19india.org/data.json", {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'content-Type': 'application/json',
      }})
      .then((response)=>response.json())
      

      .then((data)=>{data.status!='error'?this.setState({
        cnf1:data.cases_time_series[data.cases_time_series.length-1].dailyconfirmed,
        date1:data.cases_time_series[data.cases_time_series.length-1].date,
        cnf2:data.cases_time_series[data.cases_time_series.length-8].dailyconfirmed,
        date2:data.cases_time_series[data.cases_time_series.length-8].date.substr(0,2),
        cnf3:data.cases_time_series[data.cases_time_series.length-2].dailyconfirmed,
        date3:data.cases_time_series[data.cases_time_series.length-2].date.substr(0,2),
        cnf4:data.cases_time_series[data.cases_time_series.length-3].dailyconfirmed,
        date4:data.cases_time_series[data.cases_time_series.length-3].date.substr(0,2),
        cnf5:data.cases_time_series[data.cases_time_series.length-4].dailyconfirmed,
        date5:data.cases_time_series[data.cases_time_series.length-4].date.substr(0,2),
        cnf6:data.cases_time_series[data.cases_time_series.length-5].dailyconfirmed,
        date6:data.cases_time_series[data.cases_time_series.length-5].date.substr(0,2),
        cnf7:data.cases_time_series[data.cases_time_series.length-6].dailyconfirmed,
        date7:data.cases_time_series[data.cases_time_series.length-6].date.substr(0,2),
        cnf8:data.cases_time_series[data.cases_time_series.length-7].dailyconfirmed,
        date8:data.cases_time_series[data.cases_time_series.length-7].date.substr(0,2),
        cnf9:data.cases_time_series[data.cases_time_series.length-9].dailyconfirmed,
        date9:data.cases_time_series[data.cases_time_series.length-9].date.substr(0,2),
        state1:data.statewise[1].statecode,
        state2:data.statewise[2].statecode,
        state3:data.statewise[3].statecode,
        state4:data.statewise[4].statecode,
        state5:data.statewise[5].statecode,
        states1:data.statewise[1].state,
        states2:data.statewise[2].state,
        states3:data.statewise[3].state,
        states4:data.statewise[4].state,
        states5:data.statewise[5].state,
        ds1:data.statewise[1].confirmed,
        ds2:data.statewise[2].confirmed,
        ds3:data.statewise[3].confirmed,
        ds4:data.statewise[4].confirmed,
        ds5:data.statewise[5].confirmed,
      
      
      }):undefined; })
  
      
     
  
        


    
        
      
      
     
  }
  render(){

    
    
    const { navigation } = this.props;
    
  
  return (
    <SafeAreaView style={styles.container}>
    
    <View style={{flex:3,alignItems:'center',backgroundColor:'#1e1e30',borderRadius:6,justifyContent:'center'}}> 
    
   
  <Text></Text>
    <Text style={styles.footer}>Daily Cases ( Click on the Graph to know more )</Text>
    <TouchableOpacity onPress={()=>{
      navigation.navigate('DailyCases');
    }
    }>
    <LineChart
    fromZero={false}
          data={{
            labels: [
              this.state.date9,this.state.date2,this.state.date8,this.state.date7,this.state.date6,this.state.date5,this.state.date4,this.state.date3,this.state.date1
            ],
            datasets: [
              {
            data: [
                0,this.state.cnf9,this.state.cnf2,this.state.cnf8,this.state.cnf7,this.state.cnf6,this.state.cnf5,this.state.cnf4,this.state.cnf3,this.state.cnf1
               ],
              },
            ],
          }}
          width={Dimensions.get('window').width - 16}
          height={Dimensions.get('window').height/4}
        
          chartConfig={{
            backgroundColor: '#ff',
            backgroundGradientFrom: '#1e1e30',
            backgroundGradientTo: '#1e1e30',
           decimalPlaces:0,
            color: (opacity = 255) => `#fff`,
            style: {
              borderRadius: 16,
              marginBottom:5
            },
          }}
          bezier
        
          style={{
            marginVertical: 20,
            borderRadius: 16,
          }}
        />
        </TouchableOpacity>
   <Text style={styles.footer}>Max Daily Cases in past 10 days: {Math.max(this.state.cnf9,this.state.cnf2,this.state.cnf8,this.state.cnf7,this.state.cnf6,this.state.cnf5,this.state.cnf4,this.state.cnf3,this.state.cnf1)}</Text>
  
   </View>
   <View style={styles.Cards}>
   <TouchableOpacity onPress={()=>{
    navigation.navigate('DataIndia');
  }
  }>
   <BarChart
  
  data={{
    labels: [this.state.state1,this.state.state2,this.state.state3,this.state.state4,this.state.state5],
    datasets: [
    {
      data: [this.state.ds1,this.state.ds2,this.state.ds3,this.state.ds4,this.state.ds5]
    }
  ]}}
  width={Dimensions.get('window').width/1.1}
  height={height/4}
  
  withInnerLines={false}
  xAxisLabel=""
  chartConfig={{ 
  backgroundGradientFrom: '#161625',
  backgroundGradientTo: '#161625',
 decimalPlaces:0,
 color: (opacity = 255) => `#fff`}}
  absolute
  fromZero={true}
  style={{
    marginVertical: 20,
    borderRadius: 16,
  }}
/>
</TouchableOpacity>
   
   </View>
   <View style={{flex:1,backgroundColor:'#1e1e30',paddingLeft:'5%',alignSelf:'flex-start',width:'95%',margin:10,borderRadius:10,justifyContent:'center'}}>
   <Text style={styles.footer2}>Most Affected States:</Text>
   <Text style={styles.footer1}>1. {this.state.states1}</Text>
   <Text style={styles.footer1}>2. {this.state.states2}</Text>
   <Text style={styles.footer1}>3. {this.state.states3}</Text>
   </View>
   </SafeAreaView>
  );
}}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#161625',
    alignItems: 'center',
    justifyContent: 'center',
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
    flexDirection:'row'
  },
  cardView1:{
    flex:4
  },
  cardView6:{
    flex:0.7
  },
  cardView3:{
    flex:2,
    flexDirection:'row'
  },
  cardView4:{
    flex:0.5,
    
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
    fontWeight:'bold'
  },
  Cardsa:{
    color:'#379ab5',
    fontSize:15,
    fontWeight:'bold'
  },
  Cardsr:{
    color:'#4ab369',
    fontSize:15,
    fontWeight:'bold'
  },
  Cardsd:{
    color:'#b04f4a',
    fontSize:15,
    fontWeight:'bold'
  },
  Cards:{
    flex:3,
    justifyContent:'center'
  },
  footer:{
    color:'white',
    fontWeight:'bold',
    marginTop:-5
  },
  footer1:{
    color:'white',
    fontWeight:'bold',
    textAlign:'left',
    marginTop:1,
    fontSize:16
  },
  footer2:{
    color:'#bbb',
    textDecorationLine:'underline',
    fontWeight:'bold',
    textAlign:'left',
    marginTop:1,
    fontSize:20
  }
});
export default datacity;