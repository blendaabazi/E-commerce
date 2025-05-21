import { type SchemaTypeDefinition } from 'sanity'
import {categoryType} from './categoryType'
import { productType } from './productTybe'


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [categoryType, productType],
}
