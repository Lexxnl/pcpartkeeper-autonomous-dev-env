import React from 'react';
import PageHeader from './src/components/PageHeader';

function TestPageHeader() {
  return (
    <div>
      <h1>PageHeader Test</h1>
      <PageHeader role='banner' aria-label='Test Header'>
        <div className='px-5 py-5'>
          <PageHeader.TitleArea variant='large'>
            <PageHeader.Title as='h1'>Test Title</PageHeader.Title>
          </PageHeader.TitleArea>
        </div>
      </PageHeader>
    </div>
  );
}

export default TestPageHeader;
