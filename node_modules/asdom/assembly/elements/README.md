# When adding new element classes (or classes for any object)

- make sure to add their type to `ObjectType` in `ObjectType.ts`
- add them to the `makeObject` function in `assembly/utils/makeObject.ts`
- add them to the `getObjectType` function in `glue/index.js`, in the same order and with the same number as in `ObjectType`.

The numbers in `ObjectType` have gaps in order to group different categories of object types.
