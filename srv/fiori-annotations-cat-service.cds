using CatalogService as cats from './cat-service';

annotate cats.GradeDesc with @( // header-level annotations
// ---------------------------------------------------------------------------
// List Report
// ---------------------------------------------------------------------------
	// Grade Desc List
	UI: {
		LineItem: [ 
			{$Type: 'UI.DataField', Value: CLASS, "@UI.Importance":#High},
			{$Type: 'UI.DataField', Value: DESCRIPTION, "@UI.Importance": #High}
 		],
 		PresentationVariant: {
			SortOrder: [ {$Type: 'Common.SortOrderType', Property: CLASS, Descending: false}, {$Type: 'Common.SortOrderType', Property: DESCRIPTION, Descending: false} ]
		}
	}
);


annotate cats.Foods with @( // header-level annotations
// ---------------------------------------------------------------------------
// List Report
// ---------------------------------------------------------------------------
	// Foods List
	UI: {
		LineItem: [ 
			{$Type: 'UI.DataField', Value: ID, "@UI.Importance":#High},		
			{$Type: 'UI.DataField', Value: CODE, "@UI.Importance":#Low},		
			{$Type: 'UI.DataField', Value: URL, "@UI.Importance":#High},
			{$Type: 'UI.DataField', Value: PRODUCT_NAME, "@UI.Importance":#High},	
			{$Type: 'UI.DataField', Value: BRANDS, "@UI.Importance":#High},	
			{$Type: 'UI.DataField', Value: COUNTRIES, "@UI.Importance":#Low},
			{$Type: 'UI.DataField', Value: INGREDIENTS_TEXT, "@UI.Importance":#Medium},		
			{$Type: 'UI.DataField', Value: SERVING_SIZE, "@UI.Importance":#High},	
			{$Type: 'UI.DataField', Value: SERVING_QUANTITY, "@UI.Importance":#High},			
			{$Type: 'UI.DataField', Value: NUTRITION_CLASS, "@UI.Importance":#Low},
			{$Type: 'UI.DataField', Value: DESC.DESCRIPTION, "@UI.Importance": #High}
 		],
 		PresentationVariant: {
			SortOrder: [ {$Type: 'Common.SortOrderType', Property:  DESC.DESCRIPTION, Descending: false}, {$Type: 'Common.SortOrderType', Property: ID, Descending: false} ]
		}
	}
);