import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
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

export default function AAEdukasiAdd({ navigation }) {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({});

    useEffect(() => {
        getData('user').then(u => {
            setUser(u)
            setKirim({
                ...kirim,
                fid_user: u.id
            })
        }
        );

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

                    console.log(`data:${response.type};base64, ${response.base64}`);
                    richText.current.insertImage(`data:${response.type};base64, ${response.base64}`)

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
                <MyInput label="judul" iconname="create" onChangeText={x => setKirim({
                    ...kirim,
                    judul: x
                })} />
                <MyGap jarak={10} />
                <Text style={{
                    margin: 10,
                    fontFamily: fonts.secondary[600],
                    fontSize: 12
                }}>Deskripsi</Text>
                <RichToolbar
                    onPressAddImage={() => __getImage()}
                    editor={richText}
                    actions={[

                        actions.insertImage,
                        actions.setBold,
                        actions.setItalic,
                        actions.insertOrderedList,
                        actions.insertLink,
                        actions.keyboard,
                        actions.removeFormat,
                        actions.undo,
                        actions.redo,
                        actions.heading1,
                        actions.heading2,
                        actions.heading3
                    ]}
                    iconMap={{
                        [actions.heading1]: ({ tintColor }) => (<Text style={[{ color: colors.primary }]}>H1</Text>),
                        [actions.heading2]: ({ tintColor }) => (<Text style={[{ color: colors.primary }]}>H2</Text>),
                        [actions.heading3]: ({ tintColor }) => (<Text style={[{ color: colors.primary }]}>H3</Text>),

                    }}


                />
                <RichEditor
                    initialHeight={windowHeight / 2.5}
                    editorStyle={{
                        backgroundColor: colors.zavalabs,


                    }}
                    ref={richText}
                    initialContentHTML={''}
                    editorInitializedCallback={onEditorInitialized}
                    onChange={onEditorInitialized}
                />

            </ScrollView>
            <MyButton onPress={() => {
                // console.log(kirim);
                setLoading(true);
                const dt = {
                    fid_user: kirim.fid_user,
                    judul: kirim.judul,
                    isi: base64.encode(kirim.isi)
                };

                console.log(dt);
                axios.post(urlAPI + 'v1_edukasi_add.php', dt).then(res => {
                    console.warn(res.data);
                    showMessage({
                        message: 'Edukasi berhasil di simpan',
                        type: 'success'
                    });
                    navigation.goBack();
                    setLoading(false)
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