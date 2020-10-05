import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity,Image,Dimensions,Modal } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { ListItem } from 'react-native-elements';



class Daily extends Component {
   
  constructor(props) {
    super(props);
    this.state = {
      
      cnf1:null,
      cnf2:null,
      cnf3:null,
      cnf4:null,
      list:[],
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
      ds5:null,
      modalVisible:null,
       setModalVisible:null,

     

    }
    
  }
  componentDidMount(){

  
    fetch("https://api.covid19india.org/data.json", {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'content-Type': 'application/json',
      }})
      .then((response)=>response.json())
      

      .then((data)=>{data.status!='error'?this.setState({
        list:data.cases_time_series.reverse(),
        modalVisible:null,
        setModalVisible:null,
        date:'',
        cases:null,
        ncases:null,
        death:null,
        ndeath:null,
        nrec:null,
        rec:null,
        
      
      
      }):undefined; })
  
      
     
  
        


    
        
      
      
     
  }
  render(){

    
    
    const { navigation } = this.props;
    
  
  return (
    
    <View style={styles.container}>
    
    <Modal
    
    animationType="slide"
    transparent={true}
    visible={this.state.setModalVisible}
    
    onRequestClose={() => {
        this.setState({setModalVisible:!this.state.setModalVisible})
    }}>
    
    <TouchableOpacity style={{
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'}}
      onPress={() => {
         this.setState({setModalVisible:!this.state.setModalVisible})
     }}
     activeOpacity={1}>
     
<View style={{
        width: 300,
        height: 320,backgroundColor:'#bbb'}}>
        <View style={{
           marginTop:10,
        width: 280,
        height: 250,backgroundColor:'#1e1e30',alignSelf:'center',alignContent:'center',justifyContent:'center',alignItems:'center'}}>
        <Text style={{fontFamily:'Righteous-Regular',color:'#bbb',fontSize:16}}>Daily Cases: {this.state.cases}</Text>
        <Text style={{fontFamily:'Righteous-Regular',color:'#bbb',fontSize:16}}>Total Cases: {this.state.ncases}</Text>
        <Text style={{fontFamily:'Righteous-Regular',color:'#bbb',fontSize:16}}>Daily Deceased: {this.state.death}</Text>
        <Text style={{fontFamily:'Righteous-Regular',color:'#bbb',fontSize:16}}>Total Deceased: {this.state.ndeath}</Text>
        <Text style={{fontFamily:'Righteous-Regular',color:'#bbb',fontSize:16}}>Daily Recovered: {this.state.nrec}</Text>
        <Text style={{fontFamily:'Righteous-Regular',color:'#bbb',fontSize:16}}>Total Recovered: {this.state.rec}</Text>

        </View>
        <Text style={{fontFamily:'Righteous-Regular',color:'#1e1e30',fontSize:30,alignSelf:'center',padding:10}}>{this.state.date}</Text>
</View>
</TouchableOpacity>
  </Modal>
  <ListItem
  title="Date"
  rightTitle="Confirmed"
  rightTitleStyle={{color:'white',fontFamily:'Righteous-Regular',color:'green'}}
  titleStyle={{color:'white',fontFamily:'Righteous-Regular',color:'orange'}}
  containerStyle={{backgroundColor:"#1e1e30",borderRadius:5,margin:5,height:10,width:'100%'}}
  
/>
    <FlatList
    data={this.state.list}
    renderItem={({ item }) => (
      <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => {
         this.setState({
           date:item.date,
           cases:item.dailyconfirmed,
           ncases:item.totalconfirmed,
           death:item.dailydeceased,
           ndeath:item.totaldeceased,
           rec:item.totalrecovered,
           nrec:item.dailyrecovered,
         
         })
         this.setState({setModalVisible:true})

       }}>
       <View style={{backgroundColor:"#1e1e30",flex:1,margin:6,borderRadius:5,padding:7,flexDirection:'row',width:Dimensions.get('window').width,height:40}}>
       <View style={{flex:5,flexDirection:'row'}}> 
       <Image source={require('../assets/india.png')} style={{height:10,width:10}}></Image>
      <Text style={{fontFamily:'Righteous-Regular',color:'#bbb',fontSize:20,textAlign:'center',alignSelf:'flex-start'}}>{item.date}</Text>
      </View>
      <View style={{flex:2,marginRight:10}}>
        <Text style={{fontFamily:'Righteous-Regular',color:'#bbb',fontSize:20,textAlign:'justify',alignSelf:'flex-end'}} >{item.dailyconfirmed} </Text>
        </View>
      </View>
      </TouchableOpacity>
    )}
    keyExtractor={(item, index) => {
      return item.date;
    }}>
    </FlatList>
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
    flex:4
  },
  footer:{
    color:'white',
    fontWeight:'bold',
    marginTop:1
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
export default Daily;