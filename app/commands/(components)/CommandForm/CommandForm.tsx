'use client';

import { TrashIcon } from 'lucide-react';

import type {
  APINamesResponseSuccess,
  TemplatesByNameResponseSuccess
} from '@/generated/api/admin/models';

import {
  Button,
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
  Textarea,
  Typography
} from '@/src/components/ui';

import type { UseCommandFormParams } from './hooks/useCommandForm';

import { ApiParamFieldArray } from './components/ApiParamFieldArray/ApiParamFieldArray';
import { useCommandForm } from './hooks/useCommandForm';

type CommandFormProps = UseCommandFormParams & {
  apis: APINamesResponseSuccess['data']['apiNames'];
  templates: TemplatesByNameResponseSuccess['data']['templates'];
};

export const CommandForm = (props: CommandFormProps) => {
  const { state, form, fields, functions } = useCommandForm(props);

  return (
    <Form {...form}>
      <form onSubmit={functions.onSubmit}>
        <fieldset className='flex w-full flex-col space-y-6' disabled={state.loading}>
          <div className='flex flex-col gap-6 lg:flex-row'>
            <div className='border-border bg-card flex-1 space-y-4 rounded-lg border p-6 shadow-sm'>
              <Typography variant='large'>General Information</Typography>
              <FormField
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder='Generate Report' {...field} value={field.value ?? ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                name='name'
                control={form.control}
              />
              <FormField
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Item template</FormLabel>
                    <FormControl>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder='Select required API' />
                        </SelectTrigger>
                        <SelectContent>
                          {props.templates.map((template) => (
                            <SelectItem key={template.id} value={template.id}>
                              {template.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                name='itemTemplate'
                control={form.control}
              />
              <FormField
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fallback message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='Message displayed when command fails'
                        {...field}
                        value={field.value ?? ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                name='fallbackMessage'
                control={form.control}
              />
            </div>

            <div className='border-border bg-card flex-1 space-y-4 rounded-lg border p-6 shadow-sm'>
              <Typography variant='large'>Command Parameters</Typography>
              <div className='space-y-3'>
                {fields.commandParamsFieldArray.fields.map((fieldItem, index) => (
                  <FormField
                    key={fieldItem.id}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Parameter {index + 1}</FormLabel>
                        <div className='flex gap-2'>
                          <FormControl>
                            <Input placeholder='userId' {...field} value={field.value ?? ''} />
                          </FormControl>
                          <Button
                            disabled={state.loading}
                            type='button'
                            variant='destructive'
                            onClick={() => fields.commandParamsFieldArray.remove(index)}
                          >
                            <TrashIcon />
                            Remove
                          </Button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                    name={`commandParams.${index}.name`}
                    control={form.control}
                  />
                ))}
              </div>
              <Button
                disabled={state.loading}
                type='button'
                variant='secondary'
                onClick={() => fields.commandParamsFieldArray.append({ name: '' })}
              >
                Add parameter
              </Button>
            </div>
          </div>

          <div className='border-border bg-card space-y-4 rounded-lg border p-6 shadow-sm'>
            <Typography variant='large'>Required APIs</Typography>
            <div className='space-y-6'>
              {fields.apisFieldArray.fields.map((fieldItem, apiFieldIndex) => (
                <div
                  key={fieldItem.id}
                  className='border-border/60 space-y-4 rounded-md border p-4'
                >
                  <div className='flex items-center justify-between'>
                    <Typography variant='small'>Dependency {apiFieldIndex + 1}</Typography>
                    <Button
                      disabled={state.loading}
                      type='button'
                      variant='destructive'
                      onClick={() => fields.apisFieldArray.remove(apiFieldIndex)}
                    >
                      <TrashIcon />
                      Remove
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
                      name={`apis.${apiFieldIndex}.apiAlias`}
                      control={form.control}
                    />
                    <FormField
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>API</FormLabel>
                          <FormControl>
                            <Select
                              value={field.value ? field.value : undefined}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder='Select required API' />
                              </SelectTrigger>
                              <SelectContent>
                                {props.apis.map((api) => (
                                  <SelectItem key={api.id} value={api.id}>
                                    {api.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                      name={`apis.${apiFieldIndex}.apiName`}
                      control={form.control}
                    />
                  </div>
                  <ApiParamFieldArray apiFieldIndex={apiFieldIndex} />
                </div>
              ))}
            </div>
            <Button
              disabled={state.loading}
              type='button'
              variant='secondary'
              onClick={() =>
                fields.apisFieldArray.append({ apiAlias: '', apiName: '', apiParams: [] })
              }
            >
              Add API dependency
            </Button>
          </div>

          <Button className='w-80 self-end' size='lg' type='submit' loading={state.loading}>
            {props.action === 'update' ? 'Сохранить' : 'Создать'}
          </Button>
        </fieldset>
      </form>
    </Form>
  );
};
