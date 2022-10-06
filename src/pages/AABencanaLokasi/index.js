import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { WebView } from 'react-native-webview';
export default function AABencanaLokasi({ navigation, route }) {
    const item = route.params;
    const url = 'https://jaringbencana.zavalabs.com/info/lokasi/' + route.params.id;
    return (
        <SafeAreaView style={{
            flex: 1,
        }}>
            <WebView source={{ uri: url }} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})