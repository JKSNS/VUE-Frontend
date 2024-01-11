<template>
  <div id="task-list">
    <v-list>
      <v-list-item
        v-for="task in tasks"
        :key="task._id"
        class="py-2"
      > 
        <v-list-item-content>
          <v-row>
            <v-col cols="12" md="2">
              <v-btn 
                icon
                @click="updateTask(task)"
              >
                <v-icon 
                  v-if="task.Done"
                  color="green"
                >
                  mdi-checkbox-marked
                </v-icon>

                <v-icon 
                  v-else 
                  color="grey"
                >
                  mdi-checkbox-blank-outline
                </v-icon>
              </v-btn>
            </v-col>

            <v-col cols="12" md="8">
              <v-list-item-title>{{ task.Text }}</v-list-item-title>
              <v-list-item-subtitle>{{ formattedDate(task.Date) }}</v-list-item-subtitle>
            </v-col>

            <v-col cols="12" md="2">
              <v-btn
                icon 
                @click="deleteTask(task)" 
                class="float-right"
              >
                <v-icon color="red">mdi-delete-outline</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
export default {
  name: 'TaskList',

  props: {
    tasks: {
      type: Array,
      default: () => []
    }
  },

  methods: {
    updateTask(task) {
      this.$emit('updateTask', task);
    },

    deleteTask(task) {
      this.$emit('deleteTask', task);
    },

    formattedDate(dateString) {
      const options = {
        weekday: 'short',
        month: 'long', 
        day: 'numeric',
        year: 'numeric' 
      };

      const date = new Date(dateString);

      return date.toLocaleDateString(undefined, options);
    }
  }
};  
</script>