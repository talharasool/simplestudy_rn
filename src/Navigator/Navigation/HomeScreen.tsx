import React from 'react';
import {View, Text, Button, StyleSheet, Alert} from 'react-native';
import {connect} from 'react-redux';
import {toggleHomeScreen} from '../../../redux/reducers/homeReducers';

const HomeScreen = ({isActive, toggleHomeScreen}) => {
  const handleToggle = () => {
    toggleHomeScreen();
    if (!isActive) {
      Alert.alert('Redux Activated', 'Redux has been activated successfully!', [
        {text: 'OK', onPress: () => console.log('Alert closed')},
      ]);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Home Screen!</Text>

      <Button
        title={isActive ? 'Deactivate' : 'Activate Redux'}
        onPress={handleToggle}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
});

const mapStateToProps = state => ({
  isActive: state.home.isActive,
});

const mapDispatchToProps = {
  toggleHomeScreen,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
