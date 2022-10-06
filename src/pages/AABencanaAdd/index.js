import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, PermissionsAndroid, Alert } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import { MyButton, MyGap, MyInput } from '../../components';
import { colors } from '../../utils/colors';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { fonts, windowHeight } from '../../utils/fonts';
import base64 from 'react-native-base64';
import { getData, urlAPI } from '../../utils/localStorage';
import axios from 'axios';
import { showMessage } from 'react-native-flash-message';
import LottieView from 'lottie-react-native';
import GetLocation from 'react-native-get-location';


export default function AABencanaAdd({ navigation }) {

    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);


    const getIzinLokasi = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    'title': 'Jaring Bencana',
                    'message': 'Izinkan aplikasi untuk mengunakan lokasi'
                }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the location");

                GetLocation.getCurrentPosition({
                    enableHighAccuracy: true,
                    timeout: 7000,
                })
                    .then(location => {

                        getData('user').then(u => {
                            setUser(u)
                            setKirim({
                                ...kirim,
                                fid_user: u.id,
                                latitude: location.latitude,
                                longitude: location.longitude
                            })
                        }
                        );

                        setLoading(false);
                    })
                    .catch(error => {
                        const { code, message } = error;
                        Alert.alert('JARING BENCANA', 'Pastikan lokasi kamu aktif !');
                        navigation.goBack();
                    })



            } else {
                console.log("location permission denied")
                alert("Location permission denied");
            }
        } catch (err) {
            console.warn(err)
        }
    }

    useEffect(() => {
        getIzinLokasi();




    }, [])

    const richText = useRef();
    const onEditorInitialized = (x) => {
        // console.log(base64.encode(x));
        setKirim({
            ...kirim,
            isi: x
        })
    }
    const [kirim, setKirim] = useState({
        judul: '',
        isi: '',
        latitude: 0,
        longitude: 0,
        foto: '',
    })
    const __getImage = () => {
        launchImageLibrary({
            includeBase64: true,
            quality: 0.3,
        }, response => {
            console.log('All Response = ', response);

            console.log('Ukuran = ', response.fileSize);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('Image Picker Error: ', response.error);
            } else {
                if (response.fileSize <= 200000) {
                    let source = { uri: response.uri };

                    console.log();
                    setKirim({
                        ...kirim,
                        foto: `data:${response.type};base64, ${response.base64}`
                    })

                } else {
                    showMessage({
                        message: 'Ukuran Foto Terlalu Besar Max 500 KB',
                        type: 'danger',
                    });
                }
            }
        });
    }

    return (
        <SafeAreaView style={{
            flex: 1
        }}>
            <ScrollView style={{
                padding: 10
            }}>
                <MyInput label="Judul" iconname="create" onChangeText={x => setKirim({
                    ...kirim,
                    judul: x
                })} />
                <MyGap jarak={10} />
                <MyInput label="Keterangan" multiline iconname="create" onChangeText={x => setKirim({
                    ...kirim,
                    keterangan: x
                })} />
                <MyGap jarak={10} />
                <Text style={{
                    margin: 10,
                    fontFamily: fonts.secondary[600],
                    fontSize: 12
                }}>Upload Foto</Text>
                <TouchableOpacity onPress={__getImage} style={{
                    margin: 10,
                    padding: 5,
                    backgroundColor: colors.white,
                    // borderRadius: 10,
                }}>
                    <Image style={{
                        width: '100%',
                        height: 250,
                    }} source={{
                        uri: kirim.foto !== '' ? kirim.foto : 'https://zavalabs.com/nogambar.jpg'
                    }} />
                </TouchableOpacity>


            </ScrollView>
            <MyButton onPress={() => {
                // console.log(kirim)

                setLoading(true);


                axios.post(urlAPI + 'v1_bencana_add.php', kirim).then(res => {
                    console.warn(res.data);
                    showMessage({
                        message: 'Info Bencana berhasil di simpan',
                        type: 'success'
                    });
                    setLoading(false);
                    // navigation.goBack();
                })
            }} radius={0} title="Simpan" warna={colors.primary} />

            {loading && (
                <LottieView
                    source={require('../../assets/animation.json')}
                    autoPlay
                    loop
                    style={{ backgroundColor: colors.primary }}
                />
            )}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})