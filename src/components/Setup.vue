<template>
  <div>
    
      <v-container grid-list-xl text-xs-center>
        <v-layout row wrap>

      <v-flex xs12 sm12 md6>

        <v-toolbar flat color="white">
      <v-toolbar-title>Good Players</v-toolbar-title>
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
    <v-data-table :headers="headers" :items="teams" class="elevation-1">
      <template v-slot:items="props">
        <td style="text-align: left;">{{ props.item.player }}</td>
        <td style="text-align: left;">{{ props.item.team }}</td>
        <td class="justify-center layout px-0" style="padding-top: 14px; text-align: left;">
          <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
          <v-icon small @click="deleteItem(props.item)">delete</v-icon>
        </td>
      </template>
    </v-data-table>



      </v-flex>


      <v-flex xs12 sm12 md6 style="width: 100%;">

        <v-toolbar flat color="white">
      <v-toolbar-title>Good Players</v-toolbar-title>
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
    <v-data-table :headers="headers" :items="teams" class="elevation-1">
      <template v-slot:items="props">
        <td>{{ props.item.player }}</td>
        <td>{{ props.item.team }}</td>
        <td class="justify-center layout px-0" style="padding-top: 14px;">
          <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
          <v-icon small @click="deleteItem(props.item)">delete</v-icon>
        </td>
      </template>
    </v-data-table>



      </v-flex>
      </v-layout>


      </v-container>

      
    
    

   

    

  </div>
</template>

<script>
import Team from "@/models/team.js";
import Setup from "@/components/Setup";
import { mapGetters, mapState } from "vuex";

export default {
  name: "setup",
  computed: {
    ...mapState(["teams"]),

    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
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
        team: ""
      },
      defaultItem: {
        player: "",
        team: ""
      }
    };
  },
  methods: {
    editItem(item) {
      this.editedIndex = this.teams.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.teams.indexOf(item);
      confirm("Are you sure you want to delete this team?") &&
        this.$store.dispatch("removeTeam", this.teams[index].id);
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
          team: this.editedItem.team
        });
        this.$store.dispatch("addTeam", team);
      }
      this.close();
    }
  },
  mounted() {
    let team = new Team({
      player: "Otto",
      team: "Vegas Golden Knights"
    });
    console.log(team);
    this.$store.dispatch("addTeam", team);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
