import type { LeafComponentData } from '@/app/dragdrop/types';

export interface ScreenLeafComponentProps {
  component: LeafComponentData;
}

export const ScreenLeafComponent = ({ component }: ScreenLeafComponentProps) => (
  <div className='border-border/60 flex flex-col gap-3 rounded-xl border p-4 shadow-sm'>
    <div>
      <p className='text-muted-foreground text-xs font-semibold tracking-wide uppercase'>
        {component.type}
      </p>
    </div>
  </div>
);
