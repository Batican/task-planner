<template>
    <main class="landing">
      <h1>Welcome to Task Planner</h1>
      <p>Get things done with your day, a list that <br> refreshes every day.</p>
  
      <div class="create-new">
        <InputPrependIcon placeholder="What's your plan for today?"  @onEnter="onTaskCreate">
          <font-awesome-icon icon="plus" />
        </InputPrependIcon>
       
      </div>
      <p class="instruction">Please <span>enter</span> to add task</p>
    </main>
  </template>
  
  <script>
    import { mapActions } from "vuex";

  export default {
   
    methods: {
        ...mapActions('tasks', ["addTask"]),
        async onTaskCreate(title) {
            if (title) {
               await this.addTask(title);
                this.$router.push('/tasks');
            }
        }
    },
  }
  </script>