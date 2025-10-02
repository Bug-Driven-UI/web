import { Typography } from '@/src/components/ui';

import { TextStyleForm } from '../(components)';

export const dynamic = 'force-dynamic';

const TextStyleCreatePage = () => {
  return (
    <div className='flex w-full flex-col items-center p-6'>
      <Typography className='text-center' tag='h1' variant='h1'>
        Создание стиля текста
      </Typography>
      <div className='my-8 w-[500px]'>
        <TextStyleForm action='create' />
      </div>
    </div>
  );
};

export default TextStyleCreatePage;
