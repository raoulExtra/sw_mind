```yaml
version: V00.01.00
updated: 2026-06-06
platform: cross-platform
```
# Apple vs Android Contact Data Differences

<!-- Change History
| Version | Date | Author | Reason |
|---------|------|--------|--------|
| V00.01.00 | 2026-06-06 | ai(kilo laguna) | Initial implementation |
-->

## Key Differences Summary

| Aspect | Android | Apple (iOS) |
|--------|---------|-------------|
| API | ContactsContract (ContentProvider) | Contacts framework (Contacts.framework) |
| Data Model | Aggregated contacts from multiple accounts | Unified address book |
| Storage | SQLite database | Internal framework storage |
| Updated Field | `TIMESTAMP` (long milliseconds) | `modificationDate` (Date) |

## Core Personal Information

### Android (ContactsContract)
```yaml
displayName: "ContactsContract.Contacts.DISPLAY_NAME_PRIMARY"
givenName: "ContactsContract.Data.GIVEN_NAME"
familyName: "ContactsContract.Data.FAMILY_NAME"
middleName: "ContactsContract.Data.MIDDLE_NAME"
namePrefix: "ContactsContract.Data.PREFIX"
nameSuffix: "ContactsContract.Data.SUFFIX"
```

### Apple (iOS Contacts Framework)
```yaml
displayName: "CNContact.fullName"
givenName: "CNContact.givenName"
familyName: "CNContact.familyName"
middleName: "CNContact.middleName"
namePrefix: "CNContact.namePrefix"
nameSuffix: "CNContact.nameSuffix"
```

## Contact Methods

### Android
- Uses `StructuredData` with MIME types
- Phone types: `TYPE_MOBILE`, `TYPE_WORK`, `TYPE_HOME`, `TYPE_FAX`
- Email types: `TYPE_PERSONAL`, `TYPE_WORK`
- IM protocols: `PROTOCOL_GOOGLE_TALK`, `PROTOCOL_ICQ`

### Apple
- Uses `CNPhoneNumber`, `CNEmail`, `CNInstantMessageAddress` objects
- Phone labels: `"mobile"`, `"home"`, `"work"`, `ABWorkLabel`, etc.
- Email labels: `"mobile"`, `"home"`, `"work"`, etc.
- IM services: `CNInstantMessageServiceAIM`, `CNInstantMessageServiceFacebook`, etc.

## Physical Location

### Android
```yaml
physicalAddresses:
  source: "ContactsContract.Data.POSTAL_ADDRESS"
  types: ["TYPE_HOME", "TYPE_WORK"]
  fields: [street, city, region, postalCode, country]
```

### Apple
```yaml
physicalAddresses:
  source: "CNContact.postalAddresses"
  fields:
    street: "CNPostalAddress.street"
    city: "CNPostalAddress.city"
    region: "CNPostalAddress.state"
    postalCode: "CNPostalAddress.postalCode"
    country: "CNPostalAddress.country"
    ISOCountryCode: "CNPostalAddress.ISOCountryCode"
```

## Photo Handling

### Android
- `ContactsContract.Contacts.PHOTO_URI` (API 12+)
- `ContactsContract.Data.PHOTO` (deprecated)
- Returns a URI to the photo file

### Apple
- `CNContact.thumbnailImageData` (compressed thumbnail)
- `CNContact.imageData` (full-size photo)
- Direct `NSData` access

## Metadata Differences

### Android
```yaml
metadata:
  contactId:
    source: "ContactsContract.Contacts._ID"
  rawContactId:
    source: "ContactsContract.RawContacts._ID"
  lookupKey:
    source: "ContactsContract.Contacts.LOOKUP_KEY"
  lastUpdated:
    source: "ContactsContract.Contacts.TIMESTAMP"
    note: "Updated when any raw contact data changes"
  timesContacted:
    source: "ContactsContract.Contacts.TIMES_CONTACTED"
```

### Apple
```yaml
metadata:
  recordID:
    source: "CNContact.identifier"
    note: "Persistent identifier for the contact"
  jobTitle:
    source: "CNContact.jobTitle"
  department:
    source: "CNContact.departmentName"
  organization:
    source: "CNContact.organizationName"
  lastModified:
    source: "CNContact.modificationDate"
    note: "Date when contact was last modified"
  note:
    source: "CNContact.note"
```

## Platform Versions

### Android
- Min SDK: 1
- API 14+: Improved aggregation
- API 26+: Contact expiration
- Permissions: `READ_CONTACTS`, `WRITE_CONTACTS`

### Apple (iOS)
- Min: iOS 13 (for modern Contacts framework)
- Previous: AddressBook.framework (deprecated)
- Permission: `NSContactsUsageDescription` in Info.plist
- No runtime permission needed for reading (iOS 13+)

## Data Kind Differences

### Android Common Data Kinds
- StructuredName, StructuredPostal, Phone, Email
- Organization, Photo, Nickname, Event, Relationship
- Custom fields via MIME types

### Apple CNKeyDescriptor Types
- StructuredName, PostalAddress, Phone, Email
- InstantMessageAddress, Url, CalendarUrl, SocialProfile
- Message, MailingAddress (alias for PostalAddress)
- Birthday, DateOfDeath, Meeting
- Job, Organization, Photo, PostalAddress (multiple)
- SocialProfile: `CNSocialProfile` with service, username, url

## Relationship Handling

### Android
- `ContactsContract.Data.Relationship` MIME type
- Types: `TYPE_SPOUSE`, `TYPE_CHILD`, `TYPE_PARENT`, `TYPE_SIBLING`

### Apple
- `CNContact.contactRelations` (iOS 15.0+)
- No predefined relationship types
- Custom labels allowed
- `CNContactRelation` with `label` and `value`