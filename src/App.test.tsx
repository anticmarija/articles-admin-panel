import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import App from './App';

describe('renders header', () => {
  it('should display header title', () => {
    render(<App />);
    const linkElement = screen.getByText('Article Types Admin Panel');
    expect(linkElement).toBeInTheDocument();
  });
});

describe('table tests', () => {
  it('should display 5 items in the table', async () => {
    render(<App />);
    const tableBody = screen.getAllByRole('rowgroup')[1];
    await waitFor(() => {
      expect(tableBody.getElementsByClassName('ant-table-row').length).toBe(5);
      expect(screen.getByText('ADM')).toBeInTheDocument();
    });
  });

  it('should display next 5 items in the table when clicking on page 2', async () => {
    render(<App />);
    const tableBody = screen.getAllByRole('rowgroup')[1];
    await waitFor(() => {
      expect(tableBody.getElementsByClassName('ant-table-row').length).toBe(5);
      expect(screen.getByText('ADM')).toBeInTheDocument();
      expect(screen.queryByText('DSA')).not.toBeInTheDocument();
      const { getByText } = within(screen.getByRole('list'));
      const page2 = getByText('2');

      fireEvent.click(page2);

      expect(screen.queryByText('ADM')).not.toBeInTheDocument();
      expect(screen.getByText('DSA')).toBeInTheDocument();
    });
  });

  it('should display 2 items when searching for "DS"', async () => {
    render(<App />);
    const tableBody = screen.getAllByRole('rowgroup')[1];
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'DS' } });

    waitFor(() => {
      expect(tableBody.getElementsByClassName('ant-table-row').length).toBe(2);
      expect(screen.getByText('DSA')).toBeInTheDocument();
      expect(screen.getByText('DS2')).toBeInTheDocument();
    });
  });

  it('should sort types descending when clicking twice on ID sort', async () => {
    render(<App />);
    const tableBody = screen.getAllByRole('rowgroup')[1];

    waitFor(() => {
      const ID = screen.getByText('ID');
      expect(tableBody.getElementsByClassName('ant-table-row').length).toBe(5);
      expect(screen.queryByText('22')).not.toBeInTheDocument();
      fireEvent.click(ID);
      fireEvent.click(ID);
      expect(screen.getByText('22')).toBeInTheDocument();
    });
  });

  it('should display only 1 item when filtering by not active', async () => {
    render(<App />);
    const tableBody = screen.getAllByRole('rowgroup')[1];

    waitFor(() => {
      const filterIcon = screen.getAllByRole('img')[1];
      fireEvent.click(filterIcon);

      const { getByText } = within(screen.getByRole('menu'));
      const filterButton = getByText('No');
      const OkButton = getByText('OK');

      fireEvent.click(filterButton);
      fireEvent.click(OkButton);

      expect(tableBody.getElementsByClassName('ant-table-row').length).toBe(1);
      expect(screen.queryByText('22')).toBeInTheDocument();
    });
  });
});
