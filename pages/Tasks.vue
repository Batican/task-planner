<template>
    <main class="m-bottom">
        <div class="header">
          <h1>Task Planner</h1>
          <div class="tabs">
            <b-tabs pills card v-model="tabIndex">
              <b-tab title="All" active>
              </b-tab>
              <b-tab :title="`${taskImportantList.length} Important`">
              </b-tab>
              <b-tab :title="`${taskDoneList.length} Done`">
              </b-tab>
            </b-tabs>
          </div>
        </div>
        <label class="search">
          <font-awesome-icon icon="search"  class="search-icon"/>
          <b-input v-model="search" style="padding-left: 30px" placeholder="Search"></b-input>
        </label>
        <div class="tasks">
            <draggable 
              v-model="sortTask"
              :move="checkMove"
              @start="drag = true"
              @end="drag = false"
            >
              <Task
                v-for="(task, i) in activeTaskList"
                :key="i"
                :task="task" />
            </draggable>
        </div>
        <div class="create-textbox">
            <InputPrependIcon placeholder="What's your plan for today?"  @onEnter="onTaskCreate">
                <font-awesome-icon icon="plus" />
            </InputPrependIcon>
        </div>
    </main>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import _ from 'lodash';
import draggable from 'vuedraggable';

export default {
  name: 'Tasks',
  components: {
      draggable,
  },
  data() {
    return { 
      tabIndex: 0,
      search : '' 
    }
  },
methods: {
  ...mapActions('tasks', ["fetchTasks", "addTask", "searchTask", "updateSortNumber"]),

  async onTaskCreate(title) {
      if (title) {
          await this.addTask(title);
          this.fetchTasks()
      }
  },

  checkSearchStr: _.throttle(function(string) {
      this.searchTask(string)
  }, 2000),

  checkMove: function(e) {
    this.updateSortNumber({
      dragTask: e.draggedContext.element,
      relatatedTask:  e.relatedContext.element
    })
    // this.fetchTasks()
  }
},
watch : {
  search(val) {
   this.checkSearchStr(val)
  }
},

computed: {
  ...mapGetters('tasks', ["tasksList"]),

  activeTaskList () {
    if (this.tabIndex === 0) {
      return this.tasksList
    } 
    else if (this.tabIndex === 1) {
      return this.taskImportantList
    } 
    else if (this.tabIndex === 2) {
      return this.taskDoneList
    }
    
  },

  taskImportantList () {
    return this.tasksList.filter((task) => task.is_important)

  },

  taskDoneList () {
    return this.tasksList.filter((task) => task.is_done)
  },

  sortTask : {
    get() {
      return this.activeTaskList
    },
    set(val) {
      // console.log(val)
    }
  }
},

mounted(){
  this.fetchTasks();
},
}
</script>