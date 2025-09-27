import { zodResolver } from '@hookform/resolvers/zod';
import { useIsMutating } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useFieldArray, useForm } from 'react-hook-form';

import type { CommandUpdateRequestData } from '@/generated/api/admin/models';

import {
  usePostV1CommandSave,
  usePutV1CommandUpdate
} from '@/generated/api/admin/requests/bduiApi';
import { ROUTES } from '@/src/utils/constants';

import type { CommandSchema } from '../constants/commandSchema';

import { commandSchema } from '../constants/commandSchema';

export type UseCommandFormParams =
  | {
      action: 'create';
      onSuccessSubmit?: () => void;
    }
  | {
      action: 'update';
      commandId: string;
      defaultValues: CommandSchema;
      onSuccessSubmit?: () => void;
    };

const DEFAULT_COMMAND_VALUES: CommandSchema = {
  apis: [],
  params: [],
  name: ''
};

export const useCommandForm = (params: UseCommandFormParams) => {
  const router = useRouter();
  const mutating = !!useIsMutating();

  const postV1CommandSaveMutation = usePostV1CommandSave();
  const putV1CommandUpdateMutation = usePutV1CommandUpdate();

  const commandForm = useForm<CommandSchema>({
    resolver: zodResolver(commandSchema),
    mode: 'onSubmit',
    defaultValues: params.action === 'update' ? params.defaultValues : DEFAULT_COMMAND_VALUES
  });

  const paramsFieldArray = useFieldArray({
    control: commandForm.control,
    name: 'params'
  });

  const apisFieldArray = useFieldArray({
    control: commandForm.control,
    name: 'apis'
  });

  const onSubmit = commandForm.handleSubmit(async (values) => {
    const payload: CommandUpdateRequestData['command'] = {
      ...values,
      params: values.params.map((value) => value.name)
    };

    if (params.action === 'update') {
      await putV1CommandUpdateMutation.mutateAsync({
        data: {
          data: {
            id: params.commandId,
            command: payload
          }
        }
      });
      router.push(ROUTES.MAIN);
      params.onSuccessSubmit?.();

      return;
    }

    await postV1CommandSaveMutation.mutateAsync({ data: payload });
    router.push(ROUTES.MAIN);
    params.onSuccessSubmit?.();
  });

  const loading = mutating || commandForm.formState.isSubmitting;

  return {
    state: { loading },
    form: commandForm,
    fields: {
      paramsFieldArray,
      apisFieldArray
    },
    functions: { onSubmit }
  };
};
