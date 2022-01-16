import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants'

export default function App(){

  const [estado, setEstado] = useState('leitura');
  const [anotacao, setAnotacao] = useState('');

  useEffect(()=>{
    // quando o app é inicializado, verifica se há anotação antiga (salvo no setData)
    (async ()=>{
      try { 
        const anotacaoLeitura = await AsyncStorage.getItem('anotacao')
        if (anotacaoLeitura != null){
          setAnotacao(anotacaoLeitura)
        }
      } catch(error) {

      }
    })();
  }, [])

  // função para salvar internamente
  const setData = async() => {
    try{
      await AsyncStorage.setItem('anotacao', anotacao);
    }catch(error){

    }

    if (anotacao != ''){
      alert('Sua anotação foi salva')
    } else {
      alert('Sua anotação foi descartada')
    }
  }

  function atualizarTexto(){
    setEstado('leitura');
    setData();
  }

  if (estado == 'leitura'){  
    return(
      <View style={{flex:1}}>
        <StatusBar style='light'/>
        <View style={styles.header}>
          <Text style={styles.textHeader}>Aplicativo Anotação</Text>
        </View>

        {
          (anotacao != '')?
            <ScrollView style={{padding:20}}>
              <Text style={styles.anotacao}>{anotacao}</Text>
            </ScrollView>
          :
            <ScrollView style={{padding:20}}>
              <Text style={{opacity:0.4, fontSize:15}}>Nenhuma anotação encontrada...</Text>
            </ScrollView>
        }

        {
          (anotacao == '')?
            <TouchableOpacity onPress={()=> setEstado('atualizando')} style={styles.btnAnotacao}>
              <Text style={styles.btnAnotacaoTexto}>+</Text>
            </TouchableOpacity>
          :
            <TouchableOpacity onPress={()=> setEstado('atualizando')} style={styles.btnSalvar}>
              <Text style={styles.btnSalvarText}>Editar</Text>
            </TouchableOpacity>
        }
      </View>
    );
  } else if (estado == 'atualizando'){
      return(
        <View style={{flex:1}}>
          <StatusBar style='light'/>
          <View style={styles.header}>
            <Text style={styles.textHeader}>Aplicativo Anotação</Text>
          </View>

          <TextInput
          autoFocus={true}
          onChangeText={(text)=>setAnotacao(text)}
          style={{padding:20, height:300, textAlignVertical:'top', fontSize:15}}
          multiline={true}
          numberOfLines={5}
          value={anotacao}/>

          <TouchableOpacity onPress={()=> atualizarTexto()} style={styles.btnSalvar}>
            <Text style={styles.btnSalvarText}>Salvar</Text>
          </TouchableOpacity>
        </View>
    );
  }
}


const styles = StyleSheet.create({
    header:{
      width: '100%',
      padding: 15,
      paddingTop: Constants.statusBarHeight,
      backgroundColor: '#069',
    },

    textHeader:{
      textAlign:'center',
      color:'white',
      fontSize:25,
      paddingTop:5
    },

    anotacao:{
      fontSize:15,
      marginBottom:150
    },

    btnAnotacao:{
      position:'absolute',
      alignItems:'center',
      justifyContent:'space-between',
      right: 20, bottom: 20,
      width: 70, height: 70,
      backgroundColor: '#069',
      borderRadius: 35,
    },

    btnAnotacaoTexto:{
      color:'white',
      fontSize:40,
      textAlign:'center',
      marginTop:3
    },

    btnSalvar:{
      position:'absolute',
      right: 20, bottom: 20,
      width: 120,
      paddingTop: 10,
      paddingBottom: 10, 
      backgroundColor: '#069',
      borderRadius:20
    },

    btnSalvarText:{
      color:'white',
      textAlign:'center',
      fontSize: 20
    }
});
