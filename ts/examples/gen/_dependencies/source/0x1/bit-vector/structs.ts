import * as reified from '../../../../_framework/reified'
import {
  Reified,
  ToField,
  Vector,
  decodeFromFields,
  decodeFromFieldsWithTypes,
  decodeFromJSONField,
  fieldToJSON,
} from '../../../../_framework/reified'
import { FieldsWithTypes, composeSuiType, compressSuiType } from '../../../../_framework/util'
import { bcs } from '@mysten/bcs'
import { SuiClient, SuiParsedData } from '@mysten/sui.js/client'

/* ============================== BitVector =============================== */

export function isBitVector(type: string): boolean {
  type = compressSuiType(type)
  return type === '0x1::bit_vector::BitVector'
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface BitVectorFields {
  length: ToField<'u64'>
  bitField: ToField<Vector<'bool'>>
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class BitVector {
  static readonly $typeName = '0x1::bit_vector::BitVector'
  static readonly $numTypeParams = 0

  readonly $fullTypeName = null as unknown as '0x1::bit_vector::BitVector'

  readonly $typeName = BitVector.$typeName

  static get bcs() {
    return bcs.struct('BitVector', {
      length: bcs.u64(),
      bit_field: bcs.vector(bcs.bool()),
    })
  }

  readonly length: ToField<'u64'>
  readonly bitField: ToField<Vector<'bool'>>

  private constructor(fields: BitVectorFields) {
    this.length = fields.length
    this.bitField = fields.bitField
  }

  static new(fields: BitVectorFields): BitVector {
    return new BitVector(fields)
  }

  static reified(): Reified<BitVector> {
    return {
      typeName: BitVector.$typeName,
      fullTypeName: composeSuiType(BitVector.$typeName, ...[]) as '0x1::bit_vector::BitVector',
      typeArgs: [],
      fromFields: (fields: Record<string, any>) => BitVector.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => BitVector.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => BitVector.fromBcs(data),
      bcs: BitVector.bcs,
      fromJSONField: (field: any) => BitVector.fromJSONField(field),
      fetch: async (client: SuiClient, id: string) => BitVector.fetch(client, id),
      kind: 'StructClassReified',
    }
  }

  static fromFields(fields: Record<string, any>): BitVector {
    return BitVector.new({
      length: decodeFromFields('u64', fields.length),
      bitField: decodeFromFields(reified.vector('bool'), fields.bit_field),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): BitVector {
    if (!isBitVector(item.type)) {
      throw new Error('not a BitVector type')
    }

    return BitVector.new({
      length: decodeFromFieldsWithTypes('u64', item.fields.length),
      bitField: decodeFromFieldsWithTypes(reified.vector('bool'), item.fields.bit_field),
    })
  }

  static fromBcs(data: Uint8Array): BitVector {
    return BitVector.fromFields(BitVector.bcs.parse(data))
  }

  toJSONField() {
    return {
      length: this.length.toString(),
      bitField: fieldToJSON<Vector<'bool'>>(`vector<bool>`, this.bitField),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, ...this.toJSONField() }
  }

  static fromJSONField(field: any): BitVector {
    return BitVector.new({
      length: decodeFromJSONField('u64', field.length),
      bitField: decodeFromJSONField(reified.vector('bool'), field.bitField),
    })
  }

  static fromJSON(json: Record<string, any>): BitVector {
    if (json.$typeName !== BitVector.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return BitVector.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): BitVector {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isBitVector(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a BitVector object`)
    }
    return BitVector.fromFieldsWithTypes(content)
  }

  static async fetch(client: SuiClient, id: string): Promise<BitVector> {
    const res = await client.getObject({ id, options: { showContent: true } })
    if (res.error) {
      throw new Error(`error fetching BitVector object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.content?.dataType !== 'moveObject' || !isBitVector(res.data.content.type)) {
      throw new Error(`object at id ${id} is not a BitVector object`)
    }
    return BitVector.fromFieldsWithTypes(res.data.content)
  }
}
