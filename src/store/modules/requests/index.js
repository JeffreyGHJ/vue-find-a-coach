import mutations from "./mutations";
import actions from "./actions";

export default {
    namespaced: true,       // prevent merging this module globally
    state() {
        return {
            requests: []
        };
    },
    mutations,
    actions
};