import { LanguageButtons } from "./LanguageButtons";
import { CategoryButtons } from "./CategoryButtons";


export function FilterContainer({ setLanguageFilter, setCategoryFilter }) {

    return (
        <>
        <LanguageButtons setLanguageFilter={setLanguageFilter}/>
        <CategoryButtons setCategoryFilter={setCategoryFilter}/>
        </>
    )
 }