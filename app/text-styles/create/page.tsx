import { Typography } from '@/src/components/ui';

import { TextStyleForm } from '../(components)';

const TextStyleCreatePage = () => {
  return (
    <div className='flex w-full flex-col items-center'>
      <Typography className='text-center' tag='h1' variant='h1'>
        Create Color Style
      </Typography>
      <div className='my-8 w-[500px]'>
        <TextStyleForm action='create' />
      </div>
    </div>
  );
};

export default TextStyleCreatePage;
