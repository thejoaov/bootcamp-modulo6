import React, { Component } from 'react';
import { ActivityIndicator, ToastAndroid } from 'react-native';
import PropTypes from 'prop-types';
import api from '../../services/api';
import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
  Loading,
} from './styles';

export default class User extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('user').name,
  });

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
    }).isRequired,
  };

  state = {
    stars: {},
    loading: false,
  };

  async componentDidMount() {
    try {
      this.setState({ loading: true });
      const { navigation } = this.props;
      const user = navigation.getParam('user');

      const response = await api.get(`/users/${user.login}/starred`);

      this.setState({ stars: response.data, loading: false });
    } catch (error) {
      ToastAndroid.show('Erro no carregamento dos repositórios favoritados :/');
      this.setState({ loading: false });
    }
  }

  render() {
    const { stars, loading } = this.state;
    const { navigation } = this.props;

    const user = navigation.getParam('user');
    return (
      <Container loading={loading}>
        <Header>
          <Avatar source={{ uri: user.avatar }} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>
        {loading ? (
          <Loading>
            <ActivityIndicator size={100} color="#7159c1" />
          </Loading>
        ) : (
          <Stars
            data={stars}
            keyExtractor={star => String(star.id)}
            renderItem={({ item }) => (
              <Starred>
                <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
                <Info>
                  <Title>{item.name}</Title>
                  <Author>{item.owner.login}</Author>
                </Info>
              </Starred>
            )}
          />
        )}
      </Container>
    );
  }
}
