```yaml
version: V00.01.00
updated: 2026-05-29
platform: android
```
# Android Visit Card (Contact) Attributes

Android contacts are managed through the **ContactsContract** provider API. A visit card (contact) consists of aggregated data from one or more raw contacts.

<!-- Change History
| Version | Date | Author | Reason |
|---------|------|--------|--------|
| V00.01.00 | 2026-05-29 | ai(cline) | Initial implementation |
-->

```yaml
corePersonalInformation:
  displayName:
    description: "Primary display name (aggregated)"
    source: "ContactsContract.Contacts.DISPLAY_NAME_PRIMARY"
    note: "Generated from StructuredName data"
  givenName:
    description: "First name"
    source: "ContactsContract.Data.GIVEN_NAME"
  familyName:
    description: "Last name"
    source: "ContactsContract.Data.FAMILY_NAME"
  middleName:
    description: "Middle name"
    source: "ContactsContract.Data.MIDDLE_NAME"
  namePrefix:
    description: "Title (Mr, Mrs, Dr, etc.)"
    source: "ContactsContract.Data.PREFIX"
  nameSuffix:
    description: "Suffix (Jr, Sr, III, etc.)"
    source: "ContactsContract.Data.SUFFIX"

professionalInformation:
  organization:
    description: "Company name"
    source: "ContactsContract.Data.COMPANY"
  jobTitle:
    description: "Job title/position"
    source: "ContactsContract.Data.TITLE"
  department:
    description: "Department within organization"
    source: "ContactsContract.Data.DEPARTMENT"

contactMethods:
  phoneNumbers:
    description: "List of phone numbers"
    source: "ContactsContract.Data.PHONE_NUMBER"
    types:
      - TYPE_MOBILE
      - TYPE_WORK
      - TYPE_HOME
      - TYPE_FAX
  emailAddresses:
    description: "List of email addresses"
    source: "ContactsContract.Data.EMAIL_ADDRESS"
    types:
      - TYPE_PERSONAL
      - TYPE_WORK
  imAddresses:
    description: "Instant messenger addresses"
    source: "ContactsContract.Data.IM_HANDLE"
    protocols:
      - PROTOCOL_GOOGLE_TALK
      - PROTOCOL_ICQ
  websites:
    description: "Website URLs"
    source: "ContactsContract.Data.WEBSITE"
    types:
      - TYPE_HOME
      - TYPE_WORK

physicalLocation:
  physicalAddresses:
    description: "Street addresses"
    source: "ContactsContract.Data.POSTAL_ADDRESS"
    types:
      - TYPE_HOME
      - TYPE_WORK

additionalDetails:
  nickname:
    description: "Informal name"
    source: "ContactsContract.Data.NICKNAME"
  notes:
    description: "Free-form notes"
    source: "ContactsContract.Data.NOTES"
  birthday:
    description: "Birth date"
    source: "ContactsContract.Data.EVENT_DATE with EVENT_TYPE_BIRTHDAY"
  anniversary:
    description: "Anniversary date"
    source: "ContactsContract.Data.EVENT_DATE with EVENT_TYPE_ANNIVERSARY"
  relation:
    description: "Relationship"
    types:
      - TYPE_SPOUSE
      - TYPE_CHILD
      - TYPE_PARENT
      - TYPE_SIBLING
    source: "ContactsContract.Data.Relationship"
  photo:
    description: "Contact photo URI"
    source: "ContactsContract.Contacts.PHOTO_URI or ContactsContract.Data.PHOTO"

metadata:
  contactId:
    description: "Unique contact identifier (aggregated)"
    source: "ContactsContract.Contacts._ID"
  rawContactId:
    description: "Raw contact identifier (per-account)"
    source: "ContactsContract.RawContacts._ID"
  lookupKey:
    description: "Stable key for lookup operations"
    source: "ContactsContract.Contacts.LOOKUP_KEY"
  accountType:
    description: "Source account type (e.g., com.google)"
    source: "ContactsContract.RawContacts.ACCOUNT_TYPE"
  accountName:
    description: "Source account name"
    source: "ContactsContract.RawContacts.ACCOUNT_NAME"
  lastUpdated:
    description: "Timestamp of last modification"
    source: "ContactsContract.Contacts.TIMESTAMP"
    note: "Updated when any raw contact data changes"
  timesContacted:
    description: "Number of times contacted"
    source: "ContactsContract.Contacts.TIMES_CONTACTED"
  starred:
    description: "Whether contact is starred/favorite"
    source: "ContactsContract.Contacts.STARRED"
  inVisibleGroups:
    description: "Whether contact is visible in contacts list"
    source: "ContactsContract.Contacts.IN_VISIBLE_GROUP"

commonDataKinds:
  StructuredName:
    description: "Name details (given, family, middle, prefix, suffix)"
    source: "ContactsContract.Data.MIMETYPE = StructuredName.CONTENT_ITEM_TYPE"
  StructuredPostal:
    description: "Postal addresses"
    source: "ContactsContract.Data.MIMETYPE = StructuredPostal.CONTENT_ITEM_TYPE"
    fields:
      - street
      - city
      - region
      - postalCode
      - country
  Phone:
    description: "Phone numbers with type labels"
    source: "ContactsContract.Data.MIMETYPE = Phone.CONTENT_ITEM_TYPE"
  Email:
    description: "Email addresses with type labels"
    source: "ContactsContract.Data.MIMETYPE = Email.CONTENT_ITEM_TYPE"
  Organization:
    description: "Company and job details"
    source: "ContactsContract.Data.MIMETYPE = Organization.CONTENT_ITEM_TYPE"
  Photo:
    description: "Contact image"
    source: "ContactsContract.Data.MIMETYPE = Photo.CONTENT_ITEM_TYPE"
  Nickname:
    description: "Nickname data kind"
    source: "ContactsContract.Data.MIMETYPE = Nickname.CONTENT_ITEM_TYPE"
  Event:
    description: "Events (birthday, anniversary) with type"
    source: "ContactsContract.Data.MIMETYPE = Event.CONTENT_ITEM_TYPE"
  Relationship:
    description: "Relationship contacts with type"
    source: "ContactsContract.Data.MIMETYPE = Relationship.CONTENT_ITEM_TYPE"

customFields:
  description: "Account-specific custom fields (varies by account type)"

dataStructure:
  description: "A contact is an aggregation of one or more raw contacts from different accounts. Each raw contact contains specific data items that map to the data kinds listed above."

androidVersions:
  minSdkVersion:
    value: 1
    notes: "ContactsContract API available since API 1 (Android 1.0)"
  importantVersions:
    - api14: "Android 4.0 (ICE_CREAM_SANDWICH) - Improved contact aggregation"
    - api17: "Android 4.2 (JELLY_BEAN_MR1) - Profile contact support"
    - api18: "Android 4.3 (JELLY_BEAN_MR2) - Granular permission control"
    - api26: "Android 8.0 (OREO) - Contact expiration and photo changes"
    - api28: "Android 9 (PIE) - Contact data usage feedback"
  permissionsRequired:
    - READ_CONTACTS: "To read contact data"
    - WRITE_CONTACTS: "To modify contact data"
```