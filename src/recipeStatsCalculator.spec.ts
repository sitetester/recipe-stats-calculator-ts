import {RecipeStatsCalculator} from "./recipeStatsCalculator";

describe("Recipe stats test cases", () => {

    test("Count the number of unique recipe names", () => {

        const expectedOutput = new RecipeStatsCalculator(
            {
                Postcode: "10120",
                From: 10,
                To: 3
            }
        ).calculateStats("./resources/hf_test_calculation_fixtures_SMALL.json")

        expect(expectedOutput.UniqueRecipeCount).toBeGreaterThan(0)
    });

});
