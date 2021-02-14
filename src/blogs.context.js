import React, { createContext, useReducer, useRef, useContext } from 'react';
let postId = 16;
const context = createContext();

const posts = [{
    "id": 1,
    "text": "Money 💲 I am so happy that time I was there and I will be there at it and I will be there at the same time I don't have a car so I can get the money to you are you still looking for a job in your company and I have to go to the store and get some rest",
    "title": "How to make money",
},
{
    "id": 2,
    "text": "Love is the process for the single most of the time I get home I will send you the link to the video of the guy who was the first time I have ever seen a time to meet with me and I will be there at the same time I am so happy that regard to my parents for a while with 🤍",
    "title": "Love 💕",
},
{
    "id": 3,
    "text": "Oh so cool to see the house on the market for a new job and I have a few questions about the best way to get a hold of the guy who was the first time I have ever seen a week or so ago and I have a few questions about the best way to get a hold of the guy who was the first time I have ever seen a week or so ago and I have a few questions about the best way to get to a computer to do u even though I don't know how to stop 🛑",
    "title": "Coolness",
},{
    "id": 4,
    "text": "Money 💲 I am so happy that time I was there and I will be there at it and I will be there at the same time I don't have a car so I can get the money to you are you still looking for a job in your company and I have to go to the store and get some rest",
    "title": "How to make money",
},
{
    "id": 5,
    "text": "Love is the process for the single most of the time I get home I will send you the link to the video of the guy who was the first time I have ever seen a time to meet with me and I will be there at the same time I am so happy that regard to my parents for a while with 🤍",
    "title": "Love 💕",
},
{
    "id": 6,
    "text": "Oh so cool to see the house on the market for a new job and I have a few questions about the best way to get a hold of the guy who was the first time I have ever seen a week or so ago and I have a few questions about the best way to get a hold of the guy who was the first time I have ever seen a week or so ago and I have a few questions about the best way to get to a computer to do u even though I don't know how to stop 🛑",
    "title": "Coolness",
},{
    "id": 7,
    "text": "Money 💲 I am so happy that time I was there and I will be there at it and I will be there at the same time I don't have a car so I can get the money to you are you still looking for a job in your company and I have to go to the store and get some rest",
    "title": "How to make money",
},
{
    "id": 8,
    "text": "Love is the process for the single most of the time I get home I will send you the link to the video of the guy who was the first time I have ever seen a time to meet with me and I will be there at the same time I am so happy that regard to my parents for a while with 🤍",
    "title": "Love 💕",
},
{
    "id": 9,
    "text": "Oh so cool to see the house on the market for a new job and I have a few questions about the best way to get a hold of the guy who was the first time I have ever seen a week or so ago and I have a few questions about the best way to get a hold of the guy who was the first time I have ever seen a week or so ago and I have a few questions about the best way to get to a computer to do u even though I don't know how to stop 🛑",
    "title": "Coolness",
},{
    "id": 10,
    "text": "Money 💲 I am so happy that time I was there and I will be there at it and I will be there at the same time I don't have a car so I can get the money to you are you still looking for a job in your company and I have to go to the store and get some rest",
    "title": "How to make money",
},
{
    "id": 11,
    "text": "Love is the process for the single most of the time I get home I will send you the link to the video of the guy who was the first time I have ever seen a time to meet with me and I will be there at the same time I am so happy that regard to my parents for a while with 🤍",
    "title": "Love 💕",
},
{
    "id": 12,
    "text": "Oh so cool to see the house on the market for a new job and I have a few questions about the best way to get a hold of the guy who was the first time I have ever seen a week or so ago and I have a few questions about the best way to get a hold of the guy who was the first time I have ever seen a week or so ago and I have a few questions about the best way to get to a computer to do u even though I don't know how to stop 🛑",
    "title": "Coolness",
},{
    "id": 13,
    "text": "Money 💲 I am so happy that time I was there and I will be there at it and I will be there at the same time I don't have a car so I can get the money to you are you still looking for a job in your company and I have to go to the store and get some rest",
    "title": "How to make money",
},
{
    "id": 14,
    "text": "Love is the process for the single most of the time I get home I will send you the link to the video of the guy who was the first time I have ever seen a time to meet with me and I will be there at the same time I am so happy that regard to my parents for a while with 🤍",
    "title": "Love 💕",
},
{
    "id": 15,
    "text": "Oh so cool to see the house on the market for a new job and I have a few questions about the best way to get a hold of the guy who was the first time I have ever seen a week or so ago and I have a few questions about the best way to get a hold of the guy who was the first time I have ever seen a week or so ago and I have a few questions about the best way to get to a computer to do u even though I don't know how to stop 🛑",
    "title": "Coolness",
}]


const initialState = {
    posts: posts
}


const blogsReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case 'create_post': {
            let post;
            if (payload.newPost.id && (post = state.posts.find(post => post.id === payload.newPost.id))) {
                post.title = payload.newPost.title;
                post.text = payload.newPost.text;
                return {
                    ...state,
                    posts: [...state.posts]
                }
            }
            else {
                return {
                    ...state,
                    posts: state.posts.concat({ ...payload.newPost, id: postId++ })
                }
            }
        }
        case 'move_post': {
            return {
                ...state,
                posts: moveItem(state.posts, payload.from, payload.to)
            }
        }
        case 'delete_post': {
            return {
                ...state,
                posts: state.posts.filter(post => post.id !== payload.post.id)
            }
        }
        default:
            return state
    }
}

export const createPost = (newPost) => ({
    type: 'create_post',
    payload: {
        newPost
    }
})

export const movePost = (from, to) => ({
    type: 'move_post',
    payload: {
        from, to
    }
})

export const deletePost = (post) => ({
    type: 'delete_post',
    payload: {post}
})

export const BlogsProvider = ({ children }) => {

    const [state, dispatch] = useReducer(blogsReducer, initialState)

    const actions = useRef({
        createPost: (...params) => dispatch(createPost(...params)),
        movePost: (...params) => dispatch(movePost(...params)),
        deletePost: (...params) => dispatch(deletePost(...params)),
    })

    return <context.Provider value={{
        blogState: state, actions: actions.current
    }}>
        {children}
    </context.Provider>
}

export const useBlogsContext = () => useContext(context);


function moveItem(arr, from, to) {
    var f = arr.splice(from, 1)[0];
    arr.splice(to, 0, f);
    return [...arr]
}