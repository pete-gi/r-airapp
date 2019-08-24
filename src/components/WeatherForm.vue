<template>
    <form @submit.prevent="checkForCity" class="weather-form form">
        <div class="form__control">
            <input type="text" class="input">
        </div>
        <div class="form__control">
            <button type="submit" class="button">
                Check
            </button>
        </div>
    </form>
</template>