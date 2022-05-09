export async function getSellerAll({ commit }, id) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(
        `${process.env.API_SETTING_SELLER}/seller/all_title/${id}`
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
        `${process.env.API_SETTING_SELLER}/seller/get_all_setting_seller/${id}`
      );

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
        `${process.env.API_SETTING_SELLER}/seller/get_all_setting_seller_upline/${id}`
      );

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}
export async function getAllunlimited(
  { commit },
  params = {
    typecategory_id: undefined,
    lottonumbertype_id: undefined,
    currentPage: undefined,
    limit: undefined,
    lotto_number: undefined
  }
) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(
        `${process.env.API_SETTING_SELLER}/seller/get_limited_number/${params.typecategory_id}&${params.lottonumbertype_id}`,
        {
          params: {
            currentPage: params.currentPage,
            limit: params.limit,
            lotto_number: params.lotto_number
          }
        }
      );

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
        `${process.env.API_SETTING_SELLER}/seller/limited_number/`,
        body
      );

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
        `${process.env.API_SETTING_SELLER}/seller/update_setting_seller/`,
        body
      );

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}
export async function deleteLimitnumber(
  { commit },
  params = {
    typecategory_id: undefined,
    lottonumbertype_id: undefined,
    lotto_number: undefined
  }
) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.delete(
        `${process.env.API_SETTING_SELLER}/seller/delete_limited_number/`,
        {
          typecategory_id: params.typecategory_id,
          lottonumbertype_id: params.lottonumbertype_id,
          lotto_number: params.lotto_number
        }
      );

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}
