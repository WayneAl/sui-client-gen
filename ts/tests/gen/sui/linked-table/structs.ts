import {
  ReifiedTypeArgument,
  ToField,
  ToTypeArgument,
  TypeArgument,
  assertFieldsWithTypesArgsMatch,
  assertReifiedTypeArgsMatch,
  decodeFromFields,
  decodeFromFieldsWithTypes,
  decodeFromJSONField,
  extractType,
  fieldToJSON,
  toBcs,
} from '../../_framework/reified'
import { FieldsWithTypes, composeSuiType, compressSuiType } from '../../_framework/util'
import { Option } from '../../move-stdlib/option/structs'
import { UID } from '../object/structs'
import { BcsType, bcs } from '@mysten/bcs'
import { SuiClient, SuiParsedData } from '@mysten/sui.js/client'

/* ============================== LinkedTable =============================== */

export function isLinkedTable(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith('0x2::linked_table::LinkedTable<')
}

export interface LinkedTableFields<K extends TypeArgument> {
  id: ToField<UID>
  size: ToField<'u64'>
  head: ToField<Option<K>>
  tail: ToField<Option<K>>
}

export class LinkedTable<K extends TypeArgument> {
  static readonly $typeName = '0x2::linked_table::LinkedTable'
  static readonly $numTypeParams = 2

  readonly $typeName = LinkedTable.$typeName

  static get bcs() {
    return <K extends BcsType<any>>(K: K) =>
      bcs.struct(`LinkedTable<${K.name}>`, {
        id: UID.bcs,
        size: bcs.u64(),
        head: Option.bcs(K),
        tail: Option.bcs(K),
      })
  }

  readonly $typeArgs: [string, string]

  readonly id: ToField<UID>
  readonly size: ToField<'u64'>
  readonly head: ToField<Option<K>>
  readonly tail: ToField<Option<K>>

  private constructor(typeArgs: [string, string], fields: LinkedTableFields<K>) {
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.size = fields.size
    this.head = fields.head
    this.tail = fields.tail
  }

  static new<K extends ReifiedTypeArgument>(
    typeArgs: [K, ReifiedTypeArgument],
    fields: LinkedTableFields<ToTypeArgument<K>>
  ): LinkedTable<ToTypeArgument<K>> {
    return new LinkedTable(typeArgs.map(extractType) as [string, string], fields)
  }

  static reified<K extends ReifiedTypeArgument>(K: K, V: ReifiedTypeArgument) {
    return {
      typeName: LinkedTable.$typeName,
      typeArgs: [K, V],
      fromFields: (fields: Record<string, any>) => LinkedTable.fromFields([K, V], fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => LinkedTable.fromFieldsWithTypes([K, V], item),
      fromBcs: (data: Uint8Array) => LinkedTable.fromBcs([K, V], data),
      bcs: LinkedTable.bcs(toBcs(K)),
      fromJSONField: (field: any) => LinkedTable.fromJSONField([K, V], field),
      __class: null as unknown as ReturnType<typeof LinkedTable.new<ToTypeArgument<K>>>,
    }
  }

  static fromFields<K extends ReifiedTypeArgument>(
    typeArgs: [K, ReifiedTypeArgument],
    fields: Record<string, any>
  ): LinkedTable<ToTypeArgument<K>> {
    return LinkedTable.new(typeArgs, {
      id: decodeFromFields(UID.reified(), fields.id),
      size: decodeFromFields('u64', fields.size),
      head: decodeFromFields(Option.reified(typeArgs[0]), fields.head),
      tail: decodeFromFields(Option.reified(typeArgs[0]), fields.tail),
    })
  }

  static fromFieldsWithTypes<K extends ReifiedTypeArgument>(
    typeArgs: [K, ReifiedTypeArgument],
    item: FieldsWithTypes
  ): LinkedTable<ToTypeArgument<K>> {
    if (!isLinkedTable(item.type)) {
      throw new Error('not a LinkedTable type')
    }
    assertFieldsWithTypesArgsMatch(item, typeArgs)

    return LinkedTable.new(typeArgs, {
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      size: decodeFromFieldsWithTypes('u64', item.fields.size),
      head: decodeFromFieldsWithTypes(Option.reified(typeArgs[0]), item.fields.head),
      tail: decodeFromFieldsWithTypes(Option.reified(typeArgs[0]), item.fields.tail),
    })
  }

  static fromBcs<K extends ReifiedTypeArgument>(
    typeArgs: [K, ReifiedTypeArgument],
    data: Uint8Array
  ): LinkedTable<ToTypeArgument<K>> {
    return LinkedTable.fromFields(typeArgs, LinkedTable.bcs(toBcs(typeArgs[0])).parse(data))
  }

  toJSONField() {
    return {
      id: this.id,
      size: this.size.toString(),
      head: fieldToJSON<Option<K>>(`0x1::option::Option<${this.$typeArgs[0]}>`, this.head),
      tail: fieldToJSON<Option<K>>(`0x1::option::Option<${this.$typeArgs[0]}>`, this.tail),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<K extends ReifiedTypeArgument>(
    typeArgs: [K, ReifiedTypeArgument],
    field: any
  ): LinkedTable<ToTypeArgument<K>> {
    return LinkedTable.new(typeArgs, {
      id: decodeFromJSONField(UID.reified(), field.id),
      size: decodeFromJSONField('u64', field.size),
      head: decodeFromJSONField(Option.reified(typeArgs[0]), field.head),
      tail: decodeFromJSONField(Option.reified(typeArgs[0]), field.tail),
    })
  }

  static fromJSON<K extends ReifiedTypeArgument>(
    typeArgs: [K, ReifiedTypeArgument],
    json: Record<string, any>
  ): LinkedTable<ToTypeArgument<K>> {
    if (json.$typeName !== LinkedTable.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(LinkedTable.$typeName, ...typeArgs.map(extractType)),
      json.$typeArgs,
      typeArgs
    )

    return LinkedTable.fromJSONField(typeArgs, json)
  }

  static fromSuiParsedData<K extends ReifiedTypeArgument>(
    typeArgs: [K, ReifiedTypeArgument],
    content: SuiParsedData
  ): LinkedTable<ToTypeArgument<K>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isLinkedTable(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a LinkedTable object`)
    }
    return LinkedTable.fromFieldsWithTypes(typeArgs, content)
  }

  static async fetch<K extends ReifiedTypeArgument>(
    client: SuiClient,
    typeArgs: [K, ReifiedTypeArgument],
    id: string
  ): Promise<LinkedTable<ToTypeArgument<K>>> {
    const res = await client.getObject({ id, options: { showContent: true } })
    if (res.error) {
      throw new Error(`error fetching LinkedTable object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.content?.dataType !== 'moveObject' || !isLinkedTable(res.data.content.type)) {
      throw new Error(`object at id ${id} is not a LinkedTable object`)
    }
    return LinkedTable.fromFieldsWithTypes(typeArgs, res.data.content)
  }
}

/* ============================== Node =============================== */

export function isNode(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith('0x2::linked_table::Node<')
}

export interface NodeFields<K extends TypeArgument, V extends TypeArgument> {
  prev: ToField<Option<K>>
  next: ToField<Option<K>>
  value: ToField<V>
}

export class Node<K extends TypeArgument, V extends TypeArgument> {
  static readonly $typeName = '0x2::linked_table::Node'
  static readonly $numTypeParams = 2

  readonly $typeName = Node.$typeName

  static get bcs() {
    return <K extends BcsType<any>, V extends BcsType<any>>(K: K, V: V) =>
      bcs.struct(`Node<${K.name}, ${V.name}>`, {
        prev: Option.bcs(K),
        next: Option.bcs(K),
        value: V,
      })
  }

  readonly $typeArgs: [string, string]

  readonly prev: ToField<Option<K>>
  readonly next: ToField<Option<K>>
  readonly value: ToField<V>

  private constructor(typeArgs: [string, string], fields: NodeFields<K, V>) {
    this.$typeArgs = typeArgs

    this.prev = fields.prev
    this.next = fields.next
    this.value = fields.value
  }

  static new<K extends ReifiedTypeArgument, V extends ReifiedTypeArgument>(
    typeArgs: [K, V],
    fields: NodeFields<ToTypeArgument<K>, ToTypeArgument<V>>
  ): Node<ToTypeArgument<K>, ToTypeArgument<V>> {
    return new Node(typeArgs.map(extractType) as [string, string], fields)
  }

  static reified<K extends ReifiedTypeArgument, V extends ReifiedTypeArgument>(K: K, V: V) {
    return {
      typeName: Node.$typeName,
      typeArgs: [K, V],
      fromFields: (fields: Record<string, any>) => Node.fromFields([K, V], fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Node.fromFieldsWithTypes([K, V], item),
      fromBcs: (data: Uint8Array) => Node.fromBcs([K, V], data),
      bcs: Node.bcs(toBcs(K), toBcs(V)),
      fromJSONField: (field: any) => Node.fromJSONField([K, V], field),
      __class: null as unknown as ReturnType<typeof Node.new<ToTypeArgument<K>, ToTypeArgument<V>>>,
    }
  }

  static fromFields<K extends ReifiedTypeArgument, V extends ReifiedTypeArgument>(
    typeArgs: [K, V],
    fields: Record<string, any>
  ): Node<ToTypeArgument<K>, ToTypeArgument<V>> {
    return Node.new(typeArgs, {
      prev: decodeFromFields(Option.reified(typeArgs[0]), fields.prev),
      next: decodeFromFields(Option.reified(typeArgs[0]), fields.next),
      value: decodeFromFields(typeArgs[1], fields.value),
    })
  }

  static fromFieldsWithTypes<K extends ReifiedTypeArgument, V extends ReifiedTypeArgument>(
    typeArgs: [K, V],
    item: FieldsWithTypes
  ): Node<ToTypeArgument<K>, ToTypeArgument<V>> {
    if (!isNode(item.type)) {
      throw new Error('not a Node type')
    }
    assertFieldsWithTypesArgsMatch(item, typeArgs)

    return Node.new(typeArgs, {
      prev: decodeFromFieldsWithTypes(Option.reified(typeArgs[0]), item.fields.prev),
      next: decodeFromFieldsWithTypes(Option.reified(typeArgs[0]), item.fields.next),
      value: decodeFromFieldsWithTypes(typeArgs[1], item.fields.value),
    })
  }

  static fromBcs<K extends ReifiedTypeArgument, V extends ReifiedTypeArgument>(
    typeArgs: [K, V],
    data: Uint8Array
  ): Node<ToTypeArgument<K>, ToTypeArgument<V>> {
    return Node.fromFields(typeArgs, Node.bcs(toBcs(typeArgs[0]), toBcs(typeArgs[1])).parse(data))
  }

  toJSONField() {
    return {
      prev: fieldToJSON<Option<K>>(`0x1::option::Option<${this.$typeArgs[0]}>`, this.prev),
      next: fieldToJSON<Option<K>>(`0x1::option::Option<${this.$typeArgs[0]}>`, this.next),
      value: fieldToJSON<V>(this.$typeArgs[1], this.value),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<K extends ReifiedTypeArgument, V extends ReifiedTypeArgument>(
    typeArgs: [K, V],
    field: any
  ): Node<ToTypeArgument<K>, ToTypeArgument<V>> {
    return Node.new(typeArgs, {
      prev: decodeFromJSONField(Option.reified(typeArgs[0]), field.prev),
      next: decodeFromJSONField(Option.reified(typeArgs[0]), field.next),
      value: decodeFromJSONField(typeArgs[1], field.value),
    })
  }

  static fromJSON<K extends ReifiedTypeArgument, V extends ReifiedTypeArgument>(
    typeArgs: [K, V],
    json: Record<string, any>
  ): Node<ToTypeArgument<K>, ToTypeArgument<V>> {
    if (json.$typeName !== Node.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(Node.$typeName, ...typeArgs.map(extractType)),
      json.$typeArgs,
      typeArgs
    )

    return Node.fromJSONField(typeArgs, json)
  }
}
