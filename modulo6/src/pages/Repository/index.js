import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator } from 'react-native';
import { Browser, Loading } from './styles';

export default class Repository extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
    }).isRequired,
  };

  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('repository').name,
  });

  render() {
    const { navigation } = this.props;
    return (
      <Browser
        startInLoadingState
        renderLoading={() => (
          <Loading>
            <ActivityIndicator color="#7159c1" size={100} />
          </Loading>
        )}
        source={{ uri: navigation.getParam('repository').html_url }}
      />
    );
  }
}
