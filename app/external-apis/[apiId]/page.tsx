import { postV1ApiGet } from '@/generated/api/admin/requests/bduiApi';
import { Typography } from '@/src/components/ui';

import { ExternalApiForm } from '../(components)';

interface ExternalApiPageParams {
  apiId: string;
}

interface ExternalApiPageProps {
  params: Promise<ExternalApiPageParams>;
}

const ExternalApiPage = async (props: ExternalApiPageProps) => {
  const params = await props.params;
  const postV1GetAPIResponse = await postV1ApiGet({ data: { apiId: params.apiId } });
  const externalApi = postV1GetAPIResponse.api;

  return (
    <div>
      <Typography className='text-center' tag='h1' variant='h1'>
        Update External API
      </Typography>
      <div className='my-8'>
        <ExternalApiForm
          defaultValues={{
            ...externalApi,
            params: externalApi.params.map((param) => ({ name: param })),
            schema: externalApi.schema ? JSON.stringify(externalApi.schema, null, 2) : undefined
          }}
          apiId={params.apiId}
          action='update'
        />
      </div>
    </div>
  );
};

export default ExternalApiPage;
