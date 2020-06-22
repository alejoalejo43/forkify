/* import str from './models/Search';
//import { add as a, multiply as m, ID } from './views/searchView';
console.log(`Using imported functions! ${a(ID, 2)} and ${m(4, 5)}. ${str}`);
import * as searchView from './views/searchView'
console.log(`Using imported functions! ${searchView.add(searchView.ID, 2)} and ${searchView.multiply(4, 5)}. ${str}`); */

import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements } from './views/base'


/**Global state of the app
 * - Search onject
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */
const state = {};

const controlSearch = async () => {
    // 1) Get query from view
    const query = searchView.getInput(); //TODO


    if (query) {
        // 2) New search object and add t state
        state.search = new Search(query);

        // 3) Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        // 4) Search for recipes
        await state.search.getResults();

        // 5) Render results on UI
        searchView.renderResults(state.search.result)
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
})


