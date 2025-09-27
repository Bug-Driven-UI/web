import { Typography } from '@/src/components/ui';

import { ExternalApiForm } from '../(components)';

const ExternalApisCreatePage = () => {
  return (
    <div>
      <Typography className='text-center' tag='h1' variant='h1'>
        Create External API
      </Typography>
      <div className='my-8'>
        <ExternalApiForm action='create' />
      </div>
    </div>
  );
};

export default ExternalApisCreatePage;
