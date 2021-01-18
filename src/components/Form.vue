<template>
  <b-form @submit.prevent="onSubmit" @reset="onReset" class="form">
    <b-form-group
      id="input-group-1"
      label="Package name:"
      label-for="input-1"
      description="Enter package name to find information about it"
    >
    <b-form-input
      id="input-1"
      v-model="searchQuery"
      type="search"
      placeholder="Enter package name:"
      required
    ></b-form-input>
    </b-form-group>
    <div class="form-button-group">
      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </div>
  </b-form>
</template>

<script>

export default {
  name: 'searchForm',
  props:['loading'],
  data: () => ({
    searchQuery: null,
    disable:false,
  }),
  methods:{
    onSubmit() {
      if(this.disable){
        return;
      }
      this.$emit('formSubmit', this.searchQuery.toLowerCase());
      this.disable = true;
      setTimeout(() => {
        this.disable = false;
      }, 2000)
    },
    onReset() {
      this.searchQuery = null;
    }
  },
}
</script>