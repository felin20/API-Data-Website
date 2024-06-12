import React from 'react';
import { Page, Card, DataTable } from '@shopify/polaris';

const MyDataTable = () => {
  const rows = [];

  return (
    <Page title="Product List">
      <Card>
        <DataTable
          columnContentTypes={[
            'image',
            'text',
            'text',
            'numeric',
          ]}
          headings={[
            'Image',
            'Title',
            'Category',
            'Price',
          ]}
          rows={rows}
        />
      </Card>
    </Page>
  );
};

export default MyDataTable;
