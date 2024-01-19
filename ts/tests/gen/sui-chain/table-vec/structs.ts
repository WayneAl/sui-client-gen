import {
  ReifiedTypeArgument,
  ToField,
  assertFieldsWithTypesArgsMatch,
  decodeFromFields,
  decodeFromFieldsWithTypes,
  extractType,
} from '../../_framework/reified'
import { FieldsWithTypes, compressSuiType } from '../../_framework/util'
import { Table } from '../table/structs'
import { bcs } from '@mysten/bcs'

/* ============================== TableVec =============================== */

export function isTableVec(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith('0x2::table_vec::TableVec<')
}

export interface TableVecFields {
  contents: ToField<Table>
}

export class TableVec {
  static readonly $typeName = '0x2::table_vec::TableVec'
  static readonly $numTypeParams = 1

  readonly $typeName = TableVec.$typeName

  static get bcs() {
    return bcs.struct('TableVec', {
      contents: Table.bcs,
    })
  }

  readonly $typeArg: string

  readonly contents: ToField<Table>

  private constructor(typeArg: string, contents: ToField<Table>) {
    this.$typeArg = typeArg

    this.contents = contents
  }

  static new(typeArg: ReifiedTypeArgument, contents: ToField<Table>): TableVec {
    return new TableVec(extractType(typeArg), contents)
  }

  static reified(T0: ReifiedTypeArgument) {
    return {
      typeName: TableVec.$typeName,
      typeArgs: [T0],
      fromFields: (fields: Record<string, any>) => TableVec.fromFields(T0, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => TableVec.fromFieldsWithTypes(T0, item),
      fromBcs: (data: Uint8Array) => TableVec.fromBcs(T0, data),
      bcs: TableVec.bcs,
      __class: null as unknown as ReturnType<typeof TableVec.new>,
    }
  }

  static fromFields(typeArg: ReifiedTypeArgument, fields: Record<string, any>): TableVec {
    return TableVec.new(typeArg, decodeFromFields(Table.reified('u64', typeArg), fields.contents))
  }

  static fromFieldsWithTypes(typeArg: ReifiedTypeArgument, item: FieldsWithTypes): TableVec {
    if (!isTableVec(item.type)) {
      throw new Error('not a TableVec type')
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg])

    return TableVec.new(
      typeArg,
      decodeFromFieldsWithTypes(Table.reified('u64', typeArg), item.fields.contents)
    )
  }

  static fromBcs(typeArg: ReifiedTypeArgument, data: Uint8Array): TableVec {
    return TableVec.fromFields(typeArg, TableVec.bcs.parse(data))
  }

  toJSONField() {
    return {
      contents: this.contents.toJSONField(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArg: this.$typeArg, ...this.toJSONField() }
  }
}
