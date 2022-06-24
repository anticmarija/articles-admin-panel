import { ArticleType } from '../types';
import articleTypes from '../mocks/article-types.json';

export const fetchArticleTypes = (): Promise<ArticleType[]> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(articleTypes);
    }, 500);
  });
