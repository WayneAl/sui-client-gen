import * as reified from '../../_framework/reified'
import {
  PhantomTypeArgument,
  Reified,
  ReifiedPhantomTypeArgument,
  ToField,
  ToPhantomTypeArgument,
  ToTypeArgument,
  ToTypeStr,
  TypeArgument,
  Vector,
  assertFieldsWithTypesArgsMatch,
  assertReifiedTypeArgsMatch,
  decodeFromFields,
  decodeFromFieldsWithTypes,
  decodeFromJSONField,
  extractType,
  fieldToJSON,
  toBcs,
  ToTypeStr as ToPhantom,
} from '../../_framework/reified'
import { FieldsWithTypes, composeSuiType, compressSuiType } from '../../_framework/util'
import { String as String1 } from '../../move-stdlib-chain/ascii/structs'
import { Option } from '../../move-stdlib-chain/option/structs'
import { String } from '../../move-stdlib-chain/string/structs'
import { Balance } from '../../sui-chain/balance/structs'
import { ID, UID } from '../../sui-chain/object/structs'
import { SUI } from '../../sui-chain/sui/structs'
import { Url } from '../../sui-chain/url/structs'
import { StructFromOtherModule } from '../other-module/structs'
import { BcsType, bcs } from '@mysten/bcs'
import { SuiClient, SuiParsedData } from '@mysten/sui.js/client'

/* ============================== Dummy =============================== */

export function isDummy(type: string): boolean {
  type = compressSuiType(type)
  return (
    type === '0x8b699fdce543505aeb290ee1b6b5d20fcaa8e8b1a5fc137a8b3facdfa2902209::fixture::Dummy'
  )
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface DummyFields {
  dummyField: ToField<'bool'>
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class Dummy {
  static readonly $typeName =
    '0x8b699fdce543505aeb290ee1b6b5d20fcaa8e8b1a5fc137a8b3facdfa2902209::fixture::Dummy'
  static readonly $numTypeParams = 0

  readonly $fullTypeName =
    null as unknown as '0x8b699fdce543505aeb290ee1b6b5d20fcaa8e8b1a5fc137a8b3facdfa2902209::fixture::Dummy'

  readonly $typeName = Dummy.$typeName

  static get bcs() {
    return bcs.struct('Dummy', {
      dummy_field: bcs.bool(),
    })
  }

  readonly dummyField: ToField<'bool'>

  private constructor(dummyField: ToField<'bool'>) {
    this.dummyField = dummyField
  }

  static new(dummyField: ToField<'bool'>): Dummy {
    return new Dummy(dummyField)
  }

  static reified(): Reified<Dummy> {
    return {
      typeName: Dummy.$typeName,
      fullTypeName: composeSuiType(
        Dummy.$typeName,
        ...[]
      ) as '0x8b699fdce543505aeb290ee1b6b5d20fcaa8e8b1a5fc137a8b3facdfa2902209::fixture::Dummy',
      typeArgs: [],
      fromFields: (fields: Record<string, any>) => Dummy.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Dummy.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => Dummy.fromBcs(data),
      bcs: Dummy.bcs,
      fromJSONField: (field: any) => Dummy.fromJSONField(field),
      fetch: async (client: SuiClient, id: string) => Dummy.fetch(client, id),
      kind: 'StructClassReified',
    }
  }

  static fromFields(fields: Record<string, any>): Dummy {
    return Dummy.new(decodeFromFields('bool', fields.dummy_field))
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): Dummy {
    if (!isDummy(item.type)) {
      throw new Error('not a Dummy type')
    }

    return Dummy.new(decodeFromFieldsWithTypes('bool', item.fields.dummy_field))
  }

  static fromBcs(data: Uint8Array): Dummy {
    return Dummy.fromFields(Dummy.bcs.parse(data))
  }

  toJSONField() {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, ...this.toJSONField() }
  }

  static fromJSONField(field: any): Dummy {
    return Dummy.new(decodeFromJSONField('bool', field.dummyField))
  }

  static fromJSON(json: Record<string, any>): Dummy {
    if (json.$typeName !== Dummy.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return Dummy.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): Dummy {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isDummy(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a Dummy object`)
    }
    return Dummy.fromFieldsWithTypes(content)
  }

  static async fetch(client: SuiClient, id: string): Promise<Dummy> {
    const res = await client.getObject({ id, options: { showContent: true } })
    if (res.error) {
      throw new Error(`error fetching Dummy object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.content?.dataType !== 'moveObject' || !isDummy(res.data.content.type)) {
      throw new Error(`object at id ${id} is not a Dummy object`)
    }
    return Dummy.fromFieldsWithTypes(res.data.content)
  }
}

/* ============================== WithGenericField =============================== */

export function isWithGenericField(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(
    '0x8b699fdce543505aeb290ee1b6b5d20fcaa8e8b1a5fc137a8b3facdfa2902209::fixture::WithGenericField<'
  )
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface WithGenericFieldFields<T0 extends TypeArgument> {
  id: ToField<UID>
  genericField: ToField<T0>
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class WithGenericField<T0 extends TypeArgument> {
  static readonly $typeName =
    '0x8b699fdce543505aeb290ee1b6b5d20fcaa8e8b1a5fc137a8b3facdfa2902209::fixture::WithGenericField'
  static readonly $numTypeParams = 1

  readonly $fullTypeName =
    null as unknown as `0x8b699fdce543505aeb290ee1b6b5d20fcaa8e8b1a5fc137a8b3facdfa2902209::fixture::WithGenericField<${ToTypeStr<T0>}>`

  readonly $typeName = WithGenericField.$typeName

  static get bcs() {
    return <T0 extends BcsType<any>>(T0: T0) =>
      bcs.struct(`WithGenericField<${T0.name}>`, {
        id: UID.bcs,
        generic_field: T0,
      })
  }

  readonly $typeArg: string

  readonly id: ToField<UID>
  readonly genericField: ToField<T0>

  private constructor(typeArg: string, fields: WithGenericFieldFields<T0>) {
    this.$typeArg = typeArg

    this.id = fields.id
    this.genericField = fields.genericField
  }

  static new<T0 extends Reified<TypeArgument>>(
    typeArg: T0,
    fields: WithGenericFieldFields<ToTypeArgument<T0>>
  ): WithGenericField<ToTypeArgument<T0>> {
    return new WithGenericField(extractType(typeArg), fields)
  }

  static reified<T0 extends Reified<TypeArgument>>(
    T0: T0
  ): Reified<WithGenericField<ToTypeArgument<T0>>> {
    return {
      typeName: WithGenericField.$typeName,
      fullTypeName: composeSuiType(
        WithGenericField.$typeName,
        ...[extractType(T0)]
      ) as `0x8b699fdce543505aeb290ee1b6b5d20fcaa8e8b1a5fc137a8b3facdfa2902209::fixture::WithGenericField<${ToTypeStr<
        ToTypeArgument<T0>
      >}>`,
      typeArgs: [T0],
      fromFields: (fields: Record<string, any>) => WithGenericField.fromFields(T0, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        WithGenericField.fromFieldsWithTypes(T0, item),
      fromBcs: (data: Uint8Array) => WithGenericField.fromBcs(T0, data),
      bcs: WithGenericField.bcs(toBcs(T0)),
      fromJSONField: (field: any) => WithGenericField.fromJSONField(T0, field),
      fetch: async (client: SuiClient, id: string) => WithGenericField.fetch(client, T0, id),
      kind: 'StructClassReified',
    }
  }

  static fromFields<T0 extends Reified<TypeArgument>>(
    typeArg: T0,
    fields: Record<string, any>
  ): WithGenericField<ToTypeArgument<T0>> {
    return WithGenericField.new(typeArg, {
      id: decodeFromFields(UID.reified(), fields.id),
      genericField: decodeFromFields(typeArg, fields.generic_field),
    })
  }

  static fromFieldsWithTypes<T0 extends Reified<TypeArgument>>(
    typeArg: T0,
    item: FieldsWithTypes
  ): WithGenericField<ToTypeArgument<T0>> {
    if (!isWithGenericField(item.type)) {
      throw new Error('not a WithGenericField type')
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg])

    return WithGenericField.new(typeArg, {
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      genericField: decodeFromFieldsWithTypes(typeArg, item.fields.generic_field),
    })
  }

  static fromBcs<T0 extends Reified<TypeArgument>>(
    typeArg: T0,
    data: Uint8Array
  ): WithGenericField<ToTypeArgument<T0>> {
    const typeArgs = [typeArg]

    return WithGenericField.fromFields(
      typeArg,
      WithGenericField.bcs(toBcs(typeArgs[0])).parse(data)
    )
  }

  toJSONField() {
    return {
      id: this.id,
      genericField: fieldToJSON<T0>(this.$typeArg, this.genericField),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArg: this.$typeArg, ...this.toJSONField() }
  }

  static fromJSONField<T0 extends Reified<TypeArgument>>(
    typeArg: T0,
    field: any
  ): WithGenericField<ToTypeArgument<T0>> {
    return WithGenericField.new(typeArg, {
      id: decodeFromJSONField(UID.reified(), field.id),
      genericField: decodeFromJSONField(typeArg, field.genericField),
    })
  }

  static fromJSON<T0 extends Reified<TypeArgument>>(
    typeArg: T0,
    json: Record<string, any>
  ): WithGenericField<ToTypeArgument<T0>> {
    if (json.$typeName !== WithGenericField.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(WithGenericField.$typeName, extractType(typeArg)),
      [json.$typeArg],
      [typeArg]
    )

    return WithGenericField.fromJSONField(typeArg, json)
  }

  static fromSuiParsedData<T0 extends Reified<TypeArgument>>(
    typeArg: T0,
    content: SuiParsedData
  ): WithGenericField<ToTypeArgument<T0>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isWithGenericField(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a WithGenericField object`)
    }
    return WithGenericField.fromFieldsWithTypes(typeArg, content)
  }

  static async fetch<T0 extends Reified<TypeArgument>>(
    client: SuiClient,
    typeArg: T0,
    id: string
  ): Promise<WithGenericField<ToTypeArgument<T0>>> {
    const res = await client.getObject({ id, options: { showContent: true } })
    if (res.error) {
      throw new Error(`error fetching WithGenericField object at id ${id}: ${res.error.code}`)
    }
    if (
      res.data?.content?.dataType !== 'moveObject' ||
      !isWithGenericField(res.data.content.type)
    ) {
      throw new Error(`object at id ${id} is not a WithGenericField object`)
    }
    return WithGenericField.fromFieldsWithTypes(typeArg, res.data.content)
  }
}

/* ============================== Bar =============================== */

export function isBar(type: string): boolean {
  type = compressSuiType(type)
  return type === '0x8b699fdce543505aeb290ee1b6b5d20fcaa8e8b1a5fc137a8b3facdfa2902209::fixture::Bar'
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface BarFields {
  value: ToField<'u64'>
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class Bar {
  static readonly $typeName =
    '0x8b699fdce543505aeb290ee1b6b5d20fcaa8e8b1a5fc137a8b3facdfa2902209::fixture::Bar'
  static readonly $numTypeParams = 0

  readonly $fullTypeName =
    null as unknown as '0x8b699fdce543505aeb290ee1b6b5d20fcaa8e8b1a5fc137a8b3facdfa2902209::fixture::Bar'

  readonly $typeName = Bar.$typeName

  static get bcs() {
    return bcs.struct('Bar', {
      value: bcs.u64(),
    })
  }

  readonly value: ToField<'u64'>

  private constructor(value: ToField<'u64'>) {
    this.value = value
  }

  static new(value: ToField<'u64'>): Bar {
    return new Bar(value)
  }

  static reified(): Reified<Bar> {
    return {
      typeName: Bar.$typeName,
      fullTypeName: composeSuiType(
        Bar.$typeName,
        ...[]
      ) as '0x8b699fdce543505aeb290ee1b6b5d20fcaa8e8b1a5fc137a8b3facdfa2902209::fixture::Bar',
      typeArgs: [],
      fromFields: (fields: Record<string, any>) => Bar.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Bar.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => Bar.fromBcs(data),
      bcs: Bar.bcs,
      fromJSONField: (field: any) => Bar.fromJSONField(field),
      fetch: async (client: SuiClient, id: string) => Bar.fetch(client, id),
      kind: 'StructClassReified',
    }
  }

  static fromFields(fields: Record<string, any>): Bar {
    return Bar.new(decodeFromFields('u64', fields.value))
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): Bar {
    if (!isBar(item.type)) {
      throw new Error('not a Bar type')
    }

    return Bar.new(decodeFromFieldsWithTypes('u64', item.fields.value))
  }

  static fromBcs(data: Uint8Array): Bar {
    return Bar.fromFields(Bar.bcs.parse(data))
  }

  toJSONField() {
    return {
      value: this.value.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, ...this.toJSONField() }
  }

  static fromJSONField(field: any): Bar {
    return Bar.new(decodeFromJSONField('u64', field.value))
  }

  static fromJSON(json: Record<string, any>): Bar {
    if (json.$typeName !== Bar.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return Bar.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): Bar {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isBar(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a Bar object`)
    }
    return Bar.fromFieldsWithTypes(content)
  }

  static async fetch(client: SuiClient, id: string): Promise<Bar> {
    const res = await client.getObject({ id, options: { showContent: true } })
    if (res.error) {
      throw new Error(`error fetching Bar object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.content?.dataType !== 'moveObject' || !isBar(res.data.content.type)) {
      throw new Error(`object at id ${id} is not a Bar object`)
    }
    return Bar.fromFieldsWithTypes(res.data.content)
  }
}

/* ============================== WithTwoGenerics =============================== */

export function isWithTwoGenerics(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(
    '0x8b699fdce543505aeb290ee1b6b5d20fcaa8e8b1a5fc137a8b3facdfa2902209::fixture::WithTwoGenerics<'
  )
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface WithTwoGenericsFields<T0 extends TypeArgument, T1 extends TypeArgument> {
  genericField1: ToField<T0>
  genericField2: ToField<T1>
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class WithTwoGenerics<T0 extends TypeArgument, T1 extends TypeArgument> {
  static readonly $typeName =
    '0x8b699fdce543505aeb290ee1b6b5d20fcaa8e8b1a5fc137a8b3facdfa2902209::fixture::WithTwoGenerics'
  static readonly $numTypeParams = 2

  readonly $fullTypeName =
    null as unknown as `0x8b699fdce543505aeb290ee1b6b5d20fcaa8e8b1a5fc137a8b3facdfa2902209::fixture::WithTwoGenerics<${ToTypeStr<T0>}, ${ToTypeStr<T1>}>`

  readonly $typeName = WithTwoGenerics.$typeName

  static get bcs() {
    return <T0 extends BcsType<any>, T1 extends BcsType<any>>(T0: T0, T1: T1) =>
      bcs.struct(`WithTwoGenerics<${T0.name}, ${T1.name}>`, {
        generic_field_1: T0,
        generic_field_2: T1,
      })
  }

  readonly $typeArgs: [string, string]

  readonly genericField1: ToField<T0>
  readonly genericField2: ToField<T1>

  private constructor(typeArgs: [string, string], fields: WithTwoGenericsFields<T0, T1>) {
    this.$typeArgs = typeArgs

    this.genericField1 = fields.genericField1
    this.genericField2 = fields.genericField2
  }

  static new<T0 extends Reified<TypeArgument>, T1 extends Reified<TypeArgument>>(
    typeArgs: [T0, T1],
    fields: WithTwoGenericsFields<ToTypeArgument<T0>, ToTypeArgument<T1>>
  ): WithTwoGenerics<ToTypeArgument<T0>, ToTypeArgument<T1>> {
    return new WithTwoGenerics(typeArgs.map(extractType) as [string, string], fields)
  }

  static reified<T0 extends Reified<TypeArgument>, T1 extends Reified<TypeArgument>>(
    T0: T0,
    T1: T1
  ): Reified<WithTwoGenerics<ToTypeArgument<T0>, ToTypeArgument<T1>>> {
    return {
      typeName: WithTwoGenerics.$typeName,
      fullTypeName: composeSuiType(
        WithTwoGenerics.$typeName,
        ...[extractType(T0), extractType(T1)]
      ) as `0x8b699fdce543505aeb290ee1b6b5d20fcaa8e8b1a5fc137a8b3facdfa2902209::fixture::WithTwoGenerics<${ToTypeStr<
        ToTypeArgument<T0>
      >}, ${ToTypeStr<ToTypeArgument<T1>>}>`,
      typeArgs: [T0, T1],
      fromFields: (fields: Record<string, any>) => WithTwoGenerics.fromFields([T0, T1], fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        WithTwoGenerics.fromFieldsWithTypes([T0, T1], item),
      fromBcs: (data: Uint8Array) => WithTwoGenerics.fromBcs([T0, T1], data),
      bcs: WithTwoGenerics.bcs(toBcs(T0), toBcs(T1)),
      fromJSONField: (field: any) => WithTwoGenerics.fromJSONField([T0, T1], field),
      fetch: async (client: SuiClient, id: string) => WithTwoGenerics.fetch(client, [T0, T1], id),
      kind: 'StructClassReified',
    }
  }

  static fromFields<T0 extends Reified<TypeArgument>, T1 extends Reified<TypeArgument>>(
    typeArgs: [T0, T1],
    fields: Record<string, any>
  ): WithTwoGenerics<ToTypeArgument<T0>, ToTypeArgument<T1>> {
    return WithTwoGenerics.new(typeArgs, {
      genericField1: decodeFromFields(typeArgs[0], fields.generic_field_1),
      genericField2: decodeFromFields(typeArgs[1], fields.generic_field_2),
    })
  }

  static fromFieldsWithTypes<T0 extends Reified<TypeArgument>, T1 extends Reified<TypeArgument>>(
    typeArgs: [T0, T1],
    item: FieldsWithTypes
  ): WithTwoGenerics<ToTypeArgument<T0>, ToTypeArgument<T1>> {
    if (!isWithTwoGenerics(item.type)) {
      throw new Error('not a WithTwoGenerics type')
    }
    assertFieldsWithTypesArgsMatch(item, typeArgs)

    return WithTwoGenerics.new(typeArgs, {
      genericField1: decodeFromFieldsWithTypes(typeArgs[0], item.fields.generic_field_1),
      genericField2: decodeFromFieldsWithTypes(typeArgs[1], item.fields.generic_field_2),
    })
  }

  static fromBcs<T0 extends Reified<TypeArgument>, T1 extends Reified<TypeArgument>>(
    typeArgs: [T0, T1],
    data: Uint8Array
  ): WithTwoGenerics<ToTypeArgument<T0>, ToTypeArgument<T1>> {
    return WithTwoGenerics.fromFields(
      typeArgs,
      WithTwoGenerics.bcs(toBcs(typeArgs[0]), toBcs(typeArgs[1])).parse(data)
    )
  }

  toJSONField() {
    return {
      genericField1: fieldToJSON<T0>(this.$typeArgs[0], this.genericField1),
      genericField2: fieldToJSON<T1>(this.$typeArgs[1], this.genericField2),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<T0 extends Reified<TypeArgument>, T1 extends Reified<TypeArgument>>(
    typeArgs: [T0, T1],
    field: any
  ): WithTwoGenerics<ToTypeArgument<T0>, ToTypeArgument<T1>> {
    return WithTwoGenerics.new(typeArgs, {
      genericField1: decodeFromJSONField(typeArgs[0], field.genericField1),
      genericField2: decodeFromJSONField(typeArgs[1], field.genericField2),
    })
  }

  static fromJSON<T0 extends Reified<TypeArgument>, T1 extends Reified<TypeArgument>>(
    typeArgs: [T0, T1],
    json: Record<string, any>
  ): WithTwoGenerics<ToTypeArgument<T0>, ToTypeArgument<T1>> {
    if (json.$typeName !== WithTwoGenerics.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(WithTwoGenerics.$typeName, ...typeArgs.map(extractType)),
      json.$typeArgs,
      typeArgs
    )

    return WithTwoGenerics.fromJSONField(typeArgs, json)
  }

  static fromSuiParsedData<T0 extends Reified<TypeArgument>, T1 extends Reified<TypeArgument>>(
    typeArgs: [T0, T1],
    content: SuiParsedData
  ): WithTwoGenerics<ToTypeArgument<T0>, ToTypeArgument<T1>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isWithTwoGenerics(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a WithTwoGenerics object`)
    }
    return WithTwoGenerics.fromFieldsWithTypes(typeArgs, content)
  }

  static async fetch<T0 extends Reified<TypeArgument>, T1 extends Reified<TypeArgument>>(
    client: SuiClient,
    typeArgs: [T0, T1],
    id: string
  ): Promise<WithTwoGenerics<ToTypeArgument<T0>, ToTypeArgument<T1>>> {
    const res = await client.getObject({ id, options: { showContent: true } })
    if (res.error) {
      throw new Error(`error fetching WithTwoGenerics object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.content?.dataType !== 'moveObject' || !isWithTwoGenerics(res.data.content.type)) {
      throw new Error(`object at id ${id} is not a WithTwoGenerics object`)
    }
    return WithTwoGenerics.fromFieldsWithTypes(typeArgs, res.data.content)
  }
}

/* ============================== Foo =============================== */

export function isFoo(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(
    '0x8b699fdce543505aeb290ee1b6b5d20fcaa8e8b1a5fc137a8b3facdfa2902209::fixture::Foo<'
  )
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface FooFields<T0 extends TypeArgument> {
  id: ToField<UID>
  generic: ToField<T0>
  reifiedPrimitiveVec: ToField<Vector<'u64'>>
  reifiedObjectVec: ToField<Vector<Bar>>
  genericVec: ToField<Vector<T0>>
  genericVecNested: ToField<Vector<WithTwoGenerics<T0, 'u8'>>>
  twoGenerics: ToField<WithTwoGenerics<T0, Bar>>
  twoGenericsReifiedPrimitive: ToField<WithTwoGenerics<'u16', 'u64'>>
  twoGenericsReifiedObject: ToField<WithTwoGenerics<Bar, Bar>>
  twoGenericsNested: ToField<WithTwoGenerics<T0, WithTwoGenerics<'u8', 'u8'>>>
  twoGenericsReifiedNested: ToField<WithTwoGenerics<Bar, WithTwoGenerics<'u8', 'u8'>>>
  twoGenericsNestedVec: ToField<Vector<WithTwoGenerics<Bar, Vector<WithTwoGenerics<T0, 'u8'>>>>>
  dummy: ToField<Dummy>
  other: ToField<StructFromOtherModule>
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class Foo<T0 extends TypeArgument> {
  static readonly $typeName =
    '0x8b699fdce543505aeb290ee1b6b5d20fcaa8e8b1a5fc137a8b3facdfa2902209::fixture::Foo'
  static readonly $numTypeParams = 1

  readonly $fullTypeName =
    null as unknown as `0x8b699fdce543505aeb290ee1b6b5d20fcaa8e8b1a5fc137a8b3facdfa2902209::fixture::Foo<${ToTypeStr<T0>}>`

  readonly $typeName = Foo.$typeName

  static get bcs() {
    return <T0 extends BcsType<any>>(T0: T0) =>
      bcs.struct(`Foo<${T0.name}>`, {
        id: UID.bcs,
        generic: T0,
        reified_primitive_vec: bcs.vector(bcs.u64()),
        reified_object_vec: bcs.vector(Bar.bcs),
        generic_vec: bcs.vector(T0),
        generic_vec_nested: bcs.vector(WithTwoGenerics.bcs(T0, bcs.u8())),
        two_generics: WithTwoGenerics.bcs(T0, Bar.bcs),
        two_generics_reified_primitive: WithTwoGenerics.bcs(bcs.u16(), bcs.u64()),
        two_generics_reified_object: WithTwoGenerics.bcs(Bar.bcs, Bar.bcs),
        two_generics_nested: WithTwoGenerics.bcs(T0, WithTwoGenerics.bcs(bcs.u8(), bcs.u8())),
        two_generics_reified_nested: WithTwoGenerics.bcs(
          Bar.bcs,
          WithTwoGenerics.bcs(bcs.u8(), bcs.u8())
        ),
        two_generics_nested_vec: bcs.vector(
          WithTwoGenerics.bcs(Bar.bcs, bcs.vector(WithTwoGenerics.bcs(T0, bcs.u8())))
        ),
        dummy: Dummy.bcs,
        other: StructFromOtherModule.bcs,
      })
  }

  readonly $typeArg: string

  readonly id: ToField<UID>
  readonly generic: ToField<T0>
  readonly reifiedPrimitiveVec: ToField<Vector<'u64'>>
  readonly reifiedObjectVec: ToField<Vector<Bar>>
  readonly genericVec: ToField<Vector<T0>>
  readonly genericVecNested: ToField<Vector<WithTwoGenerics<T0, 'u8'>>>
  readonly twoGenerics: ToField<WithTwoGenerics<T0, Bar>>
  readonly twoGenericsReifiedPrimitive: ToField<WithTwoGenerics<'u16', 'u64'>>
  readonly twoGenericsReifiedObject: ToField<WithTwoGenerics<Bar, Bar>>
  readonly twoGenericsNested: ToField<WithTwoGenerics<T0, WithTwoGenerics<'u8', 'u8'>>>
  readonly twoGenericsReifiedNested: ToField<WithTwoGenerics<Bar, WithTwoGenerics<'u8', 'u8'>>>
  readonly twoGenericsNestedVec: ToField<
    Vector<WithTwoGenerics<Bar, Vector<WithTwoGenerics<T0, 'u8'>>>>
  >
  readonly dummy: ToField<Dummy>
  readonly other: ToField<StructFromOtherModule>

  private constructor(typeArg: string, fields: FooFields<T0>) {
    this.$typeArg = typeArg

    this.id = fields.id
    this.generic = fields.generic
    this.reifiedPrimitiveVec = fields.reifiedPrimitiveVec
    this.reifiedObjectVec = fields.reifiedObjectVec
    this.genericVec = fields.genericVec
    this.genericVecNested = fields.genericVecNested
    this.twoGenerics = fields.twoGenerics
    this.twoGenericsReifiedPrimitive = fields.twoGenericsReifiedPrimitive
    this.twoGenericsReifiedObject = fields.twoGenericsReifiedObject
    this.twoGenericsNested = fields.twoGenericsNested
    this.twoGenericsReifiedNested = fields.twoGenericsReifiedNested
    this.twoGenericsNestedVec = fields.twoGenericsNestedVec
    this.dummy = fields.dummy
    this.other = fields.other
  }

  static new<T0 extends Reified<TypeArgument>>(
    typeArg: T0,
    fields: FooFields<ToTypeArgument<T0>>
  ): Foo<ToTypeArgument<T0>> {
    return new Foo(extractType(typeArg), fields)
  }

  static reified<T0 extends Reified<TypeArgument>>(T0: T0): Reified<Foo<ToTypeArgument<T0>>> {
    return {
      typeName: Foo.$typeName,
      fullTypeName: composeSuiType(
        Foo.$typeName,
        ...[extractType(T0)]
      ) as `0x8b699fdce543505aeb290ee1b6b5d20fcaa8e8b1a5fc137a8b3facdfa2902209::fixture::Foo<${ToTypeStr<
        ToTypeArgument<T0>
      >}>`,
      typeArgs: [T0],
      fromFields: (fields: Record<string, any>) => Foo.fromFields(T0, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Foo.fromFieldsWithTypes(T0, item),
      fromBcs: (data: Uint8Array) => Foo.fromBcs(T0, data),
      bcs: Foo.bcs(toBcs(T0)),
      fromJSONField: (field: any) => Foo.fromJSONField(T0, field),
      fetch: async (client: SuiClient, id: string) => Foo.fetch(client, T0, id),
      kind: 'StructClassReified',
    }
  }

  static fromFields<T0 extends Reified<TypeArgument>>(
    typeArg: T0,
    fields: Record<string, any>
  ): Foo<ToTypeArgument<T0>> {
    return Foo.new(typeArg, {
      id: decodeFromFields(UID.reified(), fields.id),
      generic: decodeFromFields(typeArg, fields.generic),
      reifiedPrimitiveVec: decodeFromFields(reified.vector('u64'), fields.reified_primitive_vec),
      reifiedObjectVec: decodeFromFields(reified.vector(Bar.reified()), fields.reified_object_vec),
      genericVec: decodeFromFields(reified.vector(typeArg), fields.generic_vec),
      genericVecNested: decodeFromFields(
        reified.vector(WithTwoGenerics.reified(typeArg, 'u8')),
        fields.generic_vec_nested
      ),
      twoGenerics: decodeFromFields(
        WithTwoGenerics.reified(typeArg, Bar.reified()),
        fields.two_generics
      ),
      twoGenericsReifiedPrimitive: decodeFromFields(
        WithTwoGenerics.reified('u16', 'u64'),
        fields.two_generics_reified_primitive
      ),
      twoGenericsReifiedObject: decodeFromFields(
        WithTwoGenerics.reified(Bar.reified(), Bar.reified()),
        fields.two_generics_reified_object
      ),
      twoGenericsNested: decodeFromFields(
        WithTwoGenerics.reified(typeArg, WithTwoGenerics.reified('u8', 'u8')),
        fields.two_generics_nested
      ),
      twoGenericsReifiedNested: decodeFromFields(
        WithTwoGenerics.reified(Bar.reified(), WithTwoGenerics.reified('u8', 'u8')),
        fields.two_generics_reified_nested
      ),
      twoGenericsNestedVec: decodeFromFields(
        reified.vector(
          WithTwoGenerics.reified(
            Bar.reified(),
            reified.vector(WithTwoGenerics.reified(typeArg, 'u8'))
          )
        ),
        fields.two_generics_nested_vec
      ),
      dummy: decodeFromFields(Dummy.reified(), fields.dummy),
      other: decodeFromFields(StructFromOtherModule.reified(), fields.other),
    })
  }

  static fromFieldsWithTypes<T0 extends Reified<TypeArgument>>(
    typeArg: T0,
    item: FieldsWithTypes
  ): Foo<ToTypeArgument<T0>> {
    if (!isFoo(item.type)) {
      throw new Error('not a Foo type')
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg])

    return Foo.new(typeArg, {
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      generic: decodeFromFieldsWithTypes(typeArg, item.fields.generic),
      reifiedPrimitiveVec: decodeFromFieldsWithTypes(
        reified.vector('u64'),
        item.fields.reified_primitive_vec
      ),
      reifiedObjectVec: decodeFromFieldsWithTypes(
        reified.vector(Bar.reified()),
        item.fields.reified_object_vec
      ),
      genericVec: decodeFromFieldsWithTypes(reified.vector(typeArg), item.fields.generic_vec),
      genericVecNested: decodeFromFieldsWithTypes(
        reified.vector(WithTwoGenerics.reified(typeArg, 'u8')),
        item.fields.generic_vec_nested
      ),
      twoGenerics: decodeFromFieldsWithTypes(
        WithTwoGenerics.reified(typeArg, Bar.reified()),
        item.fields.two_generics
      ),
      twoGenericsReifiedPrimitive: decodeFromFieldsWithTypes(
        WithTwoGenerics.reified('u16', 'u64'),
        item.fields.two_generics_reified_primitive
      ),
      twoGenericsReifiedObject: decodeFromFieldsWithTypes(
        WithTwoGenerics.reified(Bar.reified(), Bar.reified()),
        item.fields.two_generics_reified_object
      ),
      twoGenericsNested: decodeFromFieldsWithTypes(
        WithTwoGenerics.reified(typeArg, WithTwoGenerics.reified('u8', 'u8')),
        item.fields.two_generics_nested
      ),
      twoGenericsReifiedNested: decodeFromFieldsWithTypes(
        WithTwoGenerics.reified(Bar.reified(), WithTwoGenerics.reified('u8', 'u8')),
        item.fields.two_generics_reified_nested
      ),
      twoGenericsNestedVec: decodeFromFieldsWithTypes(
        reified.vector(
          WithTwoGenerics.reified(
            Bar.reified(),
            reified.vector(WithTwoGenerics.reified(typeArg, 'u8'))
          )
        ),
        item.fields.two_generics_nested_vec
      ),
      dummy: decodeFromFieldsWithTypes(Dummy.reified(), item.fields.dummy),
      other: decodeFromFieldsWithTypes(StructFromOtherModule.reified(), item.fields.other),
    })
  }

  static fromBcs<T0 extends Reified<TypeArgument>>(
    typeArg: T0,
    data: Uint8Array
  ): Foo<ToTypeArgument<T0>> {
    const typeArgs = [typeArg]

    return Foo.fromFields(typeArg, Foo.bcs(toBcs(typeArgs[0])).parse(data))
  }

  toJSONField() {
    return {
      id: this.id,
      generic: fieldToJSON<T0>(this.$typeArg, this.generic),
      reifiedPrimitiveVec: fieldToJSON<Vector<'u64'>>(`vector<u64>`, this.reifiedPrimitiveVec),
      reifiedObjectVec: fieldToJSON<Vector<Bar>>(
        `vector<0x8b699fdce543505aeb290ee1b6b5d20fcaa8e8b1a5fc137a8b3facdfa2902209::fixture::Bar>`,
        this.reifiedObjectVec
      ),
      genericVec: fieldToJSON<Vector<T0>>(`vector<${this.$typeArg}>`, this.genericVec),
      genericVecNested: fieldToJSON<Vector<WithTwoGenerics<T0, 'u8'>>>(
        `vector<0x8b699fdce543505aeb290ee1b6b5d20fcaa8e8b1a5fc137a8b3facdfa2902209::fixture::WithTwoGenerics<${this.$typeArg}, u8>>`,
        this.genericVecNested
      ),
      twoGenerics: this.twoGenerics.toJSONField(),
      twoGenericsReifiedPrimitive: this.twoGenericsReifiedPrimitive.toJSONField(),
      twoGenericsReifiedObject: this.twoGenericsReifiedObject.toJSONField(),
      twoGenericsNested: this.twoGenericsNested.toJSONField(),
      twoGenericsReifiedNested: this.twoGenericsReifiedNested.toJSONField(),
      twoGenericsNestedVec: fieldToJSON<
        Vector<WithTwoGenerics<Bar, Vector<WithTwoGenerics<T0, 'u8'>>>>
      >(
        `vector<0x8b699fdce543505aeb290ee1b6b5d20fcaa8e8b1a5fc137a8b3facdfa2902209::fixture::WithTwoGenerics<0x8b699fdce543505aeb290ee1b6b5d20fcaa8e8b1a5fc137a8b3facdfa2902209::fixture::Bar, vector<0x8b699fdce543505aeb290ee1b6b5d20fcaa8e8b1a5fc137a8b3facdfa2902209::fixture::WithTwoGenerics<${this.$typeArg}, u8>>>>`,
        this.twoGenericsNestedVec
      ),
      dummy: this.dummy.toJSONField(),
      other: this.other.toJSONField(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArg: this.$typeArg, ...this.toJSONField() }
  }

  static fromJSONField<T0 extends Reified<TypeArgument>>(
    typeArg: T0,
    field: any
  ): Foo<ToTypeArgument<T0>> {
    return Foo.new(typeArg, {
      id: decodeFromJSONField(UID.reified(), field.id),
      generic: decodeFromJSONField(typeArg, field.generic),
      reifiedPrimitiveVec: decodeFromJSONField(reified.vector('u64'), field.reifiedPrimitiveVec),
      reifiedObjectVec: decodeFromJSONField(reified.vector(Bar.reified()), field.reifiedObjectVec),
      genericVec: decodeFromJSONField(reified.vector(typeArg), field.genericVec),
      genericVecNested: decodeFromJSONField(
        reified.vector(WithTwoGenerics.reified(typeArg, 'u8')),
        field.genericVecNested
      ),
      twoGenerics: decodeFromJSONField(
        WithTwoGenerics.reified(typeArg, Bar.reified()),
        field.twoGenerics
      ),
      twoGenericsReifiedPrimitive: decodeFromJSONField(
        WithTwoGenerics.reified('u16', 'u64'),
        field.twoGenericsReifiedPrimitive
      ),
      twoGenericsReifiedObject: decodeFromJSONField(
        WithTwoGenerics.reified(Bar.reified(), Bar.reified()),
        field.twoGenericsReifiedObject
      ),
      twoGenericsNested: decodeFromJSONField(
        WithTwoGenerics.reified(typeArg, WithTwoGenerics.reified('u8', 'u8')),
        field.twoGenericsNested
      ),
      twoGenericsReifiedNested: decodeFromJSONField(
        WithTwoGenerics.reified(Bar.reified(), WithTwoGenerics.reified('u8', 'u8')),
        field.twoGenericsReifiedNested
      ),
      twoGenericsNestedVec: decodeFromJSONField(
        reified.vector(
          WithTwoGenerics.reified(
            Bar.reified(),
            reified.vector(WithTwoGenerics.reified(typeArg, 'u8'))
          )
        ),
        field.twoGenericsNestedVec
      ),
      dummy: decodeFromJSONField(Dummy.reified(), field.dummy),
      other: decodeFromJSONField(StructFromOtherModule.reified(), field.other),
    })
  }

  static fromJSON<T0 extends Reified<TypeArgument>>(
    typeArg: T0,
    json: Record<string, any>
  ): Foo<ToTypeArgument<T0>> {
    if (json.$typeName !== Foo.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(Foo.$typeName, extractType(typeArg)),
      [json.$typeArg],
      [typeArg]
    )

    return Foo.fromJSONField(typeArg, json)
  }

  static fromSuiParsedData<T0 extends Reified<TypeArgument>>(
    typeArg: T0,
    content: SuiParsedData
  ): Foo<ToTypeArgument<T0>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isFoo(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a Foo object`)
    }
    return Foo.fromFieldsWithTypes(typeArg, content)
  }

  static async fetch<T0 extends Reified<TypeArgument>>(
    client: SuiClient,
    typeArg: T0,
    id: string
  ): Promise<Foo<ToTypeArgument<T0>>> {
    const res = await client.getObject({ id, options: { showContent: true } })
    if (res.error) {
      throw new Error(`error fetching Foo object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.content?.dataType !== 'moveObject' || !isFoo(res.data.content.type)) {
      throw new Error(`object at id ${id} is not a Foo object`)
    }
    return Foo.fromFieldsWithTypes(typeArg, res.data.content)
  }
}

/* ============================== WithSpecialTypes =============================== */

export function isWithSpecialTypes(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(
    '0x8b699fdce543505aeb290ee1b6b5d20fcaa8e8b1a5fc137a8b3facdfa2902209::fixture::WithSpecialTypes<'
  )
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface WithSpecialTypesFields<T0 extends PhantomTypeArgument, T1 extends TypeArgument> {
  id: ToField<UID>
  string: ToField<String>
  asciiString: ToField<String1>
  url: ToField<Url>
  idField: ToField<ID>
  uid: ToField<UID>
  balance: ToField<Balance<ToPhantom<SUI>>>
  option: ToField<Option<'u64'>>
  optionObj: ToField<Option<Bar>>
  optionNone: ToField<Option<'u64'>>
  balanceGeneric: ToField<Balance<T0>>
  optionGeneric: ToField<Option<T1>>
  optionGenericNone: ToField<Option<T1>>
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class WithSpecialTypes<T0 extends PhantomTypeArgument, T1 extends TypeArgument> {
  static readonly $typeName =
    '0x8b699fdce543505aeb290ee1b6b5d20fcaa8e8b1a5fc137a8b3facdfa2902209::fixture::WithSpecialTypes'
  static readonly $numTypeParams = 2

  readonly $fullTypeName =
    null as unknown as `0x8b699fdce543505aeb290ee1b6b5d20fcaa8e8b1a5fc137a8b3facdfa2902209::fixture::WithSpecialTypes<${ToTypeStr<T0>}, ${ToTypeStr<T1>}>`

  readonly $typeName = WithSpecialTypes.$typeName

  static get bcs() {
    return <T1 extends BcsType<any>>(T1: T1) =>
      bcs.struct(`WithSpecialTypes<${T1.name}>`, {
        id: UID.bcs,
        string: String.bcs,
        ascii_string: String1.bcs,
        url: Url.bcs,
        id_field: ID.bcs,
        uid: UID.bcs,
        balance: Balance.bcs,
        option: Option.bcs(bcs.u64()),
        option_obj: Option.bcs(Bar.bcs),
        option_none: Option.bcs(bcs.u64()),
        balance_generic: Balance.bcs,
        option_generic: Option.bcs(T1),
        option_generic_none: Option.bcs(T1),
      })
  }

  readonly $typeArgs: [string, string]

  readonly id: ToField<UID>
  readonly string: ToField<String>
  readonly asciiString: ToField<String1>
  readonly url: ToField<Url>
  readonly idField: ToField<ID>
  readonly uid: ToField<UID>
  readonly balance: ToField<Balance<ToPhantom<SUI>>>
  readonly option: ToField<Option<'u64'>>
  readonly optionObj: ToField<Option<Bar>>
  readonly optionNone: ToField<Option<'u64'>>
  readonly balanceGeneric: ToField<Balance<T0>>
  readonly optionGeneric: ToField<Option<T1>>
  readonly optionGenericNone: ToField<Option<T1>>

  private constructor(typeArgs: [string, string], fields: WithSpecialTypesFields<T0, T1>) {
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.string = fields.string
    this.asciiString = fields.asciiString
    this.url = fields.url
    this.idField = fields.idField
    this.uid = fields.uid
    this.balance = fields.balance
    this.option = fields.option
    this.optionObj = fields.optionObj
    this.optionNone = fields.optionNone
    this.balanceGeneric = fields.balanceGeneric
    this.optionGeneric = fields.optionGeneric
    this.optionGenericNone = fields.optionGenericNone
  }

  static new<T0 extends ReifiedPhantomTypeArgument, T1 extends Reified<TypeArgument>>(
    typeArgs: [T0, T1],
    fields: WithSpecialTypesFields<ToPhantomTypeArgument<T0>, ToTypeArgument<T1>>
  ): WithSpecialTypes<ToPhantomTypeArgument<T0>, ToTypeArgument<T1>> {
    return new WithSpecialTypes(typeArgs.map(extractType) as [string, string], fields)
  }

  static reified<T0 extends ReifiedPhantomTypeArgument, T1 extends Reified<TypeArgument>>(
    T0: T0,
    T1: T1
  ): Reified<WithSpecialTypes<ToPhantomTypeArgument<T0>, ToTypeArgument<T1>>> {
    return {
      typeName: WithSpecialTypes.$typeName,
      fullTypeName: composeSuiType(
        WithSpecialTypes.$typeName,
        ...[extractType(T0), extractType(T1)]
      ) as `0x8b699fdce543505aeb290ee1b6b5d20fcaa8e8b1a5fc137a8b3facdfa2902209::fixture::WithSpecialTypes<${ToTypeStr<
        ToPhantomTypeArgument<T0>
      >}, ${ToTypeStr<ToTypeArgument<T1>>}>`,
      typeArgs: [T0, T1],
      fromFields: (fields: Record<string, any>) => WithSpecialTypes.fromFields([T0, T1], fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        WithSpecialTypes.fromFieldsWithTypes([T0, T1], item),
      fromBcs: (data: Uint8Array) => WithSpecialTypes.fromBcs([T0, T1], data),
      bcs: WithSpecialTypes.bcs(toBcs(T1)),
      fromJSONField: (field: any) => WithSpecialTypes.fromJSONField([T0, T1], field),
      fetch: async (client: SuiClient, id: string) => WithSpecialTypes.fetch(client, [T0, T1], id),
      kind: 'StructClassReified',
    }
  }

  static fromFields<T0 extends ReifiedPhantomTypeArgument, T1 extends Reified<TypeArgument>>(
    typeArgs: [T0, T1],
    fields: Record<string, any>
  ): WithSpecialTypes<ToPhantomTypeArgument<T0>, ToTypeArgument<T1>> {
    return WithSpecialTypes.new(typeArgs, {
      id: decodeFromFields(UID.reified(), fields.id),
      string: decodeFromFields(String.reified(), fields.string),
      asciiString: decodeFromFields(String1.reified(), fields.ascii_string),
      url: decodeFromFields(Url.reified(), fields.url),
      idField: decodeFromFields(ID.reified(), fields.id_field),
      uid: decodeFromFields(UID.reified(), fields.uid),
      balance: decodeFromFields(Balance.reified(reified.phantom(SUI.reified())), fields.balance),
      option: decodeFromFields(Option.reified('u64'), fields.option),
      optionObj: decodeFromFields(Option.reified(Bar.reified()), fields.option_obj),
      optionNone: decodeFromFields(Option.reified('u64'), fields.option_none),
      balanceGeneric: decodeFromFields(Balance.reified(typeArgs[0]), fields.balance_generic),
      optionGeneric: decodeFromFields(Option.reified(typeArgs[1]), fields.option_generic),
      optionGenericNone: decodeFromFields(Option.reified(typeArgs[1]), fields.option_generic_none),
    })
  }

  static fromFieldsWithTypes<
    T0 extends ReifiedPhantomTypeArgument,
    T1 extends Reified<TypeArgument>,
  >(
    typeArgs: [T0, T1],
    item: FieldsWithTypes
  ): WithSpecialTypes<ToPhantomTypeArgument<T0>, ToTypeArgument<T1>> {
    if (!isWithSpecialTypes(item.type)) {
      throw new Error('not a WithSpecialTypes type')
    }
    assertFieldsWithTypesArgsMatch(item, typeArgs)

    return WithSpecialTypes.new(typeArgs, {
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      string: decodeFromFieldsWithTypes(String.reified(), item.fields.string),
      asciiString: decodeFromFieldsWithTypes(String1.reified(), item.fields.ascii_string),
      url: decodeFromFieldsWithTypes(Url.reified(), item.fields.url),
      idField: decodeFromFieldsWithTypes(ID.reified(), item.fields.id_field),
      uid: decodeFromFieldsWithTypes(UID.reified(), item.fields.uid),
      balance: decodeFromFieldsWithTypes(
        Balance.reified(reified.phantom(SUI.reified())),
        item.fields.balance
      ),
      option: decodeFromFieldsWithTypes(Option.reified('u64'), item.fields.option),
      optionObj: decodeFromFieldsWithTypes(Option.reified(Bar.reified()), item.fields.option_obj),
      optionNone: decodeFromFieldsWithTypes(Option.reified('u64'), item.fields.option_none),
      balanceGeneric: decodeFromFieldsWithTypes(
        Balance.reified(typeArgs[0]),
        item.fields.balance_generic
      ),
      optionGeneric: decodeFromFieldsWithTypes(
        Option.reified(typeArgs[1]),
        item.fields.option_generic
      ),
      optionGenericNone: decodeFromFieldsWithTypes(
        Option.reified(typeArgs[1]),
        item.fields.option_generic_none
      ),
    })
  }

  static fromBcs<T0 extends ReifiedPhantomTypeArgument, T1 extends Reified<TypeArgument>>(
    typeArgs: [T0, T1],
    data: Uint8Array
  ): WithSpecialTypes<ToPhantomTypeArgument<T0>, ToTypeArgument<T1>> {
    return WithSpecialTypes.fromFields(
      typeArgs,
      WithSpecialTypes.bcs(toBcs(typeArgs[1])).parse(data)
    )
  }

  toJSONField() {
    return {
      id: this.id,
      string: this.string,
      asciiString: this.asciiString,
      url: this.url,
      idField: this.idField,
      uid: this.uid,
      balance: this.balance.toJSONField(),
      option: fieldToJSON<Option<'u64'>>(`0x1::option::Option<u64>`, this.option),
      optionObj: fieldToJSON<Option<Bar>>(
        `0x1::option::Option<0x8b699fdce543505aeb290ee1b6b5d20fcaa8e8b1a5fc137a8b3facdfa2902209::fixture::Bar>`,
        this.optionObj
      ),
      optionNone: fieldToJSON<Option<'u64'>>(`0x1::option::Option<u64>`, this.optionNone),
      balanceGeneric: this.balanceGeneric.toJSONField(),
      optionGeneric: fieldToJSON<Option<T1>>(
        `0x1::option::Option<${this.$typeArgs[1]}>`,
        this.optionGeneric
      ),
      optionGenericNone: fieldToJSON<Option<T1>>(
        `0x1::option::Option<${this.$typeArgs[1]}>`,
        this.optionGenericNone
      ),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<T0 extends ReifiedPhantomTypeArgument, T1 extends Reified<TypeArgument>>(
    typeArgs: [T0, T1],
    field: any
  ): WithSpecialTypes<ToPhantomTypeArgument<T0>, ToTypeArgument<T1>> {
    return WithSpecialTypes.new(typeArgs, {
      id: decodeFromJSONField(UID.reified(), field.id),
      string: decodeFromJSONField(String.reified(), field.string),
      asciiString: decodeFromJSONField(String1.reified(), field.asciiString),
      url: decodeFromJSONField(Url.reified(), field.url),
      idField: decodeFromJSONField(ID.reified(), field.idField),
      uid: decodeFromJSONField(UID.reified(), field.uid),
      balance: decodeFromJSONField(Balance.reified(reified.phantom(SUI.reified())), field.balance),
      option: decodeFromJSONField(Option.reified('u64'), field.option),
      optionObj: decodeFromJSONField(Option.reified(Bar.reified()), field.optionObj),
      optionNone: decodeFromJSONField(Option.reified('u64'), field.optionNone),
      balanceGeneric: decodeFromJSONField(Balance.reified(typeArgs[0]), field.balanceGeneric),
      optionGeneric: decodeFromJSONField(Option.reified(typeArgs[1]), field.optionGeneric),
      optionGenericNone: decodeFromJSONField(Option.reified(typeArgs[1]), field.optionGenericNone),
    })
  }

  static fromJSON<T0 extends ReifiedPhantomTypeArgument, T1 extends Reified<TypeArgument>>(
    typeArgs: [T0, T1],
    json: Record<string, any>
  ): WithSpecialTypes<ToPhantomTypeArgument<T0>, ToTypeArgument<T1>> {
    if (json.$typeName !== WithSpecialTypes.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(WithSpecialTypes.$typeName, ...typeArgs.map(extractType)),
      json.$typeArgs,
      typeArgs
    )

    return WithSpecialTypes.fromJSONField(typeArgs, json)
  }

  static fromSuiParsedData<T0 extends ReifiedPhantomTypeArgument, T1 extends Reified<TypeArgument>>(
    typeArgs: [T0, T1],
    content: SuiParsedData
  ): WithSpecialTypes<ToPhantomTypeArgument<T0>, ToTypeArgument<T1>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isWithSpecialTypes(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a WithSpecialTypes object`)
    }
    return WithSpecialTypes.fromFieldsWithTypes(typeArgs, content)
  }

  static async fetch<T0 extends ReifiedPhantomTypeArgument, T1 extends Reified<TypeArgument>>(
    client: SuiClient,
    typeArgs: [T0, T1],
    id: string
  ): Promise<WithSpecialTypes<ToPhantomTypeArgument<T0>, ToTypeArgument<T1>>> {
    const res = await client.getObject({ id, options: { showContent: true } })
    if (res.error) {
      throw new Error(`error fetching WithSpecialTypes object at id ${id}: ${res.error.code}`)
    }
    if (
      res.data?.content?.dataType !== 'moveObject' ||
      !isWithSpecialTypes(res.data.content.type)
    ) {
      throw new Error(`object at id ${id} is not a WithSpecialTypes object`)
    }
    return WithSpecialTypes.fromFieldsWithTypes(typeArgs, res.data.content)
  }
}

/* ============================== WithSpecialTypesAsGenerics =============================== */

export function isWithSpecialTypesAsGenerics(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(
    '0x8b699fdce543505aeb290ee1b6b5d20fcaa8e8b1a5fc137a8b3facdfa2902209::fixture::WithSpecialTypesAsGenerics<'
  )
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface WithSpecialTypesAsGenericsFields<
  T0 extends TypeArgument,
  T1 extends TypeArgument,
  T2 extends TypeArgument,
  T3 extends TypeArgument,
  T4 extends TypeArgument,
  T5 extends TypeArgument,
  T6 extends TypeArgument,
  T7 extends TypeArgument,
> {
  id: ToField<UID>
  string: ToField<T0>
  asciiString: ToField<T1>
  url: ToField<T2>
  idField: ToField<T3>
  uid: ToField<T4>
  balance: ToField<T5>
  option: ToField<T6>
  optionNone: ToField<T7>
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class WithSpecialTypesAsGenerics<
  T0 extends TypeArgument,
  T1 extends TypeArgument,
  T2 extends TypeArgument,
  T3 extends TypeArgument,
  T4 extends TypeArgument,
  T5 extends TypeArgument,
  T6 extends TypeArgument,
  T7 extends TypeArgument,
> {
  static readonly $typeName =
    '0x8b699fdce543505aeb290ee1b6b5d20fcaa8e8b1a5fc137a8b3facdfa2902209::fixture::WithSpecialTypesAsGenerics'
  static readonly $numTypeParams = 8

  readonly $fullTypeName =
    null as unknown as `0x8b699fdce543505aeb290ee1b6b5d20fcaa8e8b1a5fc137a8b3facdfa2902209::fixture::WithSpecialTypesAsGenerics<${ToTypeStr<T0>}, ${ToTypeStr<T1>}, ${ToTypeStr<T2>}, ${ToTypeStr<T3>}, ${ToTypeStr<T4>}, ${ToTypeStr<T5>}, ${ToTypeStr<T6>}, ${ToTypeStr<T7>}>`

  readonly $typeName = WithSpecialTypesAsGenerics.$typeName

  static get bcs() {
    return <
      T0 extends BcsType<any>,
      T1 extends BcsType<any>,
      T2 extends BcsType<any>,
      T3 extends BcsType<any>,
      T4 extends BcsType<any>,
      T5 extends BcsType<any>,
      T6 extends BcsType<any>,
      T7 extends BcsType<any>,
    >(
      T0: T0,
      T1: T1,
      T2: T2,
      T3: T3,
      T4: T4,
      T5: T5,
      T6: T6,
      T7: T7
    ) =>
      bcs.struct(
        `WithSpecialTypesAsGenerics<${T0.name}, ${T1.name}, ${T2.name}, ${T3.name}, ${T4.name}, ${T5.name}, ${T6.name}, ${T7.name}>`,
        {
          id: UID.bcs,
          string: T0,
          ascii_string: T1,
          url: T2,
          id_field: T3,
          uid: T4,
          balance: T5,
          option: T6,
          option_none: T7,
        }
      )
  }

  readonly $typeArgs: [string, string, string, string, string, string, string, string]

  readonly id: ToField<UID>
  readonly string: ToField<T0>
  readonly asciiString: ToField<T1>
  readonly url: ToField<T2>
  readonly idField: ToField<T3>
  readonly uid: ToField<T4>
  readonly balance: ToField<T5>
  readonly option: ToField<T6>
  readonly optionNone: ToField<T7>

  private constructor(
    typeArgs: [string, string, string, string, string, string, string, string],
    fields: WithSpecialTypesAsGenericsFields<T0, T1, T2, T3, T4, T5, T6, T7>
  ) {
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.string = fields.string
    this.asciiString = fields.asciiString
    this.url = fields.url
    this.idField = fields.idField
    this.uid = fields.uid
    this.balance = fields.balance
    this.option = fields.option
    this.optionNone = fields.optionNone
  }

  static new<
    T0 extends Reified<TypeArgument>,
    T1 extends Reified<TypeArgument>,
    T2 extends Reified<TypeArgument>,
    T3 extends Reified<TypeArgument>,
    T4 extends Reified<TypeArgument>,
    T5 extends Reified<TypeArgument>,
    T6 extends Reified<TypeArgument>,
    T7 extends Reified<TypeArgument>,
  >(
    typeArgs: [T0, T1, T2, T3, T4, T5, T6, T7],
    fields: WithSpecialTypesAsGenericsFields<
      ToTypeArgument<T0>,
      ToTypeArgument<T1>,
      ToTypeArgument<T2>,
      ToTypeArgument<T3>,
      ToTypeArgument<T4>,
      ToTypeArgument<T5>,
      ToTypeArgument<T6>,
      ToTypeArgument<T7>
    >
  ): WithSpecialTypesAsGenerics<
    ToTypeArgument<T0>,
    ToTypeArgument<T1>,
    ToTypeArgument<T2>,
    ToTypeArgument<T3>,
    ToTypeArgument<T4>,
    ToTypeArgument<T5>,
    ToTypeArgument<T6>,
    ToTypeArgument<T7>
  > {
    return new WithSpecialTypesAsGenerics(
      typeArgs.map(extractType) as [string, string, string, string, string, string, string, string],
      fields
    )
  }

  static reified<
    T0 extends Reified<TypeArgument>,
    T1 extends Reified<TypeArgument>,
    T2 extends Reified<TypeArgument>,
    T3 extends Reified<TypeArgument>,
    T4 extends Reified<TypeArgument>,
    T5 extends Reified<TypeArgument>,
    T6 extends Reified<TypeArgument>,
    T7 extends Reified<TypeArgument>,
  >(
    T0: T0,
    T1: T1,
    T2: T2,
    T3: T3,
    T4: T4,
    T5: T5,
    T6: T6,
    T7: T7
  ): Reified<
    WithSpecialTypesAsGenerics<
      ToTypeArgument<T0>,
      ToTypeArgument<T1>,
      ToTypeArgument<T2>,
      ToTypeArgument<T3>,
      ToTypeArgument<T4>,
      ToTypeArgument<T5>,
      ToTypeArgument<T6>,
      ToTypeArgument<T7>
    >
  > {
    return {
      typeName: WithSpecialTypesAsGenerics.$typeName,
      fullTypeName: composeSuiType(
        WithSpecialTypesAsGenerics.$typeName,
        ...[
          extractType(T0),
          extractType(T1),
          extractType(T2),
          extractType(T3),
          extractType(T4),
          extractType(T5),
          extractType(T6),
          extractType(T7),
        ]
      ) as `0x8b699fdce543505aeb290ee1b6b5d20fcaa8e8b1a5fc137a8b3facdfa2902209::fixture::WithSpecialTypesAsGenerics<${ToTypeStr<
        ToTypeArgument<T0>
      >}, ${ToTypeStr<ToTypeArgument<T1>>}, ${ToTypeStr<ToTypeArgument<T2>>}, ${ToTypeStr<
        ToTypeArgument<T3>
      >}, ${ToTypeStr<ToTypeArgument<T4>>}, ${ToTypeStr<ToTypeArgument<T5>>}, ${ToTypeStr<
        ToTypeArgument<T6>
      >}, ${ToTypeStr<ToTypeArgument<T7>>}>`,
      typeArgs: [T0, T1, T2, T3, T4, T5, T6, T7],
      fromFields: (fields: Record<string, any>) =>
        WithSpecialTypesAsGenerics.fromFields([T0, T1, T2, T3, T4, T5, T6, T7], fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        WithSpecialTypesAsGenerics.fromFieldsWithTypes([T0, T1, T2, T3, T4, T5, T6, T7], item),
      fromBcs: (data: Uint8Array) =>
        WithSpecialTypesAsGenerics.fromBcs([T0, T1, T2, T3, T4, T5, T6, T7], data),
      bcs: WithSpecialTypesAsGenerics.bcs(
        toBcs(T0),
        toBcs(T1),
        toBcs(T2),
        toBcs(T3),
        toBcs(T4),
        toBcs(T5),
        toBcs(T6),
        toBcs(T7)
      ),
      fromJSONField: (field: any) =>
        WithSpecialTypesAsGenerics.fromJSONField([T0, T1, T2, T3, T4, T5, T6, T7], field),
      fetch: async (client: SuiClient, id: string) =>
        WithSpecialTypesAsGenerics.fetch(client, [T0, T1, T2, T3, T4, T5, T6, T7], id),
      kind: 'StructClassReified',
    }
  }

  static fromFields<
    T0 extends Reified<TypeArgument>,
    T1 extends Reified<TypeArgument>,
    T2 extends Reified<TypeArgument>,
    T3 extends Reified<TypeArgument>,
    T4 extends Reified<TypeArgument>,
    T5 extends Reified<TypeArgument>,
    T6 extends Reified<TypeArgument>,
    T7 extends Reified<TypeArgument>,
  >(
    typeArgs: [T0, T1, T2, T3, T4, T5, T6, T7],
    fields: Record<string, any>
  ): WithSpecialTypesAsGenerics<
    ToTypeArgument<T0>,
    ToTypeArgument<T1>,
    ToTypeArgument<T2>,
    ToTypeArgument<T3>,
    ToTypeArgument<T4>,
    ToTypeArgument<T5>,
    ToTypeArgument<T6>,
    ToTypeArgument<T7>
  > {
    return WithSpecialTypesAsGenerics.new(typeArgs, {
      id: decodeFromFields(UID.reified(), fields.id),
      string: decodeFromFields(typeArgs[0], fields.string),
      asciiString: decodeFromFields(typeArgs[1], fields.ascii_string),
      url: decodeFromFields(typeArgs[2], fields.url),
      idField: decodeFromFields(typeArgs[3], fields.id_field),
      uid: decodeFromFields(typeArgs[4], fields.uid),
      balance: decodeFromFields(typeArgs[5], fields.balance),
      option: decodeFromFields(typeArgs[6], fields.option),
      optionNone: decodeFromFields(typeArgs[7], fields.option_none),
    })
  }

  static fromFieldsWithTypes<
    T0 extends Reified<TypeArgument>,
    T1 extends Reified<TypeArgument>,
    T2 extends Reified<TypeArgument>,
    T3 extends Reified<TypeArgument>,
    T4 extends Reified<TypeArgument>,
    T5 extends Reified<TypeArgument>,
    T6 extends Reified<TypeArgument>,
    T7 extends Reified<TypeArgument>,
  >(
    typeArgs: [T0, T1, T2, T3, T4, T5, T6, T7],
    item: FieldsWithTypes
  ): WithSpecialTypesAsGenerics<
    ToTypeArgument<T0>,
    ToTypeArgument<T1>,
    ToTypeArgument<T2>,
    ToTypeArgument<T3>,
    ToTypeArgument<T4>,
    ToTypeArgument<T5>,
    ToTypeArgument<T6>,
    ToTypeArgument<T7>
  > {
    if (!isWithSpecialTypesAsGenerics(item.type)) {
      throw new Error('not a WithSpecialTypesAsGenerics type')
    }
    assertFieldsWithTypesArgsMatch(item, typeArgs)

    return WithSpecialTypesAsGenerics.new(typeArgs, {
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      string: decodeFromFieldsWithTypes(typeArgs[0], item.fields.string),
      asciiString: decodeFromFieldsWithTypes(typeArgs[1], item.fields.ascii_string),
      url: decodeFromFieldsWithTypes(typeArgs[2], item.fields.url),
      idField: decodeFromFieldsWithTypes(typeArgs[3], item.fields.id_field),
      uid: decodeFromFieldsWithTypes(typeArgs[4], item.fields.uid),
      balance: decodeFromFieldsWithTypes(typeArgs[5], item.fields.balance),
      option: decodeFromFieldsWithTypes(typeArgs[6], item.fields.option),
      optionNone: decodeFromFieldsWithTypes(typeArgs[7], item.fields.option_none),
    })
  }

  static fromBcs<
    T0 extends Reified<TypeArgument>,
    T1 extends Reified<TypeArgument>,
    T2 extends Reified<TypeArgument>,
    T3 extends Reified<TypeArgument>,
    T4 extends Reified<TypeArgument>,
    T5 extends Reified<TypeArgument>,
    T6 extends Reified<TypeArgument>,
    T7 extends Reified<TypeArgument>,
  >(
    typeArgs: [T0, T1, T2, T3, T4, T5, T6, T7],
    data: Uint8Array
  ): WithSpecialTypesAsGenerics<
    ToTypeArgument<T0>,
    ToTypeArgument<T1>,
    ToTypeArgument<T2>,
    ToTypeArgument<T3>,
    ToTypeArgument<T4>,
    ToTypeArgument<T5>,
    ToTypeArgument<T6>,
    ToTypeArgument<T7>
  > {
    return WithSpecialTypesAsGenerics.fromFields(
      typeArgs,
      WithSpecialTypesAsGenerics.bcs(
        toBcs(typeArgs[0]),
        toBcs(typeArgs[1]),
        toBcs(typeArgs[2]),
        toBcs(typeArgs[3]),
        toBcs(typeArgs[4]),
        toBcs(typeArgs[5]),
        toBcs(typeArgs[6]),
        toBcs(typeArgs[7])
      ).parse(data)
    )
  }

  toJSONField() {
    return {
      id: this.id,
      string: fieldToJSON<T0>(this.$typeArgs[0], this.string),
      asciiString: fieldToJSON<T1>(this.$typeArgs[1], this.asciiString),
      url: fieldToJSON<T2>(this.$typeArgs[2], this.url),
      idField: fieldToJSON<T3>(this.$typeArgs[3], this.idField),
      uid: fieldToJSON<T4>(this.$typeArgs[4], this.uid),
      balance: fieldToJSON<T5>(this.$typeArgs[5], this.balance),
      option: fieldToJSON<T6>(this.$typeArgs[6], this.option),
      optionNone: fieldToJSON<T7>(this.$typeArgs[7], this.optionNone),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<
    T0 extends Reified<TypeArgument>,
    T1 extends Reified<TypeArgument>,
    T2 extends Reified<TypeArgument>,
    T3 extends Reified<TypeArgument>,
    T4 extends Reified<TypeArgument>,
    T5 extends Reified<TypeArgument>,
    T6 extends Reified<TypeArgument>,
    T7 extends Reified<TypeArgument>,
  >(
    typeArgs: [T0, T1, T2, T3, T4, T5, T6, T7],
    field: any
  ): WithSpecialTypesAsGenerics<
    ToTypeArgument<T0>,
    ToTypeArgument<T1>,
    ToTypeArgument<T2>,
    ToTypeArgument<T3>,
    ToTypeArgument<T4>,
    ToTypeArgument<T5>,
    ToTypeArgument<T6>,
    ToTypeArgument<T7>
  > {
    return WithSpecialTypesAsGenerics.new(typeArgs, {
      id: decodeFromJSONField(UID.reified(), field.id),
      string: decodeFromJSONField(typeArgs[0], field.string),
      asciiString: decodeFromJSONField(typeArgs[1], field.asciiString),
      url: decodeFromJSONField(typeArgs[2], field.url),
      idField: decodeFromJSONField(typeArgs[3], field.idField),
      uid: decodeFromJSONField(typeArgs[4], field.uid),
      balance: decodeFromJSONField(typeArgs[5], field.balance),
      option: decodeFromJSONField(typeArgs[6], field.option),
      optionNone: decodeFromJSONField(typeArgs[7], field.optionNone),
    })
  }

  static fromJSON<
    T0 extends Reified<TypeArgument>,
    T1 extends Reified<TypeArgument>,
    T2 extends Reified<TypeArgument>,
    T3 extends Reified<TypeArgument>,
    T4 extends Reified<TypeArgument>,
    T5 extends Reified<TypeArgument>,
    T6 extends Reified<TypeArgument>,
    T7 extends Reified<TypeArgument>,
  >(
    typeArgs: [T0, T1, T2, T3, T4, T5, T6, T7],
    json: Record<string, any>
  ): WithSpecialTypesAsGenerics<
    ToTypeArgument<T0>,
    ToTypeArgument<T1>,
    ToTypeArgument<T2>,
    ToTypeArgument<T3>,
    ToTypeArgument<T4>,
    ToTypeArgument<T5>,
    ToTypeArgument<T6>,
    ToTypeArgument<T7>
  > {
    if (json.$typeName !== WithSpecialTypesAsGenerics.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(WithSpecialTypesAsGenerics.$typeName, ...typeArgs.map(extractType)),
      json.$typeArgs,
      typeArgs
    )

    return WithSpecialTypesAsGenerics.fromJSONField(typeArgs, json)
  }

  static fromSuiParsedData<
    T0 extends Reified<TypeArgument>,
    T1 extends Reified<TypeArgument>,
    T2 extends Reified<TypeArgument>,
    T3 extends Reified<TypeArgument>,
    T4 extends Reified<TypeArgument>,
    T5 extends Reified<TypeArgument>,
    T6 extends Reified<TypeArgument>,
    T7 extends Reified<TypeArgument>,
  >(
    typeArgs: [T0, T1, T2, T3, T4, T5, T6, T7],
    content: SuiParsedData
  ): WithSpecialTypesAsGenerics<
    ToTypeArgument<T0>,
    ToTypeArgument<T1>,
    ToTypeArgument<T2>,
    ToTypeArgument<T3>,
    ToTypeArgument<T4>,
    ToTypeArgument<T5>,
    ToTypeArgument<T6>,
    ToTypeArgument<T7>
  > {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isWithSpecialTypesAsGenerics(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a WithSpecialTypesAsGenerics object`
      )
    }
    return WithSpecialTypesAsGenerics.fromFieldsWithTypes(typeArgs, content)
  }

  static async fetch<
    T0 extends Reified<TypeArgument>,
    T1 extends Reified<TypeArgument>,
    T2 extends Reified<TypeArgument>,
    T3 extends Reified<TypeArgument>,
    T4 extends Reified<TypeArgument>,
    T5 extends Reified<TypeArgument>,
    T6 extends Reified<TypeArgument>,
    T7 extends Reified<TypeArgument>,
  >(
    client: SuiClient,
    typeArgs: [T0, T1, T2, T3, T4, T5, T6, T7],
    id: string
  ): Promise<
    WithSpecialTypesAsGenerics<
      ToTypeArgument<T0>,
      ToTypeArgument<T1>,
      ToTypeArgument<T2>,
      ToTypeArgument<T3>,
      ToTypeArgument<T4>,
      ToTypeArgument<T5>,
      ToTypeArgument<T6>,
      ToTypeArgument<T7>
    >
  > {
    const res = await client.getObject({ id, options: { showContent: true } })
    if (res.error) {
      throw new Error(
        `error fetching WithSpecialTypesAsGenerics object at id ${id}: ${res.error.code}`
      )
    }
    if (
      res.data?.content?.dataType !== 'moveObject' ||
      !isWithSpecialTypesAsGenerics(res.data.content.type)
    ) {
      throw new Error(`object at id ${id} is not a WithSpecialTypesAsGenerics object`)
    }
    return WithSpecialTypesAsGenerics.fromFieldsWithTypes(typeArgs, res.data.content)
  }
}

/* ============================== WithSpecialTypesInVectors =============================== */

export function isWithSpecialTypesInVectors(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(
    '0x8b699fdce543505aeb290ee1b6b5d20fcaa8e8b1a5fc137a8b3facdfa2902209::fixture::WithSpecialTypesInVectors<'
  )
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface WithSpecialTypesInVectorsFields<T0 extends TypeArgument> {
  id: ToField<UID>
  string: ToField<Vector<String>>
  asciiString: ToField<Vector<String1>>
  idField: ToField<Vector<ID>>
  bar: ToField<Vector<Bar>>
  option: ToField<Vector<Option<'u64'>>>
  optionGeneric: ToField<Vector<Option<T0>>>
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class WithSpecialTypesInVectors<T0 extends TypeArgument> {
  static readonly $typeName =
    '0x8b699fdce543505aeb290ee1b6b5d20fcaa8e8b1a5fc137a8b3facdfa2902209::fixture::WithSpecialTypesInVectors'
  static readonly $numTypeParams = 1

  readonly $fullTypeName =
    null as unknown as `0x8b699fdce543505aeb290ee1b6b5d20fcaa8e8b1a5fc137a8b3facdfa2902209::fixture::WithSpecialTypesInVectors<${ToTypeStr<T0>}>`

  readonly $typeName = WithSpecialTypesInVectors.$typeName

  static get bcs() {
    return <T0 extends BcsType<any>>(T0: T0) =>
      bcs.struct(`WithSpecialTypesInVectors<${T0.name}>`, {
        id: UID.bcs,
        string: bcs.vector(String.bcs),
        ascii_string: bcs.vector(String1.bcs),
        id_field: bcs.vector(ID.bcs),
        bar: bcs.vector(Bar.bcs),
        option: bcs.vector(Option.bcs(bcs.u64())),
        option_generic: bcs.vector(Option.bcs(T0)),
      })
  }

  readonly $typeArg: string

  readonly id: ToField<UID>
  readonly string: ToField<Vector<String>>
  readonly asciiString: ToField<Vector<String1>>
  readonly idField: ToField<Vector<ID>>
  readonly bar: ToField<Vector<Bar>>
  readonly option: ToField<Vector<Option<'u64'>>>
  readonly optionGeneric: ToField<Vector<Option<T0>>>

  private constructor(typeArg: string, fields: WithSpecialTypesInVectorsFields<T0>) {
    this.$typeArg = typeArg

    this.id = fields.id
    this.string = fields.string
    this.asciiString = fields.asciiString
    this.idField = fields.idField
    this.bar = fields.bar
    this.option = fields.option
    this.optionGeneric = fields.optionGeneric
  }

  static new<T0 extends Reified<TypeArgument>>(
    typeArg: T0,
    fields: WithSpecialTypesInVectorsFields<ToTypeArgument<T0>>
  ): WithSpecialTypesInVectors<ToTypeArgument<T0>> {
    return new WithSpecialTypesInVectors(extractType(typeArg), fields)
  }

  static reified<T0 extends Reified<TypeArgument>>(
    T0: T0
  ): Reified<WithSpecialTypesInVectors<ToTypeArgument<T0>>> {
    return {
      typeName: WithSpecialTypesInVectors.$typeName,
      fullTypeName: composeSuiType(
        WithSpecialTypesInVectors.$typeName,
        ...[extractType(T0)]
      ) as `0x8b699fdce543505aeb290ee1b6b5d20fcaa8e8b1a5fc137a8b3facdfa2902209::fixture::WithSpecialTypesInVectors<${ToTypeStr<
        ToTypeArgument<T0>
      >}>`,
      typeArgs: [T0],
      fromFields: (fields: Record<string, any>) => WithSpecialTypesInVectors.fromFields(T0, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        WithSpecialTypesInVectors.fromFieldsWithTypes(T0, item),
      fromBcs: (data: Uint8Array) => WithSpecialTypesInVectors.fromBcs(T0, data),
      bcs: WithSpecialTypesInVectors.bcs(toBcs(T0)),
      fromJSONField: (field: any) => WithSpecialTypesInVectors.fromJSONField(T0, field),
      fetch: async (client: SuiClient, id: string) =>
        WithSpecialTypesInVectors.fetch(client, T0, id),
      kind: 'StructClassReified',
    }
  }

  static fromFields<T0 extends Reified<TypeArgument>>(
    typeArg: T0,
    fields: Record<string, any>
  ): WithSpecialTypesInVectors<ToTypeArgument<T0>> {
    return WithSpecialTypesInVectors.new(typeArg, {
      id: decodeFromFields(UID.reified(), fields.id),
      string: decodeFromFields(reified.vector(String.reified()), fields.string),
      asciiString: decodeFromFields(reified.vector(String1.reified()), fields.ascii_string),
      idField: decodeFromFields(reified.vector(ID.reified()), fields.id_field),
      bar: decodeFromFields(reified.vector(Bar.reified()), fields.bar),
      option: decodeFromFields(reified.vector(Option.reified('u64')), fields.option),
      optionGeneric: decodeFromFields(
        reified.vector(Option.reified(typeArg)),
        fields.option_generic
      ),
    })
  }

  static fromFieldsWithTypes<T0 extends Reified<TypeArgument>>(
    typeArg: T0,
    item: FieldsWithTypes
  ): WithSpecialTypesInVectors<ToTypeArgument<T0>> {
    if (!isWithSpecialTypesInVectors(item.type)) {
      throw new Error('not a WithSpecialTypesInVectors type')
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg])

    return WithSpecialTypesInVectors.new(typeArg, {
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      string: decodeFromFieldsWithTypes(reified.vector(String.reified()), item.fields.string),
      asciiString: decodeFromFieldsWithTypes(
        reified.vector(String1.reified()),
        item.fields.ascii_string
      ),
      idField: decodeFromFieldsWithTypes(reified.vector(ID.reified()), item.fields.id_field),
      bar: decodeFromFieldsWithTypes(reified.vector(Bar.reified()), item.fields.bar),
      option: decodeFromFieldsWithTypes(reified.vector(Option.reified('u64')), item.fields.option),
      optionGeneric: decodeFromFieldsWithTypes(
        reified.vector(Option.reified(typeArg)),
        item.fields.option_generic
      ),
    })
  }

  static fromBcs<T0 extends Reified<TypeArgument>>(
    typeArg: T0,
    data: Uint8Array
  ): WithSpecialTypesInVectors<ToTypeArgument<T0>> {
    const typeArgs = [typeArg]

    return WithSpecialTypesInVectors.fromFields(
      typeArg,
      WithSpecialTypesInVectors.bcs(toBcs(typeArgs[0])).parse(data)
    )
  }

  toJSONField() {
    return {
      id: this.id,
      string: fieldToJSON<Vector<String>>(`vector<0x1::string::String>`, this.string),
      asciiString: fieldToJSON<Vector<String1>>(`vector<0x1::ascii::String>`, this.asciiString),
      idField: fieldToJSON<Vector<ID>>(`vector<0x2::object::ID>`, this.idField),
      bar: fieldToJSON<Vector<Bar>>(
        `vector<0x8b699fdce543505aeb290ee1b6b5d20fcaa8e8b1a5fc137a8b3facdfa2902209::fixture::Bar>`,
        this.bar
      ),
      option: fieldToJSON<Vector<Option<'u64'>>>(`vector<0x1::option::Option<u64>>`, this.option),
      optionGeneric: fieldToJSON<Vector<Option<T0>>>(
        `vector<0x1::option::Option<${this.$typeArg}>>`,
        this.optionGeneric
      ),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArg: this.$typeArg, ...this.toJSONField() }
  }

  static fromJSONField<T0 extends Reified<TypeArgument>>(
    typeArg: T0,
    field: any
  ): WithSpecialTypesInVectors<ToTypeArgument<T0>> {
    return WithSpecialTypesInVectors.new(typeArg, {
      id: decodeFromJSONField(UID.reified(), field.id),
      string: decodeFromJSONField(reified.vector(String.reified()), field.string),
      asciiString: decodeFromJSONField(reified.vector(String1.reified()), field.asciiString),
      idField: decodeFromJSONField(reified.vector(ID.reified()), field.idField),
      bar: decodeFromJSONField(reified.vector(Bar.reified()), field.bar),
      option: decodeFromJSONField(reified.vector(Option.reified('u64')), field.option),
      optionGeneric: decodeFromJSONField(
        reified.vector(Option.reified(typeArg)),
        field.optionGeneric
      ),
    })
  }

  static fromJSON<T0 extends Reified<TypeArgument>>(
    typeArg: T0,
    json: Record<string, any>
  ): WithSpecialTypesInVectors<ToTypeArgument<T0>> {
    if (json.$typeName !== WithSpecialTypesInVectors.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(WithSpecialTypesInVectors.$typeName, extractType(typeArg)),
      [json.$typeArg],
      [typeArg]
    )

    return WithSpecialTypesInVectors.fromJSONField(typeArg, json)
  }

  static fromSuiParsedData<T0 extends Reified<TypeArgument>>(
    typeArg: T0,
    content: SuiParsedData
  ): WithSpecialTypesInVectors<ToTypeArgument<T0>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isWithSpecialTypesInVectors(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a WithSpecialTypesInVectors object`
      )
    }
    return WithSpecialTypesInVectors.fromFieldsWithTypes(typeArg, content)
  }

  static async fetch<T0 extends Reified<TypeArgument>>(
    client: SuiClient,
    typeArg: T0,
    id: string
  ): Promise<WithSpecialTypesInVectors<ToTypeArgument<T0>>> {
    const res = await client.getObject({ id, options: { showContent: true } })
    if (res.error) {
      throw new Error(
        `error fetching WithSpecialTypesInVectors object at id ${id}: ${res.error.code}`
      )
    }
    if (
      res.data?.content?.dataType !== 'moveObject' ||
      !isWithSpecialTypesInVectors(res.data.content.type)
    ) {
      throw new Error(`object at id ${id} is not a WithSpecialTypesInVectors object`)
    }
    return WithSpecialTypesInVectors.fromFieldsWithTypes(typeArg, res.data.content)
  }
}
