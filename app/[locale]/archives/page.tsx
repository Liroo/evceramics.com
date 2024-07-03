import Grid from 'components/grid';
import { unstable_setRequestLocale } from 'next-intl/server';

export default function InfosPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);

  return <Grid className="text-body min-h-full pt-[40px] laptop:pt-[74px]">Coucou</Grid>;
}
