//Lotto set hash//
export async function login(context, { username, password }) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.post(
        `https://sm-lotto.com/v1alpha/lotto/lotto_launchgame/api/auth/user/hash`,
        {
          username,
          password
        }
      );
      context.commit("set_hash", response.data);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}
//Lotto get token//
export async function gettoken(context, params) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.patch(
        `https://sm-lotto.com/v1alpha/lotto/lotto_launchgame/api/auth/user/token/${params.hash}`,
        {
          ip: params.ip
        }
      );
      if (response.status == 200) {
        context.commit("set_login", response.data);
       
        resolve(response);
      }
    } catch (error) {
      reject(error);
    }
  });
}
