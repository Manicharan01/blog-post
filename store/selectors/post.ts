import { selector } from 'recoil';
import { postState, Post } from '@/store/atoms/post';

export const postSelector = selector<Post>({
    key: 'postSelector',
    get: ({ get }) => {
        return get(postState)
    }
})
