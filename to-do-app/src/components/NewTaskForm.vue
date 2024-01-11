<template>
  <div id="new-task-form">
    <v-form @submit.prevent="handleSubmit" class="pt-3">
      <v-container fluid>
        <v-row align="center">
          <v-col cols="12" sm="5">
            <v-text-field
              ref="taskInput"
              label="Add a task..."
              prepend-icon="mdi-pencil"
              required
              v-model="form.Text"
              @click:prepend="focusInput"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="5">
            <v-text-field
              label="When should the task be done?"
              prepend-icon="mdi-calendar"
              readonly
              v-model="form.Date"
              @click:prepend="toggleMenu"
              @click:append="toggleMenu"
            ></v-text-field>
            <v-menu
              v-model="menu"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              full-width
              max-width="290px"
            >
              <v-date-picker v-model="form.Date" no-title @click="handleDateChange"></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12" sm="2">
            <v-btn color="green" block @click="handleSubmit">
              <v-icon left>mdi-plus</v-icon>
              Add Task
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
export default {
  name: 'NewTaskForm',
  data: () => ({
    menu: false,
    form: {
      text: '',
      date: new Date().toISOString().substr(0, 10), // Ensure this is a string in YYYY-MM-DD format
    }
  }),
  methods: {
    handleSubmit() {
      this.$emit('new-task', { ...this.form });
      this.resetForm();
    },
    resetForm() {
      this.form.Text = '';
      this.form.Date = new Date().toISOString().substr(0, 10); // Reset date to a string in YYYY-MM-DD format
      this.menu = false;
    },
    focusInput() {
      this.$refs.taskInput.focus();
    },
    toggleMenu() {
      this.menu = !this.menu;
    },
    handleDateChange(date) {
      // When a new date is selected, ensure the date is in YYYY-MM-DD format
      this.form.date = this.formatDate(date);
      this.menu = false;
    },
    formatDate(date) {
      // Format the date to YYYY-MM-DD whether it is a Date object or a string
      return date instanceof Date ? date.toISOString().substr(0, 10) : date;
    }
  }
}
</script>

<style scoped>
#new-task-form {
  padding: 1rem;
}

#new-task-form .v-text-field__slot {
  margin-bottom: 0; /* Removes the extra space below the input fields */
}
</style>


