import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    FlatList,
    SafeAreaView,
    RefreshControl,
    Image,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
    Linking,
} from 'react-native';
import { storeData, getData, urlAPI } from '../../utils/localStorage';
import axios from 'axios';
import { colors } from '../../utils/colors';
import { windowWidth, fonts } from '../../utils/fonts';
import { MyButton, MyGap, MyInput } from '../../components';
import 'intl';
import 'intl/locale-data/jsonp/en';
import { Icon } from 'react-native-elements';
import { useIsFocused } from '@react-navigation/native';
import DatePicker from 'react-native-datepicker'
import moment from 'moment';
import WebView from 'react-native-webview';


const wait = timeout => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
};
export default function ({ navigation, route }) {
    const [refreshing, setRefreshing] = React.useState(false);
    const [data, setData] = useState([]);
    const [user, setUser] = useState({});
    const isFocused = useIsFocused();
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getTransaction();
        wait(2000).then(() => setRefreshing(false));
    }, []);


    useEffect(() => {
        if (isFocused) {

            getTransaction();
        }
    }, [isFocused])






    const getTransaction = () => {
        setRefreshing(true);
        axios
            .post(urlAPI + 'v1_petugas.php')
            .then(x => {
                console.warn(x.data);
                setData(x.data);
                setRefreshing(false)
            });

    };

    const renderItem = ({ item, index }) => (
        <View style={{
            margin: 10,
            padding: 10,
            backgroundColor: colors.white,
            borderRadius: 10,
            marginVertical: 5,
            flexDirection: 'row'

        }}>
            <View style={{
                flex: 1,
                flexDirection: 'row'
            }}>

                <View style={{
                    flex: 1,
                }}>
                    <View style={{
                        flexDirection: 'row',
                        marginVertical: 3,
                    }}>
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            fontSize: windowWidth / 25,
                            color: colors.primary,
                            flex: 1,
                        }}>{item.nama}</Text>

                    </View>
                    <View style={{
                        flexDirection: 'row',
                        marginVertical: 3,
                    }}>
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            fontSize: windowWidth / 25,
                            flex: 0.4,
                        }}>{item.telepon}</Text>


                    </View>
                </View>

                <TouchableOpacity onPress={() => Linking.openURL('tel:' + item.telepon)} style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 10,
                }}>
                    <Text style={{
                        backgroundColor: colors.success,
                        padding: 5,
                        paddingHorizontal: 20,
                        borderRadius: 5,
                        color: colors.white,
                        fontFamily: fonts.secondary[600]
                    }}>Hubungi</Text>
                </TouchableOpacity>

            </View>


        </View >
    );

    const SaveDownload = () => {


        Alert.alert(
            "ARFF TORAJA AIRPORT",
            "Download Laporan " + tanggal.awal + " s/d " + tanggal.akhir + " ?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "OK", onPress: () => {
                        setLoading(true);
                        setDownload(true);



                        Alert.alert(
                            "ARFF TORAJA AIRPORT",
                            "Download Berhasil",
                            [

                                {
                                    text: "OK", onPress: () => {
                                        setDownload(false);
                                        setLoading(false);
                                    }
                                }
                            ],

                        );

                    }
                }
            ],

        );

    }


    const [tanggal, setTanggal] = useState({
        awal: moment().format('YYYY-MM-DD'),
        akhir: moment().format('YYYY-MM-DD')
    });

    const [loading, setLoading] = useState(false);
    const [download, setDownload] = useState(false);

    return (
        <>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={[colors.primary]}
                    />
                }
            >

                {!loading && <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />}
                {loading && <View style={{ flex: 1, marginTop: 100 }}><ActivityIndicator color={colors.primary} size="large" /></View>}
            </ScrollView>
            {!loading && user.id_departement == 2 && <View style={{
                padding: 10,
            }}><MyButton onPress={SaveDownload} warna={colors.success} title="DOWNLOAD" Icons="download-outline" />
            </View>}
        </>
    );
}

const styles = StyleSheet.create({});
