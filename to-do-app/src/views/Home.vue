<template>
  <div class="home">
    <v-card class="mx-auto" max-width="900" v-if="fetched">
      <NewTaskForm @new-task="createTask" :form="form" />
      <v-divider></v-divider>
      <v-list subheader two-line flat>
        <v-list-subheader>
          {{ user.UserName }}'s Tasks:
        </v-list-subheader>
        <TaskList :tasks="tasks" @update-task="updateTask" @delete-task="deleteTask" />
      </v-list>
    </v-card>
  </div>
</template>

<script>
import { getCurrentDate } from '@/util'
import NewTaskForm from '@/components/NewTaskForm.vue'
import TaskList from '@/components/TaskList.vue'

export default {
  name: 'Home',
  components: {
    NewTaskForm,
    TaskList
  },
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    fetched: false,
    tasks: [],
    form: {
      Text: '',
      Date: getCurrentDate(),
    },
  }),
  mounted() {
    this.readTasks();
  },
  methods: {
    createTask(form) {
      // TODO: Use fetch() to send a POST request to your API that includes the data from this.form
      // TODO: Remember to get the updated task list when it's done
      // TODO: Remember to reset the values in this.form to their initial values when it's done
      fetch(`${process.env.VUE_APP_API_ORIGIN}/api/v1/tasks`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json', // Corrected header
  },
      body: JSON.stringify({
        Text: form.Text,
        Date: form.Date,
        Done: false,
  }),
  credentials: 'include',
})
      .then(response => response.json())
      .then(data => {
        this.readTasks();
        this.resetForm();
      })
      .catch(error => console.error('Error:', error));
    },
    resetForm() {
      this.form.Text = '';
      this.form.Date = getCurrentDate();
    },
    readTasks() {
      // TODO: Use fetch() to send a GET request to your API and update this.fetched and this.tasks with the data that's returned
      fetch(`${process.env.VUE_APP_API_ORIGIN}/api/v1/tasks`, {
        method: 'GET',
        credentials: 'include',
      })
      .then(response => response.json())
      .then(data => {
        this.tasks = data;
        this.fetched = true;
      })
      .catch(error => {
        console.error('Error:', error);
        this.fetched = false;
      });
    },
    updateTask(task) {
      // TODO: Use fetch() to send a PUT request to your API to update an task to be Done/not Done.
      // TODO: Remember that the task's ID should be included in the path of the request, i.e. http://yourserverurl/api/v1/tasks/2r984hfiwufw948feoi
      // TODO: Remember to get the updated task list when it's done
      fetch(`${process.env.VUE_APP_API_ORIGIN}/api/v1/tasks/${task._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          Done: !task.Done,
        }),
        credentials: 'include'
      })
      .then(response => response.json())
      .then(data => {
        this.readTasks();
      })
      .catch(error => console.error('Error:', error));
    },
    // This method is given to you. Use it to see how to make fetch() requests.
    deleteTask(task) {
      fetch(
        // The first parameter is a string that contains the full URL to your endpoint
        `${process.env.VUE_APP_API_ORIGIN}/api/v1/tasks/${task._id}`,
        // The second parameter is an object with options. You can include request
        // headers here, options for credentials, which method, which mode, etc.
        {
          method: `DELETE`,
          credentials: `include`,
        }
        // Note: The default for method is GET, so you don't need to include the
        // method on any GET requests.
      ).then(response => {
        // Here we're just checking if the response was successful or not before
        // trying to do anything about it.
        if (response.ok) {
          // If it is successful, we want to update the task list.
          this.readTasks()
        }
      })
    }
  }
}
</script>
<style scoped>
.form {
  padding: 0 1rem;
}
</style>