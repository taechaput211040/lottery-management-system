//Lotto Type : get//
export async function getLottotype({ commit }) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(`/api/LottoType/get`);
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
}
