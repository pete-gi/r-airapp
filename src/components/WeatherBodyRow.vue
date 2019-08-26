<template>
    <div class="weather-list__row">
        <div :class="{'mt': diffDate(item.dt_txt)}" class="weather-list__item weather-list__item--large">
            {{ getDay(item.dt_txt) }}
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            item: {
                type: Object,
                required: true
            }
        },
        methods: {
            getDay(value) {
                let date = new Date(value);
                let d = date.getDay();
                let m = date.getMonth();
                let day = d.toString().length === 1 ? `0${d}` : d;
                let month = m.toString().length === 1 ? `0${m}` : m;
                let listedDay = `${day}.${month}`;
                if (this.listedDay !== listedDay) {
                    this.listedDay = listedDay;
                }
                return listedDay;
            },
            getHour(value) {
                let date = new Date(value);
                let h = date.getHours();
                let hour = h.toString().length === 1 ? `0${h}` : h;
                return `${hour}:00`;
            },
            getTemp(value) {
                let temp = new String(value);
                return temp.split('.')[0];
            },
            diffDate(value) {
                let date = new Date(value);
                let h = date.getHours();
                if (h === 0) {
                    return true;
                }
                return false;
            }
        },
    }
</script>