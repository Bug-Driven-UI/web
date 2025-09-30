import { Typography } from '@/src/components/ui';

import { ColorStyleForm } from '../(components)';

export const dynamic = 'force-dynamic';

const ColorStyleCreatePage = () => {
  return (
    <div className='flex w-full flex-col items-center p-6'>
      <Typography className='text-center' tag='h1' variant='h1'>
        Create Color Style
      </Typography>
      <div className='my-8 w-[500px]'>
        <ColorStyleForm action='create' />
      </div>
    </div>
  );
};

export default ColorStyleCreatePage;
