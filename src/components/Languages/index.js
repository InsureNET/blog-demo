import React from 'react';
import { navigate } from "gatsby";
import { LocaleContext } from '../Layout';
import useLanguageMapping from '../useLanguageMapping';

import * as S from './styled';

const Languages = () => {
  // Grab the locale (passed through context) from the Context Provider
  const { locale } = React.useContext(LocaleContext);

  const languageMapping = useLanguageMapping();

  function handleClickLanguage(e, lang) {
    e.preventDefault();

    if (locale === lang) return;

    const url = window.location.pathname.split("/").pop();

    if (!url) return lang === "en" ?
      navigate(`/`) :
      navigate(`/${lang}`);

    const associatedUrls = languageMapping.find(item => {
      let hasUrl = false;

      Object.entries(item).forEach(([key, value]) => {
        if (value.split("/").pop() === url) return hasUrl = true;
      });

      return hasUrl
    });

    if (!associatedUrls) return navigate("/");

    return lang === "en" ?
      navigate(`/${associatedUrls[lang]}`) :
      navigate(`/${lang}/${associatedUrls[lang]}`);
  }

  return (
    <S.LanguageWrapper>
      <S.LanguageItem>
        <S.LanguageLink to="/" onClick={(e) => handleClickLanguage(e, "en")}>
          en-US
        </S.LanguageLink>
      </S.LanguageItem>
      <S.LanguageItem>
        <S.LanguageLink to="/pt" onClick={(e) => handleClickLanguage(e, "pt")}>
          pt-BR
        </S.LanguageLink>
      </S.LanguageItem>
    </S.LanguageWrapper>
  );
};

export default Languages;
