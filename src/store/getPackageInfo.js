import Axios from 'axios'
export default {
  state: {
    packageInfo: null,
  },
  mutations: {
    setPackage(state, packageInfo) {
        state.package = packageInfo;
    },
  },
  actions: {
      getPackage: async (context, name) => {
        const obj = name;
        let {data} = await Axios.get(`https://cors-anywhere.herokuapp.com/https://registry.npmjs.org/${obj.name}/${obj.version}`).catch(error => console.log(error));
        context.commit('setPackage', data);
      },
  },
  getters: {
    getPackageInfo: (state) => state.packageInfo,
  },
};
