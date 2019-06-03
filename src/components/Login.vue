<template>
    <div>
        <v-btn @click="newTournament">New tournament</v-btn>
        <div>
            <span>OR</span>
            <v-text-field placeholder="Tournament id"></v-text-field>
            <v-btn>Load tournament</v-btn>
        </div>
    </div>
</template>
<script>
const guid = require('uuid/v4');

export default {
    methods: {
        newTournament() {
            let id = guid();
            this.$store.dispatch('newTournament', id)
        }
    }
}
</script>
<style lang="scss" scoped>

</style>
