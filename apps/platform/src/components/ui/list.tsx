import { cva } from 'class-variance-authority';
import { twc, TwcComponentProps } from 'react-twc';

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
  TwcComponentProps<'li'> & { hover?: boolean }
>(({ hover }) => listItemVariants({ hover }));
