import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import getID from '../utils/getid'
import store from '../store/store'

export interface ITag {
    text: string
    id: number
}

interface TagsState {
    tags: ITag[]
}

const genGetID = getID(100)

export const initTags: TagsState = {
    tags: [
        { text: 'TypeScript', id: genGetID.next().value },
        { text: 'React', id: genGetID.next().value },
        { text: 'CSS', id: genGetID.next().value },
        { text: 'Node', id: genGetID.next().value },
        { text: 'ECMAScript', id: genGetID.next().value },
        { text: 'JavaScript уроки', id: genGetID.next().value },
        { text: 'уроки для начинающих', id: genGetID.next().value },
        { text: 'javascript собеседование', id: genGetID.next().value },
        { text: 'typescript vs javascript', id: genGetID.next().value },
        { text: 'React интернет магазин', id: genGetID.next().value },
        { text: 'JavaScript', id: genGetID.next().value },
        { text: 'верстка сайта для начинающих', id: genGetID.next().value },
        { text: 'CSS за час', id: genGetID.next().value },
        { text: 'ООП простыми словами', id: genGetID.next().value },
        { text: 'node js что это', id: genGetID.next().value },
    ],
}

const initialState: TagsState = {
    tags: [],
}

export const tagsSlice = createSlice({
    name: 'tagList',
    initialState,
    reducers: {
        setTags: (state, action: PayloadAction<string>) => {
            if (action.payload) {
                let tags: string[]

                if (action.payload.includes(', ')) tags = action.payload.split(', ')
                else tags = action.payload.split('\n')

                state.tags = tags.map((tagText): ITag => {
                    return { text: tagText.trim(), id: genGetID.next().value }
                })
            }
        },
        addTags: (state, action: PayloadAction<string>) => {
            if (action.payload) {
                const tags = action.payload.split(', ')
                const newTags = tags.map((tagText): ITag => {
                    return { text: tagText, id: genGetID.next().value }
                })
                state.tags = [...state.tags, ...newTags]
            }
        },
        removeTag: (state, action: PayloadAction<number>) => {
            const id = action.payload
            const newTags = state.tags.filter((tag) => tag.id !== id)
            state.tags = newTags
        },
        clearTags: (state) => {
            state.tags = []
        },
        sortTags: (state) => {
            state.tags.sort((a, b) => a.text.localeCompare(b.text))
        },
        sortLenTags: (state) => {
            state.tags.sort((a, b) => a.text.length - b.text.length)
        },
        removeDupTags: (state, action: PayloadAction<boolean>) => {
            const seen = new Set()
            // state.tags = state.tags.filter((tag) => {
            //     // const reduxStore = store.getState()
            //     // let text
            //     // if (reduxStore.settings.CaseSensitive) text = tag.text.toLocaleLowerCase()
            //     // else text = tag.text
            //     const text = tag.text.toLocaleLowerCase()

            //     const duplicate = seen.has(text)
            //     if (!duplicate) seen.add(text)
            //     return !duplicate
            // })
            const CaseSensitive = action.payload
            const newState = []
            for (let i = state.tags.length - 1; i >= 0; i--) {
                const tag = state.tags[i]
                let text
                if (CaseSensitive) text = tag.text.toLocaleLowerCase()
                else text = tag.text
                const duplicate = seen.has(text)
                if (!duplicate) {
                    seen.add(text)
                    newState.unshift(tag)
                }
            }
            state.tags = newState
        },
        filterInTags: (state, action: PayloadAction<string>) => {
            state.tags = state.tags.filter((tag) =>
                tag.text.toLocaleLowerCase().includes(action.payload)
            )
        },
        filterOutTags: (state, action: PayloadAction<string>) => {
            state.tags = state.tags.filter(
                (tag) => !tag.text.toLocaleLowerCase().includes(action.payload)
            )
        },
        resetTags: () => {
            return initTags
        },
        loadTags: (state, action: PayloadAction<TagsState>) => {
            return (state = action.payload)
        },
    },
})

export const {
    setTags,
    removeTag,
    addTags,
    clearTags,
    sortTags,
    sortLenTags,
    removeDupTags,
    filterInTags,
    filterOutTags,
    resetTags,
    loadTags,
} = tagsSlice.actions
export default tagsSlice.reducer
