<template>
  <div class="main">
    <Form
    @formSubmit="searchPackage"
    :disable-button="loading"
    />
    <b-alert v-model="showError" variant="danger" dismissible>
      Something went wrong!
    </b-alert>
    <b-modal id="modal-1" v-if="packageInfo" :title="packageInfo.name + ' ' + packageInfo.version">
      <p>Name: {{packageInfo.name}}</p>
      <p>Description: {{packageInfo.description}}</p>
      <p>Version: {{packageInfo.version}}</p>
      <a v-if="packageItems && packageItems.homepage" :href="packageItems.homepage" target="_blank">Click here to open website!</a>
      <div v-if="packageInfo.keywords" class="keywords">
        <p>Keywords:</p>
        <span
        v-for="item in packageInfo.keywords"
        :key="item"
        >
        {{item}}
        </span>
      </div>
      <div>
        <p v-if="packageInfo.author && packageInfo.author.name">Author name: {{packageInfo.author.name}}</p>
        <p v-if="packageInfo.author && packageInfo.author.email">Author email: {{packageInfo.author.email}}</p>
      </div>
    </b-modal>
    <vue-loaders-ball-spin-fade-loader v-if="loading"/>
    <b-list-group v-else-if="!loading && packageItems">
      <b-list-group-item
      v-for="item in items"
      :key="item._id"
      v-b-modal.modal-1
      @click="openModalWindow(item)"
      >
      <div class="list-group-item-top">
        <p v-if="item.name">Package name: {{item.name}}</p>
        <p v-if="item.version">v. {{item.version}}</p>
      </div>
      <div class="list-group-item-bottom">
        <p v-if="item.description">{{item.description}}</p>
        <div>
          <p v-if="item.author && item.author.name">{{item.author.name}}</p>
          <p v-if="item.author && item.author.email">{{item.author.email}}</p>
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
  name: 'ResultPage',
  data: () => ({
    loading:false,
    packageItems: null,
    page: 1,
    pageSize: 10,
    showError:false,
    pageCount: 0,
    allItems: [],
    packageInfo: null,
    items: [],
  }),
  components: {
    Form
  },
  computed: {
    ...mapGetters(['getPackages']),
  },
  methods:{
    ...mapActions(['getPackagesData']),
    searchPackage(query) {
      this.loading = true;
      this.packageItems = null;
      this.page = 1;
      this.allItems = [];
      this.getPackagesData(query).then(() => {
        this.packageItems = this.getPackages;
        this.showError = false;
        this.loading = false;
        this.setupPagination()
      }).catch(error => {
        console.log(error)
        this.loading = false;
        this.packageItems = null;
        this.showError = true;
        setTimeout(() => {
          this.showError = false;
        }, 2000)
      })
    },
    openModalWindow(item) {
      this.packageInfo = item;
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
  padding:  0 15px;
  width: 100%;
  margin:  0 auto;
}
a{
  display: block;
  margin-bottom: 1rem;
}
.keywords{
  display: flex;
  p{
    margin-right: 10px;
  }
  span{
    margin-right: 5px;
  }
}
</style>
