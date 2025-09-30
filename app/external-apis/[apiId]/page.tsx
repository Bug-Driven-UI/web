import { postV1ApiGet } from '@/generated/api/admin/requests/bduiApi';
import { Typography } from '@/src/components/ui';

import { ExternalApiForm } from '../(components)';

export const dynamic = 'force-dynamic';

interface ExternalApiPageParams {
  apiId: string;
}

interface ExternalApiPageProps {
  params: Promise<ExternalApiPageParams>;
}

const ExternalApiPage = async (props: ExternalApiPageProps) => {
  const params = await props.params;
  const postV1GetAPIResponse = await postV1ApiGet({ data: { apiId: params.apiId } });
  const externalApi = postV1GetAPIResponse.data.api;

  let schema: string | undefined;

  try {
    schema = externalApi.schema ? JSON.stringify(externalApi.schema, null, 2) : undefined;
  } catch {
    schema = undefined;
  }

  return (
    <div className='p-6'>
      <Typography className='text-center' tag='h1' variant='h1'>
        Update External API
      </Typography>
      <div className='my-8'>
        <ExternalApiForm
          defaultValues={{
            ...externalApi,
            params: externalApi.params.map((param) => ({ name: param })),
            schema
          }}
          apiId={params.apiId}
          action='update'
        />
      </div>
    </div>
  );
};

export default ExternalApiPage;
