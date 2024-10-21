<script setup lang="ts">

import { useI18n } from "vue-i18n";


const { t } = useI18n();


const response = {
    invoice: {
        company_logo: "https://cdn.vuetifyjs.com/images/john.jpg",
        documentType: t("Invoices.invoice"),
        invoiceNumber: 'INV#1213',
        supplyCode: 'B2B',
        billDate: '10/11/2022',
        dueDate: '13/11/2022',
        paymentType: t("Invoices.informations.paymentType.cash")
    },
    myDetails: {
        name: 'Umbrella Corporation',
        address: '9th Floor, Yellow IT park, Gokhale road, Sangamwadi, Phase 2',
        city: 'Pune',
        state: 'Maharashtra',
        contactName: 'Prashant Rajput',
        phone: '0987654321',
        email: 'prashantrajput@umbrella.com'
    },
    customer: {
        name: 'GeekFact',
        phone: '1234567890',
        email: 'GeekFact@example.com',
        address: '123 Main St',
        city: 'Mumbai',
        state: 'Maharashtra',
    },
    items: [
        {
            description: 'Premium Plan',
            characters: 5000,
            price: 200,
            discount: 0,
            tax: '18%',
            taxableAmt: 200,
            taxAmt: 36,
            totalAmt: 236
        }
    ],
    summary: {
        subTotal: 200,
        totalDiscount: 0,
        totalTax: 36,
        totalAmount: 236
    }
};

const invoice = response.invoice;
const myDetails = response.myDetails;
const customer = response.customer;
const items = response.items;
const summary = response.summary;

const downloadInvoice = () => {
    // Add the download logic here
};

</script>

<template>
    <v-card>
        <v-card-title class="title">
            <v-row>
                <v-col cols="12" sm="6">
                    <v-avatar size="100" class="mr-2">
                        <v-icon size="60" v-if="invoice.company_logo == ''" icon="mdi-account-circle"></v-icon>
                        <v-img v-else alt="John" :src="invoice.company_logo"></v-img>
                    </v-avatar>
                </v-col>
                <div class="btn">
                    <v-btn color="primary" @click="downloadInvoice">{{ t("Invoices.informations.download") }}</v-btn>
                </div>
            </v-row>
        </v-card-title>
        <v-card-text>
            <v-row>
                <v-col cols="12" sm="6">
                    <p><strong>{{ t("Invoices.informations.documentType") }}:</strong> {{ invoice.documentType }}</p>
                    <p><strong>{{ t("Invoices.informations.invoiceNumber") }}:</strong> {{ invoice.invoiceNumber }}</p>
                    <p><strong>{{ t("Invoices.informations.supplyCode") }}:</strong> {{ invoice.supplyCode }}</p>
                </v-col>
                <v-col cols="12" sm="6">
                    <p><strong>{{ t("Invoices.informations.billDate") }}:</strong> {{ invoice.billDate }}</p>
                    <p><strong>{{ t("Invoices.informations.dueDate") }}:</strong> {{ invoice.dueDate }}</p>
                    <p><strong>{{ t("Invoices.informations.paymentType.title") }}:</strong> {{ invoice.paymentType }}</p>
                </v-col>
            </v-row>
            <v-divider class="mt-4 mb-4"></v-divider>
            <v-row>
                <v-col cols="12">
                    <v-card elevation="0">
                        <v-card-title class="title">{{ t("Invoices.informations.myDetails") }}</v-card-title>
                        <v-card-text>
                            <v-row>
                                <v-col cols="12" sm="6">
                                    <p><strong>{{ t("Invoices.informations.details.name") }}:</strong> {{ myDetails.name }}</p>
                                    <p><strong>{{ t("Invoices.informations.details.address") }}:</strong> {{ myDetails.address }}</p>
                                    <p><strong>{{ t("Invoices.informations.details.city") }}:</strong> {{ myDetails.city }}</p>
                                    <p><strong>{{ t("Invoices.informations.details.state") }}:</strong> {{ myDetails.state }}</p>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <p><strong>{{ t("Invoices.informations.details.contactName") }}:</strong> {{ myDetails.contactName }}
                                    </p>
                                    <p><strong>{{ t("Invoices.informations.details.phone") }}:</strong> {{ myDetails.phone }}</p>
                                    <p><strong>{{ t("Invoices.informations.details.email") }}:</strong> {{ myDetails.email }}</p>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
            <v-divider class="mt-4 mb-4"></v-divider>
            <v-row>
                <v-col cols="12">
                    <v-card elevation="0">
                        <v-card-title class="title">{{ t("Invoices.informations.customerDetails") }}</v-card-title>
                        <v-card-text>
                            <v-row>
                                <v-col cols="12" sm="6">
                                    <p><strong>{{ t("Invoices.informations.details.name") }}:</strong> {{ customer.name }}</p>
                                    <p><strong>{{ t("Invoices.informations.details.phone") }}:</strong> {{ customer.phone }}</p>
                                    <p><strong>{{ t("Invoices.informations.details.email") }}:</strong> {{ customer.email }}</p>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <p><strong>{{ t("Invoices.informations.details.address") }}:</strong> {{ customer.address }}</p>
                                    <p><strong>{{ t("Invoices.informations.details.city") }}:</strong> {{ customer.city }}</p>
                                    <p><strong>{{ t("Invoices.informations.details.state") }}:</strong> {{ customer.state }}</p>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
            <v-divider class="mt-4 mb-4"></v-divider>
            <v-row>
                <v-col cols="12">
                    <v-card elevation="0">
                        <v-card-title class="title">{{ t("Invoices.informations.itemDetails.title") }}</v-card-title>
                        <v-card-text>
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>{{ t("Invoices.informations.itemDetails.itemDescription") }}</th>
                                        <th>{{ t("Invoices.informations.itemDetails.characters") }}</th>
                                        <th>{{ t("Invoices.informations.itemDetails.price") }}</th>
                                        <th>{{ t("Invoices.informations.itemDetails.discount") }}</th>
                                        <th>{{ t("Invoices.informations.itemDetails.tax") }}</th>
                                        <th>{{ t("Invoices.informations.itemDetails.taxableAmt") }}</th>
                                        <th>{{ t("Invoices.informations.itemDetails.taxAmt") }}</th>
                                        <th>{{ t("Invoices.informations.itemDetails.totalAmt") }}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in items" :key="index">
                                        <td>{{ index + 1 }}</td>
                                        <td>{{ item.description }}</td>
                                        <td>{{ item.characters }}</td>
                                        <td>{{ item.price }}</td>
                                        <td>{{ item.discount }}</td>
                                        <td>{{ item.tax }}</td>
                                        <td>{{ item.taxableAmt }}</td>
                                        <td>{{ item.taxAmt }}</td>
                                        <td>{{ item.totalAmt }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
            <v-divider class="mt-4 mb-4"></v-divider>
            <v-row>
                <v-col cols="12">
                    <v-card elevation="0">
                        <v-card-title class="title">{{ t("Invoices.informations.summary.title") }}</v-card-title>
                        <v-card-text>
                            <v-row>
                                <v-col cols="12" sm="6">
                                    <p><strong>{{ t("Invoices.informations.summary.subTotal") }}:</strong> {{ summary.subTotal }}</p>
                                    <p><strong>{{ t("Invoices.informations.summary.totalDiscount") }}:</strong> {{ summary.totalDiscount
                                        }}</p>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <p><strong>{{ t("Invoices.informations.summary.totalTax") }}:</strong> {{ summary.totalTax }}</p>
                                    <p><strong>{{ t("Invoices.informations.summary.totalAmount") }}:</strong> {{ summary.totalAmount }}
                                    </p>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<style scoped>
.headline {
    font-size: 1.5rem;
    font-weight: bold;
}

p {
    font-size: 1rem;
    margin: 0.5rem 0;
}

.title {
    font-size: 1.25rem;
    font-weight: bold;
}

.btn {
    position: absolute;
    right: 0;
    margin-top: 1rem;
    margin-right: 1rem;
}

.table {
    width: 100%;
    border-collapse: collapse;
    margin: 25px 0;
    font-size: 1em;
    min-width: 400px;

}

.table thead tr {
    background-color: #d4d3d3;
    color: #000000;
    text-align: left;
}

.table th,
.table td {
    padding: 12px 15px;
}

.table tbody tr {
    border-bottom: 1px solid #dddddd;
}

.table tbody tr:nth-of-type(even) {
    background-color: #f3f3f3;
}
</style>
