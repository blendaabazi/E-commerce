import { type SchemaTypeDefinition } from 'sanity';
import {categoryType} from './categoryType';
import { productType } from "./productType";
import { orderType } from "./orderType";
import { contactType } from "./contactType";


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [categoryType, productType, orderType,contactType],
};
