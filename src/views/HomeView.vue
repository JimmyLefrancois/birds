<template>
    <v-card
            class="mx-auto"
            max-width="420"
    >
        <!--        <v-img-->
        <!--            cover-->
        <!--            height="200"-->
        <!--            src="https://scontent-cdg4-3.xx.fbcdn.net/v/t39.30808-6/330823346_5368903543209296_4726892787998859820_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=730e14&_nc_ohc=whmV2nTSaCQAX9vqeEb&_nc_ht=scontent-cdg4-3.xx&oh=00_AfCtrnmiDObvtoP-oAJx9IKqrY7OxSxFxRhP8QxJTbTE4w&oe=6483622E"-->
        <!--        />-->
        <v-row class="pa-3">
            <v-col cols="12">
                <v-btn prepend-icon="mdi-binoculars" @click="createObservation">Nouvelle sortie</v-btn>
            </v-col>
            <v-col cols="12" v-if="displayBirdsList">
                <v-autocomplete
                        label="Chercher un oiseaux"
                        :items="birdsList"
                        item-title="text"
                        item-value="value"
                        v-model="selectedBird"
                />

                <v-list>
                    <v-list-item v-for="(count, index, id) in observations[currentObservation].birdCount" :key="index">
                        {{ findBird(id) }}, count : {{
                        count
                        }}
                        <v-btn @click="increaseBirdCount(id)">Plus</v-btn>
                        <v-btn @click="decreaseBirdCount(id)">Moins</v-btn>
                    </v-list-item>
                </v-list>
            </v-col>
        </v-row>
    </v-card>
</template>

<script setup>
// @ is an alias to /src
import {birdsList} from "@/conf/oiseauxtest.js"
import {useStorage} from '@vueuse/core'
import {computed, watch} from "vue";
import { v4 as uuidv4 } from 'uuid';

const selectedBird = useStorage('selectedBird', null)
const currentObservation = useStorage('currentObservation', null)
const observations = useStorage('observations', {})

function emptyObservation() {
    return {id: uuidv4(), date: Date(), birdCount: {}}
}

const displayBirdsList = computed(() => {
    return currentObservation.value !== null
});

function findBird(value) {
    return birdsList.find((bird) => {
        return bird.value === value
    })
}

function createObservation() {
    const observation = emptyObservation()

    observations.value[observation.id] = observation
    currentObservation.value = observation.id
}

function increaseBirdCount(id) {
    if (!Object.hasOwn(observations.value[currentObservation.value].birdCount, id)) {
        observations.value[currentObservation.value].birdCount[id] = 1
    } else {
        observations.value[currentObservation.value].birdCount[id]++
    }
}

function decreaseBirdCount(id) {
    if (Object.hasOwn(observations.value[currentObservation.value].birdCount, id)) {
        observations.value[currentObservation.value].birdCount[id]--
    }
}

watch(
    () => selectedBird.value,
    (id) => {
        if (!Object.hasOwn(observations.value[currentObservation.value].birdCount, id)) {
            observations.value[currentObservation.value].birdCount[id] = 1
        }
    }
)


</script>
