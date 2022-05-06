//Lotto set hash//
export async function loginWithMemberHash(context, token) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = token;

      // let response = await this.$axios.post(
      //   `${process.env.API_LOTTO_LAUNCHGAME}/auth/user/hash`,
      //   token
      // );
      // context.commit("set_hash", response.data.hash);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}
//Lotto set hash//
export async function login(context, { username, password }) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.post(
        `${process.env.API_LOTTO_LAUNCHGAME}/auth/user/hash`,
        {
          username,
          password
        }
      );
      context.commit("set_hash", response.data.hash);
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
        `${process.env.API_LOTTO_LAUNCHGAME}/auth/user/token/${params.hash}`,
        {
          ip: "192.168.1.1"
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
export async function changePassword(context, password) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.patch(
        `${process.env.API_LOTTO_LAUNCHGAME}/users/reset-password`,
        {
          password: password
        }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}
