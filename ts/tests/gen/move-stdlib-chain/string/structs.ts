import * as reified from '../../_framework/reified'
import {
  ToField,
  decodeFromFields,
  decodeFromFieldsWithTypes,
  decodeFromJSONField,
  fieldToJSON,
} from '../../_framework/reified'
import { FieldsWithTypes, compressSuiType } from '../../_framework/util'
import { bcs } from '@mysten/bcs'

/* ============================== String =============================== */

export function isString(type: string): boolean {
  type = compressSuiType(type)
  return type === '0x1::string::String'
}

export interface StringFields {
  bytes: Array<ToField<'u8'>>
}

export class String {
  static readonly $typeName = '0x1::string::String'
  static readonly $numTypeParams = 0

  readonly $typeName = String.$typeName

  static get bcs() {
    return bcs.struct('String', {
      bytes: bcs.vector(bcs.u8()),
    })
  }

  readonly bytes: Array<ToField<'u8'>>

  private constructor(bytes: Array<ToField<'u8'>>) {
    this.bytes = bytes
  }

  static new(bytes: Array<ToField<'u8'>>): String {
    return new String(bytes)
  }

  static reified() {
    return {
      typeName: String.$typeName,
      typeArgs: [],
      fromFields: (fields: Record<string, any>) => String.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => String.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => String.fromBcs(data),
      bcs: String.bcs,
      fromJSONField: (field: any) => String.fromJSONField(field),
      __class: null as unknown as ReturnType<typeof String.new>,
    }
  }

  static fromFields(fields: Record<string, any>): String {
    return String.new(decodeFromFields(reified.vector('u8'), fields.bytes))
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): String {
    if (!isString(item.type)) {
      throw new Error('not a String type')
    }

    return String.new(decodeFromFieldsWithTypes(reified.vector('u8'), item.fields.bytes))
  }

  static fromBcs(data: Uint8Array): String {
    return String.fromFields(String.bcs.parse(data))
  }

  toJSONField() {
    return {
      bytes: fieldToJSON<Array<'u8'>>(`vector<u8>`, this.bytes),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, ...this.toJSONField() }
  }

  static fromJSONField(field: any): String {
    return String.new(decodeFromJSONField(reified.vector('u8'), field.bytes))
  }

  static fromJSON(json: Record<string, any>): String {
    if (json.$typeName !== String.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return String.fromJSONField(json)
  }
}