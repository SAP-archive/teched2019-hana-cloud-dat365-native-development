using teched.dat365 as dat365 from '../db/data-model';
using FOODS from '../db/import';

service CatalogService {
    @readonly entity GradeDesc as projection on dat365.NUTRITION_GRADE_DESC;
    @readonly entity User as projection on dat365.user;
    annotate User with @(requires: 'authenticated-user');
    @readonly entity Foods as projection on FOODS;    
}
