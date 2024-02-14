import { Button } from '@/components/button'
import { Header } from '@/components/header'
import { Input } from '@/components/input'
import { LinkButton } from '@/components/link-button'
import { Product } from '@/components/product'
import { ProductCartProps, useCartStore } from '@/stores/cart-store'
import { formatCurrency } from '@/utils/functions/format-currency'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from 'expo-router'
import { useState } from 'react'
import { Alert, Linking, ScrollView, Text, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const PHONE_NUMBER = '5518991222161'

export default function Cart() {
  const cartStore = useCartStore()
  const [address, setAddress] = useState('')
  const navigation = useNavigation()

  const total = formatCurrency(
    cartStore.products.reduce(
      (total, product) => total + product.price * product.quantity,
      0,
    ),
  )

  function handleProductRemove(product: ProductCartProps) {
    Alert.alert('Remover', `Deseja remover ${product.title} do carrinho?`, [
      {
        text: 'Cancelar',
      },
      {
        text: 'Remover',
        onPress: () => cartStore.remove(product.id),
      },
    ])
  }

  function handleOrder() {
    if (address.trim().length === 0) {
      return Alert.alert('Pedido', 'Informe os dados da entrega.')
    }

    const products = cartStore.products
      .map((product) => `\n ${product.quantity} ${product.title}`)
      .join('')

    const message = `
    🍔 NOVO PEDIDO 
    \n Entregar em: ${address}
    
    ${products}

    \n Valor total: ${total}
    `

    Linking.openURL(
      `http://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${message}`,
    )

    cartStore.clear()
    navigation.goBack()
  }

  return (
    <View className="flex-1 pt-8">
      <Header title="Seu carrinho" />

      <KeyboardAwareScrollView>
        <ScrollView>
          <View className="flex-1 p-5">
            {cartStore.products.length > 0 ? (
              <View className="border-b border-slate-700">
                {cartStore.products.map((product) => (
                  <Product
                    key={product.id}
                    data={product}
                    onPress={() => handleProductRemove(product)}
                  />
                ))}
              </View>
            ) : (
              <Text className="my-8 text-center font-bold text-slate-400">
                Seu carrinho está vazio.
              </Text>
            )}

            <View
              className="mb-4 mt-5 flex-row items-center gap-2"
              style={{ marginTop: 20 }} // bug
            >
              <Text className="font-subtitle text-xl text-white">Total:</Text>

              <Text className="font-heading text-2xl text-lime-400">
                {total}
              </Text>
            </View>
            <Input
              placeholder="Informe o endereço de entraga com rua, bairro, CEP, número e complemento..."
              onChangeText={setAddress}
              onSubmitEditing={handleOrder}
              blurOnSubmit
              returnKeyType="next"
            />
          </View>

          <View className="gap-5 p-5">
            <Button onPress={handleOrder}>
              <Button.Text>Enviar pedido</Button.Text>
              <Button.Icon>
                <Feather name="arrow-right-circle" size={20} />
              </Button.Icon>
            </Button>

            <LinkButton title="Voltar ao cardápio" href="/" />
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
    </View>
  )
}
