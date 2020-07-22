import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";

let store = {
    _state: {
        dialogsPage: {
            dialogs: [
                { id: "1", name: "Dasha" },
                { id: "2", name: "Ilya" },
                { id: "3", name: "Tanya" },
                { id: "4", name: "Sveta" },
                { id: "5", name: "Dima" }
            ],

            messages: [
                { id: "1", message: "Hello" },
                { id: "2", message: "What is your name ?" },
                { id: "3", message: "My name is Dasha" }
            ],
            newMessageText: ''
        },
        profilePage: {
            posts: [
                { id: '1', post: 'Hi, it is my first post', likeCount: '15' },
                { id: '2', post: 'Like you', likeCount: '7' },
                { id: '3', post: 'Hello', likeCount: '13' }
            ],
            newPostText: 'KAMASUTRA'
        }
    },
    _rerenderTree() {
        console.log('jjj');
    },

    getState() {
        return this._state
    },
    subscriber(observer) {
        this._rerenderTree = observer;
    },


    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);

        this._rerenderTree(this._state);
    }

}

export default store