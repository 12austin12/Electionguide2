import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';

describe('App Components', () => {
  it('renders the layout header securely', () => {
    render(
      <AppProvider>
        <BrowserRouter>
          <Layout>
            <div>Test</div>
          </Layout>
        </BrowserRouter>
      </AppProvider>
    );
    
    // Verify header exists
    expect(screen.getByText(/Election Guide/i)).toBeInTheDocument();
  });
});
