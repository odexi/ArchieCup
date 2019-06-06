<template>
    <div>
        <v-btn @click="setGameOn">New tournament</v-btn>
        <div>
            <span>OR</span>
            <v-text-field v-model="tournamentId" type="text" placeholder="Tournament id"></v-text-field>
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
        async loadTournament() {
            console.log(this.tournamentId)

            try {
                let result = await PostsService.loadTournament({
                id: this.tournamentId,
                })

                if (result.status = 500) {
                    this.$toast.error('Tournament with given id does not exist')
                    return;
                }

                this.$store.dispatch('loadTournament', result.data[0]);
                this.$store.dispatch('setGame', true);
                this.$toast.success('Tournament loaded successfully!')
            }
            catch (err) {
                this.$toast.error('Server error')
            }
            
        }
    }
}
</script>
<style lang="scss" scoped>

</style>
