'use client';

import { TrashIcon } from 'lucide-react';

import { JavaScriptCodeEditor, JsonCodeEditor } from '@/src/components/code';
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
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
  Typography
} from '@/src/components/ui';

import type { UseExternalApiFormParams } from './hooks/useExternalApiForm';

import { EXTERNAL_API_SCHEMA_JSON_SCHEMA } from './constants/jsonSchema';
import { useExternalApiForm } from './hooks/useExternalApiForm';

const HTTP_METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];

type ExternalApiFormProps = UseExternalApiFormParams;

export const ExternalApiForm = (props: ExternalApiFormProps) => {
  const { state, form, fields, functions } = useExternalApiForm(props);

  return (
    <Form {...form}>
      <form onSubmit={functions.onSubmit}>
        <fieldset className='flex w-full flex-col space-y-6' disabled={state.loading}>
          <div className='flex gap-6'>
            <div className='border-border bg-card flex-1 space-y-4 rounded-lg border p-6'>
              <Typography variant='large'>General Information</Typography>
              <FormField
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder='CRM Users API' {...field} />
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
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        value={field.value ?? ''}
                        onChange={field.onChange}
                        placeholder='Describe what this API does and when it is used'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                name='description'
                control={form.control}
              />
            </div>

            <div className='border-border bg-card flex-1 space-y-4 rounded-lg border p-6 shadow-sm'>
              <Typography variant='large'>Parameters</Typography>
              <div className='space-y-3'>
                {fields.paramsFieldArray.fields.map((fieldItem, index) => (
                  <FormField
                    key={fieldItem.id}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Parameter {index + 1}</FormLabel>
                        <div className='flex gap-2'>
                          <FormControl>
                            <Input placeholder='userId' {...field} />
                          </FormControl>
                          {fields.paramsFieldArray.fields.length > 0 && (
                            <Button
                              type='button'
                              variant='destructive'
                              onClick={() => fields.paramsFieldArray.remove(index)}
                            >
                              <TrashIcon />
                              Remove
                            </Button>
                          )}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                    name={`params.${index}.name`}
                    control={form.control}
                  />
                ))}
              </div>
              <Button
                type='button'
                variant='secondary'
                onClick={() => fields.paramsFieldArray.append({ name: '' })}
              >
                Add parameter
              </Button>
            </div>
          </div>

          <div className='border-border bg-card space-y-4 rounded-lg border p-6 shadow-sm'>
            <Typography variant='large'>Endpoints</Typography>
            <div className='space-y-6'>
              {fields.endpointsFieldArray.fields.map((fieldItem, index) => (
                <div
                  key={fieldItem.id}
                  className='border-border/60 space-y-4 rounded-md border p-4'
                >
                  <div className='flex items-center justify-between'>
                    <Typography variant='small'>Endpoint {index + 1}</Typography>
                    {fields.endpointsFieldArray.fields.length > 0 && (
                      <Button
                        type='button'
                        variant='destructive'
                        onClick={() => fields.endpointsFieldArray.remove(index)}
                      >
                        <TrashIcon />
                        Remove
                      </Button>
                    )}
                  </div>
                  <div className='grid gap-4 md:grid-cols-2'>
                    <FormField
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>URL</FormLabel>
                          <FormControl>
                            <Input placeholder='https://example.com/api/users' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                      name={`endpoints.${index}.url`}
                      control={form.control}
                    />
                    <FormField
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Method</FormLabel>
                          <FormControl>
                            <Select value={field.value} onValueChange={field.onChange}>
                              <SelectTrigger className='w-[180px]'>
                                <SelectValue placeholder='Select endpoint method' />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  {HTTP_METHODS.map((httpMethod) => (
                                    <SelectItem key={httpMethod} value={httpMethod}>
                                      {httpMethod}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                      name={`endpoints.${index}.method`}
                      control={form.control}
                    />
                    <FormField
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Response alias</FormLabel>
                          <FormControl>
                            <Input placeholder='users' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                      name={`endpoints.${index}.responseName`}
                      control={form.control}
                    />
                    <FormField
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Timeout (ms)</FormLabel>
                          <FormControl>
                            <Input
                              min={0}
                              type='number'
                              value={field.value}
                              onChange={(event) => field.onChange(+event.target.value)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                      name={`endpoints.${index}.timeoutMs`}
                      control={form.control}
                    />
                  </div>
                  <FormField
                    render={({ field }) => (
                      <FormItem>
                        <div className='flex items-center gap-2'>
                          <FormControl>
                            <Checkbox
                              checked={Boolean(field.value)}
                              id='is-required'
                              onCheckedChange={(checked) => field.onChange(Boolean(checked))}
                            />
                          </FormControl>
                          <FormLabel htmlFor='is-required'>Required endpoint</FormLabel>
                        </div>
                      </FormItem>
                    )}
                    name={`endpoints.${index}.isRequired`}
                    control={form.control}
                  />
                </div>
              ))}
            </div>
            <Button
              type='button'
              variant='secondary'
              onClick={() =>
                fields.endpointsFieldArray.append({
                  url: '',
                  method: HTTP_METHODS[0],
                  responseName: '',
                  timeoutMs: 0,
                  isRequired: false
                })
              }
            >
              Add endpoint
            </Button>
          </div>

          <ResizablePanelGroup className='rounded-lg border shadow-sm' direction='horizontal'>
            <ResizablePanel defaultSize={50}>
              <div className='bg-card grow-0 basis-1/2 space-y-4 p-6'>
                <Typography variant='large'>Response Schema</Typography>
                <FormField
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <JsonCodeEditor
                          height='500px'
                          schema={EXTERNAL_API_SCHEMA_JSON_SCHEMA}
                          value={field.value}
                          onChange={field.onChange}
                          onUpdate={functions.onSchemaUpdate}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                  name='schema'
                  control={form.control}
                />
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={50}>
              <div className='bg-card grow-0 basis-1/2 space-y-4 p-6'>
                <Typography variant='large'>Response Mapping</Typography>

                <FormField
                  render={({ field }) => (
                    <FormItem>
                      <JavaScriptCodeEditor
                        height='500px'
                        value={field.value}
                        onChange={field.onChange}
                        onUpdate={functions.onMappingScriptUpdate}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                  name='mappingScript'
                  control={form.control}
                />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>

          <Button className='w-80 self-end' size='lg' type='submit' loading={state.loading}>
            {props.action === 'update' ? 'Сохранить' : 'Создать'}
          </Button>
        </fieldset>
      </form>
    </Form>
  );
};
