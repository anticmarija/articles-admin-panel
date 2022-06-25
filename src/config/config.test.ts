import { getArticleTypesBrands } from './';
import articleTypes from '../mocks/article-types.json';

const articleTypesSlice = articleTypes.slice(0, 3);

describe('getArticleTypesBrands', () => {
  it('remove duplicated brands', () => {
    expect(getArticleTypesBrands(articleTypesSlice)).toEqual([
      {
        text: 'HappyshopsGeneral',
        value: 'HappyshopsGeneral',
      },
      {
        text: 'HappyshopsEvents',
        value: 'HappyshopsEvents',
      },
    ]);
  });
});
