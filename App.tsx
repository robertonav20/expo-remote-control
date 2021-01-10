import React, {Component} from 'react';
import {Button, SafeAreaView, StyleSheet, Text, TextInput, View} from 'react-native';

const Separator = () => (
    <View style={styles.separator}/>
);

export default class ButtonBasics extends Component {
    private volume: number = 50;
    private min: number = 0;
    private max: number = 100;

    constructor(props: {} | Readonly<{}>) {
        super(props)
        this.state = {text: String(this.volume)};
    }

    _onPressButton() {
        alert('Changed value!');
    }

    _onChangeValue = (value: string) => {
        try {
            const number = Number(value);
            if (number >= 0 && number <= 100) {
                this.setState({text: value})
                this.volume = Number(value);
            } else {
                alert('The value not good! Set a value from 0 to 100')
            }
        } catch (e) {
            alert('Not a value number!')
        }
    }

    _decreaseVolume = () => {
        if (this.volume > this.min) {
            this.setState({text: String(this.volume - 1)})
            this.volume -= 1
        } else {
            alert('Cannot decrease volume, min is reached!')
        }
    }

    _increaseVolume = () => {
        if (this.volume < this.max) {
            this.setState({text: String(this.volume + 1)})
            this.volume += 1
        } else {
            alert('Cannot increase volume, max is reached!')
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View>
                    <Text style={styles.title}>
                        The title and onPress handler are required. It is recommended to set accessibilityLabel to help
                        make your app usable by everyone.
                    </Text>
                </View>
                <Separator/>
                <View>
                    <Text style={styles.title}>
                        Volume setter interaction.
                    </Text>
                </View>
                <View>
                    <View style={styles.fixToText}>
                        <View style={[{width: "20%"}]}>
                            <Button
                                title="-"
                                onPress={this._decreaseVolume}
                            />
                        </View>
                        <View style={styles.fixToText}>
                            <TextInput
                                onChangeText={this._onChangeValue}
                                value={this.state.text}
                                textAlign={'center'}
                            />
                        </View>
                        <View style={[{width: "20%"}]}>
                            <Button
                                title="+"
                                onPress={this._increaseVolume}
                            />
                        </View>
                    </View>
                </View>
                <Separator/>
                <View>
                    <View style={styles.title}>
                        <Button
                            title="Set Volume"
                            onPress={this._onPressButton}
                        />
                    </View>
                </View>
            </SafeAreaView>
            /*
            <View style={styles.container}>
                <View>
                    <Text>Actual value</Text>
                    <Text>{this.volume}</Text>
                </View>
                <View>
                    <View style={styles.component}>
                        <NumericInput
                            value={this.state.text}
                            minValue={this.min}
                            maxValue={this.max}
                            onChange={this._onChangeText}
                            onLimitReached={(max, msg) => alert(this.msgMax)}
                            totalWidth={240}
                            totalHeight={50}
                            iconSize={25}
                            step={1}
                            valueType='integer'
                            rounded
                            textColor='#000000'
                            iconStyle={{color: 'white'}}
                            rightButtonBackgroundColor='#0066FF'
                            leftButtonBackgroundColor='#0066FF'/>
                    </View>
                    <View style={styles.component}>
                        <Button
                            onPress={this._onPressButton}
                            title="Set"
                            color={'#0066FF'}
                        />
                    </View>
                </View>
            </View>
            */
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 16,
    },
    title: {
        textAlign: 'center',
        marginVertical: 8,
    },
    fixToText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
});
