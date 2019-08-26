export const BackgroundService = {
    computed: {
        background() {
            return this.$store.getters['background'];
        }
    }
};
