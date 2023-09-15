/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { Context } from "./../lib/api/context"
import type { FieldAuthorizeResolver } from "nexus/dist/plugins/fieldAuthorizePlugin"
import type { ValidateResolver } from "nexus-validate"




declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  UserLoginInput: { // input type
    email: string; // String!
    password: string; // String!
  }
  UserSignupInput: { // input type
    email: string; // String!
    password: string; // String!
    username: string; // String!
  }
}

export interface NexusGenEnums {
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
}

export interface NexusGenObjects {
  AuthUser: { // root type
    bio?: string | null; // String
    email: string; // String!
    id: number; // Int!
    image?: string | null; // String
    token?: string | null; // String
    username: string; // String!
  }
  Mutation: {};
  Profile: { // root type
    bio?: string | null; // String
    image?: string | null; // String
    username: string; // String!
  }
  Query: {};
}

export interface NexusGenInterfaces {
  BaseUser: NexusGenRootTypes['AuthUser'] | NexusGenRootTypes['Profile'];
  Node: NexusGenRootTypes['AuthUser'];
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenInterfaces & NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars

export interface NexusGenFieldTypes {
  AuthUser: { // field return type
    bio: string | null; // String
    email: string; // String!
    id: number; // Int!
    image: string | null; // String
    token: string | null; // String
    username: string; // String!
  }
  Mutation: { // field return type
    login: NexusGenRootTypes['AuthUser'] | null; // AuthUser
    signup: NexusGenRootTypes['AuthUser'] | null; // AuthUser
  }
  Profile: { // field return type
    bio: string | null; // String
    following: boolean; // Boolean!
    image: string | null; // String
    username: string; // String!
  }
  Query: { // field return type
    profile: NexusGenRootTypes['Profile'] | null; // Profile
  }
  BaseUser: { // field return type
    bio: string | null; // String
    image: string | null; // String
    username: string; // String!
  }
  Node: { // field return type
    id: number; // Int!
  }
}

export interface NexusGenFieldTypeNames {
  AuthUser: { // field return type name
    bio: 'String'
    email: 'String'
    id: 'Int'
    image: 'String'
    token: 'String'
    username: 'String'
  }
  Mutation: { // field return type name
    login: 'AuthUser'
    signup: 'AuthUser'
  }
  Profile: { // field return type name
    bio: 'String'
    following: 'Boolean'
    image: 'String'
    username: 'String'
  }
  Query: { // field return type name
    profile: 'Profile'
  }
  BaseUser: { // field return type name
    bio: 'String'
    image: 'String'
    username: 'String'
  }
  Node: { // field return type name
    id: 'Int'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    login: { // args
      input: NexusGenInputs['UserLoginInput']; // UserLoginInput!
    }
    signup: { // args
      input: NexusGenInputs['UserSignupInput']; // UserSignupInput!
    }
  }
  Query: {
    profile: { // args
      username: string; // String!
    }
  }
}

export interface NexusGenAbstractTypeMembers {
  BaseUser: "AuthUser" | "Profile"
  Node: "AuthUser"
}

export interface NexusGenTypeInterfaces {
  AuthUser: "BaseUser" | "Node"
  Profile: "BaseUser"
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = keyof NexusGenInputs;

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = keyof NexusGenInterfaces;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    resolveType: false
    __typename: false
    isTypeOf: false
  }
}

export interface NexusGenTypes {
  context: Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
    /**
     * Authorization for an individual field. Returning "true"
     * or "Promise<true>" means the field can be accessed.
     * Returning "false" or "Promise<false>" will respond
     * with a "Not Authorized" error for the field.
     * Returning or throwing an error will also prevent the
     * resolver from executing.
     */
    authorize?: FieldAuthorizeResolver<TypeName, FieldName>
    /**
     * Validate mutation arguments.
     */
    validate?: ValidateResolver<TypeName, FieldName>
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}