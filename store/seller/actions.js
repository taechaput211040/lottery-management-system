// Setting Seller Lotto API
export async function getAllsetting({ commit }) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(
        `${process.env.API_LOTTO_SETTING}/ManageLotto/get_typecategory_self`
      );

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

export async function getSettingByPage(
  { commit },
  params = {
    currentPage: undefined,
    limit: undefined,
    title: undefined,
    self_status: undefined
  }
) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(
        `${process.env.API_LOTTO_SETTING}/ManageLotto/get_typecategory_self`,
        {
          params: {
            currentPage: params.currentPage,
            limit: params.limit,
            title: params.title,
            self_status: params.self_status
          }
        }
      );

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

export async function changeStaussetting({ commit }, body) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.patch(
        `${process.env.API_LOTTO_SETTING}/ManageLotto/update_lotto_self`,
        {
          typecategory_id: body.id,
          status: body.self_status
        }
      );

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}
export async function changeStausDownline({ commit }, body) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.patch(
        `${process.env.API_LOTTO_SETTING}/ManageLotto/update_lotto_dowline`,
        body
      );

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}
// /api/ManageLotto/update_lotto
export async function getLottoDownline({ commit }) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(
        `${process.env.API_LOTTO_SETTING}/ManageLotto/get_member`
      );

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

export async function getLottoDownlineFilter(
  { commit },
  params = {
    currentPage: undefined,
    limit: undefined,
    username: undefined
  }
) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(
        `${process.env.API_LOTTO_SETTING}/ManageLotto/get_member`,
        {
          params: {
            currentPage: params.currentPage,
            limit: params.limit,
            username: params.username
          }
        }
      );

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

export async function getTypeByUser({ commit }, username) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(
        `${process.env.API_LOTTO_SETTING}/ManageLotto/get_typecategory_by_user/${username}`,
        {
          params: {
            currentPage: 1,
            limit: 1000
          }
        }
      );

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

// ประเภทการแทง
export async function gettypeByalluser({ commit }) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(
        `${process.env.API_LOTTO_SETTING}/setting_type/get_purchasetype_all_users`
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}
export async function changeStausType({ commit }, body) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.patch(
        `${process.env.API_LOTTO_SETTING}/setting_type/update_purchasetype`,
        {
          username: body.username,
          flex_odd: body.flex_odd,
          seller: body.seller
        }
      );

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}
export async function recieveSellertofull({ state, commit }, context) {
  return new Promise(async (resolve, reject) => {
    console.log(state, "store");
    if (!state.balance_top) {
      try {
        let response = await this.$axios.get(
          `${process.env.API_SETTING_SELLER}/seller/get_balance_top?currentPage=1&limit=15`
        );
        commit("set_topseller", response.data);
        resolve(response);
      } catch (error) {
        reject(error);
      }
    } else {
      console.log("havestate");
    }
  });
}
export async function getLimitNumber({  state, commit }, context) {
  return new Promise(async (resolve, reject) => {
   
    if (!state.balance_top) {
      try {
        let response = await this.$axios.get(
          `${process.env.API_SETTING_SELLER}/seller/get_all_limit`
        );
   
        resolve(response.data);
      } catch (error) {
        reject(error);
      }
    } else {
      console.log("havestate");
    }
  });
}
