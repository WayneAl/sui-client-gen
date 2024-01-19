import {
  ReifiedTypeArgument,
  ToField,
  assertFieldsWithTypesArgsMatch,
  decodeFromFields,
  decodeFromFieldsWithTypes,
  extractType,
} from '../../_framework/reified'
import { FieldsWithTypes, compressSuiType } from '../../_framework/util'
import { UID } from '../object/structs'
import { bcs } from '@mysten/bcs'
import { SuiClient, SuiParsedData } from '@mysten/sui.js/client'

/* ============================== Table =============================== */

export function isTable(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith('0x2::table::Table<')
}

export interface TableFields {
  id: ToField<UID>
  size: ToField<'u64'>
}

export class Table {
  static readonly $typeName = '0x2::table::Table'
  static readonly $numTypeParams = 2

  readonly $typeName = Table.$typeName

  static get bcs() {
    return bcs.struct('Table', {
      id: UID.bcs,
      size: bcs.u64(),
    })
  }

  readonly $typeArgs: [string, string]

  readonly id: ToField<UID>
  readonly size: ToField<'u64'>

  private constructor(typeArgs: [string, string], fields: TableFields) {
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.size = fields.size
  }

  static new(typeArgs: [ReifiedTypeArgument, ReifiedTypeArgument], fields: TableFields): Table {
    return new Table(typeArgs.map(extractType) as [string, string], fields)
  }

  static reified(T0: ReifiedTypeArgument, T1: ReifiedTypeArgument) {
    return {
      typeName: Table.$typeName,
      typeArgs: [T0, T1],
      fromFields: (fields: Record<string, any>) => Table.fromFields([T0, T1], fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Table.fromFieldsWithTypes([T0, T1], item),
      fromBcs: (data: Uint8Array) => Table.fromBcs([T0, T1], data),
      bcs: Table.bcs,
      __class: null as unknown as ReturnType<typeof Table.new>,
    }
  }

  static fromFields(
    typeArgs: [ReifiedTypeArgument, ReifiedTypeArgument],
    fields: Record<string, any>
  ): Table {
    return Table.new(typeArgs, {
      id: decodeFromFields(UID.reified(), fields.id),
      size: decodeFromFields('u64', fields.size),
    })
  }

  static fromFieldsWithTypes(
    typeArgs: [ReifiedTypeArgument, ReifiedTypeArgument],
    item: FieldsWithTypes
  ): Table {
    if (!isTable(item.type)) {
      throw new Error('not a Table type')
    }
    assertFieldsWithTypesArgsMatch(item, typeArgs)

    return Table.new(typeArgs, {
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      size: decodeFromFieldsWithTypes('u64', item.fields.size),
    })
  }

  static fromBcs(typeArgs: [ReifiedTypeArgument, ReifiedTypeArgument], data: Uint8Array): Table {
    return Table.fromFields(typeArgs, Table.bcs.parse(data))
  }

  toJSONField() {
    return {
      id: this.id,
      size: this.size.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromSuiParsedData(
    typeArgs: [ReifiedTypeArgument, ReifiedTypeArgument],
    content: SuiParsedData
  ): Table {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isTable(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a Table object`)
    }
    return Table.fromFieldsWithTypes(typeArgs, content)
  }

  static async fetch(
    client: SuiClient,
    typeArgs: [ReifiedTypeArgument, ReifiedTypeArgument],
    id: string
  ): Promise<Table> {
    const res = await client.getObject({ id, options: { showContent: true } })
    if (res.error) {
      throw new Error(`error fetching Table object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.content?.dataType !== 'moveObject' || !isTable(res.data.content.type)) {
      throw new Error(`object at id ${id} is not a Table object`)
    }
    return Table.fromFieldsWithTypes(typeArgs, res.data.content)
  }
}
