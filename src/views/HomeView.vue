<template>
    <v-card
        class="mx-auto"
        max-width="420"
    >
        <v-img
            cover
            height="200"
            src="https://scontent-cdg4-3.xx.fbcdn.net/v/t39.30808-6/330823346_5368903543209296_4726892787998859820_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=730e14&_nc_ohc=whmV2nTSaCQAX9vqeEb&_nc_ht=scontent-cdg4-3.xx&oh=00_AfCtrnmiDObvtoP-oAJx9IKqrY7OxSxFxRhP8QxJTbTE4w&oe=6483622E"
        />
        <v-row class="pa-3">
            <v-col cols="12">
                <v-autocomplete
                    label="Chercher un oiseaux"
                    :items="birdsList"
                    item-title="text"
                    item-value="value"
                    v-model="selectedBird"
                />
                {{observations}}
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
// @ is an alias to /src
import {birdsList} from "@/conf/oiseaux.js"
import { useStorage } from '@vueuse/core'
import {ref, watch} from "vue";


export default {
    name: 'HomeView',
    setup() {
        const defaultObservation = {
            date: Date(),
            birds: []
        }

        const selectedBird = ref();

        watch(
            () => selectedBird.value,
            (val) => {
                console.log(findBird(val))
            }
        )

        function findBird(value)
        {
            return birdsList.filter((bird) => {
                return bird.value === value
            })
        }

        function addBird(bird)
        {
            console.log(bird)
        }

        const observations = useStorage('observations', defaultObservation)

        return {
            birdsList,
            observations,
            addBird,
            selectedBird
        }
    }
}
</script>
