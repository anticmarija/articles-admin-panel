import { Layout, PageHeader } from 'antd';

import './App.css';
import AdminTable from './components/AdminTable/AdminTable';

const App = (): JSX.Element => (
  <Layout className="at-layout">
    <Layout.Header>
      <PageHeader className="at-page-header" title="Article Types Admin Panel" />
    </Layout.Header>
    <Layout.Content className="at-content">
      <AdminTable />
    </Layout.Content>
    <Layout.Footer className="at-footer">&copy;2022 - Created by M.A.</Layout.Footer>
  </Layout>
);

export default App;
