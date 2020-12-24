import {RecipeStatsCalculator} from "../recipeStatsCalculator";

const filePath = __dirname + "/../resources/hf_test_calculation_fixtures_SMALL.json"

const customPostcodeDeliveryTime = {
    postcode: "10120",
    from: 10,
    to: 3
}

const customRecipeNames = ["Potato", "Veggie", "Mushroom"]

new RecipeStatsCalculator(customPostcodeDeliveryTime, customRecipeNames).calculateStats(filePath)