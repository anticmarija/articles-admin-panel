import { Input, Table } from 'antd';
import type { TablePaginationConfig, TableProps } from 'antd/lib/table';
import { useState } from 'react';
import { getColumns } from '../../config';
import useArticleTypesData from '../../hooks/useArticleTypesData';
import { ArticleType } from '../../types';

import './AdminTable.css';

const AdminTable = (): JSX.Element => {
  const [searchText, setSearchText] = useState('');
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 5,
  });

  const { data, loading } = useArticleTypesData(searchText);

  const columns = getColumns(data);

  const onChange: TableProps<ArticleType>['onChange'] = (pagination): void => {
    setPagination(pagination);
  };

  return (
    <>
      <Input.Search
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
        dataSource={data}
        pagination={pagination}
        loading={loading}
        onChange={onChange}
      />
    </>
  );
};

export default AdminTable;
