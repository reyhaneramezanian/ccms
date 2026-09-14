import { LanguageProvider } from '@/i18n/LanguageContext';
// import DirectionProvider from '@/provider/DirectionProvider';
import Modals from '@/components/shared/modals/modals';
import * as S from './lib/styles';

interface Props extends AppLocalization {
    children: React.ReactNode;
}

const BaseLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        // <DirectionProvider localization={localization}>
        // <LanguageProvider localization={localization}>
        <S.Layout>
            {children}
            <Modals />
        </S.Layout>
        // </LanguageProvider>
        // </DirectionProvider>
    );
};

export default BaseLayout;
