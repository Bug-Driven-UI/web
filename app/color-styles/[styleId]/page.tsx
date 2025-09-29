import { postV1ColorStyleGet } from '@/generated/api/admin/requests/bduiApi';
import { Typography } from '@/src/components/ui';

import { ColorStyleForm } from '../(components)';

export const dynamic = 'force-dynamic';

interface ColorStylePageParams {
  styleId: string;
}

interface ColorStylePageProps {
  params: Promise<ColorStylePageParams>;
}

const ColorStyleUpdatePage = async (props: ColorStylePageProps) => {
  const params = await props.params;
  const postV1ColorStyleGetResponse = await postV1ColorStyleGet({ data: { id: params.styleId } });

  return (
    <div className='flex w-full flex-col items-center'>
      <Typography className='text-center' tag='h1' variant='h1'>
        Update Color Style
      </Typography>
      <div className='my-8 w-[500px]'>
        <ColorStyleForm
          defaultValues={postV1ColorStyleGetResponse.colorStyle}
          styleId={params.styleId}
          action='update'
        />
      </div>
    </div>
  );
};

export default ColorStyleUpdatePage;
