import { useEffect, useState } from 'react';
import { Table, Layout, PageHeader } from 'antd';
import type { ColumnsType, TablePaginationConfig, TableProps } from 'antd/lib/table';
import './App.css';

import articleTypes from './mocks/article-types.json';
import { ArticleType, GroupOrDefaultShippingStatusOrDefaultBrandOrDefaultDropshipper } from './types';

const fakeApiCall = (): Promise<ArticleType[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(articleTypes);
    }, 500);
  });
};

const App = () => {
  const [articleTypesData, setArticleTypesData] = useState<ArticleType[] | undefined>();

  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 5,
  });

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const data = await fakeApiCall();

      setArticleTypesData(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  const onChange: TableProps<ArticleType>['onChange'] = (pagination) => {
    setPagination(pagination);
  };

  const columns: ColumnsType<ArticleType> = [
    {
      title: 'ID',
      dataIndex: 'id',
      sorter: (a, b) => {
        if (a.id < b.id) {
          return -1;
        }
        if (a.id > b.id) {
          return 1;
        }
        return 0; //TODO refactor
      },
      width: '20%',
      responsive: ['md', 'lg'],
    },
    {
      title: 'Acronym',
      dataIndex: 'acronym',
      sorter: (a, b) => {
        if (a.acronym.toLowerCase() < b.acronym.toLowerCase()) {
          return -1;
        }
        if (a.acronym.toLowerCase() > b.acronym.toLowerCase()) {
          return 1;
        }
        return 0; //TODO refactor
      },
      width: '20%',
      filterMode: 'tree',
      filterSearch: true,
    },
    {
      title: 'Title DE',
      dataIndex: 'titleDE',
      width: '20%',
      sorter: (a, b) => {
        if (a.titleDE.toLowerCase() < b.titleDE.toLowerCase()) {
          return -1;
        }
        if (a.titleDE.toLowerCase() > b.titleDE.toLowerCase()) {
          return 1;
        }
        return 0;
      },
    },
    {
      title: 'Default Brand',
      dataIndex: 'defaultBrand',
      render: (brand: GroupOrDefaultShippingStatusOrDefaultBrandOrDefaultDropshipper) => brand.name,
      width: '20%',
      responsive: ['md', 'lg'],
      filterMode: 'tree',
      filterSearch: true,
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
      onFilter: (value: string | number | boolean, record) => record.isActive === value,
    },
  ];

  console.log('articleTypesData:', articleTypesData);

  return (
    <Layout className="at-layout">
      <Layout.Header>
        <PageHeader className="at-page-header" title="Article Types Admin Panel" />
      </Layout.Header>
      <Layout.Content className="at-content">
        <Table
          className="at-table"
          columns={columns}
          rowKey={(record) => record.id}
          dataSource={articleTypesData}
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
