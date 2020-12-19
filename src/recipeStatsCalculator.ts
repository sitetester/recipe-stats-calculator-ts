export class RecipeStatsCalculator {

    // https://stackoverflow.com/questions/41923069/assigning-typescript-constructor-parameters
    constructor(
        private customPostcodeDeliveryTime: CustomPostcodeDeliveryTime,
        private customRecipeNames: string[] = []) {
    }

    calculateStats(filePath: string): ExpectedOutput {

        const expectedOutput: ExpectedOutput = {
            UniqueRecipeCount: 1
        }

        return expectedOutput;
    }
}

export interface CustomPostcodeDeliveryTime {
    Postcode: string
    From: number
    To: number
}

export interface ExpectedOutput {
    UniqueRecipeCount: number
    /*SortedRecipesCount: CountPerRecipe[]
    BusiestPostcode: BusiestPostcode
    CountPerPostcodeAndTime: CountPerPostcodeAndTime
    SortedRecipeNames: string[]*/
}

export interface CountPerRecipe {
    Recipe: string
    Count: number
}

export interface BusiestPostcode {
    Postcode: string
    DeliveryCount: number
}

export interface CountPerPostcodeAndTime {
    Postcode: string
    FromAM: string
    ToPM: string
    DeliveryCount: number
}

export interface RecipeData {
    Postcode: string
    Recipe: string
    Delivery: string
}

export interface CountPerPostcode {
    Postcode: string
    Count: number
}