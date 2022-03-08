// Setting Seller Lotto API
export async function getAllsetting({ commit }) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(
        `/settinglottoapi/api/ManageLotto/get_typecategory_self`
      );
      console.log(response);
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
        `/settinglottoapi/api/ManageLotto/update_lotto`,
        {
          typecategory_id: body.id,
          status: body.self_status
        }
      );
      console.log(response);
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
        `/settinglottoapi/api/ManageLotto/update_lotto_dowline`,
        body
      );
      console.log(response);
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
        `/settinglottoapi/api/ManageLotto/get_member`
      );
      console.log(response);
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
        `/settinglottoapi/api/ManageLotto/get_typecategory_by_user/${username}`
      );
      console.log(response);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}
