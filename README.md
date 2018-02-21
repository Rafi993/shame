## Shame
Some times due to urgency you may have added some fix to your code that you are not proud of and may want to remove it. Mark the shamfull portion of your code as

````
// @shame This is a function that does something shamefull remove it later
function getData(){
  // something shamefull
}
````

when shame accumulates in your code more than your **shame factor** this package will not let you
build

in your package.json or anything similar depending on your language

````
 'build': 'shame --t 6 && **your build code**
````

## Things to do

[ ] Assign weights to shame
[ ] Ability to use git to store change in your **shame entropy** of your project across time
[ ] .. awesome ideas are welcomed ..
