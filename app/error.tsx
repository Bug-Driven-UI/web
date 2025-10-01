'use client';

import { useEffect } from 'react';

import { Button } from '@/src/components/ui';

const Error = ({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
      <Button variant='secondary' onClick={reset}>
        Try again
      </Button>
    </div>
  );
};

export default Error;
