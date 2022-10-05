import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../../utils/colors';
import { fonts, windowWidth } from '../../utils/fonts';
import base64 from 'react-native-base64';
import RenderHtml from 'react-native-render-html';
export default function AAEdukasiView({ naivgation, route }) {

    const item = route.params;
    return (
        <ScrollView style={{}}>
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
                <RenderHtml
                    contentWidth={windowWidth}
                    source={{
                        html: base64.decode(item.isi)
                    }}
                />
            </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({})