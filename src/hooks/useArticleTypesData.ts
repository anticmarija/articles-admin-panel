import { useEffect, useState } from 'react';
import { fetchArticleTypes } from '../api/fetchArticleTypes';
import { ArticleType } from '../types';
import useDebounce from './useDebounce';

const useArticleTypesData = (searchText: string) => {
  const [articleTypesData, setArticleTypesData] = useState<ArticleType[]>();
  const [articleTypesDataFiltered, setArticleTypesDataFiltered] = useState<ArticleType[]>();
  const [loading, setLoading] = useState<boolean>(true);

  const debouncedSearchText = useDebounce(searchText, 500);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const data = await fetchArticleTypes();
      setArticleTypesData(data);
      setArticleTypesDataFiltered(data);

      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (debouncedSearchText) {
      onSearch(debouncedSearchText);
    } else {
      setArticleTypesDataFiltered(articleTypesData);
    }
  }, [debouncedSearchText]);

  const onSearch = (value: string): void => {
    const valueLowerCase = value.toLowerCase();

    const filtered = articleTypesData?.filter(
      (articleType: ArticleType) =>
        articleType.acronym.toLowerCase().includes(valueLowerCase) ||
        articleType.titleDE.toLowerCase().includes(value) ||
        articleType.defaultBrand.name.toLowerCase().includes(value),
    );

    setArticleTypesDataFiltered(filtered);
  };

  return { data: articleTypesDataFiltered, loading };
};

export default useArticleTypesData;
