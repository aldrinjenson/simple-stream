import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Title, Paragraph, Menu } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Playlist } from '../types';

interface Props {
  playlist: Playlist;
}

const PlaylistCard = ({ playlist }: Props) => {
  const { title, songs } = playlist;
  const navigation = useNavigation();
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  return (
    <View style={{ marginBottom: 20 }}>
      <Card
        onPress={() => navigation.navigate('PlaylistSongsPage', { playlist })}>
        <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
        <Card.Content>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View>
              <Title>{title}</Title>
              <Paragraph>{songs.length} songs</Paragraph>
            </View>

            <Menu
              visible={isMenuVisible}
              onDismiss={() => setIsMenuVisible(false)}
              anchor={
                <MaterialIcons
                  onPress={() => setIsMenuVisible(true)}
                  name="more-vert"
                  size={30}
                  style={{
                    paddingTop: 10,
                    paddingBottom: 20,
                  }}
                />
              }>
              <Menu.Item onPress={() => {}} title="Download" />
              <Menu.Item onPress={() => {}} title="Delete Playlist" />
            </Menu>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

export default PlaylistCard;

const styles = StyleSheet.create({});
