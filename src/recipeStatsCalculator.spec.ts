import {CountPerRecipe, ExpectedOutput, RecipeStatsCalculator} from "./recipeStatsCalculator";

describe("Recipe stats test cases", () => {

    let expectedOutput: ExpectedOutput;

    beforeAll(async () => {
        const recipeStatsCalculator = new RecipeStatsCalculator(
            {
                postcode: "10120",
                from: 10,
                to: 3
            }
        )

        const filePath = __dirname + "/resources/hf_test_calculation_fixtures_SMALL.json"
        expectedOutput = await recipeStatsCalculator.calculateStats(filePath);
    });

    test("Count the number of unique recipe names", async () => {
        expect(expectedOutput.uniqueRecipeCount).toBe(4)
    });


    test(`Count the number of occurrences for each unique recipe name (alphabetically ordered by recipe name`, () => {

        // first recipe in sorted order
        expect(expectedOutput.sortedRecipesCount[0]).toStrictEqual(<CountPerRecipe>{
            recipe: "A5 Balsamic Veggie Chops",
            count: 1
        })

        // it should cover all recipes
        expect(expectedOutput.sortedRecipesCount.length).toBe(5)

        // `Creamy Dill Chicken` has two counts
        expect(expectedOutput.sortedRecipesCount[3]).toStrictEqual(<CountPerRecipe>{
            recipe: "Creamy Dill Chicken",
            count: 2
        })
    });

});
