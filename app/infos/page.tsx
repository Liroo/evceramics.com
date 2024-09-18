import Grid from 'components/grid';
import InfosCollapsable from 'components/infos/collapsable';
import EvCeramicsHorizontalSvg from 'icons/evceramics-horizontal.svg';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import EmilieJpg from 'public/images/infos/emilie.jpg';

export const metadata = {
  title: 'Infos',
  description:
    'EV Ceramics is a ceramic studio run by Emilie Vizcano. All the pieces she makes are handmade, one by one, using the modelling technique.',
  openGraph: {
    type: 'website',
  },
};

export default function InfosPage() {
  const t = useTranslations('infos');

  return (
    <Grid className="text-body min-h-full pt-[40px] laptop:h-full laptop:pt-[74px]">
      <div className="col-span-4 pb-[20px] laptop:col-span-3 laptop:col-start-1 laptop:mt-[60px]">
        <EvCeramicsHorizontalSvg className="mt-[30px] w-[300px] laptop:hidden" />
        <Image
          src={EmilieJpg}
          alt="emilie-jpg"
          className="mt-[40px] w-full max-w-[400px] laptop:hidden"
        />
        <p className="mt-[15px] uppercase laptop:mt-0">{t('about.title')}</p>
        <p className="mt-[7px] laptop:mt-[5px]">{t('about.content')}</p>
        <p className="mt-[26px] uppercase laptop:mt-[20px]">{t('wabi-sabi.title')}</p>
        <p className="mt-[7px] laptop:mt-[5px]">{t('wabi-sabi.content-1')}</p>
        <p className="mt-[7px] laptop:mt-[5px]">{t('wabi-sabi.content-2')}</p>
      </div>
      <div className="col-span-4 hidden pb-[20px] laptop:col-span-4 laptop:col-start-5 laptop:mt-[60px] laptop:block">
        <Image src={EmilieJpg} alt="emilie-jpg" />
      </div>
      <div className="col-span-4 overflow-y-scroll pb-[20px] laptop:col-span-3 laptop:col-start-10 laptop:mt-[60px]">
        <InfosCollapsable
          className="mt-[40px] laptop:mt-0"
          localeKey="terms-conditions"
          items={['1', '2', '3', '4', '5', '6']}
        />
        <InfosCollapsable
          className="mt-[40px] laptop:mt-[20px]"
          localeKey="shipping"
          items={['1', '2', '3', '4', '5', '6']}
        />
      </div>
    </Grid>
  );
}
