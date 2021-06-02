import { Locale as ApiLocale } from 'commercecloud-ocapi-client';
import { Locale } from '../../../types';
import { baseMapping } from './ocapiBaseMapping';

export const mapOcapiLocale = (locale: ApiLocale): Locale => baseMapping<Locale>(locale);
