<template>
	<div :class="`task ${task.is_done ? 'is-complete' : ''}`">
		<b-form-checkbox size="sm" 
			v-model="payload.is_done"
			:value= "true"
			:unchecked-value="false"

		/>
		<div class="content">{{ task.title }}</div>
		<div class="buttons">
			<b-dropdown class="dropdown" size="sm"  variant="link" toggle-class="text-decoration-none" no-caret>
				<template #button-content>
					<b-avatar  size="2rem" :src="task.assignee?.avatar?? ''"></b-avatar>
				</template>
				<label class="dropdown-search">
					<font-awesome-icon icon="search" class="dropdown-search-icon" />
					<b-input v-model="search" style="padding-left: 30px" placeholder="Search"></b-input>
				</label>
				<b-dropdown-divider></b-dropdown-divider>
				<div v-for="user in this.usersList">
					<b-dropdown-item @click="assignUser(user)" :active="user.id === task.assignee.id"><b-avatar  size="2rem" :src="user.avatar?? ''"></b-avatar> {{ user.name }}</b-dropdown-item>
				</div>
			</b-dropdown>
			<font-awesome-icon @click="onChangeImportant" :class="`${task.is_important ? 'is-important' : ''}`" icon="star" />
			<font-awesome-icon class="delete" @click="onRemoveTask(task.id)" icon="trash" />
		</div>
	</div>
</template>

<script>
    import { mapActions, mapGetters } from "vuex";
	import _ from 'lodash';

export default {
	props: ['task'],

	data(vm) {
      return {
        payload : {
			is_done: vm.task.is_done,
			is_important: vm.task.is_important
		},
		search : '' 

      }
    },

	watch : {
		'payload.is_done': {
			handler(val) {
				this.updateTask({...this.task,is_done: val})
			}
		},
		'task.is_done': {
			immediate: true,
			handler(val) {
				this.payload.is_done = val
			}
		},
		search(val) {
			this.checkSearchStr(val)
		}
	},
	methods: {
		...mapActions('tasks', [ "deleteTask", "updateTask"]),
		...mapActions('users', [ "fetchUsers", "searchUser"]),

		async onRemoveTask(taskID) {
			const isConfirmed =  await this.$confirm()
			if (isConfirmed) {
				this.deleteTask(taskID)
			}
		},

		onChangeImportant(){
			this.updateTask({...this.task,is_important: !this.task.is_important})
		},

		assignUser(user) {
			this.updateTask({...this.task, assignee: user})
		},

		checkSearchStr: _.throttle(function(string) {
			this.searchUser(string)
		}, 2000),

	},

	computed: {
		...mapGetters('users', ["usersList"]),
	},
		
	mounted(){
		this.fetchUsers();
	},
}
</script>
