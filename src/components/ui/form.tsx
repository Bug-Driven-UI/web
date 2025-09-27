'use client';

import type { ReactNode } from 'react';
import type { ControllerProps, FieldPath, FieldValues } from 'react-hook-form';

import { Slot } from '@radix-ui/react-slot';
import * as React from 'react';
import { Controller, FormProvider, useFormContext } from 'react-hook-form';

import { cn } from '@/src/utils/helpers';

interface FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  name: TName;
}

const FormFieldContext = React.createContext<FormFieldContextValue | undefined>(undefined);
const FormItemContext = React.createContext<{ id: string } | undefined>(undefined);

const useFormField = () => {
  const fieldContext = React.use(FormFieldContext);
  const itemContext = React.use(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField />');
  }

  const fieldState = getFieldState(fieldContext.name, formState);
  const itemId = itemContext?.id;

  return {
    id: itemId,
    name: fieldContext.name,
    formItemId: itemId ? `${itemId}-form-item` : undefined,
    formDescriptionId: itemId ? `${itemId}-form-item-description` : undefined,
    formMessageId: itemId ? `${itemId}-form-item-message` : undefined,
    fieldState
  };
};

const Form = FormProvider;

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: ControllerProps<TFieldValues, TName>
) => {
  return (
    <FormFieldContext value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext>
  );
};

const FormItem = ({
  ref,
  className,
  ...props
}: React.ComponentProps<'div'> & { ref?: React.RefObject<HTMLDivElement | null> }) => {
  const id = React.useId();

  return (
    <FormItemContext value={{ id }}>
      <div ref={ref} className={cn('space-y-2', className)} {...props} />
    </FormItemContext>
  );
};
FormItem.displayName = 'FormItem';

const FormLabel = ({
  ref,
  className,
  ...props
}: React.ComponentProps<'label'> & { ref?: React.RefObject<HTMLLabelElement | null> }) => {
  const { formItemId } = useFormField();

  return (
    <label
      ref={ref}
      className={cn(
        'text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        className
      )}
      htmlFor={formItemId}
      {...props}
    />
  );
};
FormLabel.displayName = 'FormLabel';

const FormControl = ({
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof Slot> & {
  ref?: React.RefObject<React.ElementRef<typeof Slot> | null>;
}) => {
  const { formItemId, formDescriptionId, formMessageId, fieldState } = useFormField();

  return (
    <Slot
      ref={ref}
      aria-describedby={[formDescriptionId, formMessageId].filter(Boolean).join(' ') || undefined}
      aria-invalid={fieldState?.invalid || fieldState?.error ? 'true' : undefined}
      id={formItemId}
      {...props}
    />
  );
};
FormControl.displayName = 'FormControl';

const FormDescription = ({
  ref,
  className,
  ...props
}: React.ComponentProps<'p'> & { ref?: React.RefObject<HTMLParagraphElement | null> }) => {
  const { formDescriptionId } = useFormField();

  return (
    <p
      ref={ref}
      className={cn('text-muted-foreground text-sm', className)}
      id={formDescriptionId}
      {...props}
    />
  );
};
FormDescription.displayName = 'FormDescription';

const FormMessage = ({ className, children }: { className?: string; children?: ReactNode }) => {
  const { formMessageId, fieldState } = useFormField();
  const body = children ?? fieldState?.error?.message;

  if (!body) {
    return null;
  }

  return (
    <p className={cn('text-destructive text-sm', className)} id={formMessageId}>
      {body}
    </p>
  );
};

export { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage };
