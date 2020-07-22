const SEND_MESSAGE = 'SEND_MESSAGE';

let initialState = {
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
    ]
}

let dialogsReducer = (state = initialState, action) => {

    switch (action.type) {

        case SEND_MESSAGE: {
            let stateCopy = { ...state };
            stateCopy.messages = [...state.messages];
            stateCopy.messages.push({ id: "4", message: action.message });
            return stateCopy;
        }

        default:
            return state
    }
}

export const addMessageCreator = (message) => ({ type: SEND_MESSAGE, message });

export default dialogsReducer