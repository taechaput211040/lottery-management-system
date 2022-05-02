export async function getTypelottoAll({ commit }) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(
        `https://sm-lotto.com/v1alpha/lotto/setting_flex_odd/api/flex_odd/all_lottotype`
      );

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}
export async function getCategoryflexbyid({ commit }, id) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(
        `https://sm-lotto.com/v1alpha/lotto/setting_flex_odd/api/flex_odd/all_title/${id}`
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
        `https://sm-lotto.com/v1alpha/lotto/setting_flex_odd/api/flex_odd/all_outcomrate_getsetting/${id}`
      );

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}
export async function getOutcomerateUplined({ commit }, id) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(
        `https://sm-lotto.com/v1alpha/lotto/setting_flex_odd/api/flex_odd/all_outcomrate_getsetting_upline/${id}`
      );

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}
export async function updateFlexOutcomerate({ commit }, body) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.patch(
        `https://sm-lotto.com/v1alpha/lotto/setting_flex_odd/api/flex_odd/update/outcomerate`,
        body
      );

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}
export async function setflexoddProfit({ commit }, body) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.patch(
        `https://sm-lotto.com/v1alpha/lotto/setting_flex_odd/api/flex_odd/update/flex_odd_lotto`,
        {
          flex_odd_lotto: parseFloat(body.flexodd),
          profit: parseFloat(body.profit)
        }
      );

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

export async function getPerflex({ commit }) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(
        `https://sm-lotto.com/v1alpha/lotto/setting_flex_odd/api/flex_odd/get_per_flex`
      );

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

export async function getMaxLoss({ commit }) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(
        `https://sm-lotto.com/v1alpha/lotto/setting/api/setting_type/get_max_profit_lost`
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

export async function configMaxLoss({ commit }, payload) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.patch(
        `https://sm-lotto.com/v1alpha/lotto/setting/api/setting_type/update_max_profit_lost`,
        {
          max_profit_lost: payload
        }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}
