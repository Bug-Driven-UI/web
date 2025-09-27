import { postV1TextStyleGet } from '@/generated/api/admin/requests/bduiApi';
import { Typography } from '@/src/components/ui';

import { TextStyleForm } from '../(components)';

interface TextStylePageParams {
  styleId: string;
}

interface TextStylePageProps {
  params: Promise<TextStylePageParams>;
}

const TextStyleUpdatePage = async (props: TextStylePageProps) => {
  const params = await props.params;
  const postV1TextStyleGetResponse = await postV1TextStyleGet({ data: { id: params.styleId } });
  const textStyle = postV1TextStyleGetResponse.textStyle;
  // todo remove after backend
  if (!textStyle) {
    return null;
  }

  return (
    <div className='flex w-full flex-col items-center'>
      <Typography className='text-center' tag='h1' variant='h1'>
        Update Text Style
      </Typography>
      <div className='my-8 w-[700px]'>
        <TextStyleForm
          defaultValues={{
            ...textStyle,
            weight: textStyle.weight ?? 400
          }}
          styleId={params.styleId}
          action='update'
        />
      </div>
    </div>
  );
};

export default TextStyleUpdatePage;
