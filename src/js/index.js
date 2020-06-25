/* import str from './models/Search';
//import { add as a, multiply as m, ID } from './views/searchView';
console.log(`Using imported functions! ${a(ID, 2)} and ${m(4, 5)}. ${str}`);
import * as searchView from './views/searchView'
console.log(`Using imported functions! ${searchView.add(searchView.ID, 2)} and ${searchView.multiply(4, 5)}. ${str}`); */

import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import { elements, renderLoader, clearLoader } from './views/base'

//All the things that there are in one givenmoment is going to be store at state variable
/**Global state of the app
 * - Search onject
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */
const state = {};

/***********SEARCH CONTROLLER***********/
const controlSearch = async () => {
    // 1) Get query from view
    const query = searchView.getInput(); //TODO


    if (query) {
        // 2) New search object and add to state
        state.search = new Search(query);

        // 3) Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        try {
            // 4) Search for recipes
            await state.search.getResults();

            // 5) Render results on UI
            clearLoader();
            searchView.renderResults(state.search.result);
        } catch (err) {
            alert('Something wrong with the search...');
            clearLoader();
        }

    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
})

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const gotoPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, gotoPage);
    }
});


/***********RECIPE CONTROLLER***********/
const controlRecipe = async () => {
    //GET THE ID FROM URL
    const id = window.location.hash.replace('#', '');
    console.log(id);

    if (id) {
        // Prepare UI for changes

        // Create new recipe object
        state.recipe = new Recipe(id);

        try {
            // Get recipe data
            await state.recipe.getRecipe();

            // Calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();

            //Render recipe
            console.log(state.recipe);
        } catch (err) {
            alert('Error processing recipe!')
        }

    }
};

//window.addEventListener('hashchange', controlRecipe);
//window.addEventListener('load', controlRecipe);
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));