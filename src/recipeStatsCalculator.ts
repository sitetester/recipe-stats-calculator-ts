const StreamArray = require('stream-json/streamers/StreamArray');
const path = require('path');
const fs = require('fs');

export class RecipeStatsCalculator {

    // https://stackoverflow.com/questions/41923069/assigning-typescript-constructor-parameters
    constructor(
        private customPostcodeDeliveryTime: CustomPostcodeDeliveryTime,
        private customRecipeNames: string[] = []) {
    }

    // https://stackoverflow.com/questions/42896447/parse-large-json-file-in-nodejs-and-handle-each-object-independently
    calculateStats(filePath: string): Promise<ExpectedOutput> {

        return new Promise((resolve, reject) => {

            const jsonStream = StreamArray.withParser();
            const countPerRecipe = new Map<string, number>()
            const countPerPostcode = new Map<String, number>()

            jsonStream.on('data', ({value}) => {
                const recipeData = value
                this.calculateCountPer(recipeData.recipe, countPerRecipe)
            });

            jsonStream.on('end', () => {

                const expectedOutput: ExpectedOutput = {
                    uniqueRecipeCount: this.getUniqueRecipeCount(countPerRecipe),
                    sortedRecipesCount: this.getSortedRecipeCount(countPerRecipe),
                }

                resolve(expectedOutput);
            });

            const filename = path.join(filePath);
            fs.createReadStream(filename).pipe(jsonStream.input);
        })
    }

    private calculateCountPer(key: string, countPer: Map<string, number>) {

        const count = countPer.get(key)

        if (count != null) {
            countPer.set(key, count + 1)
        } else {
            countPer.set(key, 1)
        }
    }

    private getUniqueRecipeCount(countPerRecipe: Map<string, number>): number {

        let count = 0
        countPerRecipe.forEach(value => {
            if (value === 1) {
                count += 1
            }
        })

        return count
    }

    private getSortedRecipeCount(countPerRecipe: Map<String, number>): CountPerRecipe[] {

        return Array.from(countPerRecipe).map(value => [value[0], value[1]]).sort().map(value => (
            <CountPerRecipe>{
                recipe: value[0],
                count: value[1],
            }
        ));
    }
}

export interface CustomPostcodeDeliveryTime {
    postcode: string
    from: number
    to: number
}

export interface ExpectedOutput {
    uniqueRecipeCount: number
    sortedRecipesCount: CountPerRecipe[]
    /*busiestPostcode: BusiestPostcode
    CountPerPostcodeAndTime: CountPerPostcodeAndTime
    SortedRecipeNames: string[]*/
}

export interface CountPerRecipe {
    recipe: string
    count: number
}

export interface BusiestPostcode {
    postcode: string
    deliveryCount: number
}

export interface CountPerPostcodeAndTime {
    postcode: string
    fromAM: string
    toPM: string
    deliveryCount: number
}

export interface RecipeData {
    postcode: string
    recipe: string
    delivery: string
}

export interface CountPerPostcode {
    postcode: string
    count: number
}