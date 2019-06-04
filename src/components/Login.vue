<template>
    <div>
        <v-btn @click="setGameOn">New tournament</v-btn>
        <div>
            <span>OR</span>
            <v-text-field v-model="tournamentId" placeholder="Tournament id"></v-text-field>
            <v-btn @click="loadTournament">Load tournament</v-btn>
        </div>
    </div>
</template>
<script>
import PostsService from '@/services/PostsService'
import { mapGetters, mapState } from 'vuex'


export default {
    computed: {
        ...mapState([
        'tournament'
        ]),
    },
    data () {
        return {
            tournamentId: '',
        }
    },
    methods: {
        setGameOn() {
            this.$store.dispatch('setGame', true);
        },
        loadTournament() {
            console.log(this.tournamentId)
        }
    }
}
</script>
<style lang="scss" scoped>

</style>
