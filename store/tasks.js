export const state = () => ({
	tasks: []
})
export const getters = { 
    tasksList: state => state.tasks
};

export const actions = { 
    async fetchTasks({commit}){
      const response = await this.$axios.get("/tasks?sortBy=sort");
      commit("setTasks", response.data)
    },
    async addTask({commit}, task){
      const response = await this.$axios.post("/tasks", {title: task});
      commit("addNewTask", response)
    },
    async updateTask({commit}, task){
      await this.$axios.put(`/tasks/${task.id}`, task);
      commit("updateTask", task)
    },
    async deleteTask({commit}, id){
      await this.$axios.delete(`/tasks/${id}`);
      commit("removeTask", id)
    },
    async searchTask({commit}, task){
      const response = await this.$axios.get(`/tasks?search=${task}`);
      commit("setTasks", response.data)
    },
    async updateSortNumber({dispatch}, {dragTask, relatatedTask}){
      dispatch("updateTask", {...dragTask, sort: relatatedTask.sort});
      dispatch("updateTask", {...relatatedTask, sort: dragTask.sort});
    }

};

export const mutations = { 
    setTasks: (state, tasks) => (
        state.tasks = tasks
    ),
    
    addNewTask: (state, task) => state.tasks.unshift(task),

    updateTask: (state, task) => state.tasks = state.tasks.map((item) => 
      item.id === task.id ? task: item).sort((a, b) => a.sort - b.sort),

    removeTask: (state, id) => (
        state.tasks = state.tasks.filter(task => task.id !== id)
    ),
};
