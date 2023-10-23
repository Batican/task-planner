<template>
     <b-input-group class="h-full">
          <b-input-group-prepend is-text>
            <slot></slot>
          </b-input-group-prepend>
          <b-form-input 
            class="h-full"
            type="text" 
            size="sm" 
            v-model="title"
            @keypress.enter="onEnter" 
            :placeholder="placeholder"
          />
        </b-input-group>
</template>
<script>
export default {
  props: ['placeholder'],
  data (){
    return {
      title: ''
    }
  },
  methods: {

    onEnter () {
      if (this.title) {
        this.$emit('onEnter', this.title);
        this.title = '';
      }
    }
  },
}
</script>