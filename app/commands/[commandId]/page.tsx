import {
  postV1ApiGetByName,
  postV1CommandGet,
  postV1TemplateGetByName
} from '@/generated/api/admin/requests/bduiApi';
import { Typography } from '@/src/components/ui';

import { CommandForm } from '../(components)';

export const dynamic = 'force-dynamic';
interface ColorStylePageParams {
  commandId: string;
}

interface ColorStylePageProps {
  params: Promise<ColorStylePageParams>;
}

const ColorStyleUpdatePage = async (props: ColorStylePageProps) => {
  const params = await props.params;
  const postV1CommandGetResponse = await postV1CommandGet({ data: { id: params.commandId } });
  const postV1ApiGetByNameResponse = await postV1ApiGetByName({ data: {} });
  const postV1TemplateGetByNameResponse = await postV1TemplateGetByName({ data: {} });

  // todo remove after backend
  if (!postV1CommandGetResponse.command) {
    return null;
  }

  const defaultValues = {
    ...postV1CommandGetResponse.command,
    params: postV1CommandGetResponse.command.params?.map((param) => ({ name: param })) ?? [],
    apis:
      postV1CommandGetResponse.command.apis?.map((api) => ({
        ...api,
        params:
          api.params?.map((apiParam) => ({
            name: apiParam.name,
            value: apiParam.value
          })) ?? []
      })) ?? []
  };

  return (
    <div className='flex w-full flex-col items-center'>
      <Typography className='text-center' tag='h1' variant='h1'>
        Update Color Style
      </Typography>
      <div className='my-8 w-[1024px]'>
        <CommandForm
          apis={postV1ApiGetByNameResponse.data.apiNames}
          defaultValues={defaultValues}
          templates={postV1TemplateGetByNameResponse.data.templates}
          action='update'
          commandId={params.commandId}
        />
      </div>
    </div>
  );
};

export default ColorStyleUpdatePage;
