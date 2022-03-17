export async function getSellerAll({ commit }, id) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(
        `https://kong-api-kdz5uqbpia-as.a.run.app/v1alpha/lotto/lotto_setting_seller/api/seller/all_title/${id}`
      );

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}
export async function getAllsettingseller({ commit }, id) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(
        `https://kong-api-kdz5uqbpia-as.a.run.app/v1alpha/lotto/lotto_setting_seller/api/seller/get_all_setting_seller/${id}`
      );
      console.log(response);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}
export async function getAllsettingUpline({ commit }, id) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(
        `https://kong-api-kdz5uqbpia-as.a.run.app/v1alpha/lotto/lotto_setting_seller/api/seller/get_all_setting_seller_upline/${id}`
      );
      console.log(response);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}
export async function getAllunlimited({ commit }, params) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(
        `https://kong-api-kdz5uqbpia-as.a.run.app/v1alpha/lotto/lotto_setting_seller/api/seller/get_limited_number/${params.typecategory_id}&${params.lottonumbertype_id}`
      );
      console.log(response);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

export async function Addlimited({ commit }, body) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.patch(
        `https://kong-api-kdz5uqbpia-as.a.run.app/v1alpha/lotto/lotto_setting_seller/api/seller/limited_number/`,
        body
      );
      console.log(response);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

export async function updateSettingseller({ commit }, body) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.patch(
        `https://kong-api-kdz5uqbpia-as.a.run.app/v1alpha/lotto/lotto_setting_seller/api/seller/update_setting_seller/`,
        body
      );
      console.log(response);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}
