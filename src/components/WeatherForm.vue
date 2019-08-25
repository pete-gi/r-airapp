<template>
    <form @submit.prevent="checkForCity" class="weather-form form">
        <div class="form__control form__control--wide">
            <input type="text" class="input">
        </div>
        <div class="form__control">
            <button type="submit" class="button">
                Check
            </button>
        </div>
    </form>
</template>

<style lang="scss">
    .form {
        display: grid;
        grid-template-rows: 4rem 4rem;
        grid-row-gap: 1.5rem;
        margin: 2rem 0;

        @media screen and (min-width: 760px) {
            grid-template-rows: auto;
            grid-template-columns: 2fr 1fr;
            grid-row-gap: 0;
            grid-column-gap: 1.5rem;
        }

        &__control {
            flex: 1;
            width: 100%;
            display: flex;
            align-items: stretch;
            font-family: inherit;
            color: white;

            &--wide {
                flex: 2;
            }
        }
    }

    .input {
        height: 4rem;
        border: 1px solid white;
        background-color: rgba(white, 0.35);
        padding: 1rem;
        width: 100%;
    }

    .button {
        height: 4rem;
        border: 0;
        background-color: rgba(white, 0.55);
        width: 100%;
        text-transform: uppercase;
        font-weight: var(--bold);
    }
</style>