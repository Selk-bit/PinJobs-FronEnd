<script setup>
import {loadScript} from '@paypal/paypal-js';
import {onMounted, ref} from 'vue';
import {usePaymentStore} from "@/stores/payment"; // Import axios for making HTTP requests
import {useAuthStore} from "@/stores/auth";

const auth = useAuthStore()
const paymentStore = usePaymentStore()
const props = defineProps({
  paypalId: String,
  price: Number,
  credits: Number,
});


const backEndData = ref();
const emit = defineEmits(['payment-success']); // Define the custom event
const paypalError = ref(null);

onMounted(async () => {
      try {
        // Ensure the PayPal JS SDK is loaded
        const paypal = await loadScript({
          'client-id': props.paypalId,
        });

        if (!paypal) {
          paypalError.value = 'PayPal SDK failed to load.';
          return;
        }

        // Initialize PayPal Buttons
        await paypal.Buttons({
          createOrder:
              async function (data, actions) {
                // Set up the transaction details
                // return actions.order.create({
                //   purchase_units: [{
                //     amount: {
                //       value: props.price.toString(), // Ensure it's a string
                //     },
                //   }],
                // });
                backEndData.value = await paymentStore.CREATE_ORDER(props.credits);
                console.log(data, 'Data from  create order');
                console.log(backEndData.value.orderId, 'response value  from  create order');
                return backEndData.value.orderId;
              },
          onApprove: async function (data, actions) {
            // Capture the order after approval
            // const orderData = await actions.order.capture();
            // const payment_data = {
            //   orderId: orderData.id, // PayPal order ID
            //   payerId: data.payerID, // PayPal Payer ID
            //   paymentData: orderData, // Include full order details for reference
            // }
            // // Send payment details to backend for processing
            const res = await paymentStore.CAPTURE_ORDER(data.orderID);
            await auth.GET_CURRENT_USER();
            // // Handle successful backend processing
            console.log('Payment processed on backend:', res);

            // Emit the event to the parent component with order data
            // emit('payment-success', response.data); // You can pass the response from backend here
            emit('payment-success', data); // You can pass the response from backend here
            return res;
          },
          onError: function (err) {
            // Handle errors
            console.error('Error during payment:', err);
            paypalError.value = 'An error occurred during the transaction.';
          },
          style: {
            layout: 'vertical',
            color: 'blue',
            shape: 'pill',
            label: 'paypal',
            disableMaxWidth: true,

          },
        }).render('#paypal-button-container');
      } catch (error) {
        // Handle any error loading PayPal or other issues
        console.error('PayPal Button failed to render:', error);
        paypalError.value = 'Failed to load PayPal buttons.';
      }
    }
);
</script>

<template>
  <div class="btn" style="color-scheme: none">
    <div id="paypal-button-container"
         style="background-color:transparent!important; ; border-radius:5px;"></div>
    <p v-if="paypalError" class="text-error font-weight-semibold text-body-2 text-center">{{ paypalError }}</p>
  </div>
</template>

<style scoped lang="scss">
/* Add any styles here */

</style>
