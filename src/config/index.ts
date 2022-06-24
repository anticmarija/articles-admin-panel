import { ColumnsType } from 'antd/lib/table';
import { ArticleType, GroupOrDefaultShippingStatusOrDefaultBrandOrDefaultDropshipper } from '../types';

const sortByParam = (a: ArticleType, b: ArticleType, param: keyof ArticleType): 0 | 1 | -1 => {
  const first = a[param];
  const second = b[param];

  if (!first || !second) return 0;

  if (first < second) {
    return -1;
  }

  if (first > second) {
    return 1;
  }
  return 0;
};

const getArticleTypesBrands = (data: ArticleType[] | undefined): { text: string; value: string }[] => {
  const defaultBrandsSet = new Set(data?.map((article) => article.defaultBrand.name));
  return Array.from(defaultBrandsSet).map((brandLabel: string) => ({
    text: brandLabel,
    value: brandLabel,
  }));
};

export const getColumns = (data: ArticleType[] | undefined): ColumnsType<ArticleType> => [
  {
    title: 'ID',
    dataIndex: 'id',
    sorter: (a: ArticleType, b: ArticleType) => sortByParam(a, b, 'id'),
    width: '20%',
    responsive: ['md', 'lg'],
  },
  {
    title: 'Acronym',
    dataIndex: 'acronym',
    sorter: (a: ArticleType, b: ArticleType) => sortByParam(a, b, 'acronym'),
    width: '20%',
  },
  {
    title: 'Title DE',
    dataIndex: 'titleDE',
    width: '20%',
    sorter: (a: ArticleType, b: ArticleType) => sortByParam(a, b, 'titleDE'),
  },
  {
    title: 'Default Brand',
    dataIndex: 'defaultBrand',
    render: (brand: GroupOrDefaultShippingStatusOrDefaultBrandOrDefaultDropshipper) => brand.name,
    width: '20%',
    responsive: ['md', 'lg'],
    filterMode: 'tree',
    filters: getArticleTypesBrands(data),
    onFilter: (value: string | number | boolean, record: ArticleType) => record.defaultBrand.name === value,
  },
  {
    title: 'Active',
    dataIndex: 'isActive',
    render: (isActive: boolean) => (isActive ? 'Yes' : 'No'),
    width: '20%',
    responsive: ['md', 'lg'],
    filters: [
      {
        text: 'Yes',
        value: true,
      },
      {
        text: 'No',
        value: false,
      },
    ],
    onFilter: (value: string | number | boolean, record: ArticleType) => record.isActive === value,
  },
];
