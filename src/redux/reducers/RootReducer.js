import {combineReducers} from "redux"
import { reducer } from "./Reducer"
import { CategoryReducers } from "./CategoryReducers"
import { ProductReducers } from "./ProductReducers"
import { CompanyReducers } from "./CompanyReducers"
import { CountryReducers } from "./CountryReducers"
import {ToggleModelVisibalityReducers} from './ToggleModelVisibalityReducers'
import {UpdateProductsModelDataReducers} from './UpdateProductsModelDataReducers'

export default combineReducers({
    reducer,
    CategoryReducers,
    ProductReducers,
    CompanyReducers,
    CountryReducers,
    ToggleModelVisibalityReducers,
    UpdateProductsModelDataReducers,
    // ParamsReducers,
})