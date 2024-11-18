import {defineStore} from 'pinia';
import type {Notification} from "@/types/notifications";
import {ref} from "vue";

const notifs: Notification[] = [
    // {
    //     id: (Math.random() * 1000).toString(),
    //     title: "Le CV Omar Bellamine a bien été téléchargé",
    // },
    // {
    //     id: (Math.random() * 1000).toString(),
    //     title: "Le CV Omar Bellamine a bien été téléchargé",
    // }, {
    //     id: (Math.random() * 1000).toString(),
    //     title: "Le CV Ikram Alaoui a bien été téléchargé",
    // },
    // {
    //     id: (Math.random() * 1000).toString(),
    //     title: "Le CV Omar Bellamine est disponible",
    // },
    // {
    //     id: (Math.random() * 1000).toString(),
    //     title: "L'api trello est disponible pour intégration",
    // },
    // {
    //     id: (Math.random() * 1000).toString(),
    //     title: "Omar bellamine a mis à jour son CV",
    // },
    // {
    //     id: (Math.random() * 1000).toString(),
    //     title: "L'api traduction est disponible pour intégration",
    // },
]


export const useNotificationsStore = defineStore({
        id: 'pinjobs-notification-store',

        state: () =>
            ({
                /*user: JSON.parse(localStorage.getItem('user')),*/
                notifications: notifs,
            }),

        actions: {
            add(notif: Notification) {
                this.notifications.unshift({...notif, id: (Math.random() * 1000).toString(),});

            },
            clear() {
                this.notifications = [];
            }
        },
        // persist: true,

    },
);
