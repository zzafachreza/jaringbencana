import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Linking,
  ScrollView,
} from 'react-native';
import { windowWidth, fonts } from '../../utils/fonts';
import { getData, storeData, urlAPI, urlAvatar } from '../../utils/localStorage';
import { colors } from '../../utils/colors';
import { MyButton, MyGap } from '../../components';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';

export default function Account({ navigation, route }) {
  const [user, setUser] = useState({});
  const [com, setCom] = useState({});
  const isFocused = useIsFocused();
  const [wa, setWA] = useState('');



  useEffect(() => {
    if (isFocused) {
      getData('user').then(res => {
        setUser(res);
        console.error(res);
      });

    }
  }, [isFocused]);

  const btnKeluar = () => {
    storeData('user', null);

    navigation.replace('Login');
  };

  const noimage = 'https://zavalabs.com/nogambar.jpg';
  return (
    <SafeAreaView>
      <ScrollView style={{ padding: 10 }}>

        {/* data detail */}
        <View style={{ padding: 10 }}>


          <View style={{
            borderWidth: 3,
            borderColor: colors.primary,
            alignSelf: 'center',
            marginVertical: 10,
            width: 100,
            borderRadius: 50,
            overflow: 'hidden',
            justifyContent: 'center',
            alignItems: 'center',
            height: 100,
          }}>
            <Image source={{
              uri: user.foto_user !== '' ? urlAvatar + user.foto_user : noimage
            }} style={{
              width: 100,
              height: 100
            }} />
          </View>
          <MyGap jarak={10} />
          <View>

            <View
              style={{
                marginVertical: 2,
                padding: 10,
                backgroundColor: colors.white,
                borderRadius: 10,
              }}>
              <Text
                style={{
                  fontFamily: fonts.secondary[600],
                  color: colors.black,
                }}>
                Nama Lengkap
              </Text>
              <Text
                style={{
                  fontFamily: fonts.secondary[400],
                  color: colors.primary,
                }}>
                {user.nama_lengkap}
              </Text>
            </View>

            <View
              style={{
                marginVertical: 2,
                padding: 10,
                backgroundColor: colors.white,
                borderRadius: 10,
              }}>
              <Text
                style={{
                  fontFamily: fonts.secondary[600],
                  color: colors.black,
                }}>
                Sebagai
              </Text>
              <Text
                style={{
                  fontFamily: fonts.secondary[400],
                  color: colors.primary,
                }}>
                {user.nama_departement}
              </Text>
            </View>





            <View
              style={{
                marginVertical: 2,
                padding: 10,
                backgroundColor: colors.white,
                borderRadius: 10,
              }}>
              <Text
                style={{
                  fontFamily: fonts.secondary[600],
                  color: colors.black,
                }}>
                Email
              </Text>
              <Text
                style={{
                  fontFamily: fonts.secondary[400],
                  color: colors.primary,
                }}>
                {user.email}
              </Text>
            </View>



            <View
              style={{
                marginVertical: 2,
                padding: 10,
                backgroundColor: colors.white,
                borderRadius: 10,
              }}>
              <Text
                style={{
                  fontFamily: fonts.secondary[600],
                  color: colors.black,
                }}>
                Nomor Telephone ( WA )
              </Text>
              <Text
                style={{
                  fontFamily: fonts.secondary[400],
                  color: colors.primary,
                }}>
                {user.telepon}
              </Text>
            </View>



            <View
              style={{
                marginVertical: 2,
                padding: 10,
                backgroundColor: colors.white,
                borderRadius: 10,
              }}>
              <Text
                style={{
                  fontFamily: fonts.secondary[600],
                  color: colors.black,
                }}>
                Alamat
              </Text>
              <Text
                style={{
                  fontFamily: fonts.secondary[400],
                  color: colors.primary,
                }}>
                {user.alamat}
              </Text>
            </View>

          </View>
        </View>

        <View style={{
          flexDirection: 'row'
        }}>
          <View style={{
            flex: 1,
            margin: 5,
          }}>
            <MyButton
              onPress={() => navigation.navigate('EditProfile', user)}
              title="Edit Profile"
              colorText={colors.primary}
              iconColor={colors.primary}
              warna={colors.secondary}
              Icons="create-outline"
            />
          </View>
          <View style={{
            flex: 1,
            margin: 5,
          }}>
            <MyButton
              onPress={btnKeluar}
              title="Keluar"
              colorText={colors.white}
              iconColor={colors.white}
              warna={colors.primary}
              Icons="log-out-outline"
            />
          </View>
        </View>
        {/* button */}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
