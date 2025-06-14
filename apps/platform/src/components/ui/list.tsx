import { twc, TwcComponentProps } from 'react-twc';
import { cva } from 'class-variance-authority';

export const List = twc.ul`divide-y`;

export const listItemVariants = cva('py-5', {
  defaultVariants: {
    hover: true,
  },
  variants: {
    hover: {
      true: 'hover:bg-muted/50',
    },
  },
});

export const ListItem = twc.li.transientProps(['hover'])<
  { hover?: boolean } & TwcComponentProps<'li'>
>(({ hover }) => listItemVariants({ hover }));
