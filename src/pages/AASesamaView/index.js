import { Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../../utils/colors';
import { fonts, windowWidth } from '../../utils/fonts';
import base64 from 'react-native-base64';
import RenderHtml from 'react-native-render-html';
import { getData, urlAPI, urlAvatar } from '../../utils/localStorage';
import { MyButton } from '../../components';
import axios from 'axios';
import { showMessage } from 'react-native-flash-message';
export default function AASesamaView({ navigation, route }) {
    const [user, setUser] = useState({});
    useEffect(() => {
        getData('user').then(u => setUser(u));
    }, [])
    const item = route.params;
    return (
        <>
            <ScrollView>
                <Text style={{
                    padding: 20,
                    textAlign: 'center',
                    backgroundColor: colors.primary,
                    color: colors.white,
                    fontFamily: fonts.secondary[600],
                    fontSize: windowWidth / 28
                }}>{item.judul}</Text>
                <View style={{
                    padding: 10
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[400],
                        fontSize: windowWidth / 28
                    }}>{item.keterangan}</Text>

                    <View style={{
                        padding: 10,
                        backgroundColor: colors.white,
                        marginVertical: 5,
                    }}>
                        <Image style={{
                            width: '100%',
                            height: 250
                        }} source={{
                            uri: item.foto !== '' ? urlAPI.replace('api/', '') + item.foto : 'https://zavalabs.com/nogambar.jpg'
                        }} />
                    </View>
                    <Text style={{
                        flex: 1,
                        marginVertical: 5,
                        fontFamily: fonts.secondary[400],
                        fontSize: windowWidth / 25,
                        color: colors.zavalabs2,
                    }}>{item.tanggal}</Text>




                    <View style={{
                        flex: 1,
                        flexDirection: 'row'
                    }}>

                        <Text style={{
                            fontFamily: fonts.secondary[400],
                            fontSize: windowWidth / 25,
                            color: colors.zavalabs2,
                            flex: 0.2,
                        }}>Status</Text>
                        <Text style={{
                            flex: 0.05,
                            fontFamily: fonts.secondary[400],
                            fontSize: windowWidth / 25,
                            color: colors.zavalabs2,
                        }}>:</Text>
                        <Text style={{
                            flex: 1,
                            fontFamily: fonts.secondary[600],
                            fontSize: windowWidth / 25,
                            color: colors.danger,
                        }}>{item.status}</Text>

                    </View>


                    <View style={{
                        flexDirection: 'row',
                        marginVertical: 10,
                    }}>
                        <View style={{
                            borderWidth: 3,
                            backgroundColor: colors.primary,
                            width: 75,
                            justifyContent: 'center',
                            alignItems: 'center',
                            overflow: 'hidden',
                            borderColor: colors.primary,
                            height: 75,
                            borderRadius: 40,
                        }}>
                            <Image style={{
                                width: 75,
                                height: 75,
                                borderRadius: 40,
                            }} source={{
                                uri: urlAvatar + item.foto_user
                            }} />
                        </View>
                        <View style={{
                            padding: 10
                        }}>
                            <Text>{item.nama_lengkap}</Text>
                            <Text>{item.alamat}</Text>
                            <TouchableOpacity onPress={() => Linking.openURL('tel:' + item.telepon)} style={{
                                padding: 5,
                                marginVertical: 5,
                                backgroundColor: colors.secondary,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 5,
                            }}>
                                <Text style={{
                                    fontFamily: fonts.secondary[600],
                                    color: colors.primary,
                                }}>Hubungi</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </ScrollView>
            {item.status == 'Belum ditangani relawan' && user.id_departement == 3 && <View style={{
                flexDirection: 'row'
            }}>
                <View style={{
                    flex: 1,
                    padding: 5,
                }}>
                    <MyButton onPress={() => {
                        // alert(item.id);
                        axios.post(urlAPI + 'v1_bencana_update.php', {
                            id_info: item.id,
                            status: 'Sudah ditangani relawan'
                        }).then(res => {
                            console.warn(res.data);
                            showMessage({
                                message: 'Berhasil terima bantuan sesama',
                                type: 'success'
                            });
                            navigation.goBack();
                        })
                    }} Icons="shield-checkmark-outline" title="Terima" warna={colors.success} />
                </View>
                <View style={{
                    flex: 1,
                    padding: 5,
                }}>
                    <MyButton onPress={() => {
                        // alert(item.id);
                        axios.post(urlAPI + 'v1_bencana_update.php', {
                            id_info: item.id,
                            status: 'Ditolak relawan'
                        }).then(res => {
                            console.warn(res.data);
                            showMessage({
                                message: 'Berhasil tolak bantuan sesama',
                                type: 'success'
                            });
                            navigation.goBack();
                        })
                    }} Icons="close-circle-outline" title="Tolak" warna={colors.danger} />
                </View>
            </View>}
        </>
    )
}

const styles = StyleSheet.create({})