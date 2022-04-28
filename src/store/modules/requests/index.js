import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

export default {
    namespaced: true,       // prevent merging this module globally
    state() {
        return {
            requests: []
        };
    },
    mutations,
    actions,
    getters
};