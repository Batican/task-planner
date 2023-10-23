export const state = () => ({
	users: []
})

export const getters = { 
    usersList: state => state.users
};

export const actions = { 
    async fetchUsers({commit}){
      const response = await this.$axios.get("/users");
      commit("setUsers", response.data)
    },
    async searchUser({commit}, user){
        const response = await this.$axios.get(`/users?search=${user}`);
        commit("setUsers", response.data)
      },
};

export const mutations = { 
    setUsers: (state, users) => (
        state.users = users
    ),
    
   
};
