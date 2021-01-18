import Axios from 'axios'
export default {
  state: {
    packages: null,
  },
  mutations: {
    setPackages(state, packages) {
        state.packages = packages;
    },
  },
  actions: {
      getPackagesData: async (context, name) => {
        let {data} = await Axios.get(`https://registry.npmjs.org/${name}`).catch(error => console.log(error));
        context.commit('setPackages', data);
      },
  },
  getters: {
    getPackages: (state) => state.packages,
  },
};
