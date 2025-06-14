import { cn, StyledProps, StyledPropsWithChildren } from '@/lib/utils';
import Image from 'next/image';
import logo from './logo.png';
import { BrandFont } from '@/components/brand/font';

const NAME = 'iMigration';

export function BrandLoading() {
  return <BrandSpinner className='flex-1' />;
}

export function BrandLogo({ className }: StyledProps) {
  return <Image alt='Quantpilot' className={className} src={logo} />;
}

export function BrandName({
  children = NAME,
  className,
}: StyledPropsWithChildren) {
  return (
    <span className={cn(BrandFont.className, 'tracking-tight', className)}>
      {children}
    </span>
  );
}

export function BrandSpinner({ className }: StyledProps) {
  return (
    <div className={cn('flex items-center justify-center', className)}>
      <div className="text-primary pointer-events-none inline-block aspect-square w-8 bg-current align-middle [mask-image:url('data:image/svg+xml,%3Csvg%20width%3D%2724%27%20height%3D%2724%27%20viewBox%3D%270%200%2024%2024%27%20xmlns%3D%27http%3A//www.w3.org/2000/svg%27%3E%3Crect%20x%3D%271%27%20y%3D%271%27%20width%3D%276%27%20height%3D%2722%27%3E%3Canimate%20attributeName%3D%27y%27%20values%3D%271%3B5%3B1%27%20keyTimes%3D%270%3B0.938%3B1%27%20dur%3D%27.8s%27%20repeatCount%3D%27indefinite%27/%3E%3Canimate%20attributeName%3D%27height%27%20values%3D%2722%3B14%3B22%27%20keyTimes%3D%270%3B0.938%3B1%27%20dur%3D%27.8s%27%20repeatCount%3D%27indefinite%27/%3E%3Canimate%20attributeName%3D%27opacity%27%20values%3D%271%3B0.2%3B1%27%20keyTimes%3D%270%3B0.938%3B1%27%20dur%3D%27.8s%27%20repeatCount%3D%27indefinite%27/%3E%3C/rect%3E%3Crect%20x%3D%279%27%20y%3D%271%27%20width%3D%276%27%20height%3D%2722%27%3E%3Canimate%20attributeName%3D%27y%27%20values%3D%271%3B5%3B1%27%20keyTimes%3D%270%3B0.938%3B1%27%20dur%3D%27.8s%27%20repeatCount%3D%27indefinite%27%20begin%3D%27-0.65s%27/%3E%3Canimate%20attributeName%3D%27height%27%20values%3D%2722%3B14%3B22%27%20keyTimes%3D%270%3B0.938%3B1%27%20dur%3D%27.8s%27%20repeatCount%3D%27indefinite%27%20begin%3D%27-0.65s%27/%3E%3Canimate%20attributeName%3D%27opacity%27%20values%3D%271%3B0.2%3B1%27%20keyTimes%3D%270%3B0.938%3B1%27%20dur%3D%27.8s%27%20repeatCount%3D%27indefinite%27%20begin%3D%27-0.65s%27/%3E%3C/rect%3E%3Crect%20x%3D%2717%27%20y%3D%271%27%20width%3D%276%27%20height%3D%2722%27%3E%3Canimate%20attributeName%3D%27y%27%20values%3D%271%3B5%3B1%27%20keyTimes%3D%270%3B0.938%3B1%27%20dur%3D%27.8s%27%20repeatCount%3D%27indefinite%27%20begin%3D%27-0.5s%27/%3E%3Canimate%20attributeName%3D%27height%27%20values%3D%2722%3B14%3B22%27%20keyTimes%3D%270%3B0.938%3B1%27%20dur%3D%27.8s%27%20repeatCount%3D%27indefinite%27%20begin%3D%27-0.5s%27/%3E%3Canimate%20attributeName%3D%27opacity%27%20values%3D%271%3B0.2%3B1%27%20keyTimes%3D%270%3B0.938%3B1%27%20dur%3D%27.8s%27%20repeatCount%3D%27indefinite%27%20begin%3D%27-0.5s%27/%3E%3C/rect%3E%3C/svg%3E')] [mask-position:center] [mask-repeat:no-repeat] [mask-size:100%]"></div>
    </div>
  );
}

export function BrandTitle({
  children = NAME,
  className,
}: StyledPropsWithChildren) {
  return (
    <h1
      className={cn(
        BrandFont.className,
        'leading select-none text-2xl tracking-tight text-black',
        className
      )}
    >
      {children}
    </h1>
  );
}

export function BrandTitleWithLogo({
  children = NAME,
  className,
}: StyledPropsWithChildren) {
  return (
    <div
      className={cn(
        'font-brand flex h-7 select-none items-center justify-center gap-3 text-3xl tracking-tight text-white',
        className
      )}
    >
      <BrandLogo className='flex-0 h-full' />
      <h1>{children}</h1>
    </div>
  );
}
