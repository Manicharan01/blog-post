import { atom } from 'recoil'

export interface Post {
    id: string;
    title: string;
    content: string;
    category: string;
    tags: [];
    createdAt: Date;
    updatedAt: Date;
    userId: string;
}

export const postState = atom<Post>({
    key: 'postState',
    default: {
        id: '',
        title: '',
        content: '',
        category: '',
        tags: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: ''
    }
})
