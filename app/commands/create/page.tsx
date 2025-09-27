import {
  postV1ApiGetByName,
  postV1TemplateGetByName
} from '@/generated/api/admin/requests/bduiApi';
import { Typography } from '@/src/components/ui';

import { CommandForm } from '../(components)';

const CommandsCreatePage = async () => {
  const postV1ApiGetByNameResponse = await postV1ApiGetByName({ data: {} });
  const postV1TemplateGetByNameResponse = await postV1TemplateGetByName({ data: {} });

  return (
    <div className='flex flex-col items-center'>
      <Typography className='text-center' tag='h1' variant='h1'>
        Create Command
      </Typography>
      <div className='my-8 w-[1024px]'>
        <CommandForm
          apis={postV1ApiGetByNameResponse.data.apiNames}
          templates={postV1TemplateGetByNameResponse.data.templates}
          action='create'
        />
      </div>
    </div>
  );
};

export default CommandsCreatePage;
