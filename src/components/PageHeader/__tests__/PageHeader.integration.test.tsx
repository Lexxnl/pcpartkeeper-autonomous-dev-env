import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PageHeader from '../../PageHeader';

describe('PageHeader Integration Tests', () => {
  it('renders basic page header', () => {
    render(
      <PageHeader>
        <div className='px-5 py-5'>
          <PageHeader.TitleArea>
            <PageHeader.Title>Test Page</PageHeader.Title>
          </PageHeader.TitleArea>
        </div>
      </PageHeader>
    );

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByText('Test Page')).toBeInTheDocument();
  });

  it('renders page header with description', () => {
    render(
      <PageHeader>
        <div className='px-5 py-5'>
          <PageHeader.TitleArea>
            <PageHeader.Title>Test Page</PageHeader.Title>
            <PageHeader.Description>This is a test page</PageHeader.Description>
          </PageHeader.TitleArea>
        </div>
      </PageHeader>
    );

    expect(screen.getByText('Test Page')).toBeInTheDocument();
    expect(screen.getByText('This is a test page')).toBeInTheDocument();
  });

  it('renders page header with actions', () => {
    const handleSave = jest.fn();
    const handleCancel = jest.fn();

    render(
      <PageHeader>
        <div className='px-5 py-5'>
          <div className='flex items-center justify-between'>
            <PageHeader.TitleArea>
              <PageHeader.Title>Test Page</PageHeader.Title>
            </PageHeader.TitleArea>
            <PageHeader.Actions>
              <button onClick={handleCancel}>Cancel</button>
              <button onClick={handleSave}>Save</button>
            </PageHeader.Actions>
          </div>
        </div>
      </PageHeader>
    );

    expect(screen.getByText('Test Page')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Save')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Save'));
    expect(handleSave).toHaveBeenCalled();

    fireEvent.click(screen.getByText('Cancel'));
    expect(handleCancel).toHaveBeenCalled();
  });

  it('renders page header with navigation', () => {
    render(
      <PageHeader>
        <div className='px-5 py-5'>
          <PageHeader.TitleArea>
            <PageHeader.Title>Test Page</PageHeader.Title>
          </PageHeader.TitleArea>
        </div>
        <PageHeader.Navigation>
          <nav>
            <a href='/home'>Home</a>
            <a href='/about'>About</a>
            <a href='/contact'>Contact</a>
          </nav>
        </PageHeader.Navigation>
      </PageHeader>
    );

    expect(screen.getByText('Test Page')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('renders page header with breadcrumbs', () => {
    render(
      <PageHeader>
        <div className='px-5 py-5'>
          <PageHeader.ContextArea>
            <PageHeader.Breadcrumbs>
              <a href='/'>Home</a>
              <span>/</span>
              <a href='/products'>Products</a>
              <span>/</span>
              <span>Current Page</span>
            </PageHeader.Breadcrumbs>
          </PageHeader.ContextArea>
          <PageHeader.TitleArea>
            <PageHeader.Title>Current Page</PageHeader.Title>
          </PageHeader.TitleArea>
        </div>
      </PageHeader>
    );

    expect(
      screen.getByRole('heading', { name: 'Current Page' })
    ).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
  });

  it('renders page header with visuals', () => {
    render(
      <PageHeader>
        <div className='px-5 py-5'>
          <PageHeader.TitleArea>
            <PageHeader.LeadingVisual>
              <div data-testid='leading-visual'>🎯</div>
            </PageHeader.LeadingVisual>
            <PageHeader.Title>Test Page</PageHeader.Title>
            <PageHeader.TrailingVisual>
              <div data-testid='trailing-visual'>⭐</div>
            </PageHeader.TrailingVisual>
          </PageHeader.TitleArea>
        </div>
      </PageHeader>
    );

    expect(screen.getByText('Test Page')).toBeInTheDocument();
    expect(screen.getByTestId('leading-visual')).toBeInTheDocument();
    expect(screen.getByTestId('trailing-visual')).toBeInTheDocument();
  });

  it('handles different variants', () => {
    const { rerender } = render(
      <PageHeader variant='default'>
        <div className='px-5 py-5'>
          <PageHeader.TitleArea>
            <PageHeader.Title>Default Variant</PageHeader.Title>
          </PageHeader.TitleArea>
        </div>
      </PageHeader>
    );

    expect(screen.getByText('Default Variant')).toBeInTheDocument();

    rerender(
      <PageHeader variant='elevated'>
        <div className='px-5 py-5'>
          <PageHeader.TitleArea>
            <PageHeader.Title>Elevated Variant</PageHeader.Title>
          </PageHeader.TitleArea>
        </div>
      </PageHeader>
    );

    expect(screen.getByText('Elevated Variant')).toBeInTheDocument();
  });

  it('handles different sizes', () => {
    const { rerender } = render(
      <PageHeader size='small'>
        <div className='px-5 py-5'>
          <PageHeader.TitleArea>
            <PageHeader.Title>Small Size</PageHeader.Title>
          </PageHeader.TitleArea>
        </div>
      </PageHeader>
    );

    expect(screen.getByText('Small Size')).toBeInTheDocument();

    rerender(
      <PageHeader size='large'>
        <div className='px-5 py-5'>
          <PageHeader.TitleArea>
            <PageHeader.Title>Large Size</PageHeader.Title>
          </PageHeader.TitleArea>
        </div>
      </PageHeader>
    );

    expect(screen.getByText('Large Size')).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(
      <PageHeader aria-label='Main page header'>
        <div className='px-5 py-5'>
          <PageHeader.TitleArea>
            <PageHeader.Title>Test Page</PageHeader.Title>
          </PageHeader.TitleArea>
        </div>
      </PageHeader>
    );

    const header = screen.getByRole('banner');
    expect(header).toHaveAttribute('aria-label', 'Main page header');
  });

  it('handles responsive design', () => {
    render(
      <PageHeader>
        <div className='px-5 py-5'>
          <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
            <PageHeader.TitleArea>
              <PageHeader.Title>Responsive Page</PageHeader.Title>
            </PageHeader.TitleArea>
            <PageHeader.Actions>
              <button>Action</button>
            </PageHeader.Actions>
          </div>
        </div>
      </PageHeader>
    );

    expect(screen.getByText('Responsive Page')).toBeInTheDocument();
    expect(screen.getByText('Action')).toBeInTheDocument();
  });

  it('handles keyboard navigation', () => {
    render(
      <PageHeader>
        <div className='px-5 py-5'>
          <div className='flex items-center justify-between'>
            <PageHeader.TitleArea>
              <PageHeader.Title>Test Page</PageHeader.Title>
            </PageHeader.TitleArea>
            <PageHeader.Actions>
              <button tabIndex={0}>Action 1</button>
              <button tabIndex={0}>Action 2</button>
            </PageHeader.Actions>
          </div>
        </div>
      </PageHeader>
    );

    const action1 = screen.getByText('Action 1');
    const action2 = screen.getByText('Action 2');

    expect(action1).toHaveAttribute('tabIndex', '0');
    expect(action2).toHaveAttribute('tabIndex', '0');
  });

  it('handles complex layout with all components', () => {
    render(
      <PageHeader>
        <div className='px-5 py-5'>
          <PageHeader.ContextArea>
            <PageHeader.Breadcrumbs>
              <a href='/'>Home</a>
              <span>/</span>
              <span>Current Page</span>
            </PageHeader.Breadcrumbs>
          </PageHeader.ContextArea>
          <div className='flex items-center justify-between'>
            <PageHeader.TitleArea>
              <PageHeader.LeadingVisual>
                <div>🎯</div>
              </PageHeader.LeadingVisual>
              <PageHeader.Title>Complex Page</PageHeader.Title>
              <PageHeader.Description>
                This is a complex page header
              </PageHeader.Description>
              <PageHeader.TrailingVisual>
                <div>⭐</div>
              </PageHeader.TrailingVisual>
            </PageHeader.TitleArea>
            <PageHeader.Actions>
              <button>Save</button>
              <button>Cancel</button>
            </PageHeader.Actions>
          </div>
        </div>
        <PageHeader.Navigation>
          <nav>
            <a href='/tab1'>Tab 1</a>
            <a href='/tab2'>Tab 2</a>
          </nav>
        </PageHeader.Navigation>
      </PageHeader>
    );

    expect(screen.getByText('Complex Page')).toBeInTheDocument();
    expect(
      screen.getByText('This is a complex page header')
    ).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Save')).toBeInTheDocument();
    expect(screen.getByText('Tab 1')).toBeInTheDocument();
  });
});
