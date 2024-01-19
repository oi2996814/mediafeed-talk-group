import { initStore } from "./store";

const configureStore = () => {
  const actions = {

    SET_GROUPCREATORINFOLIST: (state, payload) => {
      return {
        // ...state,
        groupStore: {
          ...state.groupStore,
          groupCreatorInfoList: payload
        }
      };
    },
    SET_GROUPCREATORIMAGEURLS: (state, payload) => {
      return {
        // ...state,
        groupStore: {
          ...state.groupStore,
          groupCreatorImageUrls: payload
        }
      };
    },
    // SET_I18NEXT: (state, payload) => {
    //   return { 
    //     notification: state.notification,
    //     i18n: payload,
    //   }
    // }
  };

  initStore(actions, {
    groupStore: {
      groupCreatorInfoList: [],
      groupCreatorImageUrls: [],
    }
  });
};

export default configureStore;
