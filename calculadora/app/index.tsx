import React, { useEffect, useState } from 'react';
import {View, FlatList, StyleSheet, Text, StatusBar, Dimensions, TouchableOpacity} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const DATA = [
  { id: '1', value: 'C', color: '#474957', type: 'function' },
  { id: '2', value: '+/-', color: '#474957', type: 'function' },
  { id: '3', value: '%', color: '#474957', type: 'operator' },
  { id: '4', value: '÷', color: '#4f60f9', type: 'operator' },
  { id: '5', value: '7', color: '#30313a', type: 'number' },
  { id: '6', value: '8', color: '#30313a', type: 'number' },
  { id: '7', value: '9', color: '#30313a', type: 'number' },
  { id: '8', value: '×', color: '#4f60f9', type: 'operator' },
  { id: '9', value: '4', color: '#30313a', type: 'number' },
  { id: '10', value: '5', color: '#30313a', type: 'number' },
  { id: '11', value: '6', color: '#30313a', type: 'number' },
  { id: '12', value: '-', color: '#4f60f9', type: 'operator' },
  { id: '13', value: '1', color: '#30313a', type: 'number' },
  { id: '14', value: '2', color: '#30313a', type: 'number' },
  { id: '15', value: '3', color: '#30313a', type: 'number' },
  { id: '16', value: '+', color: '#4f60f9', type: 'operator' },
  { id: '17', value: '.', color: '#30313a', type: 'number' },
  { id: '18', value: '0', color: '#30313a', type: 'number' },
  { id: '19', value: '⌫', color: '#30313a', type: 'function' },
  { id: '20', value: '=', color: '#4f60f9', type: 'function' },
];

type ItemProps = {
  value: string, 
  color: string, 
  type: string
};

function Index(): JSX.Element {
  const [result, setResult] = useState<number>(0);
  const [expression, setExpression] = useState<string>('');

  useEffect(() => {
    const calculate = () => {
      try {
        if(!expression) {
          setResult(0)
          return;
        };
        const res = eval(expression.replace(/×/g, '*').replace(/÷/g, '/'));
        setResult(res);
      } catch (error) {
        setExpression(expression)
      }
    };

    if (expression) {
      calculate();
    }
  }, [expression]);

  const handlePress = (value: string, type: string) => {

    if (value === 'C') {
      setResult(0);
      setExpression('');
      return;
    }

    if (type === 'function') {
      if (value === '=') {
        setExpression('');
        return;
      }
      
      if (value === '+/-') {
        setExpression(prev => prev += "-")
        return;
      } 
      
      if (value === '%') {
        setExpression(prev => prev += "%");
        return;
      }

      if (value === '⌫') {
        setExpression(prev => {
          const newExpression = prev.length > 1 ? prev.slice(0, -1) : '';
          if (newExpression === '') setResult(0);
          return newExpression;
        });
        return;
      }        
    }

    setExpression(prev => prev + value);
  
  }
  
  const Item = ({value, color, type}: ItemProps) => (
    <TouchableOpacity style={[styles.item, {backgroundColor: color || '#f9c2ff'}]} onPress={() => handlePress(value, type)}>
      <Text style={styles.value}>{value}</Text>
    </TouchableOpacity>
  );

  const Displayexpression = () => (
    <View style={styles.displayResult} >
      <Text style={styles.expression}>{expression}</Text>
    </View>
  );
  
  const DisplayResult = () => (
    <View style={styles.displayResult} >
      <Text style={styles.result}>{result}</Text>
    </View>
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#17171b" barStyle="light-content" />
        <Displayexpression />
        <DisplayResult />
        <FlatList
          data={DATA}
          renderItem={({item}) => <Item value={item.value} color={item.color} type={item.type}/>}
          keyExtractor={item => item.id}
          numColumns={4}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#17171b',
    paddingTop: 100,
  },
  item: {
    padding: 15,
    margin: 8,
    width: 78,
    height: 78,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  value: {
    fontSize: 35,
    color: '#fff',
  },
  displayResult: {
    width: Dimensions.get('window').width - 65, 
  },
  result: {
    fontSize: 70,
    color: '#fff',
    textAlign: 'right',
  },
  expression: {
    fontSize: 40,
    color: '#616374',
    textAlign: 'right',
  }
});

export default Index;
