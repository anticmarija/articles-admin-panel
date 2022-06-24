import { useEffect, useState } from 'react';
import { Table, Layout, PageHeader, Input } from 'antd';
import type { TablePaginationConfig, TableProps } from 'antd/lib/table';

import { ArticleType } from './types';
import { fetchArticleTypes } from './api/fetchArticleTypes';
import useDebounce from './hooks/useDebounce';
import { getColumns } from './config';
import './App.css';

const { Search } = Input;

const App = (): JSX.Element => {
  const [articleTypesData, setArticleTypesData] = useState<ArticleType[]>();
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 5,
  });

  const [articleTypesDataFiltered, setArticleTypesDataFiltered] = useState<ArticleType[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [searchText, setSearchText] = useState('');

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

  const onChange: TableProps<ArticleType>['onChange'] = (pagination): void => {
    setPagination(pagination);
  };

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

  const columns = getColumns(articleTypesData);

  return (
    <Layout className="at-layout">
      <Layout.Header>
        <PageHeader className="at-page-header" title="Article Types Admin Panel" />
      </Layout.Header>
      <Layout.Content className="at-content">
        {/* TODO create separate component */}
        <Search
          className="at-search"
          allowClear
          placeholder="Search acronyms, title or brand"
          onChange={(event) => {
            setSearchText(event.target.value);
          }}
        />
        <Table
          className="at-table"
          columns={columns}
          rowKey={(record) => record.id}
          dataSource={articleTypesDataFiltered}
          pagination={pagination}
          loading={loading}
          onChange={onChange}
        />
      </Layout.Content>
      <Layout.Footer className="at-footer">&copy;2022 - Created by M.A.</Layout.Footer>
    </Layout>
  );
};

export default App;
