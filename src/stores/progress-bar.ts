import {defineStore} from 'pinia';


export const useProgressBarStore = defineStore({
    id: 'pinjobs-progress-bar-store',
    state: () =>
        ({
            /*user: JSON.parse(localStorage.getItem('user')),*/
            progress: 0,
            show_progress_bar: false,
            interval: 0,
            text: '',

        }),
    actions: {
        setText(text: string) {
            this.text = text;
        },
        startBuffer(text: string = 'loading') {
            clearInterval(this.interval);
            this.setText(text);
            this.show_progress_bar = true;
            clearInterval(this.interval);
            this.progress = 0; // Reset progress to 0 if needed
            const totalDuration = 40000 // 40 secs
            const incrementInterval = 1000; // 1 second
            const totalIncrements = totalDuration / incrementInterval;
            const incrementValue = 80 / totalIncrements;
            if (this.progress < 80) {
                this.interval = setInterval(() => {
                    this.progress += incrementValue;
                    if (this.progress >= 80) {
                        clearInterval(this.interval);
                    }
                }, incrementInterval);

            }
        },
        finishProgress() {
            clearInterval(this.interval);
            this.progress = 100;
            setTimeout(() => {
                this.show_progress_bar = false;

            }, 3000);

        },
        showError(text: string) {
            clearInterval(this.interval);
            this.text = text;
           this.progress = 100;
            setTimeout(() => {
                this.show_progress_bar = false;
            }, 3000);

        }
    },
    persist: false,

});
