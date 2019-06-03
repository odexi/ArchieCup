<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>Bad Players</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark class="mb-2" v-on="on">New Team</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.player" label="Player"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.team" label="Team"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="teams.filter(t => t.goodPlayer === false)"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td style="text-align: left;">{{ props.item.player }}</td>
        <td style="text-align: left;">{{ props.item.team }}</td>
        <td class="justify-center layout px-0">
          <v-btn
            style="text-transform: none !important;"
            slot="activator"
            @click="EditTeam(props.item)"
            icon
            flat
          >
            <v-icon>edit</v-icon>
          </v-btn>
          <v-btn
            style="text-transform: none !important;"
            slot="activator"
            @click="deleteTeam(props.item.id)"
            icon
            flat
          >
            <v-icon>delete</v-icon>
          </v-btn>
        </td>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import Team from "@/models/team.js";
import Setup from "@/components/Setup";
import { mapGetters, mapState } from "vuex";

export default {
  name: "setup",
  computed: {
    teams: {
      get() {
        return this.$store.state.tournament.teams;
      }
    },

    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
  },
  data() {
    return {
      dialog: false,
      headers: [
        {
          text: "Player",
          align: "left",
          sortable: false,
          value: "player"
        },
        { text: "Team", value: "team", sortable: false }
      ],
      editedIndex: -1,
      editedItem: {
        player: "",
        team: "",

      },
      defaultItem: {
        player: "",
        team: ""
      },
    };
  },
  methods: {
    EditTeam(item) {
      this.editedIndex = this.teams.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteTeam(id) {
      confirm("Are you sure you want to delete this team?") &&
        this.$store.dispatch("removeTeam", id);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.teams[this.editedIndex], this.editedItem);
        this.$store.dispatch("editTeam", {
          id: this.teams[this.editedIndex].id,
          editedTeam: this.editedItem
        });
      } else {
        let team = new Team({
          player: this.editedItem.player,
          team: this.editedItem.team,
          goodPlayer: false
        });
        this.$store.dispatch("addTeam", team);
      }
      this.close();
    }
  },
  mounted() {
  }
};
</script>
<style lang="scss" scoped>
</style>

