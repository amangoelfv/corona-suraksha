import React, { useEffect, useState } from 'react';
import { View ,Text} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

const uri='https://api.npoint.io/4c446ef8553128ddb66a'
export default function News(){
    getApiData=()=>{
        fetch(uri, {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'content-Type': 'application/json',

            }})
            .then((response)=>response.json())
            
            .then((data)=>{
                setNews(data.reverse())
                setIsFetching(false)
            }) 
    }

    const [news,setNews]=useState([])
    useEffect(()=>{
        getApiData()
    },[])
    onRefresh=()=> {
        this.setState({isFetching: true,},() => {this.getApiData();});
   }
    const [isFetching,setIsFetching] = useState(false)
    return(
        <SafeAreaView style={{flex:1,backgroundColor:'#161625'}}>
            <FlatList
                data={news}
                onRefresh={() => this.onRefresh()}
                refreshing={isFetching}
                renderItem={(item)=>{
                    return(
                        <View style={{width:'95%',backgroundColor:'#1e1e30',alignSelf:'center',margin:10,padding:10,borderRadius:10}}>
                        <View style={{flexDirection:'row'}}>
                        <View style={{flex:5}}>
                        <Text style={{color:'white',fontFamily:'Righteous-Regular',fontSize:20,marginBottom:10}} >• {item.item.title}</Text>
                        </View>
                        <View style={{flex:1,justifyContent:'center'}}>
                        <Text style={{color:'white',fontFamily:'Righteous-Regular',fontSize:15,marginBottom:10,}} >{item.item.date}</Text>
                        </View>
                        </View>
                        <Text style={{color:'grey',fontFamily:'Righteous-Regular'}}>{item.item.description}</Text>
                        </View>
                    )

                }}
                keyExtractor={item=>{return item.id.toString()}}
                
                />
        </SafeAreaView>
    )
}