// Setting Seller Lotto API
export async function getYeekeesetting({ commit }) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(
        `${process.env.API_SETTING_YEEKEE}/yeekee/setting`
      );

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}


export async function updateYeekeeSetting({ commit }, body) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.put(
        `${process.env.API_SETTING_YEEKEE}/yeekee/setting/`,
        body
      );

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}
