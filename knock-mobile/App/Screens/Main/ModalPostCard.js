import React, { Component } from 'react'
import { Text, View } from 'react-native'

import Modal from "react-native-modal";

export default class ModalPostCard extends Component {
    state = {
        visible: false
    }

    modalHandle = () => {
        this.setState({ visible: !this.state.visible })
    }

    render() {
        return (
            <Modal
                isVisible={this.state.visible}
                onBackButtonPress={this.modalHandle}
            >
                <View style={{ flex: 1, backgroundColor: 'white', justifyContent: "center", alignItems: 'center' }}>
                    <Text style={{color: 'black'}}>Select Post Card to send</Text>

                </View>

            </Modal>
        )
    }
}
