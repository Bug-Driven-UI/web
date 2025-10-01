'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ExternalLinkIcon, TrashIcon } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import type { APINamesResponseSuccessDataApiNamesItem } from '@/generated/api/admin/models';

import {
  Button,
  Checkbox,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Typography
} from '@/src/components/ui';
import { ROUTES } from '@/src/utils/constants';
import { useScreenContext } from '@/src/utils/contexts/screen';

import type { ScreenSchema } from './screenSchema';

import { ApiParamsFieldArray } from '../ApiParamsFieldArray/ApiParamsFieldArray';
import { screenSchema } from './screenSchema';

interface ScreenPanelMainTabProps {
  availableApis: APINamesResponseSuccessDataApiNamesItem[];
}

const DEFAULT_FORM_VALUES: ScreenSchema = {
  name: '',
  isProduction: false,
  navigationParams: [],
  apis: []
};

export const ScreenPanelMainTab = ({ availableApis }: ScreenPanelMainTabProps) => {
  const params = useParams<{ screenId: string }>();
  const screenContext = useScreenContext();
  const form = useForm<ScreenSchema>({
    resolver: zodResolver(screenSchema),
    mode: 'onSubmit',
    defaultValues: DEFAULT_FORM_VALUES
  });

  const navigationParamsFieldArray = useFieldArray({
    control: form.control,
    name: 'navigationParams'
  });

  const apisFieldArray = useFieldArray({
    control: form.control,
    name: 'apis'
  });

  const onSubmit = form.handleSubmit((values) => {
    screenContext.updateApis(values.apis);
    screenContext.updateName(values.name);
    screenContext.updateVersion(values.isProduction);
    screenContext.updateScreenNavigationParams(values.navigationParams.map((p) => p.name));
    toast.success('Screen data updated locally');
  });

  return (
    <Form {...form}>
      <form className='h-[400px] space-y-6' onSubmit={onSubmit}>
        <div className='space-y-2'>
          <Typography variant='small'>Screen name</Typography>
          <FormField
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder='My Home Screen' {...field} value={field.value ?? ''} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            name='name'
            control={form.control}
          />
        </div>

        {!!screenContext.versions.length && (
          <div className='flex items-end gap-4'>
            <FormField
              render={({ field }) => (
                <FormItem className='flex gap-3'>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      id='isProduction'
                      onCheckedChange={(checked) => field.onChange(checked === true)}
                    />
                  </FormControl>
                  <FormLabel htmlFor='isProduction'>Make current version production</FormLabel>
                </FormItem>
              )}
              name='isProduction'
              control={form.control}
            />
          </div>
        )}

        {!!screenContext.versions.length && (
          <div>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder='Select API' />
              </SelectTrigger>
              <SelectContent>
                {screenContext.versions.map((version) => (
                  <Link
                    href={`${ROUTES.SCREENS.$ID(params.screenId)}?version=${version.id}`}
                    key={version.id}
                  >
                    <SelectItem value={version.id}>
                      v{version.version} ({version.isProduction && 'prod'})
                      <ExternalLinkIcon className='size-4' />
                    </SelectItem>
                  </Link>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <div className='border-border bg-card space-y-4 rounded-lg border p-6 shadow-sm'>
          <div className='space-y-2'>
            <Typography variant='large'>Navigation Parameters</Typography>
            <Typography variant='muted'>Define inputs required to open this screen.</Typography>
          </div>

          <div className='space-y-3'>
            {navigationParamsFieldArray.fields.length === 0 && (
              <Typography variant='muted'>No navigation params yet.</Typography>
            )}
            {navigationParamsFieldArray.fields.map((fieldItem, index) => (
              <FormField
                key={fieldItem.id}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='sr-only'>Navigation parameter {index + 1}</FormLabel>
                    <div className='flex gap-2'>
                      <FormControl>
                        <Input placeholder='userId' {...field} value={field.value ?? ''} />
                      </FormControl>
                      <Button
                        type='button'
                        variant='destructive'
                        onClick={() => navigationParamsFieldArray.remove(index)}
                      >
                        <TrashIcon className='size-4' /> Remove
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
                name={`navigationParams.${index}.name`}
                control={form.control}
              />
            ))}
          </div>
          <Button
            type='button'
            variant='secondary'
            onClick={() => navigationParamsFieldArray.append({ name: '' })}
          >
            Add param
          </Button>
        </div>

        <div className='space-y-4'>
          <div>
            <Typography className='mb-1' variant='small'>
              Required APIs
            </Typography>
            <Typography variant='muted'>
              Configure API dependencies and request parameters.
            </Typography>
          </div>

          <div className='space-y-4'>
            {apisFieldArray.fields.length === 0 && (
              <Typography variant='muted'>No APIs linked yet.</Typography>
            )}
            {apisFieldArray.fields.map((fieldItem, index) => (
              <div key={fieldItem.id} className='border-border/60 space-y-4 rounded-md border p-4'>
                <div className='flex items-center justify-between'>
                  <Typography variant='small'>Dependency {index + 1}</Typography>
                  <Button
                    type='button'
                    variant='destructive'
                    onClick={() => apisFieldArray.remove(index)}
                  >
                    <TrashIcon className='size-4' /> Remove
                  </Button>
                </div>
                <div className='grid gap-4 md:grid-cols-2'>
                  <FormField
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>API alias</FormLabel>
                        <FormControl>
                          <Input placeholder='crmApi' {...field} value={field.value ?? ''} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                    name={`apis.${index}.alias`}
                    control={form.control}
                  />
                  <FormField
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>API</FormLabel>
                        <FormControl>
                          <Select value={field.value || undefined} onValueChange={field.onChange}>
                            <SelectTrigger>
                              <SelectValue placeholder='Select API' />
                            </SelectTrigger>
                            <SelectContent>
                              {availableApis.map((apiOption) => (
                                <SelectItem key={apiOption.id} value={apiOption.id}>
                                  {apiOption.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                    name={`apis.${index}.id`}
                    control={form.control}
                  />
                </div>
                <ApiParamsFieldArray apiIndex={index} control={form.control} />
              </div>
            ))}
          </div>

          <Button
            type='button'
            variant='secondary'
            onClick={() => apisFieldArray.append({ alias: '', id: '', params: [] })}
          >
            Add API dependency
          </Button>
        </div>

        <Button className='w-40' type='submit'>
          Save changes locally
        </Button>
      </form>
    </Form>
  );
};
