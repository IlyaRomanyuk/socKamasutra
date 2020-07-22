import profileReducer, { addPostActionCreator } from "./profile-reducer";
import React from 'react';

let state = {
    posts: [
        { id: '1', post: 'Hi, it is my first post', likeCount: '15' },
        { id: '2', post: 'Like you', likeCount: '7' },
        { id: '3', post: 'Hello', likeCount: '13' }
    ]
}

it(`we added new post`, () => {
    let action = addPostActionCreator('I love Dasha Grishina');

    let newState = profileReducer(state, action);

    expect(newState.posts[3].post).toBe('I love Dasha Grishina');
})

it(`change array of post`, () => {
    let action = addPostActionCreator('I love Dasha Grishina');

    let newState = profileReducer(state, action);

    expect(newState.posts.length).toBe(4);
})