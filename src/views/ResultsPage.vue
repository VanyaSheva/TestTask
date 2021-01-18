<template>
  <div class="main">
    <Form
    @formSubmit="searchPackage"
    :disable-button="loading"
    />
    <b-alert v-model="showError" variant="danger" dismissible>
      Something went wrong!
    </b-alert>
    <vue-loaders-ball-spin-fade-loader v-if="loading"/>
    <b-list-group v-else-if="!loading && packageItems">
      <b-list-group-item
      v-for="item in items"
      :key="item._id"
      @click="openModalWindow(item.version)"
      >
      <div class="list-group-item-top">
        <p>Package name: {{item.name}}</p>
        <p>v. {{item._npmVersion}}</p>
      </div>
      <div class="list-group-item-bottom">
        <p>{{item.description}}</p>
        <div>
          <p>{{item.author.name}}</p>
          <p>{{item.author.email}}</p>
        </div>
      </div>
      </b-list-group-item>
    </b-list-group>
    <Paginate
      v-if="allItems.length > 1"
      v-model="page"
      :page-count="pageCount"
      :click-handler="pageChangeHandler"
      :prev-text="''"
      :next-text="''"
      :prev-class="'prev'"
      :next-class="'next'"
      :break-view-class="'break'"
      :container-class="'pagination'"
    />

  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Form from '../components/Form'

export default {
  name: 'HelloWorld',
  data: () => ({
    loading:false,
    packageItems: null,
    page: 1,
    pageSize: 10,
    showError:false,
    pageCount: 0,
    allItems: [],
    searchQuery: null,
    packageInfo: null,
    items: [],
  }),
  components: {
    Form
  },
  computed: {
    ...mapGetters(['getPackages', 'getPackageInfo']),
  },
  methods:{
    ...mapActions(['getPackagesData', 'getPackage']),
    searchPackage(query) {
      this.loading = true;
      this.searchQuery = query;
      this.packageItems = null;
      this.allItems = [];
      this.getPackagesData(query).then(() => {
        this.packageItems = this.getPackages;
        this.showError = false;
        this.loading = false;
        this.setupPagination()
      }).catch(error => {
        console.log(error)
        this.loading = false;
        this.showError = true;
        setTimeout(() => {
          this.showError = false;
        }, 2000)
      })
    },
    openModalWindow(version) {
      this.getPackage({ name:this.searchQuery, version }).then(() => {
        this.packageInfo = this.getPackageInfo;
      })
    },
    setupPagination() {
      let arr = [];
      for(let version in this.packageItems.versions){
        arr.push(this.packageItems.versions[version]);
      }
      this.allItems = arr.reduce((acc, c) => {
      if (acc[acc.length - 1].length === this.pageSize) {
        acc.push([]);
      }
      acc[acc.length - 1].push(c);
        return acc;
      }, [[]]);
      this.pageCount = this.allItems.length;
      this.items = this.allItems[this.page - 1] || this.allItems[0];
      },
      pageChangeHandler(page) {
        this.items = this.allItems[page - 1];
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      },
  },
}
</script>

<style lang='scss'>
.main{
  max-width: 1200px;
  width: 100%;
  margin:  0 auto;
}
</style>
