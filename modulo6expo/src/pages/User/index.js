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
    stars: [],
    loading: false,
    // eslint-disable-next-line react/no-unused-state
    page: 1,
  };

  componentDidMount() {
    this.loadStars();
  }

  loadStars = async () => {
    try {
      const { navigation } = this.props;
      const user = navigation.getParam('user');

      const { page, stars, loading } = this.sloadRepositoriestate;
      if (loading) return;
      this.setState({ loading: true });
      const response = await api.get(`/users/${user.login}/starred`, {
        params: { page },
      });

      this.setState({
        stars: page > 1 ? [...stars, ...response.data] : response.data,
        loading: false,
        // eslint-disable-next-line react/no-unused-state
        page: page + 1,
      });
    } catch (error) {
      ToastAndroid.show('Erro no carregamento dos repositórios favoritados :/');
      this.setState({ loading: false });
    }
  };

  renderFooter = () => {
    const { loading } = this.state;
    if (!loading) return null;
    return (
      <Loading>
        <ActivityIndicator color="#7159c1" />
      </Loading>
    );
  };

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
        <Stars
          ref={ref => {
            this.flatListRef = ref;
          }}
          onEndReachedThreshold={0.2}
          onEndReached={this.loadStars}
          data={stars}
          keyExtractor={star => String(star.id)}
          ListFooterComponent={this.renderFooter}
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
      </Container>
    );
  }
}
