import {
  ReifiedTypeArgument,
  ToField,
  assertFieldsWithTypesArgsMatch,
  assertReifiedTypeArgsMatch,
  decodeFromFields,
  decodeFromFieldsWithTypes,
  decodeFromJSONField,
  extractType,
} from '../../_framework/reified'
import { FieldsWithTypes, composeSuiType, compressSuiType } from '../../_framework/util'
import { ID } from '../object/structs'
import { bcs } from '@mysten/bcs'

/* ============================== Receiving =============================== */

export function isReceiving(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith('0x2::transfer::Receiving<')
}

export interface ReceivingFields {
  id: ToField<ID>
  version: ToField<'u64'>
}

export class Receiving {
  static readonly $typeName = '0x2::transfer::Receiving'
  static readonly $numTypeParams = 1

  readonly $typeName = Receiving.$typeName

  static get bcs() {
    return bcs.struct('Receiving', {
      id: ID.bcs,
      version: bcs.u64(),
    })
  }

  readonly $typeArg: string

  readonly id: ToField<ID>
  readonly version: ToField<'u64'>

  private constructor(typeArg: string, fields: ReceivingFields) {
    this.$typeArg = typeArg

    this.id = fields.id
    this.version = fields.version
  }

  static new(typeArg: ReifiedTypeArgument, fields: ReceivingFields): Receiving {
    return new Receiving(extractType(typeArg), fields)
  }

  static reified(T: ReifiedTypeArgument) {
    return {
      typeName: Receiving.$typeName,
      typeArgs: [T],
      fromFields: (fields: Record<string, any>) => Receiving.fromFields(T, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Receiving.fromFieldsWithTypes(T, item),
      fromBcs: (data: Uint8Array) => Receiving.fromBcs(T, data),
      bcs: Receiving.bcs,
      fromJSONField: (field: any) => Receiving.fromJSONField(T, field),
      __class: null as unknown as ReturnType<typeof Receiving.new>,
    }
  }

  static fromFields(typeArg: ReifiedTypeArgument, fields: Record<string, any>): Receiving {
    return Receiving.new(typeArg, {
      id: decodeFromFields(ID.reified(), fields.id),
      version: decodeFromFields('u64', fields.version),
    })
  }

  static fromFieldsWithTypes(typeArg: ReifiedTypeArgument, item: FieldsWithTypes): Receiving {
    if (!isReceiving(item.type)) {
      throw new Error('not a Receiving type')
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg])

    return Receiving.new(typeArg, {
      id: decodeFromFieldsWithTypes(ID.reified(), item.fields.id),
      version: decodeFromFieldsWithTypes('u64', item.fields.version),
    })
  }

  static fromBcs(typeArg: ReifiedTypeArgument, data: Uint8Array): Receiving {
    return Receiving.fromFields(typeArg, Receiving.bcs.parse(data))
  }

  toJSONField() {
    return {
      id: this.id,
      version: this.version.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArg: this.$typeArg, ...this.toJSONField() }
  }

  static fromJSONField(typeArg: ReifiedTypeArgument, field: any): Receiving {
    return Receiving.new(typeArg, {
      id: decodeFromJSONField(ID.reified(), field.id),
      version: decodeFromJSONField('u64', field.version),
    })
  }

  static fromJSON(typeArg: ReifiedTypeArgument, json: Record<string, any>): Receiving {
    if (json.$typeName !== Receiving.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(Receiving.$typeName, extractType(typeArg)),
      [json.$typeArg],
      [typeArg]
    )

    return Receiving.fromJSONField(typeArg, json)
  }
}
