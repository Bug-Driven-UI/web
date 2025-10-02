import { postV1TextStyleGet } from '@/generated/api/admin/requests/bduiApi';
import { Typography } from '@/src/components/ui';

import { TextStyleForm } from '../(components)';

export const dynamic = 'force-dynamic';

interface TextStylePageParams {
  styleId: string;
}

interface TextStylePageProps {
  params: Promise<TextStylePageParams>;
}

const TextStyleUpdatePage = async (props: TextStylePageProps) => {
  const params = await props.params;
  const postV1TextStyleGetResponse = await postV1TextStyleGet({ data: { id: params.styleId } });
  const textStyle = postV1TextStyleGetResponse.data.textStyle;

  return (
    <div className='flex w-full flex-col items-center p-6'>
      <Typography className='text-center' tag='h1' variant='h1'>
        Обновление стиля текста
      </Typography>
      <div className='my-8 w-[700px]'>
        <TextStyleForm
          defaultValues={{
            ...textStyle,
            decoration: textStyle.decoration ?? 'regular',
            weight: textStyle.weight ?? 400,
            lineHeight: textStyle.lineHeight ?? 24
          }}
          styleId={params.styleId}
          action='update'
        />
      </div>
    </div>
  );
};

export default TextStyleUpdatePage;
