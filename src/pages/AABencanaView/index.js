import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../../utils/colors';
import { fonts, windowWidth } from '../../utils/fonts';
import base64 from 'react-native-base64';
import RenderHtml from 'react-native-render-html';
import { urlAPI } from '../../utils/localStorage';
import { MyButton } from '../../components';
import axios from 'axios';
import { showMessage } from 'react-native-flash-message';
export default function AABencanaView({ navigation, route }) {

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
                        }}>Oleh</Text>
                        <Text style={{
                            flex: 0.05,
                            fontFamily: fonts.secondary[400],
                            fontSize: windowWidth / 25,
                            color: colors.zavalabs2,
                        }}>:</Text>
                        <Text style={{
                            flex: 1,
                            fontFamily: fonts.secondary[400],
                            fontSize: windowWidth / 25,
                            color: colors.primary,
                        }}>{item.nama_lengkap}</Text>

                    </View>



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
                </View>

            </ScrollView>
            <View>
                <MyButton onPress={() => navigation.navigate('AABencanaLokasi', item)} title="Lihat Lokasi Bencana" warna={colors.secondary} colorText={colors.primary} radius={0} iconColor={colors.primary} Icons="location-outline" />
            </View>
        </>
    )
}

const styles = StyleSheet.create({})