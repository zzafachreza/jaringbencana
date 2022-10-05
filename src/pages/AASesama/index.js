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
            .post(urlAPI + 'v1_bencana.php')
            .then(x => {
                console.warn(x.data);
                setData(x.data);
                setRefreshing(false)
            });

    };

    const renderItem = ({ item, index }) => (
        <TouchableOpacity onPress={() => navigation.navigate('AASesamaView', item)} style={{
            margin: 10,
            padding: 10,
            backgroundColor: colors.white,
            borderRadius: 10,
            marginVertical: 5,

        }}>

            <Text style={{
                fontFamily: fonts.secondary[600],
                fontSize: windowWidth / 25,
                color: colors.primary,
                flex: 1,
            }}>{item.judul}</Text>

            <Text style={{
                marginVertical: 10,
                fontFamily: fonts.secondary[400],
                fontSize: windowWidth / 25,
                color: colors.black,
                textAlign: 'justify',
            }}>{item.keterangan}</Text>

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
                    color: colors.zavalabs2,
                }}>{item.nama_lengkap}</Text>

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
                    color: item.status == 'Belum ditangani relawan' ? colors.border : item.status == 'Ditolak relawan' ? colors.danger : colors.success
                }}>{item.status}</Text>

            </View>


        </TouchableOpacity >
    );



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

        </>
    );
}

const styles = StyleSheet.create({});
