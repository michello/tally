import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default function Tip({amount}) {
    const [tipPercentage, setTipPercentage] = useState(0)
    const [useCustomTip, setUseCustomTip] = useState(false)

    function isTipValid(amount) {
        return String(amount).match(/^[0-9]+$/) && amount > 0 && amount < 100
    }

    function changePercentage(amount, isCustomPercentage) {
        setTipPercentage(amount)
        !isCustomPercentage && setUseCustomTip(false)
    }

    const validTipPercentages = [
        {amt: 15, text: "15%"},
        {amt: 18, text: "18%"},
        {amt: 20, text: "20%"}
    ]

    return(
        <>
            <View class='tip-header'>
                <Text>
                    Tip Amount: ${(amount*tipPercentage/100).toFixed(2)}
                </Text>
            </View>
            <View class='tip-options' style={styles.row}>
                {validTipPercentages.map((validTipPercentage) => {
                    return <Button
                                class='tip-percentage'
                                title={validTipPercentage.text}
                                onPress={() => {
                                    if (isTipValid(validTipPercentage.amt)) {
                                        changePercentage(validTipPercentage.amt, false)
                                    }
                                }}
                            />
                })}
                <Button
                    class='tip-percentage'
                    title="Custom"
                    onPress={() => setUseCustomTip(!!!useCustomTip)}
                />
            </View>
            <View>
            {useCustomTip && (
                <View class='custom-tip-percentage'>
                    <Text>
                        Enter percentage here: 
                    </Text>
                    <TextInput
                        onChangeText={(value) => { if (isTipValid(value)) { changePercentage(value, true) } }}
                        value={(tipPercentage)/100}
                        maxLength={2}
                        placeholder="0"
                        keyboardType="numeric"
                    />
                    <Text>%</Text>
                </View>
            )}
        </View>
        </>
    )   
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff'
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between'
    }
});
