//Lotto set hash//
export async function login(context, { username, password }) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.post(`/apilogin/api/auth/user/hash`, {
        username,
        password
      });
      context.commit("set_hash", response.data);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}
//Lotto get token//
export async function gettoken(context, hash) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.patch(
        `/apilogin/api/auth/user/token/${hash}`,
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