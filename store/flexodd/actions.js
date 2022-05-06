export async function getTypelottoAll({ commit }) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(
        `${process.env.API_SETTING_FLEX_ODD}/flex_odd/all_lottotype`
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
        `${process.env.API_SETTING_FLEX_ODD}/flex_odd/all_title/${id}`
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
        `${process.env.API_SETTING_FLEX_ODD}/flex_odd/all_outcomrate_getsetting/${id}`
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
        `${process.env.API_SETTING_FLEX_ODD}/flex_odd/all_outcomrate_getsetting_upline/${id}`
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
        `${process.env.API_SETTING_FLEX_ODD}/flex_odd/update/outcomerate`,
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
        `${process.env.API_SETTING_FLEX_ODD}/flex_odd/update/flex_odd_lotto`,
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
        `${process.env.API_SETTING_FLEX_ODD}/flex_odd/get_per_flex`
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
        `${process.env.API_LOTTO_SETTING}/setting_type/get_max_profit_lost`
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
        `${process.env.API_LOTTO_SETTING}/setting_type/update_max_profit_lost`,
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
