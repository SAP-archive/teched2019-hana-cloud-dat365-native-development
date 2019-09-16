@cds.persistence.exists
entity FOODS {
  key ID: Integer  @(title: '{i18n>id}', Common.FieldControl: #Mandatory, Search.defaultSearchElement, Common.Label: '{i18n>id}');
  CODE: Integer64 @title: '{i18n>code}';
  URL: String(500) @title: '{i18n>url}';
  PRODUCT_NAME: String(500) @title: '{i18n>product_name}';
  BRANDS: String @title: '{i18n>brands}';
  COUNTRIES: String @title: '{i18n>countries}';
  INGREDIENTS_TEXT: String @title: '{i18n>ingredients}';
  SERVING_SIZE: String(500) @title: '{i18n>serving_size}';
  SERVING_QUANTITY: String(500) @title: '{i18n>serving_quantity}';
  NUTRITION_CLASS: String(1) @title: '{i18n>nutrition_class}';
}