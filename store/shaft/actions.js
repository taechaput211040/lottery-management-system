export async function getSellerAll({ commit }) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(`/sellapi/api/seller/all_title`);

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}
export async function getDiscont({ commit }, id) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(
        `/sellapi/api/seller/all_get_setting_outcomerate/${id}`
      );

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}
export async function getSelfrecieve({ commit }, id) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(
        `/sellapi/api/seller/all_get_setting_selfreclive/${id}`
      );

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}
export async function getOutcomerate({ commit }, id) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(
        `/sellapi/api/seller/all_get_discount/${id}`
      );

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}
