namespace teched.dat365;
using FOODS from '../db/import';

entity NUTRITION_GRADE_DESC {
  key CLASS : String(1) @(title: '{i18n>class}', Common.FieldControl: #Mandatory, Search.defaultSearchElement, Common.Label: '{i18n>class}');
  DESCRIPTION  : String @title: '{i18n>description}';
}

entity user {
	key id : String;
	givenName: String;
	familyName: String;
	email: String;
	locale: String;
}

extend FOODS with {
	DESC: association to NUTRITION_GRADE_DESC on DESC.CLASS = NUTRITION_CLASS;
}
 