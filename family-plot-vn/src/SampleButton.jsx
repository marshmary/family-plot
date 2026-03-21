import React from "react";
import { useTranslation } from "react-i18next";

const SampleButton = ({ name, loadFile }) => {
  const { t } = useTranslation();

  // Convert sample name to translation key format (e.g., "shakespeare" -> "samples.shakespeare")
  const translationKey = `samples.${name.toLowerCase().replace(/\s+/g, '')}`;

  return (
    <input className='sampleButton' type='button' value={t(translationKey, name)} onClick={loadFile} />
  )
}

export default SampleButton
