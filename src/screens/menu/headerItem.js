import React from 'react';
import { StyleSheet,Image,Text,TouchableOpacity } from 'react-native';
import { scale } from "../../scale";
const HeaderItem = props => {

  return (
    <TouchableOpacity style={styles.container} onPress={()=>props.onPress()}>
        <Image source={props.image} style={styles.headerImage}/>
      <Text style={styles.headerTitle}>{props.title}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',

  },
  headerImage:{
    width:25,
    height:25
  },
  headerTitle:{
    color:'#101C1E',
    fontSize:scale(9),

  }
});
export default HeaderItem;