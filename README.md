## Shame
Some times due to urgency you may have added some fix to your code that you are not proud of and may want to remove it. Mark the shameful portion of your code as

````
// @shame This is a function that does something shameful remove it later
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

- [ ] publish as npm package
- [ ] Assign weights to shame
- [ ] Ability find changes in **shame entropy** between two commits
- [ ] .. awesome ideas are welcomed ..
